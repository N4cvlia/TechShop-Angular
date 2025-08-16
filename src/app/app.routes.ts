import { Routes } from '@angular/router';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { RegisterPageComponent } from './Pages/register-page/register-page.component';
import { ShopPageComponent } from './Pages/shop-page/shop-page.component';
import { CartPageComponent } from './Pages/cart-page/cart-page.component';
import { ProductPageComponent } from './Pages/product-page/product-page.component';
import { guardsGuard } from './Guards/guards.guard';
import { guard2Guard } from './Guards/guard2.guard';
import { productPageResolver } from './Resolvers/product-page.resolver';
import { shopPageResolver } from './Resolvers/shop-page.resolver';
import { cartPageResolver } from './Resolvers/cart-page.resolver';
import { ProfilePageComponent } from './Pages/profile-page/profile-page.component';
import { profilePageResolver } from './Resolvers/profile-page.resolver';

export const routes: Routes = [
    {path: "", component: LandingPageComponent},
    {
        path: "Login",
        loadComponent: () => import("./Pages/login-page/login-page.component")
        .then(m => m.LoginPageComponent),
        canActivate: [guardsGuard]
    },
    {
        path: "Register",
        loadComponent: () => import("./Pages/register-page/register-page.component")
        .then(m => m.RegisterPageComponent),
        canActivate: [guardsGuard]
    },
    {
        path: "Profile",
        loadComponent: () => import("./Pages/profile-page/profile-page.component")
        .then(m => m.ProfilePageComponent),
        canActivate: [guard2Guard],
        resolve: {
            authInfo : profilePageResolver
        }
    },    
    {
        path: "Shop",
        component: ShopPageComponent,
        resolve: {
            allProducts: shopPageResolver
        }
    },
    {
        path: "Cart",
        loadComponent: () => import("./Pages/cart-page/cart-page.component")
        .then(m => m.CartPageComponent),
        canActivate: [guard2Guard],
        resolve: {
            cartProducts: cartPageResolver
        }
    },
    {
        path: "Details",
        component: ProductPageComponent,
        resolve: {
            productDetails: productPageResolver
        },
        runGuardsAndResolvers: "paramsOrQueryParamsChange"
    },
    {path: "**", redirectTo: ""}
];
