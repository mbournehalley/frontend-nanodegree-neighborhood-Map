require.config({
  waitSeconds: 120, //make sure it is enough to load all gmaps scripts
  paths: {
    knockout: '../../node_modules/knockout/build/output/knockout-latest',
    jquery: '/src/vendor/jQuery',
    async: '/node_modules/requirejs-plugins/src/async' //alias to plugin
  }
});

require([
  'knockout',
  'viewmodels/BeerMap',
   'jquery',
  'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyCz0yZwOoeyD2E89auhjZTXTdD9v-E6QZE&v=3'
], function(ko, BeerViewModel, $) {
  'use strict';

  var CLIENT_ID = "DBCADBINS32UBNKBXLONT4P2DOOIZ0PEJFQFADWRHYIPUPAT",
      CLIENT_SECRET = "C2EP5DF105X4JKRD2TXJQOJVON2JVNTJNGVSIGGTMPVUPQE2";
  // 10 List of List of Beer locations
  var Beers = [{
      "name": "MIKKELLER BAR",
      "lat": 37.7839519,
      "lng": -122.4090592,
      "formattedPhone": "",
      "twitter": "",
      "summary": ""
    }, {
      "name": "HOPWATER DISTRIBUTION",
      "lat": 37.7900404,
      "lng": -122.4113719,
      "formattedPhone": "",
      "twitter": "",
      "summary": ""
    }, {
      "name": "MONK'S KETTLE",
      "lat": 37.764728,
      "lng": -122.422999,
      "formattedPhone": "",
      "twitter": "",
      "summary": ""
    }, {
      "name": "SCHROEDER'S",
      "lat": 37.793958,
      "lng": -122.398695,
      "formattedPhone": "",
      "twitter": "",
      "summary": ""
    }, {
      "name": "BIERGARTEN",
      "lat": 37.7760935,
      "lng": -122.4241251,
      "formattedPhone": "",
      "twitter": "",
      "summary": ""
    }, {
      "name": "THIRSTY BEAR",
      "lat": 37.78555979757354,
      "lng": -122.39967404803575,
      "formattedPhone": "",
      "twitter": "",
      "summary": ""
    }, {
      "name": "SOCIAL KITCHEN & BREWERY",
      "lat": 37.7635294,
      "lng": -122.4661409,
      "formattedPhone": "",
      "twitter": "",
      "summary": ""
    }, {
      "name": "SOUTHERN PACIFIC BREWING",
      "lat": 37.7601026,
      "lng": -122.4142258,
      "formattedPhone": "",
      "twitter": "",
      "summary": ""
    }, {
      "name": "ANCHOR BREWING COMPANY",
      "lat": 37.7634475,
      "lng": -122.4012806,
      "formattedPhone": "",
      "twitter": "",
      "summary": ""
    }, {
      "name": "BLACK HAMMER BREWING",
      "lat": 37.7807045,
      "lng": -122.3970749,
      "formattedPhone": "",
      "twitter": "",
      "summary": ""
    }];

    initialize();

    function initialize () {
      var result,
          venue;

      Beers.forEach(function(beer) {
        result = getFourSquareData(beer.lat, beer.lng);
        result.done(getResultCompleted);

        /**
         * @name getResultCompleted
         * @desc it inserts the data on the beer objects
         * @param {object} - data response json
        */
        function getResultCompleted(data) {
          venue = data.response.venues[0];
          beer.summary = (venue.hereNow.summary === undefined) ? "No one here": venue.hereNow.summary;
          beer.formattedPhone = (venue.contact.formattedPhone === undefined) ? "No Contacts" : venue.contact.formattedPhone;
          beer.twitter = (venue.contact.twitter === undefined) ? "No Twitter Account": venue.contact.twitter;
        }
      });
    }

    /**
     * @name getFourSquareData
     * @desc does a request API on FourSquare
     * @param {string} - latitude
     * @param {string} - longitude
     * @returns {object} - promise on API foursquare
     */
    function getFourSquareData(lat, lng) {
      var FOURSQUARE_URL = 'https://api.foursquare.com/v2/venues/search?' +
            'll=' + lat + ',' + lng +
            '&client_id=' + CLIENT_ID +
            '&client_secret=' + CLIENT_SECRET +
            '&v=20160817';

      return $.getJSON(FOURSQUARE_URL);
    }
    // bind a new instance of our view model to the page
    ko.applyBindings(new BeerViewModel(Beers || []));
});