import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { FontAwesome } from "@react-native-vector-icons/fontawesome";

interface ButtonFieldProps extends TouchableOpacityProps {
  label?: string;
  conClass?: string;
  labelClass?: string;
  click?: () => void;
  icon?: any;
  iconColor?: string;
  iconPosition?: "left" | "right";
}

export function AppButton({
  label,
  conClass,
  labelClass,
  click,
  icon,
  iconColor = "white",
  iconPosition = "left",
  disabled = false,
  ...props
}: ButtonFieldProps) {
  return (
    <TouchableOpacity
      {...props}
      onPress={click}
      disabled={disabled}
      activeOpacity={0.7}
      className={`
        rounded-lg border border-orange-400 px-4 py-3
        ${disabled ? "bg-orange-300 opacity-60" : "bg-orange-400"}
        ${conClass ?? ""}
      `}
    >
      <View
        className={`
          flex items-center justify-center gap-2
          ${iconPosition === "right" ? "flex-row-reverse" : "flex-row"}
        `}
      >
        {icon ? (
          <FontAwesome
            name={icon}
            color={iconColor}
            size={20}
          />
        ) : null}

        {label ? (
          <Text className={`text-center ${labelClass ?? ""}`}>
            {label}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}