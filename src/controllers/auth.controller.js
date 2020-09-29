import jwt from 'jsonwebtoken'
import {validationResult} from 'express-validator'
import User from '../models/User'
import config from '../config'

export const signIn = async (req, res) => {
    // validate
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    // validate exits user
    const user = await User({skipTenant: true}).findOne({dni: req.body.username});
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
        data: {token: token}
    })

}
