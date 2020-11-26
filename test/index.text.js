var expect = require("chai").expect;
var app = require("../index.js");

describe("Test index.js", () => {
  describe("#addKeyValue", () => {
    it("['linda','chen'] will be {linda:'chen'} ", () => {
      expect(
        app.arrayToObject({ arrVal: ["linda", "chen"], outputObject: {} })
      ).to.deep.equal({
        linda: "chen",
      });
    });
  });
  describe("#objectParser", () => {
    it("{linda:'chen'} will be '['linda|chen']' ", () => {
      expect(
        app.objectParser({ val: { linda: "chen" }, string: "", res: [] })
      ).to.deep.equal(["linda|chen"]);
    });
  });
  describe("#doParser", () => {
    it(`{"hired":{"be":{"to":{"deserve":"I"}}}} will be {"I":{"deserve":{"to":{"be":"hired"}}}} `, () => {
      expect(
        app.doParser({ hired: { be: { to: { deserve: "I" } } } })
      ).to.deep.equal({ I: { deserve: { to: { be: "hired" } } } });
    });
  });
});
