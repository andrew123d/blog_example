import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { PostsService } from '../../services/posts.service'; 
import { Router } from '@angular/router';  
import { FlashMessagesService } from 'angular2-flash-messages'; 

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  catData: any;
  showErr: boolean = false;  

  constructor(
    private postServ: PostsService,
    private catServ: CategoriesService,
    private router: Router,
    private flashMess: FlashMessagesService
  ) { }

  ngOnInit() {
    this.getAllCats(); 
  }

  getAllCats(){
    this.catServ.getAllCats().subscribe(cat => {
      
      if(cat.success){
        this.catData = cat.result; 
      } else {
        this.showErr = true; 
      }
    })
  }

  addCat(){
    this.router.navigate(['/category-add'])
  }

  removeCat(catId){
    this.postServ.getAllFromCat(catId).subscribe(cat => {

      if(cat.success){
        let countPosts; 
        if(Object.keys(cat.result).length == undefined || Object.keys(cat.result).length == null){
          countPosts = cat.result.length; 
        } else {
          countPosts = Object.keys(cat.result).length; 
        }
        
        if(countPosts > 0){
          this.flashMess.show('There is posts in this category. You can not delete category which contains posts.', {cssClass: 'alert-danger', timeout:3000});
          return false; 
        } else{
          this.catServ.deleteCat(catId).subscribe(cat => {
            if(cat.success){
              this.flashMess.show('Category removed.', {cssClass: 'alert-success', timeout:3000});
              this.getAllCats();
            } else {
              this.flashMess.show('Category not removed.', {cssClass: 'alert-danger', timeout:3000});
            }
          })
        }

      } else {
        this.flashMess.show('Category not removed.', {cssClass: 'alert-danger', timeout:3000});
        return false; 
      }
    })

    
  }

}
