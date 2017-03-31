import { UnimicroProjectPage } from './app.po';

describe('unimicro-project App', () => {
  let page: UnimicroProjectPage;

  beforeEach(() => {
    page = new UnimicroProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
