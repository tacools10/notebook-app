import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {NotebookPage} from '../common/models/notebook-page.model';


@Injectable()
export class NotebookService {
  private currentPageSubject = new BehaviorSubject<NotebookPage>(new NotebookPage(0, ''));
  public notebookPages: NotebookPage[];

  constructor (
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
