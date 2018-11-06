import { Injectable } from '@angular/core';
import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';  

@Injectable()
export class PostsService {

  constructor(
    private http: Http
  ) { }

  getPosts(){
    let headers = new Headers(); 
    headers.append('Content-Type', 'Application/json');
    return this.http.get('http://localhost:3100/api/posts/', {headers: headers})
    .map(res => res.json());
  }

  addPost(newPost){
    let headers = new Headers(); 
    headers.append('Content-Type', 'Application/json');
    return this.http.post('http://localhost:3100/api/posts/add_post', newPost, {headers: headers})
    .map(res => res.json());
  }

  editPost(postId, editedPost){
    let headers = new Headers(); 
    headers.append('Content-Type', 'Application/json');
    return this.http.put('http://localhost:3100/api/posts/edit_post/'+postId, editedPost, {headers: headers})
    .map(res => res.json());
  }

  removePost(postId){
    let headers = new Headers(); 
    headers.append('Content-Type', 'Application/json');
    return this.http.delete('http://localhost:3100/api/posts/delete_post/'+postId, {headers: headers})
    .map(res => res.json());
  }

  getAllFromCat(catId){
    let headers = new Headers(); 
    headers.append('Content-Type', 'Application/json');
    return this.http.get('http://localhost:3100/api/posts/'+catId, {headers: headers})
    .map(res => res.json());
  }

  getSinglePost(postId){
   
    let headers = new Headers(); 
    headers.append('Content-Type', 'Application/json');
    return this.http.get('http://localhost:3100/api/posts/post/'+postId, {headers: headers})
    .map(res => res.json());
  }

}
