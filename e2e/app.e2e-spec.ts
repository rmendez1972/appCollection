import { AppTramitesPage } from './app.po';

describe('app-tramites App', function() {
  let page: AppTramitesPage;

  beforeEach(() => {
    page = new AppTramitesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
