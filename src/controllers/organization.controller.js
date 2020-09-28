import Organization from '../models/Organization'

export const getOrganizations = async (req, res) => {
    const organizations = await Organization().find();
    res.status(200).json({data: organizations})
}

export const getOrganizationById = async (req, res) => {
    await Organization().findById(req.params.id,
        function (err, docs) {
            if (err)
                res.status(400).json(err);
            res.status(200).json({
                data: docs
            });
        }
    );
}

export const createOrganization = async (req, res) => {
    const {name, license, location, phone} = req.body
    const organization = new Organization()({name, license, location, phone})
    await organization.save(
        function(err, result){ 
            if (err)
                res.status(400).json(err);
            res.status(201).json({
                message: 'organization created',
                data: result
            });
        }
    )
}

export const updateOrganizationById = async (req, res) => {
    await Organization().findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true},
        function (err, docs) {
            if (err)
                res.status(400).json(err)
            res.status(201).json({
                message: 'organization update',
                data: docs
            })
        }
    );
}

export const deleteOrganizationById = async (req, res) => {
    await Organization().findByIdAndRemove(req.params.id,
        function (err, docs) { 
            if (err)
                res.status(400).json(err)
            res.status(200).json({
                message: 'organization delete',
                data: docs
            })
        }
    )
}