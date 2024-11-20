const express = require("express");
const zod = require("zod");
const app = express();

app.use(express.json());

function validateUserInputs(obj) {
    const schema = zod.object({
        username: zod.string(),
        email: zod.string().email(),
        password: zod.string().min(6),
    });
    return schema.safeParse(obj);
}

app.post("/api/user", (req, res) => {
    try {
        const input = validateUserInputs(req.body);
        if (!input.success) {
            return res.status(400).json({
                msg: "Invalid Inputs",
                errors: input.error.errors,
            });
        }
        res.status(200).json(input.data);
    } catch (error) {
        res.status(500).json({
            msg: "not posted",
            error: error.message,
        });
    }
});

app.listen(3000);
