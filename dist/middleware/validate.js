export const validate = (schema) => (req, res, next) => {
    const data = {
        body: req.body,
        query: req.query,
        params: req.params,
    };
    const result = schema.safeParse(req.body);
    if (!result.success) {
        const issues = result.error.issues.map((i) => ({
            path: i.path,
            message: i.message,
        }));
        return res.status(400).json({ message: "Validation failed", issues });
    }
    next();
};
