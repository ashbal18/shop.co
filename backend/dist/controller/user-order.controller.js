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
exports.OrderController = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class OrderController {
    getUserTransactions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                    res.status(401).json({ message: "Unauthorized" });
                    return;
                }
                const userId = String(req.user.id);
                const transactions = yield prisma_1.default.order.findMany({
                    where: { userId },
                    include: {
                        items: {
                            include: {
                                product: true,
                            },
                        },
                        voucher: true,
                        store: true,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                });
                res.status(200).json({
                    message: "User transactions fetched successfully ✅",
                    transactions,
                });
            }
            catch (err) {
                console.error("Error fetching user transactions:", err);
                if (!res.headersSent)
                    res.status(500).json({ error: err.message || err });
            }
        });
    }
}
exports.OrderController = OrderController;
