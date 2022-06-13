import { IReplies } from "./IReplies"
import { IUser } from "./IUser"

export interface IComments{
    id: number
    content: string
    createdAt: string
    score: number
    user: IUser
    replies: IReplies[]
}