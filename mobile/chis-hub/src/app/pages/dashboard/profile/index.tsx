import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { AppButton } from '@/components';
import { router } from 'expo-router';
import { useAuthState } from '@/utils/authState';
import { SafeAreaView } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";
export default function ProfileScreen () {
  // const logout = useAuthState((state) => state.logout);
   const { pushToken, logout, setPushToken,userInfo } = useAuthState.getState();
  //  const [userInfo, setuserInfo] = useState({
  //   name: 'Juan Dela Cruz',
  //   email: 'juan.delacruz@example.com',
  //   role: 'Grid Operations Engineer',
  //   avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256',
  // })
  //  const user = {
  //   name: 'Juan Dela Cruz',
  //   email: 'juan.delacruz@example.com',
  //   role: 'Grid Operations Engineer',
  //   avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256',
  // };
  async function handleLogout() {
    console.log('Logging out...');

   

    try {
      // 1. Unregister push token from backend
      if (pushToken) {
        await unregisterPushToken(pushToken);
      }

      // 2. Clear any active notifications sitting in the device tray
      await Notifications.dismissAllNotificationsAsync();
    } catch (error) {
      console.error("Logout cleanup failed:", error);
    } finally {
      // 3. Clear local store state regardless of network/API errors
      setPushToken(null);
      logout();

      // 4. Navigate user out
      router.replace("/pages/onboarding/sign-in");
    }
  }

    async function unregisterPushToken(token: string) {
      console.log("token",token)
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error("EXPO_PUBLIC_API_URL is missing.");
      }

      const response = await fetch(
        `${apiUrl}/api/push/unregister`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ?? "Unable to unregister push token."
        );
      }

      return result;
    }
    return (
      <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5 pt-6">
        
        {/* Header Title */}
        <Text className="text-2xl font-black text-slate-900 mb-6">
          Profile
        </Text>

        {/* Profile Card */}
        <View className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm items-center mb-6">
          {/* Avatar with Status Ring */}
          <View className="relative mb-4">
            <Image
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsGXR3iY1SAfEHCBZawUvB_M9Tcd0IXHAnestyaRWMUQ&s=10' }}
              className="w-24 h-24 rounded-full border-4 border-[#FF6B00]/20"
            />
            <View className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
          </View>

          {/* User Name & Email */}
          <Text className="text-xl font-bold text-slate-900 mb-1">
            {userInfo.user.firstName} {userInfo.user.lastName}
          </Text>
          <Text className="text-sm text-slate-500 font-medium">
            {userInfo.user.email}
          </Text>
        </View>

        {/* Information Section */}
        <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">
          Account Details
        </Text>

        <View className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-6">
          {/* Full Name Row */}
          <View className="flex-row justify-between items-center p-4 border-b border-slate-100">
            <Text className="text-sm font-medium text-slate-500">Full Name</Text>
            <Text className="text-sm font-bold text-slate-900"> {userInfo.user.firstName} {userInfo.user.lastName}</Text>
          </View>

          {/* Email Row */}
          <View className="flex-row justify-between items-center p-4">
            <Text className="text-sm font-medium text-slate-500">Email Address</Text>
            <Text className="text-sm font-bold text-slate-900">{userInfo.user.email}</Text>
          </View>
        </View>
        {/* Action Buttons */}
        <View className="space-y-3 mb-8">
          {/* Edit Profile (Primary Orange Action) */}
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={async()=>{
              await handleLogout()
            }}
            className="bg-[#FF6B00] rounded-2xl py-4 items-center shadow-sm active:bg-[#e05e00]"
          >
            <Text className="text-base font-bold text-white">
               Sign out
            </Text>
          </TouchableOpacity>

          {/* Sign Out (Secondary Outline Button) */}
          {/* <TouchableOpacity 
            activeOpacity={0.8}
            className="bg-white border border-slate-200 rounded-2xl py-4 items-center active:bg-slate-50 mt-2"
          >
            <Text className="text-base font-bold text-slate-900">
              Sign out
            </Text>
          </TouchableOpacity> */}
        </View>

      </ScrollView>
    </SafeAreaView>
      //  <SafeAreaView
      //     edges={["top"]}
      //     className="flex-1 bg-white p-2"
      //   >
      //   <View className='flex p-1'>
      //     <AppButton label='Log out' conClass="my-2 bg-red-100 border-red-200" labelClass="my-2 text-red-400" click={async () => {await handleLogout();}} icon='sign-out' iconColor='red'/>
      //       <Text>{JSON.stringify(userInfo)}</Text>
      //   </View>
      // </SafeAreaView>
    )
}