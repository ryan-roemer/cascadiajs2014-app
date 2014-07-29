define(["app/models/note"], function (NoteModel) {
  describe("models/note", function () {
    var model;

    beforeEach(function () {
      model = new NoteModel();
    });

    afterEach(function () {
      model = null;
    });

    it("should have default values");
  });
});
