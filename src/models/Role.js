import {Schema} from 'mongoose'
import { tenantlessModel } from '../libs/multiTenant';

const roleSchema = new Schema({
    name: String,
}, {
    versionKey: false,
})

export default tenantlessModel('Role', roleSchema);