const { ServiceBroker } = require("moleculer");
const HttpServer = require("moleculer-web");

// create new service broker  for node-1
// define nodeID for service broker

const nodeOne = new ServiceBroker({
  nodeID: "node-1",
  transporter: "NATS",
});

nodeOne.createService({
  name: "gateway",
  mixins: [HttpServer],
  settings: {
    routes: [
      {
        aliases: {
          // when a request is made to the gateway via  {methond:"GET",url:"/products"}
          // the listProducts action on the products service is called
          "GET /products": "products.listProducts",
        },
      },
    ],
  },
});

const nodeTwo = new ServiceBroker({
  nodeID: "node-2",
  transporter: "NATS",
});

nodeTwo.createService({
  name: "products",
  actions: {
    listProducts(ctx) {
      console.log(ctx);
      return [
        { name: "Apples", price: 5 },
        { name: "Oranges", price: 3 },
        { name: "Bananas", price: 2 },
      ];
    },
  },
});

Promise.all([nodeOne.start(), nodeTwo.start()]);
