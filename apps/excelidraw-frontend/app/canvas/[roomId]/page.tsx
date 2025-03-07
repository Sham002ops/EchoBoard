"use client";
import { InitDraw } from "@/draw";
import { useEffect, useRef } from "react"

export default function Canvas(){

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current){
           
            InitDraw(canvasRef.current)
        }
    }, [canvasRef])
    return <div>
        <canvas ref={canvasRef} width={1400} height={1000} />
    </div>
}