import { Message } from "@/model/UserModel";

export interface ApiResponse{
    success:boolean;
    message:string;
    isAceeptinfMessage?:boolean;
    messages?:Array<Message>
}