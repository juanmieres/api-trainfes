import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'

export const signIn = async (req, res) => {
    // validate dni
    const user = await User({skipTenant: true}).findOne({dni: req.body.dni}).populate('role');
    if (!user){
        return res.status(400).json({
            message: 'user not found'
        })
    }

    // validate password
    const password_valid = await User().comparePassword(req.body.password, user.password)
    if (!password_valid) {
        return res.status(401).json({
            message: 'invalid password'
        })
    }

    // return token
    const token = jwt.sign({id: user._id}, config.secret)
    res.status(200).json({
        message: 'auth succcess',
        data: {token: token}
    })

}