import {Component, EventEmitter, Input, NgZone, OnInit, Output, Renderer2} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'mg-google-login',
    templateUrl: './google-login.component.html',
    styleUrls: ['./google-login.component.scss']
})
export class GoogleLoginComponent implements OnInit {

    @Output() onResponse: EventEmitter<any> = new EventEmitter<any>();
    @Input() text: 'signin_with' | 'signup_with' = 'signin_with';

    clientId: string = environment.googleClientId;

    constructor(
        private ngZone: NgZone,
        private renderer: Renderer2
    ) {
    }

    ngOnInit(): void {
        const script = this.renderer.createElement('script');
        script.setAttribute(
            'src',
            'https://accounts.google.com/gsi/client'
        );
        script.setAttribute('async', '');
        script.setAttribute('defer', '');
        this.renderer.appendChild(document.body, script);

        window.handleCredentialResponse = this.handleCredentialResponse.bind(this);
    }

    handleCredentialResponse(response) {
        this.ngZone.run(() => {
            this.onResponse.emit(response);
        })
    }

}
