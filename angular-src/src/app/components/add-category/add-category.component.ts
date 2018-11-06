import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service'; 
import { ValidationService } from '../../services/validation.service';
import { PostsService } from '../../services/posts.service'; 
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  newCatOrder: number; 
  newCatTitle: string; 

  constructor(
    private catServ: CategoriesService,
    private validServ: ValidationService,
    private postServ: PostsService,
    private flashMess: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  addNewCat(){
    let newCat = {
      title: this.newCatTitle,
      orderBy: this.newCatOrder
    }

    if(!this.validServ.checkCat(newCat)){
      this.flashMess.show('All fields required.', {cssClass: 'alert-danger', timeout:3000});
      return false; 
    }

    this.catServ.addNewCat(newCat).subscribe(cat => {
      if(cat.success){
        this.flashMess.show('Category added', {cssClass: 'alert-success', timeout:3000});
        this.router.navigate(['/']); 
      } else {
        this.flashMess.show('Category not added', {cssClass: 'alert-danger', timeout:3000});
        return false; 
      }
    })
  }


  skipCat(){
    this.router.navigate(['/'])
  }

}
