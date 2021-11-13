import { Component } from '@angular/core';
import { AuthServiceService } from './Services/Auth/auth-service.service';
import { ChatServiceService } from './Services/Chat/chat-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  constructor(public chatService: ChatServiceService,
    public auth: AuthServiceService,
    private router: Router)
  {}

    logout() {
      this.auth.logout();
      this.router.navigate(['login']);
    }
}
