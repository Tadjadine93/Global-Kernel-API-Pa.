import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

//Create a schema
const userSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function (next) {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);

        // Generate a password hash (salt + hash)
        const passwordHash = await bcrypt.hash(this.password, salt);

        // Re-assign hashed version over original, plain text password
        this.password = passwordHash;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isValidPassword = async function(newPassword) {
    try {
       return await bcrypt.compare(newPassword, this.password);        
    } catch (error) {
        throw new Error(error);
                
    }
}
//Create a model
const User = mongoose.model('user', userSchema);

//Exports the model
module.exports = User;