const db = require("../models");
const jwt = require("jsonwebtoken");

const getAllOrders = async (req, res) => {
  try {
     console.log("orders1");
    const orders = await db.Order.findAll();
    console.log("orders2",orders);
    res.json(orders);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getOrderById = async (req, res) => {
  try {
    const { order_id } = req.params;

    const order = await db.Order.findOne({
      where: { id: order_id },
    });

    if (!order) {
      res.status(404).send("Order not found");
    }

    res.json(order);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createOrder = async (req, res) => {
  try {
    const { total, status, UserId , imageUrl} = req.body;

    const createOrder = await db.Order.create({
      total,
      status,
      UserId,
      imageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (!createOrder) {
      res.status(400).send("Order not created");
    }

    res.status(201).send(createOrder);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getUserOrder = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    console.log("Token:", token);

    if (!token) {
      return res.status(401).send("No token provided");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded); // Eğer burası çalışmazsa sorun JWT'de
      req.userId = decoded.userId;
    } catch (err) {
      console.error("JWT Hatası:", err.message);
      return res.status(401).json({ msg: "Invalid token", error: err.message });
    }
    
    const userId =
      typeof decoded.id === "string" ? parseInt(decoded.id, 10) : decoded.id;
    console.log("Parsed userId:", userId);

    if (isNaN(userId)) {
      return res.status(400).send("Invalid User ID");
    }

    const orders = await db.Order.findAll({
      where: { UserId: userId },
    });

    if (!orders || orders.length === 0) {
      return res.status(404).send("No orders found");
    }
   
    res.json(orders);
  } catch (err) {
    console.error("Error details:", {
      message: err.message,
      decodedToken: err.decoded || "Not available",
      stack: err.stack,
    });
    res.status(500).send(err.message);
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  getUserOrder,
};