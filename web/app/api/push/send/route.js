import { NextRequest, NextResponse } from "next/server";

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;


export async function POST(request) {
  const authorization = request.headers.get("authorization");
  console.log("authorization",authorization)
  console.log(process.env.PUSH_NOTIFICATION_SECRET)
    if (
    authorization !==
    `Bearer ${process.env.PUSH_NOTIFICATION_SECRET}`
    ) {
    return NextResponse.json(
        {
        error: "Unauthorized",
        },
        {
        status: 401,
        }
    );
    }
  try {
    if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
      return NextResponse.json(
        {
          error: "Server configuration is missing.",
        },
        {
          status: 500,
        }
      );
    }

    const body = await request.json();

    if (
      typeof body.title !== "string" ||
      typeof body.message !== "string"
    ) {
      return NextResponse.json(
        {
          error: "Title and message are required.",
        },
        {
          status: 400,
        }
      );
    }

    const tokenResponse = await fetch(
      `${DIRECTUS_URL}/items/push_tokens?filter[active][_eq]=true&limit=-1&fields=id,token`,
      {
        headers: {
          Authorization: `Bearer ${DIRECTUS_TOKEN}`,
        },
        cache: "no-store",
      }
    );

    if (!tokenResponse.ok) {
      throw new Error(
        `Could not load push tokens: ${tokenResponse.status}`
      );
    }

    const tokenResult = await tokenResponse.json()

    const records = tokenResult.data ?? [];

    const messages = records
      .filter((record) =>
        record.token.startsWith("ExponentPushToken[")
      )
      .map((record) => ({
        to: record.token,
        sound: "default",
        channelId: "default",
        title: body.title,
        body: body.message,
        data: {
          alertId:
            typeof body.alertId === "string"
              ? body.alertId
              : null,
        },
      }));

    if (messages.length === 0) {
      return NextResponse.json({
        success: true,
        sent: 0,
        message: "No active push tokens found.",
      });
    }

    const expoResponse = await fetch(
      "https://exp.host/--/api/v2/push/send",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messages),
      }
    );

    const expoResult = await expoResponse.json();

    if (!expoResponse.ok) {
      return NextResponse.json(
        {
          error: "Expo rejected the notification request.",
          details: expoResult,
        },
        {
          status: expoResponse.status,
        }
      );
    }

    return NextResponse.json({
      success: true,
      sent: messages.length,
      expo: expoResult,
    });
  } catch (error) {
    console.error("Send push error:", error);

    return NextResponse.json(
      {
        error: "Unable to send notifications.",
      },
      {
        status: 500,
      }
    );
  }
}