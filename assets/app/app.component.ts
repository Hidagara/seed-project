import { Component } from '@angular/core';


@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})


export class AppComponent {
    tittle = 'Hello guys this is string interpolation output';

    message = {
        content: 'My message',
        author: 'Roman'
    };

}

