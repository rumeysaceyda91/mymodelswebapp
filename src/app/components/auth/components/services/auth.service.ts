import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../../common/services/generic-http.service';
import { LoginResponseModel } from '../models/login-response.model';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: GenericHttpService
  ) { }

  login(model: LoginModel, callBack: (res: LoginResponseModel) => void)
  {
    this._http.post<LoginResponseModel>("login", model, res => callBack(res));
  }
  register(model:RegisterModel, callBack: (res: LoginResponseModel) => void)
  {
    this._http.post<LoginResponseModel>("register", model, res => callBack(res));
  }
  public logout(model: LoginResponseModel, callBack: (res: LoginResponseModel) => void)
  {
    this._http.post<LoginResponseModel>("logout", model, res => callBack(res));
  }
}
