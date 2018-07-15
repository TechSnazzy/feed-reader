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


    /* TODO: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */

    /* Each feed item must have a URL
     */
    it('each feed has a URL defined', () => {
      for (let i in allFeeds) {
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url.length).not.toBe(0);
      };
    });


    /* TODO: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */

    /* Each feed item must have a name
     */
    it('each feed has a name defined', () => {
      for (let i in allFeeds) {
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name.length).not.toBe(0);
      };
    });
  });

  /* TODO: Write a new test suite named "The menu" */
  describe('The menu', () => {
    /* TODO: Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    it('ensure the menu element is hidden by default', () => {
      /* Select the body elemtent and make sure it has
       * the menu-hidden class assigned.
       */
      const pageBody = document.querySelector('body');
      expect(pageBody.classList.contains('menu-hidden')).toEqual(true);
    });

    /* TODO: Write a test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */

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

  /* TODO: Write a new test suite named "Initial Entries" */
  describe('Initial Entries', function() {
    /* TODO: Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
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
      expect(entry, feed).toBeDefined();
    });


  });

  /* TODO: Write a new test suite named "New Feed Selection" */
  describe('New Feed Selection', function() {
    /* TODO: Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */

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
