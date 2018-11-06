import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { CategoriesService } from '../../services/categories.service'; 
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages'; 
import { ValidationService } from '../../services/validation.service';  

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  postId: string;
  errMess: boolean = false;
  postData: any = {title: '', category: {title: '', orderBy: '', _id: ''}, description_short: '', description_full: ''}; 
  catsData: any;  
  showCats: boolean = false;
  newPostCat: any; 

  constructor(
    private postServ: PostsService,
    private catServ: CategoriesService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private flashMess: FlashMessagesService,
    private validServ: ValidationService
  ) { }

  ngOnInit() {
    this.activeRouter.params.subscribe(result => {
      this.postId = result.postId;
      if(this.postId == undefined || this.postId == null){
        this.errMess = true; 
      } else {
        this.getPostContent(this.postId);
        this.getCategories();  
      }
      
    }); 
  }

  getPostContent(postId){
    this.postServ.getSinglePost(postId).subscribe(post => {
      if(post.success){
        this.postData = post.result;
         
      } else {
        this.errMess = true; 
      }
    })
  }

  getCategories(){
    this.catServ.getAllCats().subscribe(cat => {
      if(cat.success){
        this.catsData = cat.result; 
      }
    })
  }

  updatePost(){
    let updatedPost = {
      title: this.postData.title,
      category: this.postData.category._id,
      description_short: this.postData.description_short,
      description_full: this.postData.description_full
    }
    


    if(!this.validServ.checkPost(updatedPost)){
      this.flashMess.show('All fields required.', {cssClass: 'alert-danger', timeout:3000});
      return false; 
    }

    this.postServ.editPost(this.postId, updatedPost).subscribe(post => {
      if(post.success){
        this.flashMess.show('Post updated.', {cssClass: 'alert-success', timeout:3000});
        this.router.navigate(['/post/'+this.postId]);
      } else {
        this.flashMess.show('Post not updated', {cssClass: 'alert-danger', timeout:3000});
      }
    }) 

  }

  editCat(){
    this.showCats = !this.showCats; 
  }

  updateCat(event){
    this.postData.category = JSON.parse(this.newPostCat); 

  }

  returnToPost(){
    this.router.navigate(['/post/'+this.postId]); 
  }

}
