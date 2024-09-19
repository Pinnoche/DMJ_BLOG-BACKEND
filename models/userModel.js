const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({ 
    email: {
        type: 'String',
        required: true,
    }, 
    
    password: {
        type: 'String',
        required: true,
    }
}, {timestamps: true});

//static login method
userSchema.statics.login = async function(email, password) {
    if(!email || !password) {
        throw Error('Both email and password fields must be filled.');
    }

    const user = await this.findOne({ email });
    if(!user) {
        throw Error('Incorrect Email')
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if(!matchPassword) {
        throw Error('Incorrect Password');
    }

    return user;
}

//static signup method
userSchema.statics.signup = async function(email, password) {
    if(!email || !password) {
        throw Error('Both email and password fields must be filled.');
    }

    if(!validator.isEmail(email)){
        throw Error('Not a valid email')   
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong')
    }
    
    const exists = await this.findOne({ email });
    if(exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt );

    const user = await this.create({email, password: hash});

    return user;
}

module.exports = mongoose.model('User', userSchema);