


import {Component, OnInit} from "@angular/core";
import {MessageService} from "./message.service";
import {Message} from "./message.model";
import {NgForm} from "@angular/forms";
import {NgFor} from "@angular/common";

@Component ({
    selector: 'app-message-input',
    templateUrl:'./message-input.component.html'

})
export class MessageInputComponent implements OnInit{

    message: Message;

    constructor(private messageService: MessageService){}

    ngOnInit(){
        this.messageService.messageIsEditing.subscribe(
            (message: Message) => this.message = message
        );
    }



    onClear(form: NgForm){
        this.message = null;
        form.resetForm()
    }

    onSubmit(form: NgForm){
        if (this.message){
            //Edit Message
            this.message.content = form.value.content;
            this.messageService.updateMessage(this.message)
                .subscribe(
                    result => console.log(result)
                );
            this.message = null;
    }
        else {
            //Add message
            const message = new Message (form.value.content, 'Romchik ponchik');
            this.messageService.addMessage(message)
                .subscribe(
                    data => console.log(data),
                    error => console.error(error)
                );
        }

        form.resetForm();
    }
}