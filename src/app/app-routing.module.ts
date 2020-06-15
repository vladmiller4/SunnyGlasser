import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { MenComponent } from './pages/men/men.component';
import { WomenComponent } from './pages/women/women.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { SaleComponent } from './pages/sale/sale.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AccountComponent } from './pages/account/account.component';
import { CartComponent } from './pages/cart/cart.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { DeliveryShippingComponent } from './pages/delivery-shipping/delivery-shipping.component';
import { ReturnsComponent } from './pages/returns/returns.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { FrequentlyAskedQuestionsComponent } from './pages/frequently-asked-questions/frequently-asked-questions.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ProductComponent } from './pages/product/product.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

import { AdminComponent } from './admin/admin.component';
import { AdminProductsAddComponent } from './admin/admin-products-add/admin-products-add.component';
import { AdminProductsListComponent } from './admin/admin-products-list/admin-products-list.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminSalesComponent } from './admin/admin-sales/admin-sales.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminSubscribersComponent } from './admin/admin-subscribers/admin-subscribers.component';
import { AuthenticationGuard } from './shared/guards/authentication.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'men', component: MenComponent },
  { path: 'women', component: WomenComponent },
  { path: 'brands', component: BrandsComponent },
  { path: 'sale', component: SaleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountComponent },
  { path: 'cart', component: CartComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'delivery-shipping', component: DeliveryShippingComponent },
  { path: 'returns', component: ReturnsComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'frequently-asked-questions', component: FrequentlyAskedQuestionsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'checkout', component: CheckoutComponent },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthenticationGuard], children: [
      { path: '', pathMatch: 'full', redirectTo: 'admin-products-add' },
      { path: 'admin-products-add', component: AdminProductsAddComponent },
      { path: 'admin-products-list', component: AdminProductsListComponent },
      { path: 'admin-categories', component: AdminCategoriesComponent },
      { path: 'admin-sales', component: AdminSalesComponent },
      { path: 'admin-orders', component: AdminOrdersComponent },
      { path: 'admin-subscribers', component: AdminSubscribersComponent }
    ]
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
