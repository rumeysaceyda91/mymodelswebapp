import { Injectable } from '@angular/core';
import { BasketModel } from '../models/basket.model';
import { GenericHttpService } from '../../../common/services/generic-http.service';
import { MessageResponseModel } from '../../../common/models/message.response.model';
import { BasketProductModel } from '../models/basket-product.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  count: number = 0;

  constructor(
    private _http: GenericHttpService
  ) { }

  getAll(callBack: (res: BasketProductModel)=> void){
    let userString = localStorage.getItem("user");
    let user = JSON.parse(userString);
    let model = {userId: user.id};
    this._http.post<BasketProductModel>("baskets", model, res=> callBack(res));
  }

  getCount(){
      let userString = localStorage.getItem("user");
      let user = JSON.parse(userString);
      let model = {userId: user.id};
      this._http.post<any>("baskets/getCount", model, res=> this.count = res.count);
  }

  add(model:BasketModel, callBack: (res: MessageResponseModel)=> void){
    let userString = localStorage.getItem("user");
    let user = JSON.parse(userString);
    model.userId = user.id;
    this._http.post<MessageResponseModel>("baskets/add",model, res=>{
      this.getCount();
      callBack(res);
    });
  }

  removeById(model:any, callBack: (res: MessageResponseModel)=> void){    
    this._http.post<MessageResponseModel>("baskets/removeById/" + model.id,model, res=> {
      this.getCount();
      callBack(res);
    });
  }
}