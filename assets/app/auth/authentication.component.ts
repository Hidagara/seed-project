



import {Component} from "@angular/core";
import {AuthService} from "./auth.service";

@Component ({
    selector: 'app-authentication',
    template:`
    
        <header class="row spacing">
            <nav class="col-md-8 col-md-offset-2">
                <ul class="nav nav-tabs">
                    <li><a routerLinkActive = "active" [routerLink]="['signup']">Signup</a></li>
                    <li><a routerLinkActive = "active" *ngIf = "!isLoggedIn()" [routerLink]="['signin']">Signin</a></li>
                    <li><a routerLinkActive = "active" *ngIf = "isLoggedIn()" [routerLink]="['logout']">Logout</a></li>
                </ul>
            </nav>
        </header>
        
        <router-outlet></router-outlet>
    `
})
export class AuthenticationComponent{

    constructor(private authService: AuthService){}

    isLoggedIn(){
        return this.authService.isLoggedIn();
    }
}