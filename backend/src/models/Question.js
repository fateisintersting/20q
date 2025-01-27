const mongoose = require('mongoose')

const QuestionDataSchema = new mongoose.Schema({
    guessword : {type: String,reuired:true},
    category : {type: String,reuired:true},
    context :{type: String,reuired:true},
},{timestamps:true});

const QuestionModal = mongoose.model('Data',QuestionDataSchema)

module.exports = {
    QuestionModal,
}