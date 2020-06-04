import { Component, OnInit, OnDestroy, forwardRef } from '@angular/core';
import { FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormBuilder, Validator, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

export interface CreateTeamFormValues {
  teamName: string;
}

@Component({
  selector: 'app-create-team-form',
  templateUrl: './create-team-form.component.html',
  styleUrls: ['./create-team-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CreateTeamFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CreateTeamFormComponent),
      multi: true
    }
  ]
})
export class CreateTeamFormComponent implements ControlValueAccessor, OnDestroy {

  //I would like to use the model directly?
  form: FormGroup;
  subscriptions: Subscription[] = [];

  onChange: any = () => { console.log('ON CHANGE');
  };
  onTouched: any = () => {  console.log('ON TOUCH');
};

  get value(): any {
    return this.form.value;
  }

  set value(value: any) {
    console.log('SET VALUE');
    console.log(value);
    
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get teamNameControl() {
    return this.form.controls.teamName;
  }

  constructor(private formBuilder: FormBuilder) {
    // create the inner form
    this.form = this.formBuilder.group({
      teamName: ['',Validators.required],
    });

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
    console.log('REGISTER CHANGES');
    console.log(this.form)

    this.onChange = fn;
  }

  writeValue(value: any) {
    console.log('WRITE VALUE');
    
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.form.reset();
    }
  }


  registerOnTouched(fn: any) {
    console.log('REGISTER TOUCHED');
    console.log(this.form)
    
    this.onTouched = fn;
  }

  // communicate the inner form validation to the parent form
  validate(_: FormControl) {
    console.log('VALIDATE');
    console.log(this.form.valid);
    return this.form.valid ? null : { team: { valid: false } };
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.form.disabled : this.form.enabled;
  }

}
