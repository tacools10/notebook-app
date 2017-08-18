import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {NotebookPage} from '../common/models/notebook-page.model';

import {NotebookService} from '../services/notebook.service';

@Component({
  selector: 'app-notebook-page',
  templateUrl: './notebook-page.component.html'
})
export class NotebookPageComponent implements OnInit {
  id = 0;
  content: string = '';
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
    if (this.id <= 5 && this.getCurrentNotebookPage(this.id) === undefined) {
      this.isSubmitting = false;
      this.id = this.id + 1;
      this.ngOnInit();
    } else if (this.getCurrentNotebookPage(this.id) !== undefined) {
      this.ngOnInit();
      this.isSubmitting = false;
      this.notebookPageForm.controls['content'].setValue(JSON.parse(
        JSON.stringify(this.getCurrentNotebookPage(this.id).content))['content']);
      this.id = this.id + 1;
    }
  }

  previous() {
    if (this.id > 0 && this.getCurrentNotebookPage(this.id) !== undefined && this.id <= 5 ) {
      this.ngOnInit();
      this.isSubmitting = false;
      this.notebookPageForm.controls['content'].setValue(JSON.parse(
        JSON.stringify(this.getCurrentNotebookPage(this.id).content))['content']);
      this.id = this.id - 1;
    } else {
      this.id = this.id - 1;
      this.ngOnInit();
      this.isSubmitting = false;
    }
  }

  submitForm() {
    this.isSubmitting = true;
    this.content = this.notebookPageForm.value;
    if (this.route.snapshot.params.id === undefined) {
      this.id = 1;
    } else {
      this.id = this.id - 1;
    }
    this.addNotebookPage(new NotebookPage(this.id, this.content));
  }
}
