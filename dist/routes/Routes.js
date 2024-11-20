"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const login_1 = __importDefault(require("../auth/login/login"));
const ingressos_controller_1 = __importDefault(require("../controller/ingressos.controller"));
const eventos_controller_1 = __importDefault(require("../controller/eventos.controller"));
//iniciando a app com express
exports.App = (0, express_1.default)();
exports.App.use(express_1.default.json());
exports.App.use(express_1.default.urlencoded({ extended: true }));
exports.App.use((0, cors_1.default)({
    origin: ['*'],
    methods: ['POST', 'PUT', 'GET'],
    credentials: true,
    allowedHeaders: ['Authorization', 'Bearer']
}));
exports.App.post('/auth/login', login_1.default);
exports.App.get('/ingressos', ingressos_controller_1.default.List);
exports.App.get('/ingressos/:id', ingressos_controller_1.default.getIngressosById);
exports.App.put('/ingressos', ingressos_controller_1.default.UpdateStatus);
exports.App.get('/eventos', eventos_controller_1.default.List);
//# sourceMappingURL=Routes.js.map