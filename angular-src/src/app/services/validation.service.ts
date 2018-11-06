import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

  constructor() { }

  checkPost(post){
    if(post.title == undefined || post.title == null || post.title.length < 1 ||
    post.category == undefined || post.category == null || post.category.length < 1 ||
    post.description_short == undefined || post.description_short == null || post.description_short.length < 1 ||
    post.description_full == undefined || post.description_full == null || post.description_full.length < 1 
    ){
      return false; 
    } else {
      return true; 
    }
  }

  checkCat(newCat){
    if(newCat.title == undefined ||
       newCat.title == null ||
       newCat.title.length < 1 ||
       newCat.orderBy == undefined ||
       newCat.orderBy == null){
        return false; 
    } else {
      return true; 
    }
  }

}
