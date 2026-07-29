import { Text,ActivityIndicator, FlatList,View, TouchableOpacity,ScrollView } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import {AppAlertCard} from '@/components';
import { useState, useEffect,useMemo } from 'react';
export default function AlertScreen () {
   const [isLoading, setLoading] = useState(true);
   const [data, setData] = useState([]);
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
 const getAlerts = async (source = '') => {
    try {
      setLoading(true);

      const today = new Date().toLocaleDateString('en-CA', {
        timeZone: 'Asia/Manila',
      });

      const params = new URLSearchParams({
        limit: '-1',
        'filter[post_date][_eq]': today,
        sort: '-date_created',
        fields: 'title,post_text,date_created,source,id,post_date',
      });

      // Add source filter only when not "All"
      if (source) {
        params.append('filter[source][_eq]', source);
      }

      const response = await fetch(
        `https://directus.chishub.com/items/public_post?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch alerts: ${response.status}`);
      }

      const json = await response.json();
      setData(json.data ?? []);
    } catch (error) {
      console.error('Error fetching alerts:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };
   const [selectedSource, setSelectedSource] = useState('');

  const filteredData = useMemo(() => {
    if (!selectedSource) {
      return data;
    }

    return data.filter((item) => item.source === selectedSource);
  }, [data, selectedSource]);
  useEffect(() => {
    getAlerts();
  }, []);
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
                    onPress={() => {
                      setSelectedSource(item.source);
                      getAlerts(item.source);
                    }}
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
                  keyExtractor={({ id }) => id}
                  renderItem={({ item }) => (  <AppAlertCard title={item.title} post_text={item.post_text} date_created={item.date_created} source={item.source} id={item.id}/>
                  )}
                />
              
            )}
           </View>
         </SafeAreaView>
    )
}