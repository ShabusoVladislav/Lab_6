const chai = require("chai");
const chaiHttp = require("chai-http");
const _ = require('lodash');

const { PaymentsModel } = require('./database')

const app = require("./index");
const { payment, differentPayment } = require("./constants");

const paymentKeys = Object.keys(payment);

chai.use(chaiHttp);
const expect = chai.expect;

  describe("Post", () => {
    it("Should create a new payment", async () => {
      new PaymentsModel(payment)
      console.log(await PaymentsModel.find());
  
      const res = await chai
        .request(app)
        .post("/payment")
        .send(payment);
  
      console.log("Response:", res.error);
      console.log("Body:", res.body);
  
      expect(res).to.have.status(201);
      expect(_.pick(res.body, paymentKeys)).to.deep.equal(payment);
    });
  });

  describe("Get", () => {
    before(async () => {
      const response = await chai
        .request(app)
        .post("/payment")
        .send(payment)
  
      createdPayment = response.body;
    });
  
    it("Should get all payments", async () => {
      const res = await chai
        .request(app)
        .get("/payment");
  
      expect(res.body).to.be.an("array");
      expect(res.body.some(payment => payment._id === createdPayment._id)).to.be.true;
    });
  
    it("Should get one payment by id", async () => {
      const res = await chai
        .request(app)
        .get(`/payment/${createdPayment._id}`);
  
      expect(res.body).to.deep.equal(createdPayment);
    });
  })

  describe("Update", () => {
    before(async () => {
      const response = await chai
        .request(app)
        .post("/payment")
        .send(payment)
  
        createdPayment = response.body;
    });
  
    it("Should update(put) payment by id", async () => {
      const res = await chai
        .request(app)
        .put(`/payment/${createdPayment._id}`)
        .send(differentPayment);
  
      expect(res.body).to.deep.equal({ ...createdPayment, ...differentPayment });
    });
  })

  describe("Delete", () => {
    before(async () => {
      const response = await chai
        .request(app)
        .post("/payment")
        .send(payment)
  
        createdPayment = response.body;
    });
  
    it("Should delete payment by id", async () => {
      const res = await chai
        .request(app)
        .delete(`/payment/${createdPayment._id}`);
  
      expect(res.body).to.deep.equal(createdPayment);
    });
  })
//testtt
