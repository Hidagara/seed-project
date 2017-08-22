export class Message {

    content:string;
    username:string;
    messagId?:string;
    userId?:string;


    constructor(content: string, username: string, messagId?: string, userId?: string) {
        this.content = content;
        this.username = username;
        this.messagId = messagId;
        this.userId = userId;
    }
}