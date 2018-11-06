import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { CategoriesService } from '../../services/categories.service'; 
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages'; 


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  postsData: any;
  errMess: boolean = false;
  catId: string;
  noPosts: boolean = false; 
  noPostsMess: string = 'There is no any posts in this category'; 
  catTitle: string;    

  constructor(
    private postServ: PostsService,
    private catServ: CategoriesService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private flashMess: FlashMessagesService
  ) { }

  ngOnInit() {
    this.activeRouter.params.subscribe(result => {
      this.catId = result.catId;
      if(this.catId == undefined || this.catId == null){
        this.errMess = true; 
      } else {
        this.getCatTitle(this.catId); 
        this.getPostsForCat(this.catId);
      }
      
    }); 
  }

  getPostsForCat(catId){
    this.postServ.getAllFromCat(catId).subscribe(cat => {
      if(cat.success){
        if(!this.countResults(cat.result)){
          this.noPosts = true; 
        } else {
          this.postsData = cat.result; 
        }
        
      } else {
        this.errMess = true; 
      }
    })
  }

  countResults(posts){
    let countPosts; 
    if(Object.keys(posts).length == undefined || Object.keys(posts).length == null){
      countPosts = posts.length; 
    } else {
      countPosts = Object.keys(posts).length; 
    }
    //console.log(countPosts)

    if(countPosts > 0){
      return true; 
    } else {
      return false; 
    }
  }

  getCatTitle(catId){
    this.catServ.getOneCat(catId).subscribe(cat => {
      
      if(cat.success){
        this.catTitle = cat.result.title; 
      } else {
        this.errMess = true; 
      }
    })
  }

  removePost(postId){
    this.postServ.removePost(postId).subscribe(post => {
      if(post.success){
        this.flashMess.show('Post removed.', {cssClass: 'alert-success', timeout:2000});
        this.getCatTitle(this.catId); 
        this.getPostsForCat(this.catId);
      } else {
        this.flashMess.show('Post not removed.', {cssClass: 'alert-danger', timeout:2000});
      }
    })
  }

}
