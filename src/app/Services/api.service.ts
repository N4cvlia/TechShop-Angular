import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  signIn(body: any) {
    return this.http.post("https://api.everrest.educata.dev/auth/sign_in", body)
  }

  signUp(body: any) {
    return this.http.post("https://api.everrest.educata.dev/auth/sign_up", body)
  }

  getAllAllProducts() {
    return this.http.get(`https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=50`)
  }

  getAllProducts(num: number) {
    return this.http.get(`https://api.everrest.educata.dev/shop/products/all?page_index=${num}&page_size=15`)
  }

  getProductById(id: any) {
    return this.http.get(`https://api.everrest.educata.dev/shop/products/id/${id}`)
  }

  getCart() {
    return this.http.get("https://api.everrest.educata.dev/shop/cart")
  }

  deleteProduct(body: any) {
    return this.http.delete("https://api.everrest.educata.dev/shop/cart/product", body)
  }

  getAuth() {
    return this.http.get("https://api.everrest.educata.dev/auth")
  }

  addtoCartPatch(body: any) {
    return this.http.patch("https://api.everrest.educata.dev/shop/cart/product", body)
  }

  addtoCartPost(body: any) {
    return this.http.post("https://api.everrest.educata.dev/shop/cart/product", body)
  }

  checkuut() {
    return this.http.post("https://api.everrest.educata.dev/shop/cart/checkout", '')
  }

  getAllCategorys() {
    return this.http.get("https://api.everrest.educata.dev/shop/products/categories")
  }

  getAllBrands() {
    return this.http.get("https://api.everrest.educata.dev/shop/products/brands")
  }

  getCategoryId(id: any) {
    return this.http.get(`https://api.everrest.educata.dev/shop/products/category/${id}?page_index=1&page_size=40`)
  }
  
  getBrandId(brand: any) {
    return this.http.get(`https://api.everrest.educata.dev/shop/products/brand/${brand}?page_index=1&page_size=40`)
  }

  getByPriceFilter(num1: number, num2: number) {
    return this.http.get(`https://api.everrest.educata.dev/shop/products/search?page_index=1&page_size=40&price_min=${num1}&price_max=${num2}`)
  }

}
