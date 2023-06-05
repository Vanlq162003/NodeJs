import Joi from "joi";
import Language from "../models/language";
import Project from "../models/project";
const languageSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
});

export const getAll = async (req, res) => {
    try {
        const data = await Language.find().populate("projects");

        if (data.length == 0) {
            return res.json({
                message: "Không có sản phẩm nào",
            });
        }
        return res.json(data);
    } catch (error) {}
};
export const get = async (req, res) => {
    try {
        const id = req.params.id;
        const language = await Language.findById(id).populate("projects");
        if (language.length === 0) {
            return res.status(200).json({
                message: "Không có ngôn ngữ",
            });
        }
        return res.status(200).json(language);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const create = async (req, res) => {
    try {
        const body = req.body;
        const { error } = languageSchema.validate(body);
        if (error) {
            return res.json({
                message: error.details.map((item) => item.message),
            });
        }
        const data = await Language.create(body);
        if (data.length === 0) {
            return res.status(400).json({
                message: "Thêm ngôn ngữ thất bại",
            });
        }
        return res.status(200).json({
            message: "Thêm ngôn ngữ thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const remove = async (req, res) => {
    try {
        const data = await Language.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Xóa danh mục thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const update = async (req, res) => {
    try {
        const data = await Language.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        if (!data) {
            return res.status(400).json({
                message: "Cập nhật ngôn ngữ thất bại",
            });
        }
        return res.json({
            message: "Cập nhật ngôn ngữ thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};