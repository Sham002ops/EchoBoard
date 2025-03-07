import axios from "axios";
import { BACKEND_URL } from "../../config";
import { ChatRoomClient } from "../../../components/ChatRoomClient";

async function getRoomId(slug: string) {
   
    console.log(BACKEND_URL);
    console.log(slug);
    
    try {
        const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
        const roomId = response.data.room.id
        console.log(`roomId at getRoomId: ${roomId}`);
        
        return roomId; // Ensure this matches the structure of your response
    } catch (error) {
        console.log(`after failed : ${BACKEND_URL}`);
        console.log(`after failed slug : ${slug}`);
        console.error("Error fetching room ID:", error);
       
    }


}


async function getChats(roomId: number) {
    try {
        console.log(`roomId from getChats: ${roomId}`); 

        const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
        // console.log("Response from getChats:", response.data); // Log the entire response
        const messages = response.data.message
        // console.log("message from getChats:", messages); // Log the entire response

        return messages
    } catch (error) {
        console.error("Error fetching chats:", error);
    }
}


export default async function ChatRoom1({
    params
}: {
    params: {
        slug: string;
    }
}){
    const slug = (await params).slug;
    console.log(`slug at ChatRoom1: ${slug}`);
    
    try {
        const roomId = await getRoomId(slug);
        console.log(`roomId at ChatRoom1: ${roomId}`);

        const messages = await getChats(roomId);
        // console.log(`messages at ChatRoom1:`, messages);
        

        return <ChatRoomClient id={roomId} messages={messages}/>
    } catch (error) {
        console.error("Error rendering ChatRoom:", error);
        return <div>Error loading chat room</div>;
    }
} 