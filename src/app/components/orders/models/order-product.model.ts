import { ProductModel } from "../../products/models/product.model";
import { OrderModel } from "./order.model";

/*export class OrderProductModel{
    products: ProductModel[] = [];
    orders: OrderModel[] = [];
}*/

export class OrderProductModel
{
    orders: OrderModel[];
    products: ProductModel[];
}