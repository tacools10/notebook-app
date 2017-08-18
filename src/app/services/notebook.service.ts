import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {NotebookPage} from '../common/models/notebook-page.model';
import {Http} from '@angular/http';


@Injectable()
export class NotebookService {
  private currentPageSubject = new BehaviorSubject<NotebookPage>(new NotebookPage(0, ''));
  public currentPage = this.currentPageSubject.asObservable();
  public notebookPages: NotebookPage[];

  constructor (
    private http: Http
  ) {}

  setPage(notebookPage: NotebookPage) {
    this.currentPageSubject.next(notebookPage);
    if (this.notebookPages !== undefined) {
      if (this.notebookPages.length <= 6) {
        this.notebookPages.push(notebookPage);
      }
    } else { this.notebookPages = [notebookPage]; }
    console.log(this.notebookPages);
  }

  getCurrentPage(index: number): NotebookPage {
    if (this.notebookPages !== undefined ) {
      return this.notebookPages.find(notebookPage => notebookPage.id === index);
    }
  }

}
