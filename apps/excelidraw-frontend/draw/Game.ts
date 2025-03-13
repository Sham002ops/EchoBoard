import { Tool } from "@/components/Canvas";
import { getExistingShapes } from "./http";



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
} | {
    type: "line";
    startX: number;
    startY: number;
    endX: number;
    endY: number;
} | {
    type: "arrow";
    startX: number;
    startY: number;
    endX: number;
    endY: number;
} | {
    type: "pencil";
    points: { x: number; y: number }[];
} |  {
    type: "addImg";
    src: string;
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "eraser";
    x: number;
    y: number;
    width: number;
    height: number;
} 

export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShapes: Shape[];
    private roomId : string;
    private socket: WebSocket;
    private clicked: boolean;
    private startX : number;
    private startY : number;
    private selectedTool : Tool = "pencil";
    private moveItem : boolean = false;
    private selectedShape : Shape | null = null;
    private offsetX: number = 0;
    private offsetY: number = 0;
    private pencilPath : {x: number; y: number }[] = [];


    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.existingShapes= [];
        this.roomId = roomId;
        this.clicked = false;
        this.socket =socket;
        this.init();
        this.initHandlers();
        this.startX = 0;
        this.startY = 0;
        this.initMouseHandler();

    }

    destroy(){
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler)

        this.canvas.removeEventListener("mouseup", this.mouseUpHandler)
        
        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler)
    }

    setTool(tool: "rect" | "circle"|"line"|"arrow"| "pencil"| "colorDroper"|"addImg" | "eraser" | "null"){
        this.selectedTool = tool;
    }

    setMove(moveItem: boolean){
        this.moveItem = moveItem
        console.log("move now:",moveItem);
        
    }

    async init(){
        this.existingShapes = await getExistingShapes(this.roomId)
        console.log("just called getExistingShape", this.existingShapes);
        
        this.clearCanvas();
    }



    initHandlers(){
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if(message.type == "chat"){
                const parsedShape = JSON.parse(message.message);
                this.existingShapes.push(parsedShape.shape);
                this.clearCanvas(); 
    
            }
        }
    }

         isPointerAtShape(e: MouseEvent, shape: Shape) {

            const x = e.clientX;
            const y = e.clientY;
        if(this.moveItem){
            if(shape.type === "rect"){
                return x >= shape.x && x <= shape.x + shape.width && y >= shape.y && y <= shape.y + shape.height;
            } else if (shape.type === "circle"){
                const dx = x - shape.centerX;
                const dy = y - shape.centerY;

                return Math.sqrt(dx * dx + dy * dy) <=  shape.radius;
            }
            return false; }
         }


     clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        // this.ctx.fillStyle = "rgba(0, 0, 0)"
        this.ctx.fillStyle = "rgba(10,10,17,255)"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    
        this.existingShapes.map((shape) => {
            console.log("shape.type at this.existingShapes.map((shape) : ", shape.type);
            if(shape.type === "rect"){
                
                this.ctx.strokeStyle = "rgba(255, 255, 255)"
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            } else if (shape.type === "circle") {
                console.log("triggring cilcle");
                this.ctx.beginPath();
                this.ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, 2 * Math.PI);
                this.ctx.stroke();
                this.ctx.closePath();                
            } else if (shape.type === "pencil") {
                this.ctx.lineWidth = 3;
                this.ctx.lineCap = "round";
                this.ctx.beginPath();
                this.ctx.moveTo(shape.points[0].x, shape.points[0].y);
                shape.points.forEach(point => this.ctx.lineTo(point.x, point.y));
                this.ctx.stroke();
            }

        
        })
    }


    mouseDownHandler = (e: MouseEvent) => {
        this.clicked = true;
        this.startX = e.clientX;
        this.startY = e.clientY;

        this.selectedShape = this.existingShapes.find(shape => this.isPointerAtShape(e, shape)) || null;

        if(this.moveItem){
            if(this.selectedShape){
                console.log("Shape selected: ", this.selectedShape);
                
                if(this.selectedShape.type === "rect"){
                    this.offsetX = e.clientX - this.selectedShape.x;
                    this.offsetY = e.clientY - this.selectedShape.y;
                } else if (this.selectedShape.type === "circle") {
                            this.offsetX = e.clientX - this.selectedShape.centerX;
                            this.offsetY = e.clientY - this.selectedShape.centerY;
                }
            }
        }

        if(this.selectedTool === "pencil"){
            this.pencilPath = [{x: this.startX, y: this.startY }];
        }
    }
    mouseUpHandler = (e: MouseEvent) => {
        this.clicked = false;
        const width = e.clientX - this.startX;
        const height = e.clientY - this.startY;
        const selectedTool = this.selectedTool;
        let shape: Shape | null = null;

        if (selectedTool === "rect") {
            shape = {
                type: "rect",
                x: this.startX,
                y: this.startY,
                height,
                width
            };

            console.log("ec.X: ", e.clientX,  "ec.Y : ", e.clientY);
            
        } else if (selectedTool === "circle") {
            const radius = Math.hypot(width, height) / 2;

            shape = {
                type: "circle",
                radius: radius,
                centerX: this.startX + width / 2,
                centerY: this.startY + height / 2,
            };
        } else if (selectedTool === "pencil"){
            console.log(" pencie at mouseup");
            
           shape = {
            type: "pencil",
            points: [...this.pencilPath]
           };
        }

        if (!shape) {
            return;
        }

       if (!this.moveItem){
        console.log("type at shape", this.selectedTool);

        this.existingShapes.push(shape);
        console.log("shape", shape);

        this.socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({
                shape
            }),
            roomId: this.roomId
        }));
       } else if(this.moveItem){
        if (this.selectedShape) {
            console.log("Shape moved to:", this.selectedShape);
            
            // Send updated shape to the server
            this.socket.send(JSON.stringify({
                type: "update",
                message: JSON.stringify({
                    shape: this.selectedShape
                }),
                roomId: this.roomId
            }));
        }
       }
    
        this.selectedShape = null;
    }

    mouseMoveHandler = (e: MouseEvent) => {
        if (this.clicked) { 
            const width = e.clientX - this.startX;
            const height = e.clientY - this.startY;
            
            this.clearCanvas();
            this.ctx.fillStyle = "rgba(10,10,17,255)";
            this.ctx.strokeStyle = "rgba(255, 255, 255)";
            const selectedTool = this.selectedTool;
            if (selectedTool === "rect") {
                this.ctx.strokeRect(this.startX, this.startY, width, height);
            } else if (selectedTool === "circle") {
                const centerX = this.startX + width / 2;
                const centerY = this.startY + height / 2;
                const radius = Math.hypot(width, height) / 2;
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                this.ctx.stroke();
                this.ctx.closePath();
            } else if(selectedTool === "pencil") {
                if(!this.clicked) return;

                this.pencilPath.push({ x: e.clientX, y: e.clientY });
                this.ctx.lineWidth= 3;
                this.ctx.lineCap = "round";
                this.ctx.beginPath();

                this.ctx.moveTo(this.pencilPath[0].x, this.pencilPath[0].y);
                for(let i = 1; i < this.pencilPath.length; i++){
                    this.ctx.lineTo(this.pencilPath[i].x, this.pencilPath[i].y);
                }


                this.ctx.stroke();
                // this.ctx.beginPath();
                // this.ctx.moveTo(e.clientX, e.clientY);
                // this.clearCanvas()
            }
        } 

        if (this.clicked && this.selectedShape) {
            if (this.selectedShape.type === "rect") {
                this.selectedShape.x = e.clientX - this.offsetX;
                this.selectedShape.y = e.clientY - this.offsetY;
            } else if (this.selectedShape.type === "circle") {
                this.selectedShape.centerX = e.clientX - this.offsetX;
                this.selectedShape.centerY = e.clientY - this.offsetY;
            }
            
            this.clearCanvas();
        }
    }



    initMouseHandler(){
        this.canvas.addEventListener("mousedown", this.mouseDownHandler )


        this.canvas.addEventListener("mouseup", this.mouseUpHandler)


        this.canvas.addEventListener("mousemove", this.mouseMoveHandler)
    
    }
}