let validateSchema = (schema) => {
    // CONTROLLER
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            res.status(400).json(error.issues.map((issue) => issue.message));
        }
    };
};

export default validateSchema;
