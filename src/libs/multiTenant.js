import mongoose, { Schema } from 'mongoose';
import { getCurrentTenantId } from './storage';

export function tenantModel(name, schema, options) {
    return (props = {}) => {
        schema.add({ tenantId: String });
        const Model = mongoose.model(name, schema, options);
        const { skipTenant } = props;
        if (skipTenant) return Model;
        Model.schema.set('discriminatorKey', 'tenantId');
        const tenantId = getCurrentTenantId();
        const discriminatorName = `${Model.modelName}-${tenantId}`;
        const existingDiscriminator = (Model.discriminators || {})[discriminatorName];
        return existingDiscriminator || Model.discriminator(discriminatorName, new Schema({}));
    };
}

export function tenantlessModel(name, schema, options) {
    return () => mongoose.model(name, schema, options);
}