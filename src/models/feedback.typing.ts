/**
 * Created by Andy on 8/4/17.
 *
 * Feedback is the form received from the user after he or she completed the form.
 * This can only be done after the user has bought the product.
 *
 *
 * This file merely contain a `type` interface for Feedback.
 * It serves only to tell the compiler to check if a given object
 * meets its specification.
 */

 export class Feedback {
   buyerID: string;
   sellerID: string;
   productID: string;
   score: number;
   comment: string;
   constructor(b: string, s: string, p: string, score: number, comment: string) {
     this.buyerID = b;
     this.sellerID = s;
     this.productID = p;
     this.score = score;
     this.comment = comment;
   }
 }

 export interface ReviewForm {
   buyerN: string;
   sellerN: string;
   sellerID: string;
   buyerID: string;
   numberOfReviews: number;
   productN: string;
   productP: number;
   productID: string;
   img_urls: string;
   score: number;
 }
