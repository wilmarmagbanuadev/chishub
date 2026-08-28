import { NextRequest, NextResponse } from "next/server";

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

export async function POST(request: NextRequest) {
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
    console.log("Token:", body.token);
    console.log("Encoded token:", encodeURIComponent(body.token));
    try {
       const existingResponse = await fetch(
        `${DIRECTUS_URL}/items/push_tokens?filter[token][_eq]=${encodeURIComponent(
          body.token
        )}&limit=1&fields=id,token,active`,
        {
          headers: {
            Authorization: `Bearer ${DIRECTUS_TOKEN}`,
          },
          cache: "no-store",
        }
      );
    } catch (error) {
      console.log(error)
    }
    const existingResponse = await fetch(
      `${DIRECTUS_URL}/items/push_tokens?filter[token][_eq]=${encodeURIComponent(
        body.token
      )}&limit=1&fields=id,token,active`,
      {
        headers: {
          Authorization: `Bearer ${DIRECTUS_TOKEN}`,
        },
        cache: "no-store",
      }
    );

    if (!existingResponse.ok) {
      const errorText = await existingResponse.text();

      throw new Error(
        `Directus lookup failed: ${existingResponse.status} ${errorText}`
      );
    }

    const existingResult = await existingResponse.json();
    const existingToken = existingResult.data?.[0];

    // The token is already effectively unregistered.
    if (!existingToken) {
      return NextResponse.json({
        success: true,
        existing: false,
        message: "Push token was not registered.",
      });
    }

    const updateResponse = await fetch(
      `${DIRECTUS_URL}/items/push_tokens/${existingToken.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${DIRECTUS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          active: false,
        }),
        cache: "no-store",
      }
    );

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();

      throw new Error(
        `Directus update failed: ${updateResponse.status} ${errorText}`
      );
    }

    return NextResponse.json({
      success: true,
      existing: true,
      message: "Push token was deactivated.",
    });
  } catch (error) {
    console.error("Unregister push token error:", error);

    return NextResponse.json(
      {
        error: "Unable to unregister the push token.",
      },
      {
        status: 500,
      }
    );
  }
}