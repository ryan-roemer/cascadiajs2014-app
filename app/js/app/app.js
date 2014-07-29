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

  "app/models/note",
  "app/collections/notes",

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
  NoteModel,
  NotesCollection,
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

  var NoteView = Backbone.View.extend({
    template: noteTmpl,
    el: "#note .content",
    initialize: function () {
     this.listenTo(this.model, "change", this.render);
    },
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  var NotesView = Backbone.View.extend({
    template: notesTmpl,
    el: "#notes .content",
    events: {
      "click li": "clickNote"
    },
    initialize: function () {
     this.listenTo(this.collection, "change", this.render);
    },
    render: function () {
      this.$el.html(this.template(this.collection.toJSON()));
      return this;
    },
    clickNote: function (ev) {
      var $el = $(ev.currentTarget);
      Backbone.history.navigate($el.index().toString(), { trigger: true });
    }
  });

  var $note = $(
    "<div id='note'><h2>Note</h2><div class='content' />" +
    "<a class='all-notes'>All notes</a></div>");
  var $notes = $(
    "<div id='notes'><h2>Notes</h2><div class='content' /></div>");

  // Manual event handler.
  $note.find(".all-notes").click(function (ev) {
    ev.preventDefault();
    Backbone.history.navigate("", { trigger: true });
  });

  var Router = Backbone.Router.extend({
    routes: {
      "": "notes",
      ":id": "note"
    },
    notes: function () {
      $note.hide();
      $notes.show();

      var notesView = new NotesView({ collection: notesCollection });
      notesView.render();
    },
    note: function (id) {
      // Convert to number
      id = parseInt(id, 10);

      $note.show();
      $notes.hide();

      var noteView = new NoteView({ model: notesCollection.at(id) });
      noteView.render();
    }
  });

  // --------------------------------------------------------------------------
  // Application Bootstrap
  // --------------------------------------------------------------------------
  $(function () {
    // HTML
    $("body")
      .append($note)
      .append($notes);

    // App.
    var router = new Router();
    Backbone.history.start();
  });
});
