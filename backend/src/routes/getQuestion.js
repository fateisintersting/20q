const express = require('express');
const { QuestionModal } = require('../models/Question');

const getQuestion = express.Router();

getQuestion.get('/get-challange', async (req,res)=>{

    try{
        const challange = await QuestionModal.find();

        res.status(200).json({
            success:true,
            data:challange,
        })

    }catch(error){
        console.error('get error',error);
        res.status(500).json({
            success:false,
            message:'Internal Server Error',
        })
    }
})

module.exports = getQuestion;