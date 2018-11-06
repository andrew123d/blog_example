import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';  

@Injectable()
export class CategoriesService {

  constructor(
    private http: Http
  ) { }

  getAllCats(){
    
      let headers = new Headers(); 
      headers.append('Content-Type', 'Application/json');
      return this.http.get('http://localhost:3100/api/cat', {headers: headers})
      .map(res => res.json());
  } 

  addNewCat(newCat){
    let headers = new Headers(); 
      headers.append('Content-Type', 'Application/json');
      return this.http.post('http://localhost:3100/api/cat/add', newCat, {headers: headers})
      .map(res => res.json());
  }

  editCat(catId, editedCat){
    let headers = new Headers(); 
      headers.append('Content-Type', 'Application/json');
      return this.http.put('http://localhost:3100/api/cat/edit/'+catId, editedCat, {headers: headers})
      .map(res => res.json());
  }

  deleteCat(catId){
    let headers = new Headers(); 
      headers.append('Content-Type', 'Application/json');
      return this.http.delete('http://localhost:3100/api/cat/delete_cat/'+catId, {headers: headers})
      .map(res => res.json());
  }

  getOneCat(catId){
    let headers = new Headers(); 
      headers.append('Content-Type', 'Application/json');
      return this.http.get('http://localhost:3100/api/cat/'+catId, {headers: headers})
      .map(res => res.json());
  }
}
