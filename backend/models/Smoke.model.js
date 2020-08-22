const mongoose = require('mongoose')

const Schema = mongoose.Schema

const smokeSchema = new Schema({
    smokeName:{type:String},
    smokePrice:{type:Number},
    smokePhoto:{type:String},
    smokePower:{type:Number},
    smokeResistance:{type:Number},
    smokeCapacity:{type:Number},
})

module.exports = mongoose.model('Smoke',smokeSchema)