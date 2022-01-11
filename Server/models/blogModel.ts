import mongoose from 'mongoose'
import {IBlog} from '../config/interface'
const blogSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 50
    },
    content: {
        type: String,
        required: true,
        minlength: 2000
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 50,
        maxlength: 300
    },
    thumbnail: {
        type: String,
        required: true
    },
    category: { type: mongoose.Types.ObjectId, ref: 'categories' }
}, {
    timestamps: true
})
export default mongoose.model<IBlog>('blog', blogSchema)