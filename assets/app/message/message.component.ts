

import {Component} from "@angular/core";

@Component ({
    selector:'app-message',
    templateUrl:'./message.component.html',
    styles:[`
        .author {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
            width:80%;
        }
        .config {
            display:inline-block;
            text-align: center;
            font-size:12px;
            width: 19%;
        }
    `]
})
export class MessageComponent {
        message = {
            content: 'My message',
            author: 'Roman'
        };
}