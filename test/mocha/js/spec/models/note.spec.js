define(["app/models/note"], function (NoteModel) {
  describe("models/note", function () {
    var model;

    beforeEach(function () {
      model = new NoteModel();
    });

    afterEach(function () {
      model = null;
    });

    it("should be a NoteModel", function () {
      expect(model).to.be.an.instanceof(NoteModel);
    });

    it("should have default values", function () {
      expect(model.get("title")).to.equal("");
      expect(model.get("text")).to.contain("Add Note");
    });
  });
});
