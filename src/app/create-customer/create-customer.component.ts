import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { CreateCustomerService } from "./create-customer.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-customer",
  templateUrl: "./create-customer.component.html",
  styleUrls: ["./create-customer.component.css"]
})
export class CreateCustomerComponent implements OnInit {

  constructor(private fb: FormBuilder, public toastr: ToastrService, private service: CreateCustomerService, private router: Router) { }
  submitted: boolean = false;
  createCustomerForm = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    mobile: ["", [Validators.required, Validators.minLength(10)]],
    email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    age: ["", [Validators.required]],
    location: ['', Validators.required]
  });

  get f() { return this.createCustomerForm.controls; }
  public isEdit: boolean = false

  ngOnInit() {
    if (history.state.action == 'edit') {
      this.isEdit = true;
      this.getCustomerById(history.state.id)
    }
  }

  public customerObj: any = {}
  getCustomerById(id: any) {
    this.service.getCustomerById(id).subscribe(response => {
      console.log('get response: ', response)
      this.customerObj = response
      this.createCustomerForm.patchValue({
        name: response.name,
        age: response.age,
        mobile: response.mobile,
        location: response.location,
        email: response.email
      })
    })
  }

  createCustomer() {
    this.submitted = true
    console.log("form value " + JSON.stringify(this.createCustomerForm.value));
    if (this.createCustomerForm.valid) {
      this.service.insertCustomer(this.createCustomerForm.value).subscribe(response => {
        console.log('response received: ', response)
        this.toastr.success("Customer Creation Success!");
        this.reset();
      })
    } else {
      this.toastr.error("This is not a valid form.", "Alert!");
    }
  }

  updateCustomer() {
    this.submitted = true
    console.log("form value " + JSON.stringify(this.createCustomerForm.value));
    if (this.createCustomerForm.valid) {
      this.service.updateCustomer(this.createCustomerForm.value, this.customerObj['_id']).subscribe(response => {
        console.log('response received: ', response)
        this.toastr.success("Customer Updation Success!");
        this.router.navigateByUrl('/customer-details');
      })
    } else {
      this.toastr.error("This is not a valid form.", "Alert!");
    }
  }

  numericOnly(event: any): boolean {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }

  alphabetsOnly(event: any): void {
    const inputChar = String.fromCharCode(event.charCode);
    if (!/^[a-zA-Z]+$/.test(inputChar)) {
      event.preventDefault();
    }
  }

  reset() {
    this.submitted = false;
    this.createCustomerForm.reset()
  }
}
