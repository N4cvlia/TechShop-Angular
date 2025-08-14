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

export const routes: Routes = [
    {path: "", component: LandingPageComponent},
    {path: "Login", component: LoginPageComponent, canActivate: [guardsGuard]},
    {path: "Register", component: RegisterPageComponent, canActivate: [guardsGuard]},
    {
        path: "Shop",
        component: ShopPageComponent,
        resolve: {
            allProducts: shopPageResolver
        }
    },
    {
        path: "Cart",
        component: CartPageComponent,
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
    }
];
