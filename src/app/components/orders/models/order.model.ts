import { ProductModel } from "../../products/models/product.model";

export class OrderModel{
    id: number = 0;
    productId: number = 0;
    products: ProductModel[] = [];
    price: number = 0;
    quantity: number = 0;
    createdDate: string = "";
    userId: number = 0;
}