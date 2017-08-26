import {Component, OnInit} from "@angular/core";
import {Message} from "./message.model";
import {MessageService} from "./message.service";

@Component({
    selector: 'app-message-list',
    template: ` <div class="col-md-8 col-md-offset-2">
        <app-message
                [message] = "message"
                (editClicked)="message.content = $event"
                *ngFor="let message of messages"
        >

        </app-message>
    </div>
        
    `
    }
)
export class MessageListComponent implements OnInit{

    constructor(private messageService: MessageService){}

    messages: Message[] = [

        new Message ('some message' , 'me'),
        new Message ('second message', 'by me')
    ];

    ngOnInit(){
        this.messages = this.messageService.getMessages();
    }
}