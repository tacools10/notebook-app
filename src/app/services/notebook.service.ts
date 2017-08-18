import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {NotebookPage} from '../common/models/notebook-page.model';
import {Http} from '@angular/http';


@Injectable()
export class NotebookService {
  private currentPageSubject = new BehaviorSubject<NotebookPage>(new NotebookPage(0, ''));
  public currentPage = this.currentPageSubject.asObservable();

  constructor (
    private http: Http
  ) {}

  setPage(notebookPage: NotebookPage) {
    this.currentPageSubject.next(notebookPage);
  }

  getCurrentPage(): NotebookPage {
    return this.currentPageSubject.value;
  }

}
