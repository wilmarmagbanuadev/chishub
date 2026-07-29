import { TextInput, TextInputProps,Text,View } from 'react-native';

interface TextFieldProps {
  label: string;
  isPass?: boolean;
}

export function AppTextField({label,isPass=false}:TextFieldProps) {
    
  return (
    <View className='flex my-1'>
        {
          label &&   <Text className='my-3 font-light'>{label}:</Text>
        }
        <TextInput
        secureTextEntry={isPass}
        className="rounded-lg border border-gray-300 px-4 py-3 w-96  text-neutral-400"
        />
    </View>
    
  );
}