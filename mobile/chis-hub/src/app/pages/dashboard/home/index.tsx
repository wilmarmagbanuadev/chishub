import { Text } from 'react-native';
import { View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
export default function HomeScreen() {
  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1 bg-white"
    >
    <View className='flex-1 items-center justify-center'>
      <Text>Home</Text>
    </View>
    </SafeAreaView>
   
  );
}