/* app.js
 *
 * This is our RSS feed reader application. It originally used Udacity's
 * rsstojson.udacity.com proxy to convert RSS feeds into JSON at request
 * time. That proxy was retired along with the rest of the course
 * infrastructure and no longer resolves, so there's no live network
 * fetch happening here anymore.
 *
 * Instead, loadFeed() reads a static snapshot bundled in data/feeds.json
 * so the app (menu, templating, tests) still works end to end without
 * depending on any external service or account. The `url` field per
 * feed is kept for reference/display; it's not fetched at runtime.
 */

// The names and URLs to all of the feeds we'd like available.
var allFeeds = [
  {
    name: 'Udacity Blog',
    url: 'http://blog.udacity.com/feed'
  },
  {
    name: 'CSS Tricks',
    url: 'http://feeds.feedburner.com/CssTricks'
  },
  {
    name: 'HTML5 Rocks',
    url: 'http://feeds.feedburner.com/html5rocks'
  },
  {
    name: 'Linear Digressions',
    url: 'http://feeds.feedburner.com/udacity-linear-digressions'
  }
];

/* This function starts up our application, loading the first
 * feed we've defined (index of 0).
 */
function init() {
  loadFeed(0);
}

/* This function performs everything necessary to load a feed
 * from the static data/feeds.json snapshot (see note above). It
 * performs all of the DOM operations required to display feed
 * entries on the page. Feeds are referenced by their index
 * position within the allFeeds array.
 * This function also supports a callback as the second parameter
 * which will be called after everything has run.
 */
function loadFeed(id, cb) {
  var feedName = allFeeds[id].name;

  $.getJSON('data/feeds.json')
    .done(function(result) {
      var container = $('.feed'),
        title = $('.header-title'),
        entries = result.feeds[id].entries,
        entryTemplate = Handlebars.compile($('.tpl-entry').html());

      title.html(feedName); // Set the header text
      container.empty(); // Empty out all previous entries

      /* Loop through the entries for this feed and parse each one
       * against the entryTemplate (created above using Handlebars),
       * appending the resulting HTML to the list of entries.
       */
      entries.forEach(function(entry) {
        container.append(entryTemplate(entry));
      });

      if (cb) {
        cb();
      }
    })
    .fail(function() {
      if (cb) {
        cb();
      }
    });
}

/* All of this functionality is heavily reliant upon the DOM, so we
 * place our code in the $() function to ensure it doesn't execute
 * until the DOM is ready.
 */
$(
  (function() {
    init();

    var container = $('.feed'),
      feedList = $('.feed-list'),
      feedItemTemplate = Handlebars.compile($('.tpl-feed-list-item').html()),
      feedId = 0,
      menuIcon = $('.menu-icon-link');

    /* Loop through all of our feeds, assigning an id property to
     * each of the feeds based upon its index within the array.
     * Then parse that feed against the feedItemTemplate (created
     * above using Handlebars) and append it to the list of all
     * available feeds within the menu.
     */
    allFeeds.forEach(function(feed) {
      feed.id = feedId;
      feedList.append(feedItemTemplate(feed));

      feedId++;
    });

    /* When a link in our feedList is clicked on, we want to hide
     * the menu, load the feed, and prevent the default action
     * (following the link) from occurring.
     */
    feedList.on('click', 'a', function() {
      var item = $(this);

      $('body').addClass('menu-hidden');
      loadFeed(item.data('id'));
      return false;
    });

    /* When the menu icon is clicked on, we need to toggle a class
     * on the body to perform the hiding/showing of our menu.
     */
    menuIcon.on('click', function() {
      $('body').toggleClass('menu-hidden');
    });
  })()
);
