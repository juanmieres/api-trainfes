import {Schema} from 'mongoose'
import {tenantlessModel} from '../libs/multiTenant';

const organizationSchema = new Schema({
    name: String,
    license: {
        type: String, enum: ['basico', 'medio', 'premium']
    },
    location: String,
    phone: String,
}, {
    timestamps: true,
    versionKey: false
})

export default tenantlessModel('Organization', organizationSchema);