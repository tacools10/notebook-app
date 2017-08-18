
import {Action} from '@ngrx/store';
import {NotebookPage} from '../models/notebook-page.model';

export const ActionTypes = {
  ADD_PAGE: 'Add a page to the notebook',
  CLEAR_PAGES:  'Refresh all of the pages',
  INCREMENT_PAGE: 'Increment the page number',
  DECREMENT_PAGE: 'Decrement the page number',
  GET_PAGES: 'Get all existing pages'
};


export class AddPageAction implements Action {
  type = ActionTypes.ADD_PAGE;
  id: number;
  content: string;

  constructor(public payload: NotebookPage) {
    this.id = payload.id;
    this.content = payload.content;
  }
}

export class ClearPagesAction implements Action {
  type = ActionTypes.CLEAR_PAGES;

  constructor(public payload: NotebookPage) {}
}

export class IncrementPageAction implements Action {
  type = ActionTypes.INCREMENT_PAGE;

  constructor(public payload: NotebookPage) {}
}

export class DecrementPageAction implements Action {
  type = ActionTypes.DECREMENT_PAGE;

  constructor(public payload: NotebookPage) {}
}

export class GetPagesAction implements Action {
  type = ActionTypes.GET_PAGES;

  constructor(public payload: any) {}
}

export type Actions = AddPageAction | ClearPagesAction |
                      IncrementPageAction | DecrementPageAction | GetPagesAction;
