/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */

    /* Make sure there is at least one feed.
     */
    it('allFeeds variable has been defined', () => {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* Each feed item must have a URL.
     */
    it('each feed has a URL defined', () => {
      for (let i in allFeeds) {
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url.length).not.toBe(0);
      };
    });

    /* Each feed item must have a name.
     */
    it('each feed has a name defined', () => {
      for (let i in allFeeds) {
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name.length).not.toBe(0);
      };
    });
  });

  describe('The menu', () => {
    it('ensure the menu element is hidden by default', () => {
      /* Select the body elemtent and make sure it has
       * the menu-hidden class assigned.
       */
      const pageBody = document.querySelector('body');
      expect(pageBody.classList.contains('menu-hidden')).toEqual(true);
    });

    /* Select the menu-icon-link and body.
     * If a click happens, the body will contain a menu-hidden class.
     * If clicked again, the class should be removed.
     */
    it('menu changes visibility when clicked', () => {
      const menuClick = document.querySelector('.menu-icon-link');
      const menuBody = document.querySelector('body');
      menuClick.click();
      expect(menuBody.classList.contains('menu-hidden')).toBe(false);
      menuClick.click();
      expect(menuBody.classList.contains('menu-hidden')).toBe(true);
    });
  });

  describe('Initial Entries', function() {

    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    /* Each feed container entry should have at least something in it.
     */
    it('ensure at least a single entry in the feed container', () => {
      const entry = document.querySelector('.entry');
      const feed = document.querySelector('.feed');
      /* First make sure the .feed container
       * has a class of .entry.
       */
      expect(entry, feed).toBeDefined();
      /* Then get the amount of entries in the feed container and
       * make sure the amount is greater than zero.
       */
      expect($('.feed .entry').length).toBeGreaterThan(0);
    });


  });

  describe('New Feed Selection', function() {
     /* Before the spec runs grab the first feed HTML and then
      * grab the HTML of the feed when the content is updated
      * and compare that they are different.
      */
    let feed1, feed2;

    beforeEach(done => {
      loadFeed(0, () => {
        feed1 = document.querySelector('.feed').innerHTML;
        loadFeed(1, () => {
          feed2 = document.querySelector('.feed').innerHTML;
          done();
        });
      });
    });

    it('when new feed is loaded content changes', function() {
      expect(feed2).not.toBe(feed1);
    });

  });

}());
