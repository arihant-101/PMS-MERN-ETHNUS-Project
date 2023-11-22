import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // For password hashing

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // Add more fields as per your requirement
}, { timestamps: true });

// Pre-save hook for password hashing
userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Method for password comparison
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

// Project Schema
const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true // Ensuring title is unique
    },
    description: String,
    task: [
        {
            id: Number,
            title: String,
            description: String,
            order: Number,
            stage: String,
            index: Number,
            attachment: [
                { type: String, url: String }
            ],
            created_at: { type: Date, default: Date.now },
            updated_at: { type: Date, default: Date.now },
        }
    ]
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

// Exporting the models
export { User, Project };
