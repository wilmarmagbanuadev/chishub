import { Redirect } from 'expo-router';
import { useAuthState } from '@/utils/authState';

export default function Index() {
  const isLoggedIn = useAuthState((state) => state.isLoggedIn);

  return (
    <Redirect
      href={
        isLoggedIn
          ? '/pages/dashboard/home'
          : '/pages/onboarding/sign-in'
      }
    />
  );
}