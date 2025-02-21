import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { OrderModel } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { OrderProductModel } from '../../models/order-product.model';
import { ProductModel } from '../../../products/models/product.model';

@Component({
  selector: 'app-orders',
  imports: [SharedModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  results: OrderProductModel = new OrderProductModel();
  orders: OrderModel[];
  products: ProductModel[];
  constructor(private _order: OrderService)
  {}
  ngOnInit(): void {
    this._order.getAll(res => {
      this.orders = res.orders; 
      this.products = res.products
    });
  }
}
