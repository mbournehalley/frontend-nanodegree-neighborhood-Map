/**
 * @name Beer.js
 * @desc It is the model of application
 * @param {framework} ko - knockout.js framework
 * @returns {model} Beer - return the model of the framework
 */
define([
  'knockout'
], function(ko) {
  'use strict';

  var Beer = BeerModel;  // represent a single beer model

  return Beer;

  // Beer Model
  function BeerModel(data) {
    var self = this;

    this.description = ko.observable(data.description);
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
    this.imgSrc = ko.observable(data.imgSrc);
    this.name = ko.observable(data.name);
    this.summary = ko.observable(data.summary);
    this.contact = ko.observable(data.contact);
    this.formattedPhone = ko.observable(data.formattedPhone);
    this.twitter = ko.observable(data.twitter);
  }
});