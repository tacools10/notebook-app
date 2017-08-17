import * as fromNotebookPages from '../reducers/notebook-pages';
import {ActionReducer, combineReducers} from '@ngrx/store';
import {compose} from '@ngrx/core';

export const getNotebookPages = compose(fromNotebookPages.getNotebookPages, fromNotebookPages.getPages)

export interface State {
  notebookPages: fromNotebookPages.State;
}

const reducers = {
  notebookPages: fromNotebookPages.notebookPagesReducer,
};

const combinedReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  return combinedReducer(state, action);
}





