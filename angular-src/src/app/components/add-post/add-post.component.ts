import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service'; 
import { ValidationService } from '../../services/validation.service';
import { PostsService } from '../../services/posts.service'; 
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  constructor(
    private catServ: CategoriesService,
    private validServ: ValidationService,
    private postServ: PostsService,
    private flashMess: FlashMessagesService,
    private router: Router
  ) { }

  catsData: any; 
  newPostTitle: string; 
  newPostCategory: string; 
  newPostDescShort: string; 
  newPostDscFull: string; 

  ngOnInit() {
    this.getAllCats(); 
  }


  getAllCats(){
    this.catServ.getAllCats().subscribe(cat => {
      if(cat.success){
        this.catsData = cat.result; 
      }
    })
  }
  
  addNewPost(){
    let newPost = {
      title: this.newPostTitle,
      category: this.newPostCategory, 
      description_short: this.newPostDescShort,
      description_full: this.newPostDscFull
    }

    if(!this.validServ.checkPost(newPost)){
      this.flashMess.show('All fields required.', {cssClass: 'alert-danger', timeout:4000});
      return false; 
    }

    this.postServ.addPost(newPost).subscribe(post => {
      if(post.success){
        this.flashMess.show('Post added', {cssClass: 'alert-success', timeout:4000});
        this.newPostTitle = ''; 
        this.newPostCategory = '';  
        this.newPostDescShort = ''; 
        this.newPostDscFull = ''; 
        this.router.navigate(['/']);
      } else {
        this.flashMess.show('Error. Post not added', {cssClass: 'alert-danger', timeout:4000});
      }
    })

  }

}
