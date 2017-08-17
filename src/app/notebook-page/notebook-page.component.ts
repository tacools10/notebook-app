import {Component, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NotebookPage} from '../common/models/notebook-page.model';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import * as fromRoot from '../common/reducers';
import * as notebookpages from '../common/actions/notebook-page.actions';

@Component({
  selector: 'app-notebook-page',
  templateUrl: './notebook-page.component.html'
})
export class NotebookPageComponent implements OnInit {
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

  ngOnInit(): void {
    this.notebookPageForm = this.fb.group({
      content: new FormControl('', [Validators.required, Validators.minLength(1)])
    });
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }



  submitForm() {
    this.isSubmitting = true;
    console.log(this.id);
    this.notebookPage = new NotebookPage(this.id + 1, this.notebookPageForm.value);
    console.log(this.notebookPage.id);
    console.log(this.notebookPage.content);
    this.addNotebookPage(this.notebookPage);
  }
}
