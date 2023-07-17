import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  http = inject(HttpClient);

  signInForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  submit(): void {
    // console.log(this.signInForm.value);
    const cookieConfig = {
      TOKEN_KEY: 'authentication',
      REFRESH_TOKEN_KEY: 'refresh',
      lastRouteAccessedKey: 'lastRoute',
      sessionExpiredKey: 'sessionExpired',
      /** Time in minutes */
      ACCESS_TOKEN_EXPIRATION: 30,
      REFRESH_TOKEN_EXPIRATION: 120,
      TOKEN_KEY_EXPIRES: 'authentication-expires',
    };
    this.http.post('http://localhost:3000/api/auth/login', this.signInForm.value).subscribe((res: any) => {
      console.log(res)
      // this.setCookie(cookieConfig.TOKEN_KEY, res.token, cookieConfig.ACCESS_TOKEN_EXPIRATION);
    });
  }

  click() {
    this.http.get('http://localhost:3000/api/test').subscribe((res) => {
      console.log(res)
    });
  }

  setCookie(tokenKey: string, tokenData: string, maxAge: number) {
    /** max-age should be minutes */
    document.cookie = `${tokenKey}=${JSON.stringify(tokenData)} ; max-age=${maxAge * 60}; path=/`
    document.cookie = `${tokenKey}-expires=${JSON.stringify(Date.now() + maxAge * 60000)} ; max-age=${maxAge * 60
      }; path=/`

  }
}
