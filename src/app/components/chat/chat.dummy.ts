import {ChatRoom, ChatMessage, ProductDetail} from "../../../models/chat.typing";
/**
 * Created by Woods on 4/4/17.
 */

// TODO: may need to include Product being discussed, price, etc. ? or should they be separated?
// export const conversationList =  [
//     {rid:1,iid:100,sender_name:'aa',msg:'test01',timestamp:847830746000,profile_pic:"/assets/img/member-profile-avatar.png"},
//     {rid:2,iid:200,sender_name:'bb',msg:'test02',timestamp:847830746000,profile_pic:"/assets/img/member-profile-avatar.png"},
//     {rid:3,iid:300,sender_name:'cc',msg:'test03',timestamp:847830746000,profile_pic:"/assets/img/member-profile-avatar.png"},
//     {rid:4,iid:400,sender_name:'dd',msg:'test04',timestamp:847830746000,profile_pic:"/assets/img/member-profile-avatar.png"},
//     {rid:5,iid:500,sender_name:'ee',msg:'test05',timestamp:847830746000,profile_pic:"/assets/img/member-profile-avatar.png"},
//     {rid:6,iid:600,sender_name:'ff',msg:'test06',timestamp:847830746000,profile_pic:"/assets/img/member-profile-avatar.png"},
//     {rid:7,iid:700,sender_name:'gg',msg:'test07',timestamp:847830746000,profile_pic:"/assets/img/member-profile-avatar.png"}];
//
//
// export let messages = [
//     {title:'', msg:'yes', timestamp:847830746000, sender:1, flag: 0},
//     {title:'', msg:'this', timestamp:847830747000, sender:1, flag: 0},
//     {title:'', msg:'does work', timestamp:847830945000, sender:1, flag: 0},
//     {title:'', msg:'try sending some messages', timestamp:847831746000, sender:0, flag: 0},
//     {title:'', msg:'using the textbox below', timestamp:847831846000, sender:0, flag: 0},
//     {title:'', msg:'though UI at the top still a bit buggy', timestamp:847841846000, sender:1, flag: 0},
//     {title:'', msg:'and messages are not stored', timestamp:847851846000, sender:1, flag: 0},
//     {title:'', msg:'since there is no database yet', timestamp:847855846000, sender:1, flag: 0},
//     {title:'', msg:`TEST long paragraph, Duis mollis, est non commodo
//     luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
//     Aenean lacinia bibendum nulla sed consectetur. Maecenas sed diam eget
//     risus varius blandit sit amet non magna. Donec sed odio dui.`, timestamp: 847958846000, sender: 1, flag: 0},
//     {title:'', msg:'', timestamp:847855846000, sender:0, flag: 1},
//     {title:'', msg:'', timestamp:847855846000, sender:0, flag: 2}
//   ];

export const products = {
    100: {iid: 100, price: -99999999, name: 'a', img_id: 'favicon.ico'},
    200: {iid: 200, price: 50, name: 'b', img_id: 'favicon.ico'},
    300: {iid: 300, price: 0.25, name: 'c', img_id: 'favicon.ico'},
    400: {iid: 400, price: 0.25, name: 'd', img_id: 'favicon.ico'},
    500: {iid: 500, price: 0.25, name: 'e', img_id: 'favicon.ico'},
    600: {iid: 600, price: 0.25, name: 'f', img_id: 'favicon.ico'},
    700: {iid: 700, price: 0.25, name: 'KAIDEE', img_id: 'favicon.ico'}
};

