import Routine from '../models/Routine';

export const getRoutines = async (req, res) => {
    const routines = await Routine().find();
    res.status(200).json({data: routines})
}

export const getRoutineById = async (req, res) => {
    await Routine().findById(req.params.id,
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

export const createRoutine = async (req, res) => {

    const {name, description, objective, mode, params} = req.body 
    const routine = new Routine()({
        name,
        description,
        objective,
        mode,
        params
    })

    await routine.save(
        function(err, result){ 
            if (err){
                res.status(400).json(err);
            }else{
                res.status(201).json({
                    message: 'routine created',
                    data: result
                });
            }
        }
    )
}

export const updateRoutineById = async (req, res) => {
    await Routine.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true},
        function (err, docs) {
            if (err){
                res.status(400).json(err)
            }
            else{
                res.status(201).json({
                    message: 'routine update',
                    data: docs
                })
            }
        }
    );
}

export const deleteRoutineById = async (req, res) => {
    await Routine.findByIdAndRemove(req.params.id,
        function (err, docs) { 
            if (err){
                res.status(400).json(err)
            }
            else{
                res.status(200).json({
                    message: 'routine delete',
                    data: docs
                })
            }
        }
    )
}
