import { Tabs } from 'expo-router';
import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function DashboardLayout() {
    const insets = useSafeAreaInsets();
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