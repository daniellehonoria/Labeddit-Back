"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDTO = void 0;
const BadRequestError_1 = require("../Errors/BadRequestError");
class PostDTO {
    createPostInput(token, content) {
        if (token === undefined)
            throw new BadRequestError_1.BadRequestError("Token é obrigatório");
        if (typeof token !== "string")
            throw new BadRequestError_1.BadRequestError("'id' deve ser string");
        if (content === undefined)
            throw new BadRequestError_1.BadRequestError("Content é obrigatório");
        if (typeof content !== "string")
            throw new BadRequestError_1.BadRequestError("content deve ser string");
        const dtoPost = {
            token,
            content
        };
        return dtoPost;
    }
}
exports.PostDTO = PostDTO;
//# sourceMappingURL=PostDto.js.map