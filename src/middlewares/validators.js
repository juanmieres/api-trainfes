import {body, check} from 'express-validator'
import {validate} from 'rut.js'

// global
export const patientSearchValidator = () => {
    return [
        // body('dni').exists().custom((value, { req }) => {
        //     if (!validate(value)){throw new Error('DNI Invalid');}
        //     return true;
        // })
    ]
}

// sign-in
export const signInValidator = () => {
    return [
        body('username').exists().custom((value, { req }) => {
            if (!validate(value))
                throw new Error('DNI Invalid');
            return true;
          }),
        body('password').exists()
    ]
}
