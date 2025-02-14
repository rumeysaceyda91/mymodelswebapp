import { CategoryModel } from "../../categories/models/category.model";

export class ProductModel
{
    id: number = 0;
    name: string = "";
    categories: CategoryModel[] = [];
    stock: number = 0;
    price: number = 0;
    isActive: boolean = true;
    createdDate: string= "";
    imageUrls: any[] = [];
}