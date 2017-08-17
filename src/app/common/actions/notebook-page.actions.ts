
import {Action} from '@ngrx/store';
import {NotebookPage} from '../models/notebook-page.model';

export const ActionTypes = {
  ADD_PAGE: 'Add a page to the notebook',
  CLEAR_PAGES:  'Refresh all of the pages',
  INCREMENT_PAGE: 'Increment the page number',
  DECREMENT_PAGE: 'Decrement the page number'
};


export class AddPageAction implements Action {
  type = ActionTypes.ADD_PAGE;

  constructor(public payload: NotebookPage) {}
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

export type Actions = AddPageAction | ClearPagesAction |
                      IncrementPageAction | DecrementPageAction;
