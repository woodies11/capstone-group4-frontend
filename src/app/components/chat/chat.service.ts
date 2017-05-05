/**
 * Created by Woods on 4/4/17.
 */

import {products} from './chat.dummy';
import {Injectable} from "@angular/core";
import {ChatRoom, ChatMessage} from "../../../models/chat.typing";
import {UserService} from "../../services/user.service";
import {NetworkService} from "../../services/network.service";


/*
  TODO: make this a Promise
 */

@Injectable()
export class ChatService {

  constructor(
    private userService: UserService,
    private networkService: NetworkService
  ){}

  getConversationList(): Promise<Array<ChatRoom>> {
    return new Promise(resolve => {
      this.networkService.makeAjax('/ChatRooms/' + this.userService.getCurrentUID(), (result) => {
        resolve(JSON.parse(result)['result'])
      })
    })
  }

  getMessagesList(buyer_uid:string, seller_uid: string, iid: string): Promise<Array<ChatMessage>> {
    return new Promise(resolve => {
      this.networkService.makeAjax('/ChatMessages', (result) => {
        resolve(JSON.parse(result)['result'])
      }, 'post', {
        buyer_uid: buyer_uid,
        seller_uid: seller_uid,
        iid: iid
      })
    })
  }

  createChatRoom(bid: string, sid: string, iid: string): Promise<string> {
    return new Promise(resolve => {
      this.networkService.makeAjax('/CreateChatRoom', (result) => {
        resolve(JSON.parse(result)[result]);
      }, 'post', {
        bid: bid,
        sid: sid,
        iid: iid
      })
    })
  }

}
