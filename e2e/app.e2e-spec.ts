import { RestfulKaideePage } from './app.po';

describe('restful-kaidee App', function() {
  let page: RestfulKaideePage;

  beforeEach(() => {
    page = new RestfulKaideePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
