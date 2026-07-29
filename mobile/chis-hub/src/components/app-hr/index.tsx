import { TextInputProps,Text,View } from 'react-native';

interface InputFieldProps extends TextInputProps {
  label?: string;
}

export function AppHr({label}:InputFieldProps) {
    
  return (
    <View className='flex my-2 flex-row'>
        {
            label && <View className='flex flex-row items-center justify-center'>
              <Text className='h-1 w-40 bg-neutral-300'></Text>
              <Text className='font-light mx-2 font-extrabold uppercase text-neutral-400'>{label}</Text>
              <Text className='h-1 w-40 bg-neutral-300'></Text>
            </View>
        }
    </View>
    
  );
}