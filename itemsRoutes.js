"use strict";

const express = require("express");

const { items } = require("./fakeDb");
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
  if (!req.body) {
    throw new BadRequestError("Invalid inputs.")
  }

  const itemName = req.body.name;
  let itemPrice = req.body.price;
  const newItem = {
    name: itemName,
    price: itemPrice
  };

  items.push(newItem);

  return res.json({ added: newItem });
});

// [{name: asdf, price: 23.43},{}]
router.get("/:name", function (req, res) {
  const itemName = req.params.name;

  for (let item of items) {
    if (item.name === itemName) {
      return res.json(item);
    }
  }

  throw new NotFoundError("Item not found.");
});

router.patch("/:name", function (req, res) {
  const itemName = req.params.name;
  const currentItem = items.find(item => item.name === itemName);

  if (req.body.name) {
    currentItem.name = req.body.name;
  }
  if (req.body.price) {
    currentItem.price = req.body.price;
  }

  return res.json({ updated: currentItem})
})

router.delete("/:name", function (req, res) {
  const itemName = req.params.name;
  const currentItem = items.find(item => item.name === itemName);
  const currentItemIndex = items.indexOf(currentItem);

  items.splice(currentItemIndex, 1);

  return res.json({ message: "Deleted" })
})

module.exports = router;