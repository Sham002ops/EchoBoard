import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZTJkNDAyMi04MGI1LTQwYWMtODc5My1kYTBmNGEwMzY5MjEiLCJpYXQiOjE3NDExNzI5MTN9.9vzLy_UNV3BK-EJlaJN0pXhhr51_uRvMjK52gu4WdFQ`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
            
        }
    },[]);

    return {

        socket,
        loading
    }
}