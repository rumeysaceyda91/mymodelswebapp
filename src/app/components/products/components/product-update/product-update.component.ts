import { Component } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { CategoryModel } from '../../../categories/models/category.model';
import { CategoryService } from '../../../categories/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product-update',
  imports: [SharedModule],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.css'
})
export class ProductUpdateComponent {
  categories: CategoryModel[] = [];
  images: File[] = [];
  imageUrls: any[] = [];
  productId: number = 0;
  product: ProductModel = new ProductModel();

  constructor(
    private _category: CategoryService,
    private _toastr: ToastrService,
    private _product: ProductService,
    private _router: Router,
    private _activated: ActivatedRoute
  )
  {
    this._activated.params.subscribe(res => {
      this.productId = res["value"];
      this.getById();
    })
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getById(){
    let model = {id : this.productId};
    this._product.getById(model, res => this.product = res);
  }

  getCategories()
  {
    this._category.getAll(res => this.categories = res);
  }

  getImages(event: any)
  {
      const file: File[] = Array.from(event.target.files);
      this.images.push(...file);

      for(let i = 0; i < event.target.files.length; i++)
      {
          const element = event.target.files[i];
          const reader = new FileReader();
          reader.readAsDataURL(element);
          reader.onload = () => {
            const imageUrl = reader.result as string;
            this.addImage(imageUrl, file);
          }
      }
  }
  addImage(imageUrl: string, file: any)
  {
      this.imageUrls.push(
        {imageUrl: imageUrl, name: file.name, size: file.size}
      );
  }

  add(form: NgForm)
  {
      if(form.value["categoriesSelect"].length == 0)
      {
          this._toastr.error("Kategori seçimi yapmadınız!!");
          return;
      }

      if(form.valid)
      {
          let product = form.value;
          let categories: string[] = product["categoriesSelect"];
          let name = product["name"];
          let price = product["price"];
          let stock = product["stock"];
          price = price.toString().replace(",", ".");
          let formData = new FormData();
          formData.append("name", name);
          formData.append("stock", stock);
          formData.append("price", price);

          for(const category of categories)
          {
            formData.append("categories", category);
          }
          for(const image of this.images)
            {
              formData.append("images", image, image.name);
            }
            this._product.add(formData, res => {
                this._toastr.success(res.message);
                form.reset();
                this.imageUrls = [];
            });
        }
  }

  deleteImage(id: number, index: number)
  {
    let model = {
      id: id,
      index: index
    };

    this._product.removeImageByProductIdAndIndex(model, res => {
      this._toastr.warning(res.message);
      this.getById();
    });
  }
}