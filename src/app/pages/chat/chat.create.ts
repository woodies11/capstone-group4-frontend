/**
 * Created by Woods on 27/4/17.
 */

import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {ChatService} from "../../components/chat/chat.service";

@Component({
  selector: 'chat-create',
  template: '',
  providers: [ChatService]
})

export class ChatCreate {

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private chatService: ChatService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {-
      this.chatService.createChatRoom(this.userService.getCurrentUID(),
        params['sid'], params['iid']).then((result) => {
        this.router.navigate(['/chat', params['iid']])
      })

    });

  }

}
