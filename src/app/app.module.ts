import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TextMaskModule } from 'angular2-text-mask';
import { productHoverDirective } from './shared/directives/product-hover.directive';
import { Ng5SliderModule } from 'ng5-slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
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
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminSubscribersComponent } from './admin/admin-subscribers/admin-subscribers.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { ngxUiLoaderConfig } from './preloader.config';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MenComponent,
    WomenComponent,
    BrandsComponent,
    SaleComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    CartComponent,
    PaymentComponent,
    DeliveryShippingComponent,
    ReturnsComponent,
    FavoritesComponent,
    FrequentlyAskedQuestionsComponent,
    ContactUsComponent,
    ProductComponent,
    AdminComponent,
    AdminProductsAddComponent,
    AdminProductsListComponent,
    AdminCategoriesComponent,
    AdminSalesComponent,
    CheckoutComponent,
    AdminOrdersComponent,
    AdminUsersComponent,
    productHoverDirective,
    AdminSubscribersComponent,
  ],
  imports: [
    BrowserModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TextMaskModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    Ng5SliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
