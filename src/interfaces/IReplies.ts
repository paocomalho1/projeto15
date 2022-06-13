import { IUser } from "./IUser";

export interface IReplies{
    id: number
    content: string
    createdAt: string
    score: number
    user: IUser
    replyingTo: string
}