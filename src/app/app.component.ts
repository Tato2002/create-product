import { Component, OnInit } from '@angular/core';
import { Product } from './Models/Product';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AddProducts';
  fireBase = 'https://angularhttp-8cfc0-default-rtdb.europe-west1.firebasedatabase.app/products.json';
  DeleteUrl = 'https://angularhttp-8cfc0-default-rtdb.europe-west1.firebasedatabase.app/products/';
  products:Product[] = []

  ngOnInit():void {
    this.getAllProducts()
    setTimeout(() => { this.ngOnInit() }, 1000 * 3)
  }

  constructor(private http:HttpClient){}

  productCreated(product: Product){
    console.log(product);
    this.http.post(this.fireBase, product)
    .subscribe((response) => {
      console.log(response)
    })
  }


  getAllProducts(){
    this.http.get<{[key: string]: Product}>(this.fireBase)
    .pipe(map((res) => {
      const products = []
        for (const key in res) {
            let product: Product = {
              pImgUrl: res[key].pImgUrl,
              pName: res[key].pName,
              pDesc: res[key].pDesc,
              pPrice: res[key].pPrice,
              id: key
            }
            products.push(product)
          }
          return products;
        })).subscribe((response) => {
          console.log(response);
          this.products = response;
        })

  }

  onProductDelete(productId: any) {
    this.http.delete(this.DeleteUrl + productId + ".json").subscribe()
  }

}
