const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { PaymentsModel } = require('./database')

app.use(bodyParser.json());

app.post("/payment", async (req, res) => {
    try {
      const payment = new PaymentsModel(req.body);
      await payment.save();
      res.status(201).send(payment);
    } catch (error) {
      res.status(400).send(error);
    }
});

app.get("/payment", async (req, res) => {
    try {
      const payments = await PaymentsModel.find();
      res.send(payments);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.get("/payment/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const payment = await PaymentsModel.findById(id);
      if (!payment) {
        return res.status(404).send("Payment not found");
      }
      res.send(payment);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.put("/payment/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const payment = await PaymentsModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!payment) {
        return res.status(404).send("Payment not found");
      }
      res.send(payment);
    } catch (error) {
      res.status(400).send(error);
    }
});
  
app.delete("/payment/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const payment = await PaymentsModel.findByIdAndDelete(id);
      if (!payment) {
        return res.status(404).send("Payment not found");
      }
      res.send(payment);
    } catch (error) {
      res.status(500).send(error);
    }
});
  
app.listen(3000, () => {
    console.log('Starting the server on port 3000');
});

module.exports = app;