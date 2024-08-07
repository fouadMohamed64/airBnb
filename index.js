import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user';




const app = express();
const URL = 'mongodb+srv://teamfeammearn:IchwrnfkrNZ7Jark@cluster0.0xq8q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' 
mongoose.connect(URL)
            .then(_ => console.log('connected to db successfully'))
            .catch(e => console.log(e))



app.use(express.json())

app.use('/users', userRoutes);


let port = 4000;
app.listen(port, _ => console.log(`listening on ${port}`))