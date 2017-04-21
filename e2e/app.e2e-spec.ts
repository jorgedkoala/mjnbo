import { Mjnbo2Page } from './app.po';

describe('mjnbo2 App', () => {
  let page: Mjnbo2Page;

  beforeEach(() => {
    page = new Mjnbo2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
