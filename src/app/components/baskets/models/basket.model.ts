import { ProductModel } from "../../products/models/product.model";

export class BasketModel
{
    id: number = 0;
    userId: number = 0;
    productId: number = 0;
    products: ProductModel[] = [];
    price: number = 0;
    quantity: number = 1;
}