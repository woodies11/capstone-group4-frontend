/**
 * Created by Woods on 28/4/17.
 */

import {Injectable} from "@angular/core";

@Injectable()
export class NetworkService {

  // TODO: how to make this a const?
  static ROOT_URL = 'http://localhost:5000';

  public makeAjax(path: string, callback, method='get', payload={}) {
    console.log('[Ajax] Call '+path);
    let request = new XMLHttpRequest();
    request.onload = function() {
      console.log('[Ajax] Resolve '+path);
      callback(this.responseText);
    };
    request.open(method, NetworkService.ROOT_URL + path, true);
    if (method === 'post') {
      request.setRequestHeader("Content-type", "application/json;charset=UTF-8");
      request.send(JSON.stringify(payload));
    } else {
      request.send();
    }
  }

}
