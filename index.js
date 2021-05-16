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
