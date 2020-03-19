import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rgb-hex-convertor';
  form: FormGroup;
  hexCode: string;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      red: [null, [Validators.required, Validators.min(0), Validators.max(255), this.validateValue]],
      green: [null, [Validators.required, Validators.min(0), Validators.max(255), this.validateValue]],
      blue: [null, [Validators.required, Validators.min(0), Validators.max(255), this.validateValue]]
    });
  }

  convertToHex() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    let hex = '';
    Object.values(this.form.value).forEach((num) => {
      hex += this.intToHex(num);
    });

    this.hexCode = '#' + hex;
  }

  validateValue(control: FormControl) {
    if (control.value && control.value < 0 || control.value > 255) {
      return { outOfBounds: true };
    }
  }

  private intToHex(num) {
    let hex = Number(num).toString(16);
    if (hex.length < 2) {
      hex = '0' + hex;
    }
    return hex;
  }
}
