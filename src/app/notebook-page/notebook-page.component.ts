import {AfterViewChecked, AfterViewInit, Component, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NotebookPage} from '../common/models/notebook-page.model';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import * as fromRoot from '../common/reducers';
import * as notebookpages from '../common/actions/notebook-page.actions';
import {NotebookService} from '../services/notebook.service';

@Component({
  selector: 'app-notebook-page',
  templateUrl: './notebook-page.component.html'
})
export class NotebookPageComponent implements OnInit {
  id = 0;
  index = 1;
  content: string = '';
  notebookPage: NotebookPage;
  notebookPages: Observable<NotebookPage[]>;
  notebookPagesArray: NotebookPage[];
  type: string = '';
  isSubmitting: boolean = false;
  notebookPageForm: FormGroup;

  constructor(

    private _store: Store<fromRoot.State>,
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
    console.log(this.id);
    console.log(this.notebookService.notebookPages.length);
    if (this.id < 5 && this.notebookService.notebookPages.length <= this.id + 2) {
      this.isSubmitting = false;
      this.id = this.id + 1;
      this.ngOnInit();
    } else {
      this.ngOnInit();
      if (this.getCurrentNotebookPage(this.id) !== undefined) {
        this.notebookPageForm.controls['content'].setValue(this.getCurrentNotebookPage(this.id).content);
      }
    }
  }

  previous() {
    if (this.id > 0 && this.notebookService.notebookPages.length > 1) {
      this.id = this.id - 1;
      this.isSubmitting = false;
      this.ngOnInit();
      console.log(this.getCurrentNotebookPage(this.id).content);
      // this.notebookPageForm.controls['content'].setValue(this.getCurrentNotebookPage(this.id).content);
    }
  }

  submitForm() {
    this.isSubmitting = true;
    this.content = this.notebookPageForm.value;
    if (this.route.snapshot.params.id === undefined) {
      // console.log('in');
      this.id = this.notebookService.notebookPages.length;
    } else {
      this.id = parseInt(this.route.snapshot.params.id, 10) + 1 ;
      // console.log("snapshot not undefined");
      // console.log(this.id);
    }
    this.addNotebookPage(new NotebookPage(this.id, this.content));
  }
}
