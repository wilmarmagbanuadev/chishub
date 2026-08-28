import { Tabs } from 'expo-router';
import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Notifications from 'expo-notifications';
import { useEffect } from "react";
import { Stack,router } from 'expo-router';

import { registerForPushNotificationsAsync } from "@/utils/register-push-notifications";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
export default function DashboardLayout() {
  const insets = useSafeAreaInsets();
  useEffect(() => {
      let receivedSubscription:
        | Notifications.EventSubscription
        | undefined;
  
      let responseSubscription:
        | Notifications.EventSubscription
        | undefined;
  
      async function configureNotifications() {
        try {
          const token = await registerForPushNotificationsAsync();
  
          if (token) {
            console.log("Expo Push Token:", token);
  
            // Save the token to your backend here.
            await savePushToken(token);
          }
        } catch (error) {
          console.error("Push registration failed:", error);
        }
      }
  
      configureNotifications();
  
      receivedSubscription =
        Notifications.addNotificationReceivedListener((notification) => {
          console.log("Notification received:", notification);
        });
  
      responseSubscription =
        Notifications.addNotificationResponseReceivedListener((response) => {
          const data = response.notification.request.content.data;
  
          console.log("Notification opened:", data);
  
          if (typeof data.alertId === "string") {
            router.push({
              pathname: "/pages/dashboard/alert/[id]",
              params: {
                id: data.alertId,
              },
            });
          }
        });
  
      return () => {
        receivedSubscription?.remove();
        responseSubscription?.remove();
      };
    }, []);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ff6900',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingTop: 6,
          paddingBottom: Math.max(insets.bottom, 8),
        },

        tabBarLabelStyle: {
          marginBottom: 2,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome
              name={focused ? 'home' : 'home'}
              size={size}
              color={color}
            />
            
          ),
        }}
      />

      <Tabs.Screen
        name="alert"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome
              name={focused ? 'warning' : 'warning'}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome
              name={focused ? 'user' : 'user-o'}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Hide dashboard/index.tsx from the tab bar */}
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="alert/[id]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
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