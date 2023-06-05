import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const projectSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        image:{
            type: String,
            require: true,
        },
        title:{
            type: String,
            require: true,
        },
        description:{
            type: String,  
            require: true,
        },
        git:{
            type: String,
            require: true,
        },
        languageId: {
            type: mongoose.Types.ObjectId,
            ref: "Language",
        },
    },
    { timestamps: true, versionKey: false }
);
projectSchema.plugin(mongoosePaginate);

export default mongoose.model("Project", projectSchema);