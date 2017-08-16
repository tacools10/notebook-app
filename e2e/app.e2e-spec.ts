import { NotebookAppPage } from './app.po';

describe('notebook-app App', () => {
  let page: NotebookAppPage;

  beforeEach(() => {
    page = new NotebookAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
