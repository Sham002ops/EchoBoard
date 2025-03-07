import { InitDraw } from "@/draw";

import { useEffect, useRef } from "react"

export function Canvas({roomId, socket}: {
    roomId: string
    socket: WebSocket
}){
    const canvasRef = useRef<HTMLCanvasElement>(null);


    useEffect(() => {
        if (canvasRef.current){
            InitDraw(canvasRef.current, roomId, socket)
        }
    }, [canvasRef, roomId, socket])

return <div>
        <canvas ref={canvasRef} width={1400} height={1000} />
    </div>

}