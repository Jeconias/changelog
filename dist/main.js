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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("@actions/core"));
const fs_1 = __importDefault(require("fs"));
function run({ pattern }) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const inputPattern = (_a = core_1.default.getInput("pattern")) !== null && _a !== void 0 ? _a : pattern;
            const content = yield fs_1.default.readFile("README.md", { encoding: "utf-8" }, (err) => {
                if (err)
                    core_1.default.setFailed(err.message);
            });
            console.log(content);
            console.log(inputPattern);
        }
        catch (error) {
            core_1.default.setFailed(error.message);
        }
    });
}
run({ pattern: "basic" });
