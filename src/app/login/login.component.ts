import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService,  private router: Router, private route: ActivatedRoute ) { }

  onReset() {
    this.loginForm.reset();
  }

  onSubmit() {
    this.authService.authenticateUser(this.loginForm.value).subscribe((result: {token: string, userId: string}) => {
      if(result) {
        localStorage.setItem('token', result.token);
        this.router.navigate(['welcome'], { relativeTo: this.route });

      }
    },
    (error) => {
      if(error.status === 401) {
        alert('Invalid credentials');
      }
    });
  }
  
}