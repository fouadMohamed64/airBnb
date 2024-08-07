import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user';

const app = express();
const URL = 'mongodb+srv://teamfeammearn:IchwrnfkrNZ7Jark@cluster0.0xq8q.mongodb.net/yourDatabaseNameHere?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
.catch(e => console.error('Connection error:', e));

app.use(express.json());

// Routes
app.use('/users', userRoutes);

const port = 4000;
app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
});