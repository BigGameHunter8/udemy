import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Issue from "./models/Issue";

const app= express();
const router = express.Router();

app.use(cors);
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/issues');
const connection = mongoose.connection;

connection.once('open',()=>{console.log('MongoDB database connected');});


router.route('/issues').get((req,res)=>{
    Issue.find((err, issues) => {
        if (err)
            console.log(err);
        else
            res.json(issues);
    });
});

router.route('issues/:id').get(((req,res)=>{
    Issue.findById(req.params.id,(err,issue)=>{
        if(err){
            console.log(err);
        }

        else{
            res.json(issue);
        }
    })
}));


router.route('issues/add').post((req,res)=>{
    let issue = new Issue(req.body);
    issue.save()
        .then(issue=>{
            res.status(200).json({'issue':'Added successfully'});
        })
        .catch(err=>{
            res.status(400).send('Failed to create new record');
        })
});







app.listen(3000,()=>{
    console.log('Server run');
});