import {z} from "zod"

export const CreateUserSchema = z.object({
    email: z.string().min(3).max(20),
    password: z.string(),
    username: z.string()
})


export const SigninSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string(),
})

export const CreateRoomSchema = z.object({
    roomName: z.string().min(3).max(20),
})