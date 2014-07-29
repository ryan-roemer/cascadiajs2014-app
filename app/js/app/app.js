// SKELETON
/**
 * Application.
 *
 * This file is usually the "binding" of all of the individual Backbone.js
 * components into a unified whole. It is also typically *not* unit tested
 * because it has side effects from just running it. So, here is the expected
 * place to also do things like start Backbone.js History, do `$()` DOM
 * manipulation, etc.
 */
define([
  "jquery",
  "backbone",

  // Import and compile a HBS template.
  // For real application, remove this import (and the real file) and replace
  // with imports for your Backbone components needed to bootstrap the full
  // application. Likely this means a collection and router.
  "hbs!app/templates/hello",

  // Polyfill JSON for old browsers.
  "json2"
], function (
  $,
  Backbone,
  helloTmpl
) {
  "use strict";

  // --------------------------------------------------------------------------
  // Backbone.js Components.
  // --------------------------------------------------------------------------
  var NoteModel = Backbone.Model.extend({
    urlRoot: "/notes", // :id
    defaults: { title: "", text: "*Add Note!*" }
  });

  // Hack an `id` for fetch routing.
  var noteModel = new NoteModel({ id: 1 });
  noteModel.on("change", function () {
    console.log("Updated: " +
                JSON.stringify(noteModel.toJSON()));
  });

  console.log("Defaults: " +
              JSON.stringify(noteModel.toJSON()));
  var jqXhr = noteModel.fetch();
  jqXhr.done(function () {
    console.log("Fetched: " +
                JSON.stringify(noteModel.toJSON()));
  });



  // --------------------------------------------------------------------------
  // Application Bootstrap
  // --------------------------------------------------------------------------
  $(function () {
  });
});
