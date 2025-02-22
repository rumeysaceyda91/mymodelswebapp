import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../common/services/generic-http.service';
import { MessageResponseModel } from '../../../common/models/message.response.model';
import { BasketService } from '../../baskets/services/basket.service';
import { OrderModel } from '../models/order.model';
import { OrderProductModel } from '../models/order-product.model';
import { ProductModel } from '../../products/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http: GenericHttpService, private _basket: BasketService) { }

  create(model:any, callBack: (res: MessageResponseModel) => void)
  {
    this._http.post<MessageResponseModel>("orders/create", model, res => {
        this._basket.getCount();
        callBack(res);
    });
  }

  getAll(callBack: (res: OrderProductModel) => void)
  {
    let userStr = localStorage.getItem("user");
    let user = JSON.parse(userStr);
    let model = {userId: user.id};
    this._http.post<OrderProductModel>("orders", model, res => {
        callBack(res);
        console.log(res)
    });
  }
}
