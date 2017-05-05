/**
 * Created by Woods on 27/4/17.
 */

import {Injectable} from "@angular/core";
import {NetworkService} from "./network.service";

@Injectable()
export class UserService {

  constructor(private networkService: NetworkService) {}

  getCurrentUID() {
    return '012345678'
  }

  submitFeedback(feedback): Promise<any> {
    return new Promise(resolve => {
      this.networkService.makeAjax('/SubmitFeedback', (result) => {
        resolve(result)
      }, 'post', feedback)
    });

  }

  getRatingDetail(sid): Promise<{rating: number, count: number}> {
    return new Promise(resolve => {
      this.networkService.makeAjax('/Rating/'+sid, (result) => {
        let data = JSON.parse(result)['result'];
        resolve({
            rating: data['avg_rating'],
            count: data['count']
        })
      })
    });

  }

  trackUserData(cid) {
    this.networkService.makeAjax('/Track', (result) => {
    }, 'post', {
      cid: cid,
      uid: this.getCurrentUID()
    })
  }

}
