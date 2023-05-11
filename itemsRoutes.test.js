"use strict";

const request = require("supertest");

const app = require("./app");
let db = require("./fakeDb");

beforeEach(function () {
  // items = [];
  console.log("items before=", db.items)
  db.items.push({
    name: "test",
    price: 1.00
  });
});

afterEach(function () {
  db.items = [];
});

describe("GET /items", function () {
  it("Gets an array of items", async function () {
    console.log("items=", db.items);
    const resp = await request(app).get(`/items`);
    console.log("resp.body=", resp.body)
    expect(resp.body.items[0]).toEqual({
      name: "test",
      price: 1.00
    });
  });
});


describe("POST /items", function () {
  it("Creates a new item", async function () {
    const resp = await request(app)
      .post(`/items`)
      .send({
        name: "test2",
        price: 2.00
      });
    expect(resp.statusCode).toEqual(200);
    console.log("db.items=", db.items)
    expect(db.items.length).toEqual(2);
  });
});

describe("PATCH /items/:name", function () {
  it("Updates a single item", async function () {
    const resp = await request(app)
      .patch(`/items/${db.items[0].name}`)
      .send({
        name: "test2"
      });
    expect(resp.body).toEqual({
      updated: {
        name: "test2",
        price: 1.00
      }
    });
  });
});

describe("DELETE /items/:name", function() {
  it("Deletes a single item", async function() {
    const resp = await request(app)
      .delete(`/items/${db.items[0].name}`);
    console.log("deleted=", db.items)
    expect(resp.body).toEqual({ message: "Deleted" });
    expect(db.items.length).toEqual(0);
  });
});
