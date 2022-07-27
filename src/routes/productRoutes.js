const productRouter = require("express").Router();

const { productList } = require("../controller/productsController");

productRouter.get("/productList/:pageNo/:perPage/:searchKeyword?", productList);

module.exports = productRouter;
