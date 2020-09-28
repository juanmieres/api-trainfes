import {Schema} from 'mongoose'
import {tenantModel} from '../libs/multiTenant';

const routineSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    objective: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        enum: ['flexion', 'marcha', 'sensor'],
        required: true
    },
    extra: {}
}, {
    timestamps: true,
})

export default tenantModel('Routine', routineSchema);