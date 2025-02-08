import mongoose from 'mongoose';
const companySchema = new mongoose.Schema({
 name:{
        type: String,
        required: true,
        trim: true
 },
 
website:{
    type: String,
},

description:{
    type: String
},
location:{
    type: String
},
logo:{
    type: String
},
userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
}
}, {timestamps: true});

export default mongoose.model('Company', companySchema);