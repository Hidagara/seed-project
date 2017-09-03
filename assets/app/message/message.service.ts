

import {Message} from "./message.model";
import {Headers, Http, Response} from "@angular/http";
import {EventEmitter, Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {error} from "util";
import {ErrorService} from "../errors/error.service";


@Injectable()
export class MessageService{

    private messages: Message[] = [];
    messageIsEditing = new EventEmitter();

    constructor(private http: Http, private errorService: ErrorService){}

    addMessage(message: Message){
        const body = JSON.stringify(message || null );
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post('/message' + token,body,{headers: headers})
            .map((response: Response)=>  {
            const result = response.json();
            const message = new Message(
                result.obj.content,
                result.obj.user.firstName,
                result.obj._id,
                result.obj.user._id);
            this.messages.push(message);
            return message;
        })
            .catch((error: Response) => {
            this.errorService.handleError(error.json())
            return Observable.throw(error.json())
        });
    }

    getMessages(){
        return this.http.get('/message')
            .map((response: Response) => {
            const messages = response.json().obj;
            let transformedMessages: Message[] = [];
            for(let message of messages){
                transformedMessages.push(new Message(
                    message.content,
                    message.user.firstName,
                    message._id,
                    message.user._id));
            }
            this.messages = transformedMessages;
            return transformedMessages;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json())
                return Observable.throw(error.json())
            });
    }

    editMessage(message: Message){
        this.messageIsEditing.emit(message)
    }

    updateMessage(message: Message){
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        const body = JSON.stringify(message || null );
        const headers = new Headers({'Content-Type': 'application/json'});
        console.log(body);
        return this.http.patch('message/'+ message.messagId + token,body,{headers: headers})
            .map((response: Response)=>  response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json())
                return Observable.throw(error.json())
            });
    }

    deleteMessage(message: Message){
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        this.messages.splice(this.messages.indexOf(message),1);
        return this.http.delete('message/'+ message.messagId + token)
            .map((response: Response)=>  response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json())
                return Observable.throw(error.json())
            });
    }
}