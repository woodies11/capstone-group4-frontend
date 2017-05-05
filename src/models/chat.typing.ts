/**
 * Created by Woods on 4/4/17.
 *
 * ChatMessage is the most basic type of a message sent and
 * receive in the chat
 *
 * This file merely contain a `type` interface for ChatMessage.
 * It serves only to tell the compiler to check if a given object
 * meets its specification.
 */

export interface ChatMessage {
  buyer_uid: string;
  seller_uid: string;
  iid: string;
  message: string;
  timestamp: number;
  sender: string;
  flag: number;
}

export interface ChatRoom {
  seller_uid: string,
  buyer_uid: string,
  iid: string;
  sender_name: string;
  msg: string;
  timestamp: number;
  profile_pic: string;
}

// might be able to remove
export interface ProductDetail{
  iid: number;
  price: number;
  name: string;
  img_id: string;
}
