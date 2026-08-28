import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Constants from "expo-constants";
import * as Notifications from "expo-notifications";

export async function registerForPushNotificationsAsync(): Promise<
  string | null
> {
  // Android notification channel must be created before requesting the token.
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Default notifications",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#2563eb",
    });
  }

  if (!Device.isDevice) {
    console.warn(
      "A physical device or supported emulator is required for push notifications."
    );

    return null;
  }

  const currentPermissions = await Notifications.getPermissionsAsync();

  let finalStatus = currentPermissions.status;

  if (currentPermissions.status !== "granted") {
    const requestedPermissions =
      await Notifications.requestPermissionsAsync();

    finalStatus = requestedPermissions.status;
  }

  if (finalStatus !== "granted") {
    console.warn("Notification permission was not granted.");
    return null;
  }

  const projectId =
    Constants.default.expoConfig?.extra?.eas?.projectId ??
    Constants.default.easConfig?.projectId;

  if (!projectId) {
    throw new Error(
      "Expo project ID is missing. Run `eas init` and check app.json."
    );
  }

  const result = await Notifications.getExpoPushTokenAsync({
    projectId,
  });

  return result.data;
}