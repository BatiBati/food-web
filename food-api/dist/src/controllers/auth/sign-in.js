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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_model_1.userModel.findOne({
            email,
        });
        if (!user) {
            res.status(404).json({ message: "Username or password is invalid" });
            return;
        }
        const _a = user.toObject(), { password: hashedPassword } = _a, userWithoutPassword = __rest(_a, ["password"]);
        const isPasswordMatch = yield bcryptjs_1.default.compare(password, hashedPassword);
        if (!isPasswordMatch) {
            res.status(404).json({ message: "Username or password is invalid" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user._id,
            isAdmin: user.role === "ADMIN",
        }, process.env.JWT_SECRET);
        res.status(200).json({ user: userWithoutPassword, token });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.signIn = signIn;
//# sourceMappingURL=sign-in.js.map