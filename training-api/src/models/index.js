import mongoose from 'mongoose';

const trainingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Training = mongoose.model('Training', trainingSchema);

export default Training;