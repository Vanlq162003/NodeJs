import Joi from "joi";
import Project from "../models/project";
import Language from "../models/language";

const projectSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string(),
    git: Joi.string().required(),
    languageId: Joi.string().required(),
});

export const getAll = async (req, res) => {
    const { _limit = 10, _sort = "createAt", _order = "asc", _page = 1 } = req.query;
    const options = {
        page: _page,
        limit: _limit,
        sort: {
            [_sort]: _order == "desc" ? -1 : 1,
        },
    };

    try {
        const data = await Project.paginate({}, options);
        if (data.length == 0) {
            return res.json({
                message: "Không có dự án nào",
            });
        }
        return res.json(data);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const get = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Project.findOne({ _id: id }).populate("languageId", "-__v");
        if (data.length === 0) {
            return res.status(200).json({
                message: "Không có dự án",
            });
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const create = async (req, res) => {
    try {
        const body = req.body;
        const { error } = projectSchema.validate(body);
        if (error) {
            return res.json({
                message: error.details[0].message,
            });
        }
        const project = await Project.create(body); 

        await Language.findByIdAndUpdate(project.languageId, {
            $addToSet: {
                projects: project._id,
            },
        });

        if (project.length === 0) {
            return res.status(400).json({
                message: "Thêm dự án thất bại",
            });
        }
        
        return res.status(200).json({
            message: "Thêm dự án thành công",
            project,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const remove = async (req, res) => {
    try {
        const data = await Project.findByIdAndDelete(req.params.id);
        await Language.findByIdAndUpdate(data.languageId, {
            $addToSet: {
                projects: data._id,
            },
        });
        return res.json({
            message: "Xóa sản phẩm thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const update = async (req, res) => {
    try {
        const data = await Project.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        await Language.findByIdAndUpdate(data.languageId, {
            $addToSet: {
                projects: data._id,
            },
        });
        if (!data) {
            return res.status(400).json({
                message: "Cập nhật dự án thất bại",
            });
        }
        return res.json({
            message: "Cập nhật dự án thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
