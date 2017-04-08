import { BlueHopPage } from './app.po';

describe('blue-hop App', () => {
  let page: BlueHopPage;

  beforeEach(() => {
    page = new BlueHopPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
