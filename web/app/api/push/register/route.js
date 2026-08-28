import { NextRequest, NextResponse } from "next/server";

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;


export async function POST(request) {
  try {
    if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
      return NextResponse.json(
        {
          error: "Directus server configuration is missing.",
        },
        {
          status: 500,
        }
      );
    }

    const body = await request.json();

    if (
      typeof body.token !== "string" ||
      !body.token.startsWith("ExponentPushToken[")
    ) {
      return NextResponse.json(
        {
          error: "A valid Expo push token is required.",
        },
        {
          status: 400,
        }
      );
    }

    const existingResponse = await fetch(
      `${DIRECTUS_URL}/items/push_tokens?filter[token][_eq]=${encodeURIComponent(
        body.token
      )}&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${DIRECTUS_TOKEN}`,
        },
        cache: "no-store",
      }
    );

    if (!existingResponse.ok) {
      throw new Error(
        `Directus lookup failed: ${existingResponse.status}`
      );
    }

    const existingResult = await existingResponse.json()

    const existingToken = existingResult.data?.[0];

    if (existingToken) {
      await fetch(
        `${DIRECTUS_URL}/items/push_tokens/${existingToken.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${DIRECTUS_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            active: true,
            platform:
              typeof body.platform === "string"
                ? body.platform
                : "expo",
          }),
        }
      );

      return NextResponse.json({
        success: true,
        existing: true,
      });
    }

    const createResponse = await fetch(
      `${DIRECTUS_URL}/items/push_tokens`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${DIRECTUS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: body.token,
          platform:
            typeof body.platform === "string"
              ? body.platform
              : "expo",
          active: true,
        }),
      }
    );

    if (!createResponse.ok) {
      const errorText = await createResponse.text();

      throw new Error(
        `Directus insert failed: ${createResponse.status} ${errorText}`
      );
    }

    return NextResponse.json(
      {
        success: true,
        existing: false,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Register push token error:", error);

    return NextResponse.json(
      {
        error: "Unable to register the push token.",
      },
      {
        status: 500,
      }
    );
  }
}