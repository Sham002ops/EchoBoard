
import { useEffect, useRef, useState } from "react"
import { Game } from "@/draw/Game";
import RectIcon from './UiStyle/rectIcon'
import { CircleIcon, EraserIcon, MoveIcon } from 'lucide-react'
import ArrowIcon from './UiStyle/ArrowIcon'
import ColorDroperIcon from './UiStyle/ColorDroperIcon'
import AddImgIcon from './UiStyle/AddImgIcon'
import LineIcon from './UiStyle/LineIcon'
import PencilIcon from './UiStyle/PencilIcon'
import { IconButton} from './UiStyle/Button'
import ColorPicker from "./ColorPicker";

export type Tool = "rect" | "circle"|"line"|"arrow"| "pencil"| "colorDroper"|"addImg" | "eraser"|"null"


export function Canvas({roomId, socket}: {
    roomId: string
    socket: WebSocket
}){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [game, setGame ] = useState<Game>();
    const [selectedTool, setSelectedTool] = useState<Tool>("pencil")
    const [modelOpen, setModelOpen] = useState(false)
    const [moveItem, setMoveItem] = useState(false)
 
  function handleClick({type}: {type: string}) {
    setSelectedTool(type as Tool)
    setMoveItem(false)
    console.log(type);
    
    
      
  }
   

  function handleColor({color}: {color: number}) {
    // setSelectedTool(color)
    console.log(color);
    
    
      
  }

  function isMove(){
    if(moveItem){
      setMoveItem(false)

    } else{
      setMoveItem(true);
      setSelectedTool("null")
    }
  }
    
    
      useEffect(() =>{
        game?.setTool(selectedTool)
        game?.setMove(moveItem)
       },[selectedTool, game, moveItem]);

    useEffect(() => {
        if (canvasRef.current){
            const g = new Game(canvasRef.current, roomId, socket)
            setGame(g);

            return () => {
              g.destroy()
            }

            
        }

    }, [canvasRef, roomId, socket])

return <div className=" h-[100vh] overflow-hidden">
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />
        <div className=" gap-3 bg-gradient-to-l from-slate-950 to-slate-900 w-[450px] h-12 rounded-2xl fixed right-[570px] top-10 text-amber-50 justify-center items-center flex border-gradiant border-2 border-slate-800">
             <div  className={`${selectedTool === "pencil"? `bg-slate-700`: ``} hover:bg-slate-700  rounded-xl  pt-1.5 px-1.5 pb-0  cursor-pointer  `}>
             <IconButton  size='sm' onClick={() => handleClick({ type: "pencil" })} variant='icon' startIcon={<PencilIcon  width={20} height={20} fill="white" />}/>
             </div>
            <div className={`${selectedTool === "rect"? `bg-slate-700`: ``} items-center justify-center flex -mr-0.5 hover:bg-slate-700  rounded-xl p-2 cursor-pointer`}>
            <IconButton onClick={() => handleClick({ type: "rect" })} size='sm' variant='icon' startIcon={<RectIcon width={18} height={18}  />}/>
            </div>
            <div  className={`${selectedTool === "circle"? `bg-slate-700`: ``} hover:bg-slate-700  rounded-xl pt-1.5 pb-0  px-1.5 p-1 cursor-pointer`}>
            <IconButton onClick={() => handleClick({ type: "circle" })} size='sm' variant='icon' startIcon={<CircleIcon width={20} height={20} />}/>
            </div>
            <div  className={`${selectedTool === "arrow"? `bg-slate-700`: ``} hover:bg-slate-700  rounded-xl pt-1.5 px-1.5 pb-0   cursor-pointer`}>
              <IconButton onClick={() => handleClick({ type: "arrow" })} size='sm' variant='icon' startIcon={<ArrowIcon width={20} height={20} />}/>
            </div>
            <div  className={`${selectedTool === "colorDroper"? `bg-slate-700`: ``} hover:bg-slate-700  rounded-xl  pt-1.5 px-1.5 pb-0 p-1 cursor-pointer`}>
            <IconButton onClick={() => {setModelOpen(true)}} size='sm' variant='icon' startIcon={<ColorDroperIcon width="20" height="20" color="#ffff" />}/>
            </div>
            <div  className={`${selectedTool === "addImg"? `bg-slate-700`: ``} hover:bg-slate-700  rounded-xl  pt-1.5 px-1.5 pb-0 p-1 cursor-pointer`}>
            <IconButton onClick={() => handleColor({ color: 2 })} size='sm' variant='icon' startIcon={ <AddImgIcon width={20} height={20} color="#ffff" />}/>
            </div>
            <div  className={`${selectedTool === "line"? `bg-slate-700`: ``} hover:bg-slate-700  rounded-xl  pt-1.5 px-1.5 pb-0 p-1 cursor-pointer`}>
            <IconButton onClick={() => handleClick({ type: "line" })} size='sm' variant='icon' startIcon={<LineIcon width={20} height={20} color="#ffff" />}/>
            </div>
           <div  className={`${selectedTool === "eraser"? `bg-slate-700`: `b`} hover:bg-slate-700  rounded-xl p-1  pt-1.5 px-1.5 pb-0 cursor-pointer`}>
           <IconButton onClick={() => handleClick({ type: "eraser" })} size='sm' variant='icon' startIcon={<EraserIcon width={20} height={20} color="#ffff" />}/>
           </div>
           <div className={`${moveItem === true? `bg-slate-700 border2 border-cyan-950`: `b`} hover:bg-slate-700  rounded-xl p-1  pt-1.5 px-1.5 pb-0 cursor-pointer`}>
           <IconButton onClick={isMove} size='sm' variant='icon' startIcon={<MoveIcon width={20} height={20} color="#ffff" />}/>
           </div>
            </div>
            <div className="">
            <ColorPicker open={modelOpen} onClose={() => {setModelOpen(false)}}/>
           </div>
    </div>

}