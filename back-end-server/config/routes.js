const authRoutes = require('../routes/auth');
const stockRoutes = require('../routes/stock');
const statsRoutes = require('../routes/stats');
const ordersRoutes = require('../routes/order')

module.exports = (app) => {
    app.use('/auth', authRoutes);
    app.use('/product',stockRoutes);
    app.use('/stats',statsRoutes);
    app.use('/orders',ordersRoutes)
}

