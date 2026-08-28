import {
  TextInput,
  TextInputProps,
  Text,
  View,
} from "react-native";

interface TextFieldProps extends TextInputProps {
  label?: string;
  isPass?: boolean;
}

export function AppTextField({
  label,
  isPass = false,
  className,
  ...props
}: TextFieldProps) {
  return (
    <View className="flex w-96 my-1">
      {label ? (
        <Text className="my-3 font-light text-neutral-700">
          {label}:
        </Text>
      ) : null}

      <TextInput
        {...props}
        secureTextEntry={isPass}
        placeholderTextColor="#a3a3a3"
        className={`rounded-lg border border-gray-300 w-full px-4 py-3 text-black ${
          className ?? ""
        }`}
      />
    </View>
  );
}