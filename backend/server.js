import express, { urlencoded } from "express";
// import products from "./data/data.js";
import dotevn from "dotenv";
import cookieParser from 'cookie-parser'
dotevn.config();
import connectDB from "./config/db.js";
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import uploadRoutes from './routes/uploadRoutes.js'
import cors from 'cors';
import path from 'path';

const port = process.env.PORT || 5000;
connectDB();
const app = express();
app.use(cors());

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))


//cookies parser middleware
app.use(cookieParser())


// app.get("/", (req, res) => {
//   res.send("API is running ...");
// });

// app.get("/api/products", (req, res) => {
//   res.json(products);
// });

// app.get('/api/products/:id', (req, res) => {
//     const product = products.find(p => p._id === req.params.id);
//     res.json(product)
// })

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes)

//PAYPAL
app.get('/api/config/paypal', (req, res) => 
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID})
)
//FOR UPLOAD IMAGE
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, "/uploads")))


//BUILD AND DEPLOY
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  //any route that is not api will be redicted to index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}else{
  app.get("/", (req, res) => {
    res.json("API running...");
  });
}


app.use(notFound)
app.use(errorHandler);

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
