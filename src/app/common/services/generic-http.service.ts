import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {

  api:string = "http://127.0.0.1:8000/api/v1";
  token = localStorage.getItem("token");
  header = {
    headers: new HttpHeaders()
      .set('Authorization',  `Bearer ${btoa(this.token)}`)
  }

  constructor(
    private _http: HttpClient, 
    private _toastr: ToastrService,
    private _spinner: NgxSpinnerService
  ) { }

  get<T>(api: string, callBack: (res: T) => void)
  {
    this._spinner.show();
    this._http.get<T>(`${this.api}/${api}`).subscribe({
      next: (res: T) => {
        callBack(res),
        this._spinner.hide();
      },
      error: (err: HttpErrorResponse)=>{
        console.log(err.message);
        this._toastr.error(err.error.message);
        this._spinner.hide();
      }
    });
  }

  post<T>(api: string, model: any, callBack: (res: T) => void)
  {
    this._spinner.show();
    this._http.post<T>(`${this.api}/${api}`, model, {}).subscribe({
      next: (res: T) => {
        callBack(res),
        this._spinner.hide();
      },
      error: (err: HttpErrorResponse)=>{
        console.log(err.message);
        this._toastr.error(err.error.message);
        this._spinner.hide();
      }
    });
  }
  post2<T>(api: string, model: any, callBack: (res: T) => void)
  {
    this._spinner.show();
    this._http.post<T>(`${this.api}/${api}`, model, {}).subscribe({
      next: (res: T) => {
        callBack(res),
        this._spinner.hide();
      },
      error: (err: HttpErrorResponse)=>{
        console.log(err.message);
        this._toastr.error(err.error.message);
        this._spinner.hide();
      }
    });
  }
}
