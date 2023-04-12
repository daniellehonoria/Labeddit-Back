"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const BaseError_1 = require("../Errors/BaseError");
class CommentController {
    constructor(commentBusiness) {
        this.commentBusiness = commentBusiness;
        this.createComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    postId: req.params.id,
                    content: req.body.content,
                    token: req.headers.authorization
                };
                const output = yield this.commentBusiness.createComment(input);
                res.status(201).send(output);
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.getComments = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    postId: req.params.id,
                    token: req.headers.authorization
                };
                const output = yield this.commentBusiness.getComments(input);
                res.status(200).send(output);
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.deleteComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    commentId: req.params.id,
                    token: req.headers.authorization
                };
                const output = yield this.commentBusiness.deleteComment(input);
                res.status(200).send(output);
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.likeOrDislikeComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    idToLikeOrDislike: req.params.id,
                    token: req.headers.authorization,
                    like: req.body.like
                };
                const output = yield this.commentBusiness.likeOrDislikeComment(input);
                res.status(200).send(output);
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
    }
}
exports.CommentController = CommentController;
//# sourceMappingURL=CommentController.js.map