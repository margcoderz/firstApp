// server.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Static data for products
let products = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
    description: "Description of Product 1",
    category: "Category A",
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
    description: "Description of Product 2",
    category: "Category B",
  },
  {
    id: 3,
    name: "Product 3",
    price: 150,
    description: "Description of Product 3",
    category: "Category A",
  },
  {
    id: 4,
    name: "Product 4",
    price: 156,
    description: "Description of Product 4",
    category: "Category B",
  },
];

// API to get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// API to get a single product by ID
app.get("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

// API to create a new product
app.post("/api/products", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// API to update a product by ID
app.put("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products[productIndex] = {
    id: productId,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
  };

  res.json(products[productIndex]);
});

// API to delete a product by ID
app.delete("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const deletedProduct = products.splice(productIndex, 1);
  res.json(deletedProduct[0]);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
