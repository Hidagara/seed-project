

import {Message} from "./message.model";
import {Headers, Http, Response} from "@angular/http";
import {EventEmitter, Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {error} from "util";


@Injectable()
export class MessageService{

    private messages: Message[] = [];
    messageIsEditing = new EventEmitter();

    constructor(private http: Http){}

    addMessage(message: Message){
        this.messages.push(message);
        const body = JSON.stringify(message || null );
        const headers = new Headers({'Content-Type': 'application/json'});
        console.log(body);
        return this.http.post('http://localhost:3000/message',body,{headers: headers})
            .map((response: Response)=>  {
            const result = response.json();
            const message = new Message(result.obj.content,'Dummy',result.obj._id,null);
            this.messages.push(message);
            return message;
        })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getMessages(){
        return this.http.get('/message')
            .map((response: Response) => {
            const messages = response.json().obj;
            let transformedMessages: Message[] = [];
            for(let message of messages){
                transformedMessages.push(new Message(message.content,'Dummy',message._id,null));
            }
            this.messages = transformedMessages;
            return transformedMessages;
            })
            .catch((error: Response) => Observable.throw(error.json));
    }

    editMessage(message: Message){
        this.messageIsEditing.emit(message)
    }

    updateMessage(message: Message){
        const body = JSON.stringify(message || null );
        const headers = new Headers({'Content-Type': 'application/json'});
        console.log(body);
        return this.http.patch('http://localhost:3000/message/'+ message.messagId,body,{headers: headers})
            .map((response: Response)=>  response.json())
            //.catch((error: Response) => Observable.throw(error.json()));
    }

    deleteMessage(message: Message){
        this.messages.splice(this.messages.indexOf(message),1);
    }
}