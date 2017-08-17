import {Action, ActionReducer} from '@ngrx/store';
import {NotebookPage} from '../models/notebook-page.model';
import * as notebookpages from '../actions/notebook-page.actions';
import {Observable} from 'rxjs/Observable';
import '@ngrx/core/add/operator/select';

export interface State {
  notebookPages: NotebookPage[];
}

const initialState: State = { notebookPages: []};

export function notebookPagesReducer(state = initialState, action: notebookpages.Actions): State {
  switch (action.type) {
    case notebookpages.ActionTypes.ADD_PAGE: {
      const notebookPage: NotebookPage = action.payload;

      return {
        notebookPages: [...state.notebookPages, notebookPage]
      };
    }

    default:
      return state;
  }

}


