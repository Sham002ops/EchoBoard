import { HTTP_BACKEND } from "@/config";
import axios from "axios";
type Shape = {
    type: "rect";
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
}

export async function InitDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    
    const ctx = canvas.getContext("2d");

    let existingShapes: Shape[] = await getExistingShapes(roomId);

    if(!ctx){
        return
    }

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if(message.type == "chat"){
            const parsedShape = JSON.parse(message.message);
            existingShapes.push(parsedShape.shape);
            clearCanvas(existingShapes, ctx, canvas); 

        }
    }

    // ctx.fillStyle = "rgba(0, 0, 0)"
    // ctx.fillStyle = "rgba(10,10,17,255)"
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    clearCanvas(existingShapes, ctx, canvas)
    let clicked = false;
    let startX = 0;
    let startY = 0;  
    

    canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.clientX
        startY = e.clientY
    })

    canvas.addEventListener("mouseup", (e) => {
        clicked= false
        const width = e.clientX - startX;
        const height = e.clientY - startY;
        const shape : Shape = {
            type: "rect",
            x: startX,
            y: startY,
            height,
            width
        }
        existingShapes.push(shape);

        socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({
                shape
            }),
            roomId
            
        }))
    })
    
    canvas.addEventListener("mousemove", (e) => {
      if (clicked) { 
      const width = e.clientX - startX;
      const height = e.clientY - startY
    //   console.log("w:",width,"  h:",height);
      
      clearCanvas(existingShapes, ctx, canvas);
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(10,10,17,255)"
    //   ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(255, 255, 255)"
      ctx.strokeRect(startX, startY, width, height)
    } 
    })
}

function clearCanvas(existingShapes: Shape[], ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ctx.fillStyle = "rgba(0, 0, 0)"
    ctx.fillStyle = "rgba(10,10,17,255)"
          ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    existingShapes.map((shape) => {
        if(shape.type === "rect"){
            ctx.strokeStyle = "rgba(255, 255, 255)"
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        }
    })
}


async function getExistingShapes(roomId: string) {
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