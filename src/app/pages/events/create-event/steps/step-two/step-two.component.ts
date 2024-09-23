import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { saveStep2 } from '@stores/event/event.actions';
import { ROUTES } from '@utils/routes.constants';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent implements OnInit {

  step2Form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private store: Store<any>) { }

  ngOnInit() {
    this.step2Form = this.formBuilder.group({
      location: ['', Validators.required],
      date: ['', Validators.required],
      price: ['', Validators.required],
      products: this.formBuilder.array([this.createProduct()]),
      capacity: ['', Validators.required],
    });

    // this.step2Form.valueChanges.pipe(
    //   debounceTime(300)
    // ).subscribe(formData => {
    //   this.store.dispatch(saveStep2({ step2Data: formData }));
    // });

    this.store.select('eventState').subscribe(event => {
      if (event && event.step2) {
        this.step2Form.patchValue(event.step2, { emitEvent: false });
      }
    });
  }

  get products(): FormArray {
    return this.step2Form.get('products') as FormArray;
  }

  createProduct(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      maxSellable: ['', [Validators.required, Validators.min(1)]]
    });
  }

  addProduct() {
    this.products.push(this.createProduct());
  }

  removeProduct(index: number) {
    this.products.removeAt(index);
  }

  goNext() {
    this.store.dispatch(saveStep2({ step2Data: this.step2Form.value }));
    this.router.navigate([ROUTES.CREATE_EVENT_STEP_3]);
  }

  goBack() {
    this.router.navigate([ROUTES.CREATE_EVENT_STEP_1]);
  }
}
