import { Text, View } from 'react-native'
import { AppButton } from '@/components';
import { router } from 'expo-router';
import { useAuthState } from '@/utils/authState';
import { SafeAreaView } from "react-native-safe-area-context";
export default function ProfileScreen () {
  const logout = useAuthState((state) => state.logout);
  
    const handleLogout = () => {
      logout();
      router.replace('/pages/onboarding/sign-in');
    };
    return (
       <SafeAreaView
          edges={["top"]}
          className="flex-1 bg-white"
        >
        <View className='flex p-1'>
          <AppButton label="Log Out" conClass="my-2 bg-red-200 border-red-200" labelClass="my-2 text-red-400" click={handleLogout} icon='sign-out' iconColor='red'/>
        </View>
      </SafeAreaView>
    )
}