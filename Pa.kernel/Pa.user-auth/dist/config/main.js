"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    // port
    port: process.env.PORT || 9300,
    // database
    db: 'mongodb://localhost:27017/pa-user-auth',
    // test environment
    test_env: 'test',
    test_db: 'mongodb://localhost:27017/pa-user-auth-test',
    test_port: 9301
};
exports.default = config;
//# sourceMappingURL=main.js.map