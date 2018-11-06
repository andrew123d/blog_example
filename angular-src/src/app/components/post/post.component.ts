import { Component, OnInit, getModuleFactory } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  postId: string;
  errMess: boolean = false;
  postData: any; 
  postValidDate: string;   

  constructor(
    private postServ: PostsService,
    private router: Router,
    private activeRouter: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activeRouter.params.subscribe(result => {
      this.postId = result.postId;
      if(this.postId == undefined || this.postId == null){
        this.errMess = true; 
      } else {
        this.getPost(this.postId); 
      }
      
    }); 
  }

  getPost(postId){
    this.postServ.getSinglePost(postId).subscribe(post => {
      if(post.success){
        this.postData = post.result;
        let postDate = new Date(this.postData.dateAdded);
        let day = postDate.getDay(); 
        let month = postDate.getMonth(); 
        let year = postDate.getFullYear(); 
        this.postValidDate = year + '/' + month + '/'+ day; 
         
      } else {
        this.errMess = true; 
      }
    })
  }

  editPost(postId){
    this.router.navigate(['/post/edit/'+postId]); 
  }

}
