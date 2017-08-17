import {AfterViewChecked, AfterViewInit, Component, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NotebookPage} from '../common/models/notebook-page.model';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import * as fromRoot from '../common/reducers';
import * as notebookpages from '../common/actions/notebook-page.actions';
import {isUndefined} from "util";

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
    private router: Router,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.notebookPageForm = this.fb.group({
      'content': '',
    });
    this.notebookPages = this._store.select(fromRoot.getCurrentPages);
  }


  addNotebookPage(notebookPage: NotebookPage) {
    this._store.dispatch(new notebookpages.AddPageAction({
      id: this.id,
      content: this.content
    })
    );
  }

  ngOnInit(): void {
    this.notebookPageForm = this.fb.group({
      content: new FormControl('', [Validators.required, Validators.minLength(1)])
    });
  }

  next() {
    if (this.id < 5) {
      this.isSubmitting = false;
      console.log(this.id);
      this.id = this.id + 1;
      this.ngOnInit();
    }
  }

  previous() {
    if (this.id > 0) {
      this.id = this.id - 1;
      this.isSubmitting = false;
      console.log(this.id);
      this.ngOnInit();
      this.notebookPageForm.setValue(this.notebookPages.subscribe(data => data.map(entry => entry[0])));
    }
  }

  submitForm(): number {
    this.isSubmitting = true;
    this.content = this.notebookPageForm.value;
    if (this.route.snapshot.params.id === undefined) {
      console.log('in');
      this.id = 1;
    } else {
      this.id = parseInt(this.route.snapshot.params.id, 10);
      console.log("snapshot not undefined");
      console.log(this.id);
    }
    this.addNotebookPage(new NotebookPage(this.id, this.content));
    return this.id;
  }
}
