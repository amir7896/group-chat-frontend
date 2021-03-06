import { Component, OnInit } from '@angular/core';
import {FormGroup,Validators,FormArray,FormControl, FormBuilder} from '@angular/forms';
import { ChatServiceService } from 'src/app/Services/Chat/chat-service.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  onlineUser:any=[]
  u!:string;
  roomsForChat:any=['Angular','React','Vue']
  joined:any=false;
  messageArray:Array<{user:String,message:String}> = [];
  
  join_message!:string;
  leave_message!:string;
  count:any;
  userJoined!:string;
  roomJoined!:string;
  messageText!:string
//reactive form
  chatForm!:FormGroup;
  constructor(public _chatService:ChatServiceService,private fb:FormBuilder) { 
    this._chatService.newUserJoined()
    .subscribe(data=> this.messageArray.push(data));

    this._chatService.userLeftRoom()
    .subscribe(data=> this.messageArray.push(data));

    this._chatService.newMessageReceived()
    .subscribe(data=> this.messageArray.push(data));

    this._chatService.totalUsers()
    .subscribe((data)=>{
      this.count=data.count

    })
  }
  join(){
    this.joined=true
    this.leave_message!=null
    this.join_message="You have joined the room " +this.roomJoined
    this._chatService.joinRoom({user:this.chatForm.get('user')!.value,room:this.chatForm.get('room')!.value});
  }
  leave(){
    this.joined=false;
    this.join_message!=null
    this.leave_message="You have  left the room "+this.roomJoined
    this._chatService.leaveRoom({user:this.chatForm.get('user')!.value,room:this.chatForm.get('room')!.value});
  }
    
  sendMessage(){
    this._chatService.sendMessage({user:this.chatForm.get('user')!.value,room:this.chatForm.get('room')!.value,message:this.chatForm.get('messageText')!.value});
  }
  userInfo:any;
  ngOnInit(): void {
    this.userInfo=history.state;
    this.u=this.userInfo.email;
    this.chatForm=this.fb.group({
     user:["",Validators.required],
     room:["",Validators.required],
     messageText:[""]
    })
  }
  

  // Choose room using select dropdown
changeRoom(e:any) {
  console.log(e.value)
  this.room!.setValue(e.target.value, {
    onlySelf: true
  })
}
get room() {
  return this.chatForm.get('room');
}
//to get list of online users
getOnlineUsers(){

}
}
