import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notebook-page',
  templateUrl: './notebook-page.component.html'
})
export class NotebookPageComponent implements OnInit {
  content: String = '';
  count: number = 0;
  type: String = '';
  isSubmitting: boolean = false;
  notebookPageForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.notebookPageForm = this.fb.group({
      'content': '',
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      if (this.type === 'next') {
        this.notebookPageForm.reset();
        this.count = this.count + 1;
      }
    });
  }

  submitForm() {
    this.isSubmitting = true;
  }
}
