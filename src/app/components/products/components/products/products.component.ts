import { Component, OnInit } from '@angular/core';
import { PaginationResultModel } from '../../../../common/models/pagination-result.model';
import { ProductModel } from '../../models/product.model';
import { RequestModel } from '../../../../common/models/request.model';
import { ProductService } from '../../services/product.service';
import { SwalService } from '../../../../common/services/swal.service';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from '../../../../common/shared/shared.module';

@Component({
  selector: 'app-products',
  imports: [SharedModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  result: PaginationResultModel<ProductModel[]> = new PaginationResultModel<ProductModel[]>();
  request: RequestModel = new RequestModel();
  pageNumbers: number[] = [];
  product: ProductModel = new ProductModel();

  constructor(
    private _product: ProductService,
    private _swal: SwalService,
    private _toastr: ToastrService
  ){}
  ngOnInit(): void {
    this.getAll();
  }

  getAll(pageNumber = 1)
  {
     this.request.pageNumber = pageNumber;
     this._product.getAll(this.request, res=>{
      console.log(res)
        this.result = res;
     })
  }

  setPageNumbers()
  {
    const startPage = Math.max(1, this.result.pageNumber - 2);
    const endPage = Math.min(this.result.totalPageCount, this.result.pageNumber + 2);
    this.pageNumbers = [];
    for(let i = startPage; i <= endPage; i++)
    {
        this.pageNumbers.push(i);
    }
  }

  search()
  {
    if(this.request.search.length >= 3)
    {
        this.getAll(1);
    }
  }

  removeById(id: number)
  {
      this._swal.callSwal("Ürünü silmek istiyor musunuz?", "Ürünü Sil", "Sil", () => {
        let model = {id: id};
        console.log('id ',id)
        this._product.removeById(id, res => {
            this._toastr.info(res.message);
            this.getAll(this.request.pageNumber);
        })
      });
  }
}
