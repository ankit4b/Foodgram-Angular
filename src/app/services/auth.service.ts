import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router: Router) { }


  getToken(): string | null {
    return localStorage.getItem('token')
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  login(email: string, password: string){
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      console.log("Login Successful")
      this.router.navigate(['cart-page'])
    }, err => {
      console.log("Something went wrong", err);
      this.router.navigate(['/login']);
    })
  }

  signInWithGoogle(){
    this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {
      localStorage.setItem('token', JSON.stringify(res.user?.uid));
      this.router.navigate(['cart-page'])
    }, err => {
      console.log("error : ",err)
    })

  }

  registration(email: string, password: string){
    this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      console.log("Registration Successful")
      this.router.navigate(['cart-page'])
    }, err => {
      console.log("Something went wrong",err);
      this.router.navigate(['/login']);
    })
  }

  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login'])
    }, err => {
      alert(err)
    })
  }
}
