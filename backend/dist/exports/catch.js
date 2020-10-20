"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_errors_1 = require("./postgres-errors");
const catchFunction = (error, res) => {
    // If user already exists
    if (error.code === postgres_errors_1.PG_FOREIGN_KEY_VIOLATION) {
        res.json({ error: "El registro ya se encuentra asociado a otros." });
    }
    else if (error.code == postgres_errors_1.PG_UNIQUE_VIOLATION) {
        res.json({ error: "Error de llave unica." });
    }
    else {
        res.json({ error: error.code });
    }
};
exports.default = catchFunction;
//# sourceMappingURL=catch.js.map