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
  "hbs!app/templates/note",
  "hbs!app/templates/notes",

  // Polyfill JSON for old browsers.
  "json2",
  "backbone.localStorage"
], function (
  $,
  Backbone,
  noteTmpl,
  notesTmpl
) {
  "use strict";

  // --------------------------------------------------------------------------
  // Backbone.js Components.
  // --------------------------------------------------------------------------
  // var str = JSON.stringify;
  // var NoteModel = Backbone.Model.extend({
  //   urlRoot: "/notes", // :id
  //   defaults: { title: "", text: "*Add Note!*" }
  // });

  // var noteModel = new NoteModel({ id: 1 });
  // noteModel.on("change", function () {
  //   console.log("Updated: " + str(noteModel.toJSON()));
  // });

  // console.log("Defaults: " + str(noteModel.toJSON()));
  // noteModel.fetch().done(function () {
  //   console.log("Fetched: " + str(noteModel.toJSON()));
  // });

  // var NoteModel = Backbone.Model.extend({
  //   defaults: { title: "", text: "*Add Note!*" }
  // });

  // var NotesCollection = Backbone.Collection.extend({
  //   model: NoteModel,
  //   url: "/notes"
  // });

  // var notesCollection = new NotesCollection();
  // notesCollection.fetch().done(function () {
  //   console.log("Fetched: " +
  //               JSON.stringify(notesCollection.toJSON()));
  // });

  var NoteModel = Backbone.Model.extend({
    defaults: { title: "", text: "*Add Note!*" }
  });
  var NotesCollection = Backbone.Collection.extend({
    model: NoteModel,
    localStorage: new Backbone.LocalStorage("bb-col-demo")
  });

  var notesCollection = new NotesCollection();
  // CLEAR: notesCollection.localStorage._clear();
  // FETCH: notesCollection.fetch({ reset: true });

  // _.each(["Hi", "Hello", "Hola"], function (msg) {
  //   notesCollection.create({ title: msg, text: msg });
  // });
  notesCollection.fetch(); // Use existing models!

  // var theOs = notesCollection.filter(function (model) {
  //     return model.get("text").match(/o/);
  //   });
  // console.log(JSON.stringify(theOs, null, 2));

  // --------------------------------------------------------------------------
  // Application Bootstrap
  // --------------------------------------------------------------------------
  $(function () {

    // Templates
    $("body")
      .append(noteTmpl(notesCollection.at(0).toJSON()))
      .append(notesTmpl(notesCollection.toJSON()));
  });
});
