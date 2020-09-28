import Role from '../models/Role'
import User from '../models/User'

export const createRoles = async () => {
    try {
        const count = await Role().estimatedDocumentCount()
        if (count > 0) return;
        const values = await Promise.all([
            new Role()({name: 'superadmin'}).save(),
            new Role()({name: 'administrator'}).save(),
            new Role()({name: 'patient'}).save()
        ])

        const role_superadmin = await Role().findOne({name:"superadmin"})
        await new User({skipTenant: true})({
            "email": "superusuario@correo.com",
            "dni": "172876633",
            "password": await User().encryptPassword("demo1234"),
            "name": "Super Administrador",
            "role": role_superadmin._id,
        }).save()

    } catch (error) {
        console.log(error)
    }
}