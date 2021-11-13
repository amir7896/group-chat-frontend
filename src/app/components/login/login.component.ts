import { Component, OnInit } from '@angular/core';
import {FormGroup,Validators,FormArray,FormControl, FormBuilder} from '@angular/forms';
import { AuthServiceService } from 'src/app/Services/Auth/auth-service.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public error_message!: string;
  public u !:string;
  public email!: string;
  public password!: string;

  constructor(public auth: AuthServiceService, 
    private router: Router,
    private fb:FormBuilder) { }

    //Reactive Form
  loginForm!:FormGroup
  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }
  navigateToChat() {
    this.router.navigateByUrl('/chat', { state: this.loginForm.value });
    console.log(this.loginForm.value);
  }
  public submit() {
    this.auth.login(this.loginForm.get("email")!.value, this.loginForm.get('password')!.value)
      .pipe(first())
      .subscribe(
        result =>{ 
        this.router.navigateByUrl('/chat')
        
        },
        error=>{
          this.error_message="Invalid Credentials"

        });
        this.navigateToChat()
  }

}
