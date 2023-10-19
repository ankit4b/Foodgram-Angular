import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  cart !: Cart;

  addressData = {
    firstName : '',
    lastName : '',
    phone: '',
    email: '',
    pincode: '',
    landmark: '',
    city: '',
    state: ''
  }

  constructor( private cartService: CartService){
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
  }

  placeOrder(){
    Swal.fire("Thank You for your order...", "Payment is not yet integrated", "success")
  }
  
}
