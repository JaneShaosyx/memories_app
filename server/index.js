import express from 'express';
// import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

// Attention: With express version => 4.16.0 the body-parser middleware was added back under the methods express.urlencoded() and express.json()
app.use(express.json({ limit: '30mb', extend: true }));
app.use(express.urlencoded({ limit: '30mb', extend: true }));
app.use(cors());
app.use('/posts', postRoutes);
app.use('/user',userRoutes);

// use mongodb atlas as the database
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port:${PORT}`));
  })
  .catch((err) => console.log(err));;

// mongoose.set('useFindAndModify', false)
