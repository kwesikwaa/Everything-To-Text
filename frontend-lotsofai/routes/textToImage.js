import { View, Text,Image, FlatList, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React,{useRef} from 'react'
import { useSignal } from '@preact/signals-react';
import { todalle } from '../api/openaicall';

export const aigenimages = useSignal([
    {'prompt':'something dey here','key':1,'image':''},
    {'prompt':'so adey go some','key':2,'image':''},
    {'prompt':'you see say we dey form','key':3,'image':''},
    {'prompt':'a3 for life chale','key':4,'image':''},        
    {'prompt':'something dey here','key':5,'image':''},
    {'prompt':'so adey go some','key':6,'image':''},
    {'prompt':'you see say we dey form','key':7,'image':''},
    {'prompt':'a3 for life chale','key':8,'image':''}, 
    {'prompt':'something dey here','key':9,'image':''},
    {'prompt':'so adey go some','key':10,'image':''},
    {'prompt':'you see say we dey form','key':11,'image':''},
    {'prompt':'a3 for life chale','key':12,'image':''}, 
    {'prompt':'something dey here','key':13,'image':''},
    {'prompt':'so adey go some','key':14,'image':''},
    {'prompt':'you see say we dey form','key':15,'image':''},
    {'prompt':'a3 for life chale','key':16,'image':''}, 
    {'prompt':'something dey here','key':17,'image':''},
     {'prompt':'so adey go some','key':18,'image':''},
    {'prompt':'you see say we dey form','key':19,'image':''},
    {'prompt':'a3 for life chale','key':20,'image':''},
    {'prompt':'something dey here','key':21,'image':''},
    {'prompt':'so adey go some','key':22,'image':''},
    {'prompt':'you see say we dey form','key':23,'image':''},
    {'prompt':'a3 for life chale','key':24,'image':''},  
]);

export default function TextToImage() {

    

    const flviewRef = useRef()
    const message = useSignal('')

    const send =()=>{
        if(message.value.trim().length>0){
            Keyboard.dismiss()
            aigenimages.value.push({'prompt':message.value,'key':aigenimages.value.length+1,'images':''})
            
            todalle(message.value,aigenimages.value.length-1)
            
            message.value=''
            scrollup()   
        }   
    }

    const scrollup =()=>{
        setTimeout(()=>flviewRef.current.scrollToEnd(),400)
    }
    scrollup()
    

    return (
    <View className="flex flex-col p-1 h-full w-full justify-between">
        <View className="flex-1 mb-4">
            <FlatList data={aigenimages.value} keyExtractor={(item)=>item.key} ref={flviewRef}
                renderItem={({item})=>(
                    <View className="bg-neutral-700 rounded-b-md rounded-r-md w-full my-2 px-2 pb-4  min-h-max">
                        <Text className=" my-2 text-white">{item.prompt}</Text>
                        <View className="bg-neutral-600 h-64 w-4/5">
                            <Image source={item.image} className = " w-full h-full object-contain" />
                        </View>
                    </View>
                )}
            />
        </View>
        <View className="mb-4 flex flex-row justify-between space-x-1 items-end rounded-md bg-neutral-700 shadow-md">
          <TextInput placeholder='Enter Prompt' placeholderTextColor="white" multiline value={message}   onChangeText={(val)=> message.value=val} className=" text-white w-5/6 py-1.5 px-1.5"/>
          <TouchableOpacity className="p-1.5 border border-zinc-300" onPress={send}><Text className=" text-white text-xl">Send</Text></TouchableOpacity>
        </View>
    </View>
    )
}