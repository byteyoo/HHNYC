import { ClarityPage } from './app.po';

describe('clarity App', () => {
  let page: ClarityPage;

  beforeEach(() => {
    page = new ClarityPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
