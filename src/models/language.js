import mongoose from "mongoose";

const languageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        require: true,
    },
    projects: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Project",
        },
    ],
});

export default mongoose.model("Language", languageSchema);