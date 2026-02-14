import mongoose from 'mongoose';    

const TestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    score: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Test', TestSchema);

export const createTest = async (testData) => {
    const Test = mongoose.model('Test');
    const test = new Test(testData);
    return await test.save();
};