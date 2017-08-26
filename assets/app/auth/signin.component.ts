import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "../message/message.service";
@Component ({
    selector: 'app-signin',
    templateUrl:'/signin.component.html'
})
export class  SigninComponent{

    constructor(private messageService: MessageService){};

    myForm: FormGroup;

    onSubmit(){
        console.log(this.myForm);
        this.myForm.reset();
    }

    ngOnInit(){
        this.myForm = new FormGroup({
            email: new FormControl(null,[
                Validators.required,
                Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
            ]),
            password: new FormControl(null,Validators.required)
        })
    }


}