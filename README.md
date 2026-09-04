# Feed Reader

A slide-menu RSS feed reader built with jQuery and Handlebars, with a full Jasmine test suite covering the feed list, menu behavior, and content loading.

**Live demo:** https://techsnazzy.github.io/feed-reader/

## About the data

This originally fetched live RSS feeds through Udacity's `rsstojson.udacity.com` proxy (needed to get around browser CORS restrictions on raw feed XML). That proxy was retired along with the rest of the course's backend infrastructure and no longer resolves.

Rather than wire in a new third-party service, `loadFeed()` now reads a static snapshot from `data/feeds.json`. The menu, templating, feed switching, and Jasmine tests all still run exactly as before — the entries just aren't pulled live anymore.

## Running locally

```
git clone https://github.com/TechSnazzy/feed-reader.git
cd feed-reader
python3 -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000). The Jasmine test results render directly on the page.

## Tech

jQuery, Handlebars.js, Jasmine 2.1. No build step — static files only.

## Origin

Built as the testing project for Udacity's Front End Web Developer Nanodegree (JavaScript Testing course), which provided the base app and asked for a Jasmine spec covering its feed list, menu, and load behavior.
