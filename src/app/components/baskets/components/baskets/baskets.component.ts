import { Component, OnInit } from '@angular/core';
import { BasketModel } from '../../models/basket.model';
import { SharedModule } from '../../../../common/shared/shared.module';
import { BasketService } from '../../services/basket.service';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from '../../../../common/services/swal.service';
import { OrderService } from '../../../orders/services/order.service';
import { BasketProductModel } from '../../models/basket-product.model';
import { ProductModel } from '../../../products/models/product.model';

@Component({
  selector: 'app-baskets',
  imports: [SharedModule],
  templateUrl: './baskets.component.html',
  styleUrl: './baskets.component.css'
})
export class BasketsComponent implements OnInit {
  results: BasketProductModel = new BasketProductModel();
  baskets: BasketModel[];
  products: ProductModel[];
  sum: number = 0;

  constructor(private _basket: BasketService, private _toastr: ToastrService, private _swal: SwalService, private _order: OrderService){}
  
  ngOnInit(): void {
    this.getAll();
  }

  getAll()
  {
    this._basket.getAll(res => {
      this.baskets = res.baskets;
      this.products = res.products;
      this.calculate();
    });
  }

  calculate()
  {
    this.sum = 0;
    this.baskets.forEach(element => {
      this.sum += (element.price * element.quantity);
    });
  }

  removeById(id: number)
  {
    this._swal.callSwal("Ürünü sepetten silmek istiyor musunuz?", "Ürünü Sil", "Sil",() =>
    {
      let model = {id: id};
      this._basket.removeById(model, res => {
        this._toastr.info(res.message);
        this.getAll();
      });
    });
  }

  createOrder()
  {
    this._swal.callSwal("Ürünleri almak istiyor musunuz?", "Ürünleri Al", "Ödeme Yap", () => 
    {
      let userStr = localStorage.getItem("user");
      let user = JSON.parse(userStr);
      let model = {userId: user.id, baskets: this.baskets};
      this._order.create(model, res => {
          this._toastr.success(res.message);
          this.getAll();
      });
    });
  }
}
