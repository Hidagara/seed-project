
import {NgModule} from "@angular/core";
import {MessageComponent} from "./message.component";
import {MessageListComponent} from "./message-list.component";
import {MessagesComponent} from "./messages.component";
import {MessageInputComponent} from "./message-input.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MessageService} from "./message.service";

@NgModule({
    declarations: [
        MessageComponent,
        MessageListComponent,
        MessagesComponent,
        MessageInputComponent
    ],
    providers: [MessageService],
    imports: [
        CommonModule,
        FormsModule
]

})
export class MessageModule {

}