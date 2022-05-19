import { CustomerService } from './../services/customer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../model/customer.model';
import { Router } from '@angular/router';

@Component({
  selector : 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
  newCustomerFomGroup! : FormGroup;

  constructor(private fb : FormBuilder,private customerService:CustomerService , private router : Router) { }

  ngOnInit(): void {
    
    this.newCustomerFomGroup=this.fb.group({
      name: this.fb.control(null,[Validators.required,Validators.minLength(4)]),
      email:this.fb.control(null,[Validators.required,Validators.email]),
    });
  
  }

  handleSaveCustomer(){
    let customer : Customer = this.newCustomerFomGroup.value;
    this.customerService.saveCustomers(customer).subscribe({
      next : data => {
        alert("Customer has been successfully saved !");
        // this.newCustomerFomGroup.reset()
        this.router.navigateByUrl("customers");

      },
      error : err =>{
        console.log(err);
      }
    })
  }

}
