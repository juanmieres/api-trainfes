import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'

import {createRoles} from './data/initial'
import {createOrganization} from './data/demo'
import {bindCurrentNamespace} from './libs/storage';
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import organizationRoutes from './routes/organization.routes'
import routineRoutes from './routes/routine.routes'
import planningRoutes from './routes/planning.routes'

const app = express();
createRoles()
createOrganization()

app.set('pkg', pkg)
app.use(morgan('dev'))
app.use(express.json())
app.use(bindCurrentNamespace);

app.get('/', (req, res) =>{
    res.json({
        name: app.get('pkg').name,
        description: app.get('pkg').description,
        author: app.get('pkg').author,
        version: app.get('pkg').version
    })
})

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/organization', organizationRoutes)
app.use('/api/routine', routineRoutes)
app.use('/api/planning', planningRoutes)

export default app;