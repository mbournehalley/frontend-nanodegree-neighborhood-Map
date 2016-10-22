/**
 * @name BeerMap.js
 * @desc It is the ViewModel in the app
 * @param {framework} ko - knockout.js framework
 * @param {model} Beer - the model beer of the app
 * @param {framework} jquery - jQuery framework
 * @returns {function} ViewModel - returns the object ViewModel
 */
define([
  'knockout',
  'models/Beer',
], function(ko, Beer) {
  'use strict';

  // our main view model
  var ViewModelBeer = ViewModel;

  return ViewModelBeer;

  /**
   * @name ViewModel
   * @desc It is the ViewModel in the app
   * @param {model} Beer - the model beer of the app
   */
  function ViewModel(beers) {
    var self = this;
    // Constants
    var INIT_LAT = 37.7786096,
        INIT_LNG = -122.4150211,
        INIT_ZOOM = 14;

    var map = {},
        markers = [],
        infowindow = new google.maps.InfoWindow();

    self.beers = ko.observableArray(ko.utils.arrayMap(beers, function(beer) {
      return new Beer(beer);
    }));
    self.query = ko.observable('');
    self.search = search;
    self.query.subscribe(self.search);// subscribe the search to query

    init();

    // Initialize the map and its markers
    function init () {
      map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: {
          lat: INIT_LAT,
          lng: INIT_LNG
        },
        zoom: INIT_ZOOM
      });

      beers.forEach(function (beer) {
        addMarker(beer);
      });
    }

    /********** Functions **********/

    // Adds a marker to the map and push to the array.
    // *taken from google map APIs
    function addMarker (beer) {
      var location = {lat: beer.lat, lng: beer.lng};
      var marker = new google.maps.Marker({
        position: location,
        map: map,
        animation: google.maps.Animation.DROP
      });

      marker = markerAddListener(marker, beer);
      markers.push(marker);
    }

     // Add a listener and api foursquare request
    function markerAddListener (marker, beer) {
      var info_content;

      marker.addListener('click', function() {

        this.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
          marker.setAnimation(null);
        }, 2000);

        info_content =
        '<div id="infowindow">' +
          '<div class="content">' +
            '<div class="name text-center">' +
              '<i class="fa fa-map-marker fa-lg" aria-hidden="true"></i> ' +
                '<strong>' + beer.name + '</strong>' +
            '</div>' +
            '<div id="summary">' +
              '<i class="fa fa-user fa-lg" aria-hidden="true"></i> ' +
                beer.summary +
            '</div>' +
            '<div class="contacts">' +
              '<i class="fa fa-phone fa-lg" aria-hidden="true"></i> ' +
                beer.formattedPhone +
              '</div>' +
            '</div>' +
            '<div class="twitter">' +
              '<i class="fa fa-twitter fa-lg" aria-hidden="true"></i> ' +
                beer.twitter + '</div>' +
          '</div>' +
        '</div>';
        infowindow.setContent(info_content);
        infowindow.open(map, marker);
      });

      return marker;
    }

    /**
     * @name clearList
     * @desc It clear the view of list of beers
     *  and markers on the map
     * @param none
     * @returns none
     */
    function clearList () {
      self.beers.removeAll();
    }

    // Removes the markers from the map, but keeps them in the array.
    // *taken from google map APIs
    function clearMarkers () {
      setMapOnAll(null);
    }

    /**
     * @name search
     * @desc It clear the view of list of beers
     *  and markers on the map
     * @param {string} - input value
     * @returns none
     */
    function search (value) {
      clearList();
      clearMarkers();

      beers.forEach(function(beer, index) {
        if (beer.name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
          self.beers.push(new Beer(beer));
          setMarker(index);
        }
      });
    }

    // Sets the map on all markers in the array.
    // *taken from google map APIs
    function setMapOnAll (map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }

    // Set the marker
    function setMarker (index) {
      markers[index].setMap(map);
      markers[index].setAnimation(google.maps.Animation.DROP);
    }
  }
});