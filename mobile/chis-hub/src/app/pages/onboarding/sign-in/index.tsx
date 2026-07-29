import { Pressable,Text, View,Image } from 'react-native';
import { router } from 'expo-router';
import { useAuthState } from '@/utils/authState';
import { AppTextField,AppHr,AppButton } from '@/components';
import logoTextLight from '@/assets/images/logo_text_light.png';
export default function SignInScreen() {
  const login = useAuthState((state) => state.login);
  
  const handleLogin = () => {
    // Validate username and password here first.

    login();
    router.replace('/pages/dashboard/home');
  };

  return (
      <View className="flex-1 items-center justify-center bg-white">
        {/* <Text className="text-xl font-bold text-black-500 w-96 capitalize text-center">
          Sign in
        </Text> */}
        <Image source={logoTextLight} className="h-20 w-80" resizeMode="cover"/>
        <AppTextField label= "Email"/>
        <AppTextField label= "Password" isPass={true}/>
        <AppButton label="Sign In" conClass="my-6 w-96" labelClass="my-2 text-white" click={handleLogin} icon='sign-in' iconColor='white'/>
        <Text className='w-96 text-center mb-2 leading-6 text-neutral-400'> Don't have an account?<Text className='underline' onPress={()=>{alert("Sign Up Account")}}> Sign Up</Text></Text>
        <AppHr label= "Or" />
        <View className='flex flex-row justify-center gap-5'>
          <AppButton conClass="my-6"  click={()=>{alert("Log In Using Gmail")}} icon='google' iconColor='red'/>
          <AppButton conClass="my-6"  click={()=>{alert("Log In Using Facebook")}} icon='facebook-f' iconColor='blue'/>
        </View>
        <Text className='w-96 text-center my-10 leading-6 text-neutral-400'>By continuing, you agree to our <Text className='text-blue-400 underline'>Terms of Services</Text> and <Text className='text-blue-400 underline'>Private Policy</Text>.</Text>
      </View>
  );
}