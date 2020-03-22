import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as CSSBeautify from 'cssbeautify';

declare const CodeMirror;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'css-beautifier';
  form: FormGroup;
  hexCode: string;

  inputEditor: any;
  outputEditor: any;

  @ViewChild('output') output: ElementRef;
  @ViewChild('input') input: ElementRef;
  @ViewChild('submitButton') submitButton: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.inputEditor = CodeMirror.fromTextArea(this.input.nativeElement, {
      lineNumbers: true
    });
    this.outputEditor = CodeMirror.fromTextArea(this.output.nativeElement, {
      lineNumbers: true
    });
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }

  beautify() {
    const inputValue = this.inputEditor.getDoc().getValue();
    if (!inputValue) {
      return;
    }
    const test = CSSBeautify(inputValue);
    this.outputEditor.getDoc().setValue(test);
    window.scrollTo({ left: 0, top: this.submitButton.nativeElement.offsetTop, behavior: 'smooth' });

  }
}
