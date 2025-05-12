import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ShopPageComponent } from './shop-page/shop-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { ProductPageComponent } from './product-page/product-page.component';

export const routes: Routes = [
    {path: "", component: LandingPageComponent},
    {path: "Login", component: LoginPageComponent},
    {path: "Register", component: RegisterPageComponent},
    {path: "Shop", component: ShopPageComponent},
    {path: "Cart", component: CartPageComponent},
    {path: "Details", component: ProductPageComponent}
];
