import { HTTP_BACKEND } from "@/config";
import axios from "axios";

export async function getExistingShapes(roomId: string) {
    try{
     const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
 
    const messageData = res.data.message;
    console.log("messagesData : ", messageData);
    
 
 //    if (!Array.isArray(messageData)) {
 //     console.error("Invalid message data:", messageData);
 //     return [];
 // }
 
    const shapes = messageData.map((x: {message: string}) => {
         const messageData = JSON.parse(x.message)
         return messageData.shape;
    })
 
    return shapes;
 
    }catch (error){
 
     console.error("Error Fetchting existing shapes : ", error)
    }
 
 }