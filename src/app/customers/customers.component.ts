import { Router } from '@angular/router';
import { CustomerService } from './../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']

})
export class CustomersComponent implements OnInit {
  customers! : Observable<Array<Customer>> ;
  errorMessage! : String;
  searchformGroup : FormGroup | undefined;

  constructor(private customerService : CustomerService , 
              private fb : FormBuilder,
              private router : Router   ) { }

  ngOnInit(): void {
    this.searchformGroup= this.fb.group({
      keyword : this.fb.control("")
    })
    this.handleSearchCustomers(); // qst                                 
  }

  handleSearchCustomers(){

    let kw=this.searchformGroup?.value.keyword;
    this.customers = this.customerService.searchCustomers(kw).pipe(
      catchError(err =>{
        this.errorMessage=err.message;
        return throwError(err);
      })
    );   
  }
  handleDeleteCustomer(c : Customer){
    let conf = confirm("Are you?")
    if(!conf) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next : resp =>{
      //this.handleSearchCustomers;
       this.customers=this.customers.pipe(
         map(
           data =>{
             let index = data.indexOf(c);
             data.slice(index,1)
             return data;
           }
         )
       )
      },
      error : err => {
        console.log(err);
        
      }
    })
  }
  handleCustomerAcconts(c: Customer){
    this.router.navigateByUrl("/customer-accounts/"+c.id,{state:c})
  }

}
