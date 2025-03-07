import express from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middlewere";
import {CreateRoomSchema, CreateUserSchema, SigninSchema} from "@repo/common/zodTypes"
import {prismaClient} from "@repo/db/client"
const app = express();
app.use(express.json())

app.post('/signup',async function(req, res){

    const parsedData = CreateUserSchema.safeParse(req.body)
    // const {uaername, password, email}= req.body
    if(!parsedData.success){
        console.log(parsedData.error);
        
         res.json({
            message: "Incorrect Inputs",
            error: parsedData.error
        })
        return
    }

    try {
      const user = await prismaClient.user.create({
            data: {
                email: parsedData.data?.email,
                password: parsedData.data.password,
                username: parsedData.data.username,
            }
        })
        res.json({
            userId: user.id
        })
    }catch(e){
        res.status(411).json({
            message:"User already exisist with this username"
        })
    }


})
app.post('/signin',async function(req, res){

    const parsedData = SigninSchema.safeParse(req.body)
    // const {uaername, password, email}= req.body
    if(!parsedData.success){
        console.log(parsedData.error);
        
         res.json({
            message: "Incorrect Inputs",
            error: parsedData.error
        })
        return
    }
        // todo hash compare 

        const user = await prismaClient.user.findFirst({
            where:{
                username: parsedData.data.username,
                // password: parsedData.data.password
            }
        })

        if(!user){
            res.status(401).json({
                message: "Not authorized"
            })
        }

        const token = jwt.sign({
            userId: user?.id
        }, JWT_SECRET);
    
    res.json({
        token: token
    })

})
app.post('/room', middleware,async function(req, res){
            const parsedData = CreateRoomSchema.safeParse(req.body);
            if (!parsedData.success){
                res.json({
                    message: "Incorrect Inputs",
                    error: parsedData.error
                })
                
                return;
            }
            //@ts-ignore
            const userId = req.userId;
            // const isRoomExist = await prismaClient.room.findFirst({
            //     where: {
            //         slug: parsedData.data.username
            //     }
            // })

            // if (isRoomExist){
            //     res.json({
            //         message: "Room already exists with this name"                    
            //     })
           
            try {
                console.log("Creating room with data:", {
                    slug: parsedData.data.roomName,
                    adminId: userId
                  });
    
                const room = await prismaClient.room.create({
                    data: {
                        slug: parsedData.data.roomName,
                        adminId: userId
                    }
                }) ; 
    
                res.json({
                    roomId: room.id
                });
            }catch (error){
                res.json({
                    message: "Error while creating room",

                    error: error
                });
            }
            
});


app.get("/chats/:roomId", async (req, res) => {
    const roomId = Number(req.params.roomId);
    if (isNaN(roomId)) {
        res.status(400).json({ message: "Invalid roomId" });
        return;
    }
    try{
        const message = await prismaClient.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                id: "desc"
            },
            take: 50
        });
    
        res.json({
            message
        })
    }catch (error) {
        console.error("Error fetching chats:", error);
        res.status(500).json({ message: "Error fetching chats", error });
    }
 
});


app.get("/room/:slug", async (req, res) => {
    const slug = req.params.slug;
    
    console.log(`From BE : ${slug}`);
    try{
        const room = await prismaClient.room.findFirst({
            where: {
                slug: slug
            },
        });
    
        res.json({
            room: room
        })
        

    } catch (error) {
        console.error("Error fetching room:", error);
        
        
        res.status(500).json({ message: "Error fetching room", error });
    }
})


app.listen(3001)