import { Text, View, Image, Alert } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { useAuthState } from "@/utils/authState";
import { AppTextField, AppHr, AppButton } from "@/components";
import { registerForPushNotificationsAsync } from "@/utils/register-push-notifications";
import logoTextLight from "@/assets/images/logo_text_light.png";
import { Platform } from 'react-native';
type LoginResponse = {
  authToken:{
    accessToken: string;
    refreshToken:string;
  }
  user: {
    id: string;
    email: string;
    firstName:string;
    lastName:string;
  };
};

export default function SignInScreen() {
  const login = useAuthState((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    if (isLoggingIn) return;

    try {
      setIsLoggingIn(true);

      // Replace this with your real login API request.
      const authData = await loginUser(email, password);
      // Save authentication state first.
      console.log(authData)
      //   login(authData.authToken.accessToken,authData.user.email);

      try {
        const pushToken = await registerForPushNotificationsAsync();
        login(pushToken,authData);
        console.log('pushToken',pushToken)
        if (pushToken) {
       
          await savePushToken(pushToken,Platform.OS);
        }
      } catch (pushError) {
        // Push registration failure should normally not block login.
        console.error("Push registration failed:", pushError);
      }

      router.replace("/pages/dashboard/home");
    } catch (error) {
      console.error("Login failed:", error);

      Alert.alert(
        "Sign-in failed",
        error instanceof Error
          ? error.message
          : "Please check your credentials and try again."
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image
        source={logoTextLight}
        className="h-20 w-80"
        resizeMode="cover"
      />

      <AppTextField
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <AppTextField
        label="Password"
        value={password}
        onChangeText={setPassword}
        isPass
      />

      <AppButton
        label={isLoggingIn ? "Signing In..." : "Sign In"}
        conClass="my-6 w-96"
        labelClass="my-2 text-white"
        click={handleLogin}
        icon="sign-in"
        iconColor="white"
        disabled={isLoggingIn}
      />

      {/* <Text className="mb-2 w-96 text-center leading-6 text-neutral-400">
        Don&apos;t have an account?
        <Text
          className="underline"
          onPress={() => Alert.alert("Sign Up Account")}
        >
          {" "}
          Sign Up
        </Text>
      </Text> */}

      {/* <AppHr label="Or" />

      <View className="flex-row justify-center gap-5">
        <AppButton
          conClass="my-6"
          click={() => Alert.alert("Log In Using Gmail")}
          icon="google"
          iconColor="red"
        />

        <AppButton
          conClass="my-6"
          click={() => Alert.alert("Log In Using Facebook")}
          icon="facebook-f"
          iconColor="blue"
        />
      </View> */}

      {/* <Text className="my-10 w-96 text-center leading-6 text-neutral-400">
        By continuing, you agree to our{" "}
        <Text className="text-blue-400 underline">Terms of Service</Text> and{" "}
        <Text className="text-blue-400 underline">Privacy Policy</Text>.
      </Text> */}
    </View>
  );
}

async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  const AuthResponse = await fetch(
    `${process.env.EXPO_PUBLIC_DIRECTUS_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );
 
  const AuthResponseData = await AuthResponse.json();
  if (!AuthResponse.ok) {
    throw new Error(AuthResponse?.message ?? "Invalid email or password.");
  }
  const AuthUser = await fetch(
    `${process.env.EXPO_PUBLIC_DIRECTUS_API_URL}/users/me`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         Authorization: `Bearer ${AuthResponseData.data.access_token}`,
      },

    }
  );
  if (!AuthUser.ok) {
    throw new Error(
      AuthUserData?.errors?.[0]?.message ??
        "Failed to get authenticated user."
    );
  }
  const AuthUserData = await AuthUser.json();
  return {
    authToken:{
      accessToken: AuthResponseData.data.access_token,
      refreshToken:AuthResponseData.data.refresh_token,
    },
    user: {
      id: AuthUserData.data.id,
      email:email,
      firstName:AuthUserData.data.first_name,
      lastName:AuthUserData.data.last_name
    }
  };
}


async function savePushToken(token: string,platform:string): Promise<void> {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/api/push/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({
          token,
          platform: platform,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Registration failed: ${response.status}`);
    }
  } catch (error) {
    console.error("Could not save push token:", error);
  }
}