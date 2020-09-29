import jwt, { decode } from 'jsonwebtoken'
import config from '../config'
import User from '../models/User'
import Role from '../models/Role'
import {setCurrentTenantId} from '../libs/storage';

export const verifyToken = async(req, res, next) => {
    try {
        // validate exists token
        const token = req.headers["x-access-token"];
        if (!token) {
            return res.status(403).json({
                message: 'token not provided'
            })
        }

        // validate user token
        const decoded = jwt.verify(token, config.secret);
        req.userId = decoded.id;
        const user = await User({skipTenant: true}).findById(req.userId, {passowrd: 0})
        const role = await Role().findById(user.role)
        if (!user) {
            return res.status(404).json({
                message: 'token invalid'
            })
        }

        // update tenandId
        if (user && ['administrator', 'patient'].includes(role.name)) {
            req.organizationId = user.organization._id.toString();
            const tenantId = user.organization._id.toString();
            setCurrentTenantId(tenantId);
        }

        next();
    } catch (error) {
        return res.status(403).json({
            message: 'unauthorized'
        })
    }
}

export default function permit(roles) {
    return async (req, res, next) => {
        const user = await User({skipTenant: true}).findById(req.userId).populate('role');
        if (user && roles.includes(user.role.name)) {
            next();
        } else {
            res.status(403).json({
                message: "forbidden"
            })
        }
    }
}

// export const isSuperUser = async (req, res, next) => {
//     const user = await User.findById(req.userId);
//     const role = await Role.findOne({_id: user.role});
//     if (role.name == 'superusuario') {
//         next();
//     }
//     else{
//         return res.status(403).json({
//             message: 'forbidden'
//         })
//     }
// }

// export const isAdministrador = async (req, res, next) => {
//     const user = await User.findById(req.userId);
//     const role = await Role.findOne({_id: user.role});
//     if (role.name == 'administrador') {
//         next();
//     }
//     else{
//         return res.status(403).json({
//             message: 'forbidden'
//         })
//     }
// }

// export const isPatient = async (req, res, next) => {
//     const user = await User.findById(req.userId);
//     const role = await Role.findOne({_id: user.role});
//     if (role.name == 'paciente') {
//         next();
//     }
//     else{
//         return res.status(403).json({
//             message: 'forbidden'
//         })
//     }
// }