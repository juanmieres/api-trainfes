import {validationResult} from 'express-validator'
import Role from '../models/Role';
import User from '../models/User'
import Planning from '../models/Planning'
import Routine from '../models/Routine'
// import {setCurrentTenantId} from '../libs/storage';

// user administrator
export const getAdministrators = async (req, res) => {
    const role = await Role().findOne({name: 'administrator'});
    const users = await User({skipTenant: true}).find({role:role._id});
    res.status(200).json({data: users})
}

export const getAdministratorById = async (req, res) => {
    await User({skipTenant: true}).findById(req.params.id,
        function (err, docs) {
            if (err){
                res.status(400).json(err);
            }
            else{
                res.status(200).json({
                    data: docs
                });
            }
        }
    );
}

export const createAdministrator = async (req, res) => {

    const role = await Role().findOne({name: 'administrator'});
    const {email, dni, password, name, organization} = req.body 
    // setCurrentTenantId(organization);
    const user = new User()({
        email,
        dni,
        password: await User().encryptPassword(password),
        name,
        role: role._id,
        organization: organization
    })

    await user.save(
        function(err, result){ 
            if (err){
                res.status(400).json(err);
            }else{
                res.status(201).json({
                    message: 'administrator created',
                    data: result
                });
            }
        }
    )
}

export const updateAdministratorById = async (req, res) => {
    await User({skipTenant: true}).findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true},
        function (err, docs) {
            if (err){
                res.status(400).json(err)
            }
            else{
                res.status(201).json({
                    message: 'user update',
                    data: docs
                })
            }
        }
    );
}

export const deleteAdministratorById = async (req, res) => {
    await User({skipTenant: true}).findByIdAndRemove(req.params.id,
        function (err, docs) { 
            if (err){
                res.status(400).json(err)
            }
            else{
                res.status(200).json({
                    message: 'user delete',
                    data: docs
                })
            }
        }
    )
}


// user patient
export const getPatients = async (req, res) => {
    const role = await Role().findOne({name: 'patient'});
    const users = await User().find({role:role._id});
    res.status(200).json({data: users})
}

export const getPatientById = async (req, res) => {
    await User().findById(req.params.id,
        function (err, docs) {
            if (err){
                res.status(400).json(err);
            }
            else{
                res.status(200).json({
                    data: docs
                });
            }
        }
    );
}

export const createPatient = async (req, res) => {
    const role = await Role().findOne({name: 'patient'});
    const {email, dni, password, name} = req.body 
    const user = new User()({
        email,
        dni,
        password: await User().encryptPassword(password),
        name,
        role: role._id,
        organization: req.organizationId
    })

    await user.save(
        function(err, result){ 
            if (err){
                res.status(400).json(err);
            }else{
                res.status(201).json({
                    message: 'patient created',
                    data: result
                });
            }
        }
    )
}

export const updatePatientById = async (req, res) => {
    await User().findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true},
        function (err, docs) {
            if (err){
                res.status(400).json(err)
            }
            else{
                res.status(201).json({
                    message: 'patient update',
                    data: docs
                })
            }
        }
    );
}

export const deletePatientById = async (req, res) => {
    await User().findByIdAndRemove(req.params.id,
        function (err, docs) { 
            if (err){
                res.status(400).json(err)
            }
            else{
                res.status(200).json({
                    message: 'patient delete',
                    data: docs
                })
            }
        }
    )
}

export const searchPatient = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const {dni} = req.body
    await User().findOne({dni:dni},
        function (err, docs) {
            if (err){
                res.status(400).json(err);
            }
            else{
                res.status(200).json({
                    data: docs
                });
            }
        }
    );
}

export const searchPlannings = async (req, res) => {
    const user = await User().findById(req.params.id)
    await Planning().find({patient:user},
        function (err, docs) {
            if (err){
                res.status(400).json(err);
            }
            else{
                res.status(200).json({
                    data: docs
                });
            }
        }
    );
}

export const searchSessions = async (req, res) => {
    const {date} = req.body
    const user = await User().findById(req.params.id)
    const plannings = await Planning().find({patient:user, dates: date}, {routines:1}).distinct('routines')
    await Routine().find({_id:plannings},
        function (err, docs) {
            if (err){
                res.status(400).json(err);
            }
            else{
                res.status(200).json({
                    data: docs
                });
            }
        }
    )
}

