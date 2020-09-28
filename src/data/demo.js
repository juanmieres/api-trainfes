import User from '../models/User'
import Role from '../models/Role'
import Organization from '../models/Organization'

export const createOrganization = async () => {
    try {
 
        const count = await Organization().estimatedDocumentCount()
        if (count > 0) return;
        
        const organization = await new Organization()({
            name: "Teletón",
            license: "premium",
            location: "Av Libertador Bernardo O'Higgins, Santiago, Estación Central, Región Metropolitana",
            phone: "+56226772000"
        }).save()

        const role_administrator = await Role().findOne({name:"administrator"})
        await new User({skipTenant: true})({
            "email": "administrador@correo.com",
            "dni": "172345573",
            "password": await User().encryptPassword("demo1234"),
            "name": "Administrador",
            "role": role_administrator._id,
            "organization": organization._id
        }).save()

        const role_patiente = await Role().findOne({name:"patient"})
        await new User({skipTenant: true})({
            "email": "paciente@correo.com",
            "dni": "107363963",
            "password": await User().encryptPassword("demo1234"),
            "name": "Paciente",
            "role": role_patiente._id,
            "organization": organization._id
        }).save()

    } catch (error) {
        console.log(error)
    }
}