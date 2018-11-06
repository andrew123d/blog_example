import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';


// services
import { CategoriesService } from './services/categories.service'; 
import { PostsService } from './services/posts.service'; 
import { ValidationService } from './services/validation.service'; 

// components 

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CategoryComponent } from './components/category/category.component';
import { PostComponent } from './components/post/post.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';

const AppRouter: Routes = [
  {path: '', component: MainComponent },
  {path: 'category/:catId', component: CategoryComponent},
  {path: 'category-add', component: AddCategoryComponent},
  {path: 'post/:postId', component: PostComponent}, 
  {path: 'post-add', component: AddPostComponent }, 
  {path: 'post/edit/:postId', component: EditPostComponent }, 
  {path: '**', redirectTo: ''}
  ];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavbarComponent,
    CategoryComponent,
    PostComponent,
    FooterComponent,
    AddPostComponent,
    EditPostComponent,
    AddCategoryComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRouter),
    FlashMessagesModule
  ],
  providers: [
    CategoriesService, 
    PostsService,
    ValidationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
