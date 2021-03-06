import { Component, ElementRef, OnInit } from '@angular/core';
// import * as io from 'socket.io.client';
import io from "../../../node_modules/socket.io-client";

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit {

  SOCKET_ENDPOINT = 'localhost:8000';
  socket: any;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.setupSocketConnection();
    // loadMessage() {
      // fetch("{% url 'chat:history' chatgroup.id %}")
      //     .then( response => response.json() )
      //     .then( data => {
      //         for (let msg of data) {
      //             this.broadcastMessage(msg.message, msg.username, msg.message_type, msg.image_caption, msg.date_created)
      //         }
      //         this.scrollBottom();
      //     })


      this.socket.on('message', (msg: any) => {
        console.log(msg);
        this.socket.broadcast.emit('message-broadcast', msg);
      });
    
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
  }

  setupSocketConnection() {
    alert('her')
    this.socket = io(this.SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: string) => {
      if (data) {
        const element = document.createElement('li');
        element.innerHTML = data;
        element.style.background = 'white';
        element.style.padding =  '15px 30px';
        element.style.margin = '10px';
        document.getElementById('message-list')!.appendChild(element);
      }
    });
  }
  
  showConversation() {
    alert('here');
    // http request for the initial conversation 
    // route - get-conversation - with id(row number something pagination)
    // data : user1: current user, user2: provider coming from the conversation box
  }

  roomId = '{{chatgroup.id}}'
  tempDaysWeekdays = [];

  chatSocket = new WebSocket(
      `ws://${window.location.host}/ws/chat/${this.roomId}/`
  );

  // chatSocket.onmessage = (e) => {
  //     const data = JSON.parse(e.data);
  //     broadcastMessage(data.message, data.username, data.message_type, data.image_caption)
  //     // scrollBottom()
  // };

  // chatSocket.onclose = (e) => {
  //     console.error('Chat socket closed unexpectedly');
  //     console.error(e);
  // };

  
  // setupSocketConnection() {
    // alert('her')
    // this.socket = io(this.SOCKET_ENDPOINT);
    // this.socket.on('message-broadcast', (data: string) => {
      // if (data) {
        // const element = document.createElement('li');
        // element.innerHTML = data;
        // element.style.background = 'white';
        // element.style.padding =  '15px 30px';
        // element.style.margin = '10px';
        // document.getElementById('message-list').appendChild(element);
      // }
    // });
  // }

  // SendMessage() {
  //   this.socket.emit('message', this.message);
  //   const element = document.createElement('li');
  //   element.innerHTML = this.message;
  //   element.style.background = 'white';
  //   element.style.padding =  '15px 30px';
  //   element.style.margin = '10px';
  //   element.style.textAlign = 'right';
  //   document.getElementById('message-list').appendChild(element);
  //   this.message = '';
  // }



  // document.querySelector('#chat-message-input').focus();

  // document.querySelector('#chat-message-input').onkeyup = function(e) {
  //     if (e.keyCode === 13) {  // enter, return
  //         const messageInputDom = document.querySelector('#chat-message-input');
  //         const message = messageInputDom.value;
  //         chatSocket.send(JSON.stringify({
  //             'message': message,
  //             'message_type': 'text',
  //             'image_caption': null
  //         }));
  //         messageInputDom.value = '';
  //     }
  // };
  
  // document.querySelector('#chat-message-input').onpaste = function(e) {
      // let item = e.clipboardData.items[0];
      // if (item.type.includes('image')) {
      //     let blob = item.getAsFile();

      //     let reader = new FileReader();
      //     reader.onload = function(event) {
              // document.getElementById("snipped-big-img").src = event.target.result;
              // document.getElementById('snipped-small-img').src = event.target.result;
          // };

          // reader.readAsDataURL(blob);
          // document.querySelector('#room-preview-img').style.display = 'grid';
          // document.querySelector('#room-message').style.display = 'none';
          // document.querySelector('#add-caption-input').focus();
      // }

  // }

  // scrollBottom() {
  //     let msgbox = document.querySelector(".msg-box")!
  //     msgbox.scrollTop = msgbox.scrollHeight
  // }

  // function getTime(msg_time) {
  //     if (msg_time) {
  //         // define as Date so we can convert to acceptable date time format (with out letter T, ex. 2020-10-10T06:50:14.751 )
  //         temp = new Date(msg_time); 

  //         // suffix UTC so it will render as local time when it use toLocalString
  //         var today = new Date(`${temp.toLocaleString()} UTC`); 
  //     } else {
  //         var today = new Date();
  //     }

  //     // format & render to local time
  //     let time = today.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
  //     return time

  // }


  // broadcastMessage(msg: any, user: any, msg_type: any, img_caption: any, msg_time: any) {
  //   alert('in broatcast');
  // };

  // function broadcastMessage(msg, user, msg_type, img_caption, msg_time) { 
  //     // create a new div element 
  //     let newDiv = document.createElement("div"); 
  //     // and give it some content 
  //     if (msg_type == 'image') {
  //         msg = `<img src="${msg}"> <br/> ${img_caption}`;
  //     }

  //     if (user == '{{request.user.username|title}}') {
  //         var msg1 = `<div class="right-msg-container">
  //                         <div class="s-message">
  //                             <div class="s-msg">${msg}</div>
  //                             <div class="s-time">${getTime(msg_time)}</div>
  //                         </div>
  //                         <div class="s-tail"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" preserveAspectRatio="none" width="8" height="13"><path opacity=".5" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"></path><path fill="#dcf8c6ff" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"></path></svg></div>
  //                     </div>`
  //     } else {
  //         var msg1 = `<div class="left-msg-container">
  //                         <div class="r-tail"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" width="8" height="13"><path opacity=".5" fill="#0000000" d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"></path><path fill="white" d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"></path></svg></div>
  //                         <div class="r-message" >
  //                             <div class="r-user"><a href="#">${user}</a></div>
  //                             <div class="r-msg">${msg}</div>
  //                             <div class="r-time">${getTime(msg_time)}</div>
  //                         </div>
  //                     </div>`
  //     }
      
  //     if (msg_time) {
  //         showDatesWeekDays(msg_time)
  //     } else {
  //         showDatesWeekDays(new Date())
  //     }

  //     newDiv.innerHTML = msg1;  

  //     // add the newly created element and its content into the DOM 
  //     let currentDiv = document.getElementById("new-message-chat"); 
  //     let parentDiv = currentDiv.parentNode;
  //     parentDiv.insertBefore(newDiv, currentDiv); 

  //     setSidebarMessage(msg_type, user, msg);

  // }

  // document.getElementById('btnClosePreviewImg').onclick = function(e) {
  //     goRoomMsg();
  // }

  // document.getElementById('btnSendImg').onclick = function(e) {
  //     sendImage();
  //     goRoomMsg();
  // }

  // document.querySelector('#add-caption-input').onkeyup = function(e) {
  //     if (e.keyCode === 13) {  // enter, return
  //         sendImage();
  //         goRoomMsg();
  //     }
  // }

  // function redirect(url) {
  //     window.location = url;
  // }

  // function goRoomMsg() {
  //     document.querySelector('#room-message').style.display = 'grid';
  //     document.querySelector('#room-preview-img').style.display = 'none';
  //     document.getElementById("snipped-big-img").src = '';
  //     document.getElementById("snipped-small-img").src = '';
  //     document.querySelector('#add-caption-input').value = '';
  //     document.querySelector('#chat-message-input').focus();
  // }

  // function setSidebarMessage(msg_type, user, msg) {
  //     // side bar message
  //     if (msg_type == 'image') {
  //         document.getElementById('rsb-g{{chatgroup.id}}').innerHTML = 'Photo';
  //     } else {
  //         document.getElementById('rsb-g{{chatgroup.id}}').innerHTML = `${user}: ${msg}`;
  //     }
  //     document.getElementById('rsb-t{{chatgroup.id}}').innerHTML = getTime();
  // }

  // function sendImage() {
  //     chatSocket.send(JSON.stringify({
  //         'message': document.getElementById("snipped-big-img").src,
  //         'message_type': 'image',
  //         'image_caption': document.querySelector('#add-caption-input').value
  //     }));
  // }

  // function showDatesWeekDays(date_created) {
  //   // add the newly created element and its content into the DOM 
    
  //   dt = new Date(date_created)

  //   if (!tempDaysWeekdays.includes(dt.toLocaleDateString())) {
  //       let newDiv = document.createElement("div"); 
  //       let currentDiv = document.getElementById("new-message-chat"); 
  //       let parentDiv = currentDiv.parentNode;
  //       let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']; 

  //       if (dt.toDateString() == new Date().toDateString()) {
  //           // display TODAY in message
  //           date_weekday = 'TODAY';
  //       } else if(dt > getDateBefore()) {
  //           // display week day in message
  //           date_weekday = days[dt.getDay()].toUpperCase()
  //       } else {
  //           // display date in message
  //           date_weekday = dt.toLocaleDateString();
  //       }

  //       newDiv.style.display = "grid";
  //       newDiv.innerHTML = `<div class="date_weekday">${date_weekday}</div>`
  //       parentDiv.insertBefore(newDiv, currentDiv); 

  //       tempDaysWeekdays.push(dt.toLocaleDateString())
  //   }

  // }

  // function getDateBefore(days=7) {
  //     // calculate the last 7 days date
  //     // 7 (days) * 24 (hours) * 60 (minutes) * 60 (seconds) * 1000 (milliseconds ) = 604800000 or 7 days in milliseconds.                
  //     daysInMs= days * 24 * 60 * 60 * 1000
  //     return new Date(Date.now() - daysInMs)
  // }

  // function loadMessage() {
  //     fetch("{% url 'chat:history' chatgroup.id %}")
  //         .then( response => response.json() )
  //         .then( data => {
  //             for (let msg of data) {
  //                 broadcastMessage(msg.message, msg.username, msg.message_type, msg.image_caption, msg.date_created)
  //             }
  //             scrollBottom()
  //         })
  // }

  // loadMessage();


}