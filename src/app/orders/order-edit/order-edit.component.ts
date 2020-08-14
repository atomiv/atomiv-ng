// Reactive Forms in Angular: Dynamically Creating Form Fields With FormArray

import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, FormArray, NgForm, Validators } from '@angular/forms';

import { OrderService } from '../shared/order.service';
import { CustomerService } from '../../customers/shared/customer.service';
import { IOrder } from '../shared/order';
import { ICustomer } from '../../customers/shared/customer';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {

  public auxConfigform: FormGroup;
  AUX = [
    {
      Description: "asd",
      TempSensor: true,
      SpaceAvg: false,
      SwitchStatus: false
    },
    {
      Description: "",
      TempSensor: true,
      SpaceSnr: true,
      SwitchStatus: false
    },
  ];
  auxGroup: FormArray;


// ------------------
  form: FormGroup;
  showLabel = [];

  options: any = [ 
    { "key" : "set", "value": "Set" },
    { "key" : "wait", "value": "Wait" },
    { "key" : "go", "value": "Go" }
    ];

// -------------------------
  // jc
  order: IOrder;
  orders: IOrder[] = [];

  // customer form field dropdown
  customers: ICustomer[] = [];
  customer: ICustomer;

  orderForm: FormGroup;
  // dataPreloaded = [{
  //   id: 1,
  //   quantity: 500
  // },
  // {
  //   id: 2,
  //   quantity: 600
  // }];



  //
  orderItemsGroup: FormArray;
  //
  items: FormArray;

  // below not used
  id: number;
  firstName: string;
  quantity: number;
  // notes: string;

  isLoadingResults = false;

  // private fb:FormBuilder
  constructor(private router: Router,
    private route: ActivatedRoute,
    private service: OrderService,
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit() {


    // jc
    this.getOrderDetails(this.route.snapshot.params['id']);

    this.getOrder(this.route.snapshot.params['id']);



    const arryOfAuxGroup = this.AUX.map(item => {
      return this.createauxGroup(
        item.Description,
        item.TempSensor,
        item.SpaceAvg,
        item.SwitchStatus
      );
    });
    this.auxConfigform = this.formBuilder.group({
      aux: this.formBuilder.array(arryOfAuxGroup)
    });



    this.form = this.formBuilder.group({
      credentials: this.formBuilder.array([]),
    });


    this.orderForm = this.formBuilder.group({
      'id' : [null, Validators.required],
      'customerId' : [null, null],
      orderItems: this.formBuilder.array([]),
      // orderItems form group
      // orderItems2: this.formBuilder.group({
      //     id: [null, null],
      //     // name: ['', [Validators.maxLength(500)]]
      //     quantity: [null, null]
      //   }),

      // Our items instance is a form array instead of a form control, and we’re calling
      // a createItem method to create a form group as the first item in our array
      /* items: this.formBuilder.array([ this.createItem() ]) */

      // orderItems: this.formBuilder.array([
      //   // some examples - empty below
      //   this.newOrderItem()
      // ]),

    });

    // customers form field dropdown
    this.customerService.getCustomers()
      .subscribe((customers: ICustomer[]) => {
        this.customers = customers;
      });

    // readonly
    this.orderForm.controls['id'].disable();


    // this.loadOrderItems();

  }

  // ------------------------------------
  // loadOrderItems() {

  //   const hobb = this.orderForm.controls.orderItems as FormArray;

  //   this.dataPreloaded.forEach( orderItem => {
  //     hobb.push(this.formBuilder.group({
  //       id: orderItem.id,
  //       quantity: orderItem.quantity,
  //     }));
  //   });
  // }


  addOrderItems() {
    const hobb = this.orderForm.controls.orderItems as FormArray;
    hobb.push(this.formBuilder.group({
      id: '',
      quantity: '',
    }));
  }
  // ------------------------------------------------
  get auxArray() {
    return this.auxConfigform.get('aux')['controls'] as FormArray;
  }
  createauxGroup(description, tempSensor, spaceAvg, switchStatus) {
    return this.formBuilder.group({
      description: [description, Validators.maxLength(50)],
      tempSensor: [tempSensor],
      spaceAvg: [spaceAvg],
      switchStatus: [switchStatus]
    });
  }
  // -----------------------------------------------
  addCreds() {
    const creds = this.form.controls.credentials as FormArray;
    creds.push(this.formBuilder.group({
      action: '',
      name: '',
      label: {disabled: true, value: ""}
    }));
  }

  changeAction(e, index) {
    console.log(e, index);
    if(e === 'set' || e === 'go') {

      // this.form
    //  this.form.get('credentials').at(index).get('label').enable();
      // this.form.get('lable').enable
    } else {
      this.showLabel[index] = false;
      // this.form.get('credentials').at(index).get('label').disable();
    }
  }

  trackFn(index) {
    return index;
  }
  // ------------------------------------------------

  // // just write orderItems(): FormArray
  // get orderItems(): FormArray {
  //   return this.orderForm.get('orderItems') as FormArray;
  // }

  // // createItem
  // newOrderItem(): FormGroup {
  //   return this.formBuilder.group({
  //     id: '',
  //     quantity: ''
  //   });
  // }

  // addOrderItem() {
  //   // this.arr = this.myForm.get('arr') as FormArray;
  //   this.orderItems.push(this.newOrderItem());
  // }

  // removeOrderItem(i: number) {
  //   this.orderItems.removeAt(i);
  // }

  // onSubmit() {
  //   console.log(this.orderForm.value);
  // }


  // so this works {{ order.customerId }}
  getOrderDetails(id) {
    this.service.getOrder(id)
      .subscribe(data => {
        this.order = data;
        console.log(this.order);
        this.isLoadingResults = false;
      });
  }


  getOrder(id) {

    this.service.getOrder(id).subscribe(data => {
      this.id = data.id;

      const hobb = this.orderForm.controls.orderItems as FormArray;

      // this.dataPreloaded.forEach( orderItem => {
      //   hobb.push(this.formBuilder.group({
      //     id: orderItem.id,
      //     quantity: orderItem.quantity,
      //   }));
      // });

      // mmm ... get form array reference
      // const orderItems = this.orderForm.get('orderItems') as FormArray;
      // mmm ... empty form array
      // while (orderItems.length) {
      //   orderItems.removeAt(0);
      // }

      // data.orderItems.forEach(orderItem => orderItems.push(this.formBuilder.group(orderItem)));
      data.orderItems.forEach( orderItem => {
        hobb.push(this.formBuilder.group({
            // orderItem
          id: orderItem.id,
          quantity: orderItem.quantity
        }));
      });

      // patchValue setValue
      this.orderForm.setValue(
        // mmm
        // data

        {
        id: data.id,
        // Must supply a value for form control with name: 'customerId'
        customerId: data.customerId,
        // set FormGroup value from database

        orderItems: [
          {
            id: 1,
            quantity: 2000
          },
          {
            id: 4,
            quantity: 500
          }
        ],

      }

      );
      // data.orderItems.forEach(orderItem => orderItems.push(this.formBuilder.group(orderItem)));

    });
  }

  onFormSubmit(form: NgForm) {
    let id = this.id;
    this.isLoadingResults = true;
    this.service.updateOrder(this.id, form)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/orders', id]);
      // TODO: Remove err, instead use the global handlers
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );


  }

  orderDetails() {
    this.router.navigate(['/orders', this.id]);
  }

}



















/*
initStaff() {
        return this.fb.group({
            StaffServiceID: [''],
            StaffID: [''],
            Name: ['']
        });
    }

    */


          // id: [null, null],
      // name: ['', [Validators.maxLength(500)]]
      // orderItemId: [this.id, '']
      // position: ['', Validators.required],
      // chk: [this.orderItem.id, null]
      // email: '',


/* -------------------------------------------------------
      quantities(): FormArray {
    return this.productForm.get('quantities') as FormArray;
  }

  newQuantity(): FormGroup {
    return this.formBuilder.group({
      qty: '',
      price: '',
    });
  }

  addQuantity() {
    this.quantities().push(this.newQuantity());
  }

  removeQuantity(i: number) {
    this.quantities().removeAt(i);
  }

  onSubmit() {
    console.log(this.productForm.value);
  }
  */

/* ------------------------------------------------------------
this.form = this.formBuilder.group({
      published: true,
      credentials: this.formBuilder.array([]),
    });


  addCreds() {
    const creds = this.form.controls.credentials as FormArray;
    creds.push(this.formBuilder.group({
      username: '',
      password: '',
    }));
  }
*/


/* --------------------------------------------------------------
    // cities form
    this.citiesForm = this.formBuilder.group({
      name: '',
      // contacts: this.fb.array([this.newCity()])
      cities: this.formBuilder.array([])
    });

    get cities(): FormArray {
    return this.citiesForm.get('cities') as FormArray;
  }

  newCity(): FormGroup {
    return this.formBuilder.group({
      city: '',
      exp: ''
    });
  }

  addCities() {
    this.cities.push(this.newCity());
  }

  removeCity(i: number) {
    this.cities.removeAt(i);
  }

  onSubmit4() {
    // console.log(this.citiesForm.value);
  }

  // citiesform
export class Country {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
    */

/* ---------------------------------------------------------
    this.orderForm2 = new FormGroup({
      firstName: new FormControl('Nancy', Validators.minLength(2)),
      lastName: new FormControl('Drew'),
      specialRequests: new FormArray([
        new FormControl(null)
      ])
    });
*/

/* --------------------------------------------------
  // using ORDER FORM
  createItem(): FormGroup {
    return this.formBuilder.group({
      id: '',
      quantity: ''
    });
  }

  // Now it’s as simple as calling our addItem method in our template when the user clicks to add a new item.
  addItem(): void {
    this.items = this.orderForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }
*/

/* -------------------------------------------
  // onAddSpecialRequest () {
  //   this.orderForm.controls
  //   .specialRequests.push(new FormControl(null));
  // }

  // onRemoveSpecialRequest (index) {
  //   this.orderForm.controls['specialRequests'].removeAt(index);
  // }

  // onAddSpecialRequest () {
  //   this.orderForm.controls
  //   .specialRequests.push(new FormControl(null));
  // }

  // onRemoveSpecialRequest (index) {
  //   this.orderForm.controls['specialRequests'].removeAt(index);
  // }
*/



/* ------------------------------------------------------------
If the value of a property is an Object(like address), then we'll create a FormGroup for it.
If the value of a property is an Array(like posts), then we'll create a FormArray for it.
If the value of a property is a primitive(like id, name, isVerified etc), we'll create a FormControl for it.
*/
