import { Component } from '@angular/core';
import { SharedModule } from '../../../common/shared/shared.module';
import { BasketService } from '../../baskets/services/basket.service';
import { AuthService } from '../../auth/components/services/auth.service';
import { UserModel } from '../../auth/components/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginResponseModel } from '../../auth/components/models/login-response.model';

@Component({
  selector: 'app-navbar',
  imports: [SharedModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  user: String = "";
  
  constructor(public _basket: BasketService, public _auth: AuthService, private _toastr: ToastrService, private _router: Router)
  {
    this._basket.getCount();
    let userStr = localStorage.getItem("user");
    (userStr != '') ? this.user = JSON.parse(userStr) : '';
    console.log(this.user)
  }
  logout()
  {
    let model = new LoginResponseModel();
    /*let token = localStorage.getItem("token");
    let userStr = localStorage.getItem("user");
    let user2 = JSON.parse(userStr);
    model.token = token;
    model.user = user2;*/
    
    this._auth.logout(model, res => {
      //this._toastr.success("");
      this._router.navigateByUrl("/");
    });
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
  }
}
