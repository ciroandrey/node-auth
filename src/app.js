const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database')
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

connectDB();

app.get('/', (req, res) => {
    res.send('Running');
});
  
const userRoutes = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes');

app.use('/users', userRoutes);
app.use('/account', accountRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});