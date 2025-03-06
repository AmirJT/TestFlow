import express from 'express';
// import path from 'node:path';
import db from './config/connection.js';
import routes from './routes/index.js';
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Disable serving frontend because it will be deployed separately
// app.use(express.static('../client/dist'));
app.use(routes);
// Start the server only when the database is connected
db.once('open', () => {
    console.log('✅ Database connected successfully');
    app.listen(PORT, () => console.log(`🌍 Server is running on port ${PORT}`));
});
