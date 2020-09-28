import Role from '../models/Role';
import User from '../models/User'
import Planning from '../models/Planning'
import Routine from '../models/Routine'


// user administrator
export const getUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json({data: users})
}

export const getUserById = async (req, res) => {
    await User.findById(req.params.id,
        function (err, docs) {
            if (err){
                res.status(400).json(err);
            }
            else{
                res.status(200).json({
                    message: 'users list',
                    data: docs
                });
            }
        }
    );
}

export const createUser = async (req, res) => {
    const {email, dni, password, name, role} = req.body 
    const user = new User({
        email,
        dni,
        password: await User.encryptPassword(password),
        name,
        role
    })

    if (role){
        const foundRole = await Role.findOne({name: role})
        if (foundRole){
            user.role = foundRole._id
        }
        
        // `Role: ${role} does not exists`
        await user.save(
            function(err, result){ 
                if (err){
                    res.status(400).json(err);
                }else{
                    res.status(201).json({
                        message: 'user created',
                        data: result
                    });
                }
            }
        )
    }
    else{
        res.status(400).json({
            message: 'role not found',
        });
    }

}

export const updateUserById = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true},
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

export const deleteUserById = async (req, res) => {
    await User.findByIdAndRemove(req.params.id,
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
    const role = await Role().findOne({name: 'routines'});
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

