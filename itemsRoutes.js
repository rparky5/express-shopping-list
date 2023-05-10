"use strict";

const express = require("express");

const { items } = require("./fakeDb");
const { redirect } = require("express/lib/response");
const router = new express.Router();
const { NotFoundError, BadRequestError } = require("./expressError");
const e = require("express");

/**
 * returns array of shopping items
 */
router.get("/", function (req, res) {
  return res.json({ items });
});

/**
 * accept JSON body, add item, and return it
 */
router.post("/", function (req, res) {
  const itemName = req.body.name;
  let itemPrice = req.body.price;
  const newItem = {};

  try {
    itemPrice = parseFloat(itemPrice);

    if (itemName) {
      newItem["name"] = itemName;
    } else {
      throw new BadRequestError("Invalid name.");
    }

    if (itemPrice) {
      newItem["price"] = itemPrice;
    } else {
      throw new BadRequestError("Invalid price.");
    }
  } catch (err) {
    throw new BadRequestError(err);
  }

  items.push(newItem);

  return res.json({ added: newItem });
});

router.get("/:name", function (req, res) {
  const itemName = req.params.name;
  for (let item of items) {
    if (item.name === itemName) {
      return res.json(item);
    }
  }
  throw new NotFoundError("Item not found.");
});

router.patch()

module.exports = router;