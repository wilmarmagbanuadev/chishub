import { useEffect, useState,useRef } from 'react';
import { View,Text,ActivityIndicator,ScrollView,Image,Modal,Dimensions,Pressable,FlatList,TouchableOpacity} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useTimeDate } from '@/hooks/use-time-date';
import { AppButton } from '@/components';
import * as Linking from 'expo-linking';
import { useDirectus } from '@/hooks/use-directus';

interface Alert {
  id: string | number;
  title: string;
  post_text: string;
  posted_at: string;
  source: string;
  date_created: string;
  post_date: string;
  post_url:string;
  source_page:string;
  image_urls:string;
  affected_area:string;
}
const { width, height } = Dimensions.get('window');
export default function AlertDetailsScreen() {
  const [alert, setAlert] = useState<Alert | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useLocalSearchParams<{ id: string }>();
  const publicPosts = useDirectus<Alert>('public_post');
  const formatDate = (dateString: string): string => {
    const date = new Date(`${dateString}T00:00:00`);
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
  };

  const images: string[] = alert?.image_urls
  ? JSON.parse(alert.image_urls)
  : [];

const [imageModalVisible, setImageModalVisible] = useState(false);
const [selectedImageIndex, setSelectedImageIndex] = useState(0);

const modalListRef = useRef<FlatList<string>>(null);

const openImageModal = (index: number) => {
  setSelectedImageIndex(index);
  setImageModalVisible(true);

  setTimeout(() => {
    modalListRef.current?.scrollToIndex({
      index,
      animated: false,
    });
  }, 100);
};



  useEffect(() => {
    if (!id) return;

    const getAlert = async () => {
      try {
        setAlert(await publicPosts.find(id));
      } catch (error) {
        console.error('Alert fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    getAlert();
  }, [id, publicPosts]);
  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!alert) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">Alert not found.</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1 bg-neutral-100 px-3 py-2"
    >
      <ScrollView>
        <View className='flex-1'>
          <Text className='font-extrabold text-[20px]'>{alert.title}</Text>
          <Text className='text-neutral-400 text-[12px] mt-2'>Today, {useTimeDate(alert.date_created)} · {formatDate(alert.post_date)}</Text>
          <View className='rounded-xl bg-white p-4 mt-3'>
              <View className='flex-row gap-2'>
                <FontAwesome name="file-text-o" color="orange" size={20} /> 
                <Text className='font-extrabold text-[15px]'>Details</Text>
              </View>
            <Text className='text-neutral-500 mt-2'>{alert.post_text} </Text>
          </View>
          {
            
            JSON.parse(alert.affected_area).length >=1 && <View className='rounded-xl bg-white p-4 mt-3'>
                <View className='flex-row gap-2'>
                  <FontAwesome name="map-marker" color="orange" size={20} /> 
                  <Text className='font-extrabold text-[15px]'>Affected Areas</Text>
                </View>
                <View className='mt-2 flex-row flex-wrap gap-2'>
                  {
                    JSON.parse(alert.affected_area).map((item:any,index:any)=><Text  key={index}className='text-neutral-500 mt-2 px-4 py-2 bg-neutral-300 text-neutral-700 rounded-full'>{item}</Text>)
                  }
                </View>
                {/* <View className='mt-4'>
                  <Text className='text-neutral-200'>Map of affected areas here</Text>
                </View> */}
            </View>
          }
          {
            JSON.parse(alert.image_urls).length >=1 &&
            <View className='rounded-xl bg-white p-4 mt-3'>
                <View className='flex-row gap-2'>
                  <FontAwesome name="file-image-o" color="orange" size={20} /> 
                  <Text className='font-extrabold text-[15px]'>Image Attachment</Text>
                </View>
                <View className='mt-2 flex-row flex-wrap gap-2'>       
                  {
                    JSON.parse(alert.image_urls).map((item: string, index: number) => (
                      <TouchableOpacity
                        key={`${item}-${index}`}
                        activeOpacity={0.9}
                         className="h-96 w-full"
                        onPress={() => openImageModal(index)}
                      >
                        <Image
                          key={`${item}-${index}`}
                          source={{ uri: item }}
                          className="h-96 w-full"
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                     
                    ))
                  }
                </View>
            </View>
          }
          <View className='rounded-xl bg-white p-4 mt-3'>
              <View className='flex-row gap-1'>
                {/* <FontAwesome name="file-o" color="orange" size={20} />  */}
                <Text className='font-extrabold text-[15px]'>Source</Text>
              </View>
              <View className='flex-row gap-1 justify-between'>
                <View className='flex gap'>
                  <Text className='text-neutral-500 mt-2 font-extrabold'>{alert.source}</Text>
                  <Text className='text-neutral-500 mt-2 font-thin text-[10px]'>{alert.source_page}</Text>
                  {/* <Text className='text-neutral-500 mt-2 font-thin text-[10px]'>{alert.post_url}</Text> */}
                </View>
                <AppButton icon={"external-link-square"} iconColor='white' iconPosition='right' label='Visit' conClass='mt-2 w-20' labelClass='text-white' click={() => Linking.openURL(`${alert.post_url}`)}/>
                {/* <View className='flex-row gap-1 items-center'>
                  <FontAwesome name="check-circle-o" color="green" size={15} /> 
                  <Text className='font-medium text-green-700'>Verified</Text>
                </View> */}
              </View>
          </View>
         
        </View>
      </ScrollView>
      <Modal
          visible={imageModalVisible}
          transparent
          animationType="slide"
          statusBarTranslucent
          onRequestClose={() => setImageModalVisible(false)}
        >
          <View className="flex-1 bg-black">
            <Pressable
              onPress={() => setImageModalVisible(false)}
              className="absolute right-5 top-12 z-10 h-10 w-10 items-center justify-center rounded-full bg-black/60"
            >
              <Text className="text-2xl font-bold text-orange-600">×</Text>
            </Pressable>

            <FlatList
              ref={modalListRef}
              data={images}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              initialScrollIndex={selectedImageIndex}
              keyExtractor={(item, index) => `${item}-${index}`}
              getItemLayout={(_, index) => ({
                length: width,
                offset: width * index,
                index,
              })}
              onMomentumScrollEnd={(event) => {
                const index = Math.round(
                  event.nativeEvent.contentOffset.x / width
                );

                setSelectedImageIndex(index);
              }}
              renderItem={({ item }) => (
                <View
                  style={{
                    width,
                    height,
                  }}
                  className="items-center justify-center"
                >
                  <Image
                    source={{ uri: item }}
                    style={{
                      width,
                      height: height * 0.85,
                    }}
                    resizeMode="contain"
                  />
                </View>
              )}
            />

            <View className="absolute bottom-10 w-full items-center">
              <Text className="text-base text-orange-400">
                {selectedImageIndex + 1} / {images.length}
              </Text>
            </View>
          </View>
        </Modal>
    </SafeAreaView>
   
  );
}
