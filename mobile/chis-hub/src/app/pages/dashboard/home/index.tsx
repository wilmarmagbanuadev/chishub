import { Text } from 'react-native';
import { View,ScrollView, Image, TouchableOpacity, Modal} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import ImageView from 'react-native-image-viewing';
import * as Linking from 'expo-linking';
import { AppButton } from '@/components';
export default function HomeScreen() {
const [vpso, setvpso] = useState({ name: 'Visayas', margin: null, capacity: null, demand: null,date:null });//Visayas Power Situation Outlook
const [mld, setmld] = useState({ src: null, page: null, url: null,img:null });
 const [visible, setIsVisible] = useState(false);
  const imageUrl = 'https://scontent.filo3-1.fna.fbcdn.net/v/t39.99422-6/787368117_1540047077348553_5629124941031080065_n.png?stp=dst-jpg_tt6&cstp=mx1350x1080&ctp=s640x640&_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHtMNi5dHef827iqOD5ojqUBcHC0bHw6UsFwcLRsfDpS_rbdY8V_YTXtJ5WFzUvNTzNREN0KceFEvytwYoxt7dl&_nc_ohc=CLgzo9JL7isQ7kNvwFntZxI&_nc_oc=AdpW73V0YOANlVOnVgZe85xFvHxLNZpLZbGtiNw8B9oKAYVNnjZpZmJWku75YoBKkBM&_nc_zt=14&_nc_ht=scontent.filo3-1.fna&_nc_gid=wJcZVHogCF65T1pMrS-Zfg&_nc_ss=7b2a8&oh=00_AQFO-A4BMGFVUYi9142oagoRbz6lyRXSqkZxkpoMW_N6vA&oe=6A96F00E'
  const checkvpso = async() =>{
        const vpsoResponse = await fetch(`https://www.ngcp.ph/Home/PowerOutlookDailyAsync`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            }
          }
        );
      
        const vpsoResponseData = await vpsoResponse.json();
        console.log(vpsoResponseData)
        const rawDateStr = vpsoResponseData.ReportDate;
    // 1. Extract the numeric timestamp using Regex
      const timestamp = parseInt(rawDateStr.match(/\d+/)[0], 10);
      const date = new Date(timestamp);

      // 2. Format the date to "6:00 AM, Friday, August 28, 2026"
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(date);
        setvpso(
          { name: 'Visayas', margin: vpsoResponseData.VisayasReserve, capacity:vpsoResponseData.VisayasCapacity, demand: vpsoResponseData.VisayasPeak,date:formattedDate}
        )
  }
  const checkmld = async() =>{
       const directus = process.env.EXPO_PUBLIC_DIRECTUS_API_URL;
       const today = new Date().toISOString().split("T")[0];
        const mldResponse = await fetch(`${directus}/items/public_post?filter[source][_eq]=Negros%20Power&filter[post_date][_eq]=${today}&filter[is_mld][_nnull]=true&limit=1`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
          }
        );
      
        const mldResponseData = await mldResponse.json();
        console.log(JSON.parse(mldResponseData.data[0].image_urls)[0])
        setmld({
          src: mldResponseData.data[0].source, page: mldResponseData.data[0].source_page, url:  mldResponseData.data[0].post_url,img:JSON.parse(mldResponseData.data[0].image_urls)[0]
        })
  }
  useEffect(()=>{
    checkvpso()
    checkmld()
  },[])
  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1 bg-white"
    >
    <View className='flex-1 items-center justify-center p-3 bg-neutral-100'>
      <View className="bg-white  p-4  rounded-xl shadow-sm  m-4 w-full">
        {/* Header */}
        <View className="mb-3">
          <Text className="text-lg font-bold text-orange-600">Visayas Power Situation Outlook</Text>
          <Text className="text-xs text-gray-500">As of {vpso.date}</Text>
        </View>

        {/* Highlighted Primary Metric: Operating Margin */}
        <View className="bg-emerald-50 border-l-4 border-emerald-500 p-3 rounded-r-lg mb-3">
          <Text className="text-xs font-semibold uppercase text-emerald-800">
            Operating Margin
          </Text>
          <View className="flex-row items-baseline">
            <Text className="text-2xl font-extrabold text-emerald-700">{vpso.margin}</Text>
            <Text className="text-xs font-bold text-emerald-700 ml-1">MW</Text>
          </View>
        </View>

        {/* Metric Breakdown Rows */}
        <View className="space-y-2">
          <View className="flex-row justify-between py-2 border-b border-gray-100">
            <Text className="text-sm text-gray-600">Available Capacity</Text>
            <Text className="text-sm font-semibold text-gray-900">{vpso.capacity} MW</Text>
          </View>

          <View className="flex-row justify-between py-2 border-b border-gray-100">
            <Text className="text-sm text-gray-600">System Peak Demand</Text>
            <Text className="text-sm font-semibold text-gray-900">{vpso.demand} MW</Text>
          </View>
        </View>

        {/* Footer Disclaimer */}
        <Text className="text-[10px] text-gray-400 italic mt-3">
          Note: Demand is based on 12 noon Day Ahead Projection of WESM.
        </Text>
      </View>
      <View className="bg-white p-4 rounded-xl shadow-sm  mt-2 w-full">
        <View className="mb-3">
          <Text className="text-lg font-bold text-orange-600"> ⚡ Emergency Advisory</Text>
          <Text className="text-xs text-gray-500">Manual Load Dropping Notice</Text>
        </View>

       <View className="rounded-xl  shadow-lg mb-4">
        <TouchableOpacity 
          activeOpacity={0.85}
          onPress={() => setIsVisible(true)}
          className="rounded-xl "
        >
          <Image
            source={{
              uri: mld.img,
            }}
            className="w-full h-80"
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View className='rounded-xl bg-white p-4 mt-0'>
              <View className='flex-row gap-1'>
                {/* <FontAwesome name="file-o" color="orange" size={20} />  */}
                <Text className='font-extrabold text-[15px]'>Source</Text>
              </View>
              <View className='flex-row gap-1 justify-between'>
                <View className='flex gap'>
                  <Text className='text-neutral-500 mt-1 font-extrabold'>{mld.src}</Text>
                  <Text className='text-neutral-500 mt-1 font-thin text-[10px]'>{mld.page}</Text>
                  {/* <Text className='text-neutral-500 mt-2 font-thin text-[10px]'>{alert.post_url}</Text> */}
                </View>
                <AppButton icon={"external-link-square"} iconColor='white' iconPosition='right' label='Visit' conClass='mt-2 w-20' labelClass='text-white' click={() => Linking.openURL(`${mld.url}`)}/>
                {/* <View className='flex-row gap-1 items-center'>
                  <FontAwesome name="check-circle-o" color="green" size={15} /> 
                  <Text className='font-medium text-green-700'>Verified</Text>
                </View> */}
              </View>
          </View>
      </View>
      <ImageView
        images={[{ uri: mld.img }]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
      </View>
    </View>
    </SafeAreaView>
   
  );
}
