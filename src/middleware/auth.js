export default (req, res, next) => {
    const token = req.query.token;
    if (token !== process.env.RBCYBER_API_TOKEN) {
        return res.status(403).type("text/plain").send("Forbidden");
    }
    next();
};
