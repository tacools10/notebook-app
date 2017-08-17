import {Component, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {NotebookPage} from '../common/models/notebook-page.model';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import * as fromRoot from '../common/reducers';
import * as notebookpages from '../common/actions/notebook-page.actions';

@Component({
  selector: 'app-notebook-page',
  templateUrl: './notebook-page.component.html'
})
export class NotebookPageComponent implements OnChanges, OnInit {
  id = 0;
  content: string = '';
  notebookPage: NotebookPage;
  notebookPages: Observable<NotebookPage[]>;
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
    this.notebookPages = this._store.select(fromRoot.getNotebookPages);
  }


  addNotebookPage(notebookPage) {
    this._store.dispatch(new notebookpages.AddPageAction({
      id: ++this.id,
      content: this.content
    })
    );
  }

  ngOnInit() {
    this.notebookPageForm = this.fb.group({
      content: new FormControl('', [Validators.required, Validators.minLength(1)])
    });
  }

  ngOnChanges() {
    this.route.url.subscribe(data => {
      if (data.length !== 0) {
        this.type = data[data.length - 1].path;
      } else {
        this.type = data[0].path;
      }
      console.log(this.type);


    });
  }

  submitForm() {
    this.isSubmitting = true;
    console.log(this.id);
    this.notebookPage.id = ++this.id;
    this.notebookPage.content = this.notebookPageForm.value.content;
    console.log(this.notebookPage.id);
    console.log(this.notebookPage.content);
    this.addNotebookPage(this.notebookPage);
  }
}
