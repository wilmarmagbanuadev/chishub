import { useTimeDate } from '@/hooks/use-time-date';
import {Text,TouchableOpacity,View} from 'react-native';
import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import { router } from 'expo-router';
interface PostItem {
  title: string;
  post_text: string;
  date_created: string;
  source: string;
  id:string
}


export function AppAlertCard(
    {
    title,
    post_text,
    date_created,
    source,
    id
  }: PostItem) {
  

  return ( <TouchableOpacity 
    onPress={()=> {
      router.push({
        pathname: '/pages/dashboard/alert/[id]',
        params: {
          id: String(id),
        },
      });
    }
  }>
    <View className='flex w-full p-4 gap-1 rounded-xl shadow-sm bg-white my-2' >
      <View className='flex-row justify-between flex'>
        <View className='flex-row gap-2 flex-1 items-center'>
          <View  className={`h-8 w-8 items-center justify-center rounded-full ${
                source === 'PAGASA DOST'
                  ? 'bg-blue-500'
                  : source === 'Negros Power'
                    ? 'bg-red-500'
                    : source === 'Murcia Water District'
                      ? 'bg-cyan-500'
                      : 'bg-gray-500'
              }`}>
            <FontAwesome name={
                    source === 'PAGASA DOST'
                      ? 'cloud'
                      : source === 'Negros Power'
                        ? 'bolt'
                        : source === 'Murcia Water District'
                          ? 'tint'
                          : 'bell'
                  } color="#FFF" size={18} />
          </View>
          <Text className='text-neutral-400 uppercase flex-1'>{source === 'PAGASA DOST'
                      ? 'Weather'
                      : source === 'Negros Power'
                        ? 'Power'
                        : source === 'Murcia Water District'
                          ? 'Water'
                          : 'Advisory'} Alert</Text>
        </View>
        {/* <Text className='bg-red-100 text-red-700 px-3 py-2 rounded-xl'>Ongoing</Text> */}
      </View>
      <Text className='text-black font-extrabold text-[16px] mt-2'>{title}</Text>
      <Text numberOfLines={3} className='text-neutral-400 font-medium'>{post_text}</Text>
      <View  className='flex-row justify-between gap-2 mt-2'>
        <View className='flex-row gap-1 items-center'>
          <FontAwesome name="clock-o" color="grey" size={11} /> 
          <Text className='text-neutral-400 text-[11px]'>Today, {useTimeDate(date_created)}</Text>
        </View>
      <Text className='text-neutral-400 text-[11px]'>{source}</Text>
      {/* <View className='flex-row gap-1 items-center'>
          <FontAwesome name="clock-o" color="grey" size={11} /> 
          <Text className='text-neutral-400 text-[11px]'>Murcia, Negros Occidental</Text>
      </View> */}
      </View>
    </View>
      
    </TouchableOpacity>
    
    
  );
}