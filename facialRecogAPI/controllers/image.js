const CLARIFAI_PAT = 'daa936fb4067482cb04eb292c5269f03';
const CLARIFAI_USER_ID = 'acc5n45nn80u';
const CLARIFAI_APP_ID = 'FaceDetection';
const CLARIFAI_MODEL_ID = 'face-detection';


const handleApiCall = (req, res) => {
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": CLARIFAI_USER_ID,
            "app_id": CLARIFAI_APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": req.body.input
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + CLARIFAI_PAT
        },
        body: raw
    };

    fetch(`https://api.clarifai.com/v2/models/${CLARIFAI_MODEL_ID}/outputs`, requestOptions)
        .then(response => response.json())
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'));
}

const handleImage = (req, res, db)=> {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err=>res.status(400).json('unable to get entries'));
}


module.exports = {
    handleImage,
    handleApiCall
};