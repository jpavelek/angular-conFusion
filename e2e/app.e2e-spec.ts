import { AppPage } from './app.po';

describe('con-fusion App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should find "Ristorance Con Fusion" on startup', () => {
    page.navigateTo('/');
    expect(page.getParagraphText('app-root h1')).toEqual('Ristorante Con Fusion');
  });

  it('should navigate to about us page by clicking the link', () => {
    page.navigateTo('/');
    let navlink = page.getAllElements('a').get(1); // We should really try andfind the link,not hardcode
    navlink.click();
    expect(page.getParagraphText('h3')).toBe('About Us');
  });
});
