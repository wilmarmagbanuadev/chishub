import { Text,ActivityIndicator, FlatList,View, TouchableOpacity,ScrollView } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import {AppAlertCard} from '@/components';
import { useCallback, useEffect, useState } from 'react';
import { useDirectus } from '@/hooks/use-directus';

interface AlertListItem {
  id: string | number;
  title: string;
  post_text: string;
  date_created: string;
  source: string;
  post_date: string;
}

export default function AlertScreen () {
   const [isLoading, setLoading] = useState(true);
   const [data, setData] = useState<AlertListItem[]>([]);
   const [selectedSource, setSelectedSource] = useState('');
   const publicPosts = useDirectus<AlertListItem>('public_post');
   const alertsConf= [
    {
      label:"All",
      source:"",
      is_active:true,
    },
    {
      label:"Power",
      source:"Negros Power",
      is_active:false,
    },
    {
      label:"Water",
      source:"Murcia Water District",
      is_active:false,
    },
    {
      label:"Weather",
      source:"PAGASA DOST",
      is_active:false,
    },
   ]
 const getAlerts = useCallback(async (source = '') => {
    try {
      setLoading(true);

      const today = new Date().toLocaleDateString('en-CA', {
        timeZone: 'Asia/Manila',
      });

      let query = publicPosts
        .select('title', 'post_text', 'date_created', 'source', 'id', 'post_date')
        .where('post_date', today)
        .orderBy('date_created', 'desc')
        .limit(-1);

      if (source) query = query.where('source', source);

      setData(await query.get());
    } catch (error) {
      console.error('Error fetching alerts:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [publicPosts]);

  useEffect(() => {
    void getAlerts(selectedSource);
  }, [getAlerts, selectedSource]);
    return (
     <SafeAreaView
           edges={["top"]}
           className="flex-1 bg-neutral-100"
         >
          <ScrollView
              horizontal
              className="shrink-0 max-h-14 bg-white"
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="items-center gap-2 px-2"
            >
              {alertsConf.map((item) => {
                const isActive = selectedSource === item.source;

                return (
                  <TouchableOpacity
                    key={item.label}
                    onPress={() => setSelectedSource(item.source)}
                    className={`rounded-full px-4 py-2 ${
                      isActive ? 'bg-orange-600' : 'bg-neutral-200'
                    }`}
                  >
                    <Text
                      className={`font-semibold ${
                        isActive ? 'text-white' : 'text-neutral-500'
                      }`}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <View className="flex-1">
              {isLoading ? (
                <View className='flex-1 justify-center'>
                  <ActivityIndicator size="large" />
                </View>
                
              ) : (
              
                <FlatList
                  className='px-3 flex'
                  data={data}
                  keyExtractor={({ id }) => String(id)}
                  renderItem={({ item }) => (  <AppAlertCard title={item.title} post_text={item.post_text} date_created={item.date_created} source={item.source} id={String(item.id)}/>
                  )}
                />
              
            )}
           </View>
         </SafeAreaView>
    )
}
