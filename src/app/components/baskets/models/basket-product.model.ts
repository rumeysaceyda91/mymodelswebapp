import { ProductModel } from "../../products/models/product.model";
import { BasketModel } from "./basket.model";

export class BasketProductModel
{
    baskets: BasketModel[];
    products: ProductModel[];
}