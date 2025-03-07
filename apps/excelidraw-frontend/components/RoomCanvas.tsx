"use client";

import { WS_URL } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({roomId}: {roomId : string}) {
    const [socket, setSocket ] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmMTVhNjQ2MC1lNGVjLTQ0ZTktYjdhOS02YzBhNzU4YjI1OGIiLCJpYXQiOjE3NDEzNTQwMDF9.KEXm7rT2uVmIdtv7uvfIBLCLqGcYWUUkFob31CGMJQk`);

        ws.onopen = () => {
            setSocket(ws);
            ws.send(JSON.stringify({
                type: "join_room",
                roomId
            }))
            console.log("joined room at RoomCanvas");
            
        }
    },[roomId])

   

    if (!socket){
        return <div>
            Connecting to Server .....
        </div>
    }
    return  <div>
            <Canvas roomId={roomId} socket={socket}/>
</div>
}