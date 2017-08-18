import {AfterViewChecked, AfterViewInit, Component, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NotebookPage} from '../common/models/notebook-page.model';

import {NotebookService} from '../services/notebook.service';

@Component({
  selector: 'app-notebook-page',
  templateUrl: './notebook-page.component.html'
})
export class NotebookPageComponent implements OnInit {
  id = 1;
  index = 1;
  content: string = '';
  type: string = '';
  isSubmitting: boolean = false;
  notebookPageForm: FormGroup;

  constructor(

    private route: ActivatedRoute,
    private notebookService: NotebookService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.notebookPageForm = this.fb.group({
      'content': '',
    });
  }


  addNotebookPage(notebookPage: NotebookPage) {
    this.notebookService.setPage(notebookPage);
  }

  getCurrentNotebookPage(index: number): NotebookPage {
    return this.notebookService.getCurrentPage(index);
  }

  ngOnInit(): void {
    this.notebookPageForm = this.fb.group({
      content: new FormControl('', [Validators.required, Validators.minLength(1)])
    });
  }

  next() {
    // console.log(this.id);
    // console.log(this.notebookService.notebookPages.length);
    if (this.id <= 5 && this.getCurrentNotebookPage(this.id) === undefined) {
      this.isSubmitting = false;
      this.id = this.id + 1;
      this.ngOnInit();
    } else {
      this.ngOnInit();
      if (this.getCurrentNotebookPage(this.id) !== undefined) {
        console.log(this.getCurrentNotebookPage(this.id).content);
        this.notebookPageForm.controls['content'].setValue(this.getCurrentNotebookPage(this.id).content);
        console.log(this.notebookPageForm.controls['content'].value);
      }
    }
  }

  previous() {
    console.log(this.id);
    console.log(this.getCurrentNotebookPage(this.id - 1));
    if (this.id > 0 && this.getCurrentNotebookPage(this.id - 1) !== undefined) {
      this.id = this.id - 1;
      this.ngOnInit();
      this.notebookPageForm.controls['content'].setValue(this.getCurrentNotebookPage(this.id).content);
    } else {
      this.ngOnInit();
      this.isSubmitting = false;
    }
  }

  submitForm() {
    this.isSubmitting = true;
    this.content = this.notebookPageForm.value;
    if (this.route.snapshot.params.id === undefined) {
      // console.log('in');
      this.id = this.notebookService.notebookPages.length;
    } else {
      this.id = this.id - 1;
    }
    this.addNotebookPage(new NotebookPage(this.id, this.content));
  }
}
