import { Message } from "@/model/User.";

export interface ApiResponse{
    success:boolean;
    message:string;
    isAceeptinfMessage?:boolean;
    messages?:Array<Message>
}