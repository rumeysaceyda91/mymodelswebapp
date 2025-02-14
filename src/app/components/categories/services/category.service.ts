import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../common/services/generic-http.service';
import { CategoryModel } from '../models/category.model';
import { MessageResponseModel } from '../../../common/models/message.response.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http: GenericHttpService) { }

  getAll(callBack: (res: CategoryModel[]) => void)
  {
    this._http.get<CategoryModel[]>("categories", res => callBack(res));
  }

  add(name: string, callBack: (res: MessageResponseModel) => void)
  {
    let model = {name: name};
    this._http.post<MessageResponseModel>("categories/add", model, res => callBack(res));
  }

  update(model: CategoryModel, callBack: (res:MessageResponseModel)=> void){    
    this._http.post<MessageResponseModel>("categories/update",model, res=> callBack(res));
  }
  
  removeById(id: number, callBack: (res: MessageResponseModel) => void)
  {
    let model = {id: id};
    this._http.post<MessageResponseModel>("categories/removeById/" + model.id, model, res => callBack(res));
  }
}
