import { useMemo } from "react";

type DirectusId = string | number;
type DirectusValue = string | number | boolean | null;

type DirectusOperator =
  | "eq"
  | "neq"
  | "lt"
  | "lte"
  | "gt"
  | "gte"
  | "in"
  | "nin"
  | "contains"
  | "icontains"
  | "starts_with"
  | "ends_with"
  | "null"
  | "nnull"
  | "empty"
  | "nempty";

type DirectusEnvelope<T> = {
  data: T;
  meta?: Record<string, unknown>;
};

type DirectusErrorEnvelope = {
  errors?: Array<{ message?: string }>;
  message?: string;
};

type QueryState = {
  params: Array<[string, string]>;
};

export class DirectusRequestError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly response: unknown,
  ) {
    super(message);
    this.name = "DirectusRequestError";
  }
}

function getBaseUrl(): string {
  const url = process.env.EXPO_PUBLIC_DIRECTUS_API_URL;

  if (!url) {
    throw new Error("EXPO_PUBLIC_DIRECTUS_API_URL is missing.");
  }

  return url.replace(/\/$/, "");
}

function serialize(value: DirectusValue | DirectusValue[]): string {
  if (Array.isArray(value)) return value.join(",");
  if (value === null) return "null";
  return String(value);
}

export class DirectusClient {
  constructor(
    private readonly baseUrl = getBaseUrl(),
    private readonly token?: string | null,
  ) {}

  async request<T>(
    path: string,
    options: RequestInit = {},
    params?: URLSearchParams,
  ): Promise<T> {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const query = params?.toString();
    const headers = new Headers(options.headers);

    headers.set("Accept", "application/json");
    if (options.body && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    if (this.token) headers.set("Authorization", `Bearer ${this.token}`);

    const response = await fetch(
      `${this.baseUrl}${normalizedPath}${query ? `?${query}` : ""}`,
      { ...options, headers },
    );

    const body = await response.json().catch(() => null);
    if (!response.ok) {
      const errorBody = body as DirectusErrorEnvelope | null;
      const message =
        errorBody?.errors?.[0]?.message ??
        errorBody?.message ??
        `Directus request failed with status ${response.status}.`;
      throw new DirectusRequestError(message, response.status, body);
    }

    return body as T;
  }

  get<T>(path: string, params?: Record<string, DirectusValue>): Promise<T> {
    const searchParams = new URLSearchParams();
    Object.entries(params ?? {}).forEach(([key, value]) => {
      searchParams.set(key, serialize(value));
    });
    return this.request<T>(path, { method: "GET" }, searchParams);
  }

  post<TResponse, TBody = unknown>(path: string, body: TBody): Promise<TResponse> {
    return this.request<TResponse>(path, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  collection<T extends object>(name: string): DirectusQuery<T> {
    return new DirectusQuery<T>(this, name);
  }
}

export class DirectusQuery<T extends object> {
  constructor(
    private readonly client: DirectusClient,
    private readonly collectionName: string,
    private readonly state: QueryState = { params: [] },
  ) {}

  private next(key: string, value: string): DirectusQuery<T> {
    return new DirectusQuery(this.client, this.collectionName, {
      params: [...this.state.params, [key, value]],
    });
  }

  select(...fields: Array<keyof T | string>): DirectusQuery<T> {
    return this.next("fields", fields.join(","));
  }

  where(field: keyof T | string, value: DirectusValue): DirectusQuery<T>;
  where(
    field: keyof T | string,
    operator: DirectusOperator,
    value: DirectusValue | DirectusValue[],
  ): DirectusQuery<T>;
  where(
    field: keyof T | string,
    operatorOrValue: DirectusOperator | DirectusValue,
    value?: DirectusValue | DirectusValue[],
  ): DirectusQuery<T> {
    const hasOperator = value !== undefined;
    const operator = hasOperator ? operatorOrValue : "eq";
    const filterValue = hasOperator ? value : operatorOrValue;
    return this.next(
      `filter[${String(field)}][_${operator}]`,
      serialize(filterValue as DirectusValue | DirectusValue[]),
    );
  }

  whereIn(field: keyof T | string, values: DirectusValue[]): DirectusQuery<T> {
    return this.where(field, "in", values);
  }

  orderBy(field: keyof T | string, direction: "asc" | "desc" = "asc"): DirectusQuery<T> {
    return this.next("sort", `${direction === "desc" ? "-" : ""}${String(field)}`);
  }

  limit(value: number): DirectusQuery<T> {
    return this.next("limit", String(value));
  }

  offset(value: number): DirectusQuery<T> {
    return this.next("offset", String(value));
  }

  page(value: number): DirectusQuery<T> {
    return this.next("page", String(value));
  }

  async get(): Promise<T[]> {
    const params = new URLSearchParams(this.state.params);
    const result = await this.client.request<DirectusEnvelope<T[]>>(
      `/items/${encodeURIComponent(this.collectionName)}`,
      { method: "GET" },
      params,
    );
    return result.data;
  }

  async first(): Promise<T | null> {
    const items = await this.limit(1).get();
    return items[0] ?? null;
  }

  async find(id: DirectusId): Promise<T> {
    const result = await this.client.request<DirectusEnvelope<T>>(
      `/items/${encodeURIComponent(this.collectionName)}/${encodeURIComponent(String(id))}`,
      { method: "GET" },
    );
    return result.data;
  }

  async create(values: Partial<T>): Promise<T> {
    const result = await this.client.request<DirectusEnvelope<T>>(
      `/items/${encodeURIComponent(this.collectionName)}`,
      { method: "POST", body: JSON.stringify(values) },
    );
    return result.data;
  }

  async update(id: DirectusId, values: Partial<T>): Promise<T> {
    const result = await this.client.request<DirectusEnvelope<T>>(
      `/items/${encodeURIComponent(this.collectionName)}/${encodeURIComponent(String(id))}`,
      { method: "PATCH", body: JSON.stringify(values) },
    );
    return result.data;
  }

  async delete(id: DirectusId): Promise<void> {
    await this.client.request<unknown>(
      `/items/${encodeURIComponent(this.collectionName)}/${encodeURIComponent(String(id))}`,
      { method: "DELETE" },
    );
  }
}

export function useDirectusClient(token?: string | null): DirectusClient {
  return useMemo(() => new DirectusClient(undefined, token), [token]);
}

export function useDirectus<T extends object>(
  collection: string,
  token?: string | null,
): DirectusQuery<T> {
  const client = useDirectusClient(token);
  return useMemo(() => client.collection<T>(collection), [client, collection]);
}
