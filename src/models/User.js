import {Schema} from 'mongoose'
import bcrypt from 'bcryptjs'
import {tenantModel} from '../libs/multiTenant';

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        ref: "Role",
        type: Schema.Types.ObjectId,
        required: true
    },
    organization: {
        ref: "Organization",
        type: Schema.Types.ObjectId,
    },
    extra:{
        lastName: String,
        gender: {
            type: String, enum: ['masculino', 'femenino']
        },
        birthDate: String,
        healthProvision: {
            type: String, enum: ['isapre', 'fonasa']
        },
        phone: String,
        country: String,
        city: String,
        region: String
    }
}, {
    timestamps: true
})

userSchema.statics.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

export default tenantModel('User', userSchema);