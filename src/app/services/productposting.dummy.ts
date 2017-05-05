/**
 * Created by Donya on 4/5/2017 AD.
 */

import {Category, DeliveryOption, ProvinceCities} from "../../models/product.typing";

export const categoryList: Array<Category> = [
    {cid:"001",name:"บ้าน"},
    {cid:"002",name:"พระเครื่อง"},
    {cid:"003",name:"หนังสือ"}
] ;

export const serviceList: Array<DeliveryOption> = [
    {sid:"1",name:"Kerry Express"},
    {sid:"2",name:"Line Man"},
    {sid:"3",name:"DHL"}
];

export const selectableAddressList: Array<ProvinceCities> = [
  {province: "กรุงเทพ", cities: [
    "a",
    "b",
    "c"
  ]},
  {province: "ปทุมธานี", cities: [
    "d",
    "e",
    "f"
  ]},
  {province: "จันทบุรี", cities: [
    "g",
    "h",
    "i"
  ]},
  {province: "เชียงใหม่", cities: [
    "j",
    "k",
    "l"
  ]}
];
