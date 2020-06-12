import { Component, OnInit, forwardRef, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, FormBuilder, FormControl, ControlValueAccessor, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

export interface SearchTeamFormTeamNameValues {
  teamName: string;
  teamNameExact: boolean;
}

@Component({
  selector: 'app-search-team-form-team-name',
  templateUrl: './search-team-form-team-name.component.html',
  styleUrls: ['./search-team-form-team-name.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchTeamFormTeamNameComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SearchTeamFormTeamNameComponent),
      multi: true
    }
  ]
})
export class SearchTeamFormTeamNameComponent implements ControlValueAccessor, OnInit, OnDestroy {


  //I would like to use the model directly?
  form: FormGroup;
  subscriptions: Subscription[] = [];

  onChange: any = () => { }; //This should get overwritten at init
  onTouched: any = () => { };

  get value(): SearchTeamFormTeamNameValues {
    return this.form.value;
  }

  set value(value: SearchTeamFormTeamNameValues) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get teamName() {
    return this.form.controls.teamName;
  }

  get teamNameExact() {
    return this.form.controls.teamNameExact;
  }

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({ //I have no idea why this is not initalised, only when the user clicks on it
      teamName: [],
      teamNameExact: []
    });
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form.valueChanges.subscribe(value => { //Here we can also do formatting magic
       
        if(this.teamNameExact.value){ //Format to regEx
          value = '^'+this.teamName.value+'$'
        } else {
          value = this.teamName.value
        }
        
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
