const router = require('express').Router();
const swaggerUi = require('swagger-ui-express')
const apiDocumentation = require('../api-doc.json')


router.get('/',(req, res) =>{
    res.status(200).json({
        message : "GAME APP STORE"
    })
})

router.get(('/api-docs',swaggerUi.serve,swaggerUi.setup(apiDocumentation)))

const UsersRoutes = require('./users')
const LineItemsRoutes = require('./lineitems')
const OrdersRoutes = require('./orders')
const ProductImagesRoutes = require('./productimages')
const ProductsRoutes = require('./products')
const ShoppingCartsRoutes = require('./shoppingcarts')

router.use('/users', UsersRoutes)
router.use('/line_items', LineItemsRoutes)
router.use('/orders', OrdersRoutes)
router.use('/productimages', ProductImagesRoutes)
router.use('/products', ProductsRoutes)
router.use('/shopping_carts', ShoppingCartsRoutes)

module.exports = router;