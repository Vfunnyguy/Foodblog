"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commentModel_1 = __importDefault(require("../models/commentModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("../src/index");
const Pagination = (req) => {
    let page = Number(req.query.page) * 1 || 1;
    let limit = Number(req.query.limit) * 1 || 4;
    let skip = (page - 1) * limit;
    return { page, limit, skip };
};
const binhluanControl = {
    createComment: async (req, res) => {
        if (!req.user)
            return res.status(900).send({ msg: "Invalid" });
        try {
            const { content, blog_id, blog_user_id } = req.body;
            const newComment = new commentModel_1.default({
                user: req.user._id,
                content,
                blog_id,
                blog_user_id,
            });
            const data = Object.assign(Object.assign({}, newComment._doc), { user: req.user, createdAt: new Date().toISOString() });
            index_1.io.to(`${blog_id}`).emit('createComment', data);
            await newComment.save();
            return res.send(newComment);
        }
        catch (error) {
            return res.status(500).send({ msg: error.message });
        }
    },
    getComment: async (req, res) => {
        const { limit, skip } = Pagination(req);
        try {
            const data = await commentModel_1.default.aggregate([
                {
                    $facet: {
                        totalData: [
                            {
                                $match: {
                                    blog_id: new mongoose_1.default.Types.ObjectId(req.params.id),
                                    comment_root: { $exists: false },
                                    reply_user: { $exists: false }
                                }
                            },
                            {
                                $lookup: {
                                    "from": "users",
                                    "let": { user_id: '$user' },
                                    'pipeline': [
                                        { $match: { $expr: { $eq: ['$_id', '$$user_id'] } } },
                                        { $project: { name: 1, avatar: 1 } }
                                    ],
                                    "as": "user",
                                },
                            },
                            { $unwind: "$user" },
                            {
                                $lookup: {
                                    'from': 'comments',
                                    'let': { cm_id: "$replyCM" },
                                    'pipeline': [
                                        { $match: { $expr: { $in: ["$_id", "$$cm_id"] } } },
                                        {
                                            $lookup: {
                                                'from': 'users',
                                                "let": { user_id: "$user" },
                                                "pipeline": [
                                                    { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                                                    { $project: { name: 1, avatar: 1 } }
                                                ],
                                                'as': 'user'
                                            }
                                        },
                                        { $unwind: '$user' },
                                        {
                                            $lookup: {
                                                'from': 'users',
                                                "let": { user_id: "$reply_user" },
                                                "pipeline": [
                                                    { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                                                    { $project: { name: 1, avatar: 1 } }
                                                ],
                                                'as': 'reply_user'
                                            }
                                        },
                                        { $unwind: '$reply_user' }
                                    ],
                                    'as': 'replyCM'
                                }
                            },
                            { $sort: { createdAt: -1 } },
                            { $skip: skip },
                            { $limit: limit },
                        ],
                        totalCount: [
                            {
                                $match: {
                                    blog_id: new mongoose_1.default.Types.ObjectId(req.params.id),
                                    comment_root: { $exists: false },
                                    reply_user: { $exists: false }
                                },
                            },
                            { $count: "count" },
                        ],
                    },
                },
                {
                    $project: {
                        count: { $arrayElemAt: ["$totalCount.count", 0] },
                        totalData: 1,
                    },
                },
            ]);
            const comments = data[0].totalData;
            const count = data[0].totalCount;
            let total = 0;
            if (count % limit === 0) {
                total = count / limit;
            }
            else {
                total = Math.floor(count / limit) + 1;
            }
            return res.json({ comments, total });
        }
        catch (error) {
            return res.status(500).send({ msg: error.message });
        }
    },
    replyComment: async (req, res) => {
        if (!req.user)
            return res.status(400).send({ msg: "invalid" });
        try {
            const { content, blog_id, blog_user_id, comment_root, reply_user } = req.body;
            const newComment = new commentModel_1.default({
                user: req.user._id,
                content,
                blog_id,
                blog_user_id,
                comment_root,
                reply_user: reply_user._id,
            });
            await commentModel_1.default.findOneAndUpdate({ _id: comment_root }, {
                $push: { replyCM: newComment._id },
            });
            const data = Object.assign(Object.assign({}, newComment._doc), { user: req.user, reply_user: reply_user, createdAt: new Date().toISOString() });
            index_1.io.to(`${blog_id}`).emit('replyComment', data);
            await newComment.save();
            return res.send({ newComment });
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    updateComment: async (req, res) => {
        if (!req.user)
            return res.status(400).send({ msg: 'Invalid' });
        try {
            const { data } = req.body;
            const comment = await commentModel_1.default.findOneAndUpdate({
                _id: req.params.id, user: req.user.id
            }, { content: data.content });
            if (!comment)
                return res.status(400).send({ msg: 'Comment error' });
            index_1.io.to(`${data.blog_id}`).emit('updateComment', data);
            return res.json({ msg: "Update OK" });
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    deleteComment: async (req, res) => {
        if (!req.user)
            return res.status(400).send({ msg: 'Invalid' });
        try {
            const comment = await commentModel_1.default.findOneAndDelete({
                _id: req.params.id,
                $or: [
                    { user: req.user._id },
                    { blog_user_id: req.user._id }
                ]
            });
            if (!comment)
                return res.status(400).send({ msg: 'Comment error' });
            if (comment.comment_root) {
                await commentModel_1.default.findOneAndUpdate({ _id: comment.comment_root }, { $pull: { replyCM: comment._id } });
            }
            else {
                await commentModel_1.default.deleteMany({ _id: { $in: comment.replyCM } });
            }
            index_1.io.to(`${comment.blog_id}`).emit('deleteComment', comment);
            return res.json({ msg: "Delete OK" });
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }
};
exports.default = binhluanControl;
//# sourceMappingURL=binhluanControl.js.map