"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Generate a salt
            const salt = yield bcrypt.genSalt(10);
            // Generate a password hash (salt + hash)
            const passwordHash = yield bcrypt.hash(this.password, salt);
            // Re-assign hashed version over original, plain text password
            this.password = passwordHash;
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
userSchema.methods.isValidPassword = function (newPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield bcrypt.compare(newPassword, this.password);
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
//Create a model
const User = mongoose.model('user', userSchema);
//Exports the model
module.exports = User;
//# sourceMappingURL=user.models.js.map