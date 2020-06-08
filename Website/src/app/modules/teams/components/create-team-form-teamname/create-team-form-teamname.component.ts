import { Component, OnInit, OnDestroy, forwardRef } from '@angular/core';
import { FormControl, FormBuilder, Validators, ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-team-form-teamname',
  templateUrl: './create-team-form-teamname.component.html',
  styleUrls: ['./create-team-form-teamname.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CreateTeamFormTeamnameComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CreateTeamFormTeamnameComponent),
      multi: true
    }
  ]
})
export class CreateTeamFormTeamnameComponent implements ControlValueAccessor, OnDestroy, OnInit {

  
  //I would like to use the model directly?
  form: FormGroup;
  subscriptions: Subscription[] = [];

  onChange: any = () => { }; //This should get overwritten at init
  onTouched: any = () => { };

  get value(): any {
    return this.form.value;
  }

  set value(value: any) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get teamName() {
    return this.form.controls.teamName;
  }

  constructor(private formBuilder: FormBuilder) {
    // create the inner form
    this.form = this.formBuilder.group({
      teamName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.form.reset();
    }
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  // communicate the inner form validation to the parent form
  validate(_: FormControl) {
    return this.form.valid ? null : { team: { valid: false } };
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.form.disabled : this.form.enabled;
  }

}
