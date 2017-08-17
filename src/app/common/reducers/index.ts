import * as fromNotebookPages from '../reducers/notebook-pages';
import {ActionReducer, combineReducers} from '@ngrx/store';
import {compose} from '@ngrx/core';
import {Observable} from 'rxjs/Observable';

export const getCurrentPages = compose(this.getNotebookPages, this.getPages)

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

export function getNotebookPages(state$: Observable<State>) {
  return state$.select(s => s.notebookPages);
}

export function getPages(state$: Observable<State>) {
  return state$.select(state => state.notebookPages);
}
