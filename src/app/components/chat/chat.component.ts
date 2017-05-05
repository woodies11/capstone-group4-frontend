/**
 * Created by Woods and SaiRung on 27/3/17.
 *
 * This is a controller for the Chat UI
 * It handle how to display messages and also forward the
 * message to be sent to {{TBA}}.
 *
 * This class should only contain code relating to the
 * User Interface, any logic or network request should
 * be in the {{TBA}}.
 */

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as io from 'socket.io-client';
import {ChatRoom, ChatMessage, ProductDetail} from "../../../models/chat.typing";
import {ChatService} from "./chat.service";
import {UserService} from "../../services/user.service";
import {ProductService} from "../../services/product.service";
import {Product} from "../../../models/product.typing";
import {ActivatedRoute} from "@angular/router";
import {current} from "codelyzer/util/syntaxKind";
import {NetworkService} from "../../services/network.service";

@Component({
  selector: 'chat-component',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})

export class ChatComponent implements OnInit{
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  // TODO: find a way to keep these in sync with socket.io

  isMenuExpanded = false;

  // A model containing the information of the currently selected
  // conversation for HTML to display
  selectedConvo: ChatRoom = null;

  selectedProduct: Product = null;

  // A local list of conversation
  conversationList: Array<ChatRoom> = null;

  // A local list of messages in the selected conversation
  // This is only to allow the HTML to render the messages.
  // We should prioritize network's version for data.
  messages: Array<ChatMessage> = null;

  current_uid: string = '';

  rid: string = '';

  socket;

  /*
     chatService is 'injected' by AngularJS 2.
     Avoid doing complex logic inside the constructor,
     use Angular's 'ngOnInit()' instead.
  */
  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private productService: ProductService,
    private route: ActivatedRoute
  ){
  }

  // This function is ran at component's creation.
  ngOnInit(): void {

    this.current_uid = this.userService.getCurrentUID();
    this.socket = io.connect(NetworkService.ROOT_URL);



    // Request the chatService to fetch our list of conversation.
    // This may be from local cache or from the network, thus,
    // Make sure it is done in an async manner.
    this.chatService.getConversationList().then((result) => {
      this.conversationList = result;
      if (this.conversationList != null && this.conversationList.length > 0) {
        // show the top most conversation
        this.showSelected(this.conversationList[0]);

        // if iid exist in URL, search for that conversation and show it
        this.route.params.subscribe(params => {
          let iid = params['iid'];
          if(iid != null) {
            for(let convo of this.conversationList) {
              if (convo.iid == iid) {
                this.showSelected(convo)
              }
            }
          }
        });

      }

    //  socket io connect
      this.socket.emit('connected', this.current_uid);

      this.socket.on('msg_receive', (msg) => {
        if (this.rid != ChatComponent.roomId(msg)) {
          return;
        }
        this.messages.push(msg);
        this.scrollToBottom();
      })


    });
    // Once fetched and received, show the top most conversation.


    this.scrollToBottom()
  }

  // Switch the selectedConvo to the new one so the browser can render,
  // then request the list of messages from network using chatService
  showSelected(c){
    this.selectedConvo=c;

    this.rid = ChatComponent.roomId(c);

    this.productService.getProduct(c.iid).then(result => {
      this.selectedProduct = result;
    });

    this.chatService.getMessagesList(this.selectedConvo.buyer_uid, this.selectedConvo.seller_uid, this.selectedConvo.iid).then((result) => {
      this.messages = result;
    })
  }

  chatMessageInput: string;
  // TODO: let backend generate timestamp
  // FIXME: still a dummy, NO TWO WAY DATA SYNC between chatService yet.
  sendMessage(msg: string) {
    if((typeof msg !== 'undefined') && msg !== null && msg.length > 0) {
      let m: ChatMessage = {
        buyer_uid: this.selectedConvo.buyer_uid,
        seller_uid: this.selectedConvo.seller_uid,
        iid: this.selectedConvo.iid,
        message: msg,
        timestamp: (new Date()).getTime(),
        sender:this.current_uid,
        flag: 0
      };
      this.chatMessageInput = null; // clear text field
      this.emitMessage(m);
    }
  }

  toggleMenu() {
    this.isMenuExpanded = !this.isMenuExpanded;
  }

  requestRating() {
    this.toggleMenu();
    let m: ChatMessage = {
      buyer_uid: this.selectedConvo.buyer_uid,
      seller_uid: this.selectedConvo.seller_uid,
      iid: this.selectedConvo.iid,
      message: '',
      timestamp: (new Date()).getTime(),
      sender:this.current_uid,
      flag: 1
    };
    this.emitMessage(m);
  }

  sendDeliveryForm() {
    this.toggleMenu();
    let m: ChatMessage = {
      buyer_uid: this.selectedConvo.buyer_uid,
      seller_uid: this.selectedConvo.seller_uid,
      iid: this.selectedConvo.iid,
      message: '',
      timestamp: (new Date()).getTime(),
      sender:this.current_uid,
      flag: 2
    };
    this.emitMessage(m);
  }

  private emitMessage(msg){
    this.socket.emit('message', msg);
  }

  sendRating(rate) {
    console.log(rate)
  }

  formClicked() {
    console.log('form clicked');
    window.location.href = 'https://goo.gl/forms/ri1kSaoO5vgs6I5g2'
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  static roomId(chat_room): string {
    return chat_room['buyer_uid']+chat_room['seller_uid']+chat_room['iid']
  }

}
