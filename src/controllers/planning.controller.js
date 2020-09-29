import Planning from '../models/Planning';

export const getPlannings = async (req, res) => {
    const plannings = await Planning().find().populate('patient');
    res.status(200).json({data: plannings})
}

export const getPlanningById = async (req, res) => {
    await Planning().findById(req.params.id,
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

export const createPlanning = async (req, res) => {
    const {name, media, dates, patient, routines} = req.body 
    const planning = new Planning()({
        name,
        media,
        dates,
        patient,
        routines
    })

    // for (let i = 0; i < dnis.length; i++) {
    //     dnis[i];
    // }

    await planning.save(
        function(err, result){ 
            if (err){
                res.status(400).json(err);
            }else{
                res.status(201).json({
                    message: 'planning created',
                    data: result
                });
            }
        }
    )
}

export const updatePlanningById = async (req, res) => {
    await Planning().findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true},
        function (err, docs) {
            if (err){
                res.status(400).json(err)
            }
            else{
                res.status(201).json({
                    message: 'planning update',
                    data: docs
                })
            }
        }
    );
}

export const deletePlanningById = async (req, res) => {
    await Planning().findByIdAndRemove(req.params.id,
        function (err, docs) { 
            if (err){
                res.status(400).json(err)
            }
            else{
                res.status(200).json({
                    message: 'planning delete',
                    data: docs
                })
            }
        }
    )
}

// export const assignPlanning = async (req, res) => {
//     const {dnis} = req.body
//     const planning = await Planning().findById(req.params.id)

//     for (let i = 0; i < dnis.length; i++) {
//         const element = dnis[i];
//     }
// }
