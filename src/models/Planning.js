import {Schema} from 'mongoose'
import {tenantModel} from '../libs/multiTenant';


const planningSchema = new Schema({
    name: String,
    media : [String],
    dates: [Date],
    patient: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    // session: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "Session",
    //         required: true
    //     }
    // ]
    routines: [
        {
            type: Schema.Types.ObjectId,
            ref: "Routine",
            required: true
        }
    ]
}, {
    timestamps: true
})

export default tenantModel('Planning', planningSchema);
