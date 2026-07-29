import {Text,TouchableOpacity,View} from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome';
interface ButtonFieldProps {
  label?: string;
  conClass?: string;
  labelClass?: string;
  click?:() => void;
  icon?:any,
  iconColor?:string,
  iconPosition?:string,
}

export function AppButton(
    {
    label,
    conClass,
    labelClass,
    click,
    icon,
    iconColor,
    iconPosition='left'
  }: ButtonFieldProps) {
  
  return ( <>
      <TouchableOpacity className={`${label && "rounded-lg border border-orange-400 bg-orange-400 px-4 py-3" } text-black ${
        conClass ?? ''
      }`} onPress={click}>
          <View className={`flex items-center justify-center ${iconPosition=='right' ?'flex-row-reverse':'flex-row' } gap-2`}>
            {icon && <FontAwesome name={icon} color={iconColor} size={20} />}
            <Text className={`text-center  ${ labelClass ?? '' }`}>{label}</Text>
          </View>
         
      </TouchableOpacity>
  </>
    
    
  );
}