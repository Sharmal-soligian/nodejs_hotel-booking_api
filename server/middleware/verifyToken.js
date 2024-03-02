import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({
            message: "You're not authorized"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: "Invalid Token"
            });
        } else {
            req.user = user; /* THIS USER CONTAINS id: user._id, isAdmin: user.isAdmin  */
            next();
        }
    });
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({
                message: "You are not authorized!"
            });
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({
                message: "You are not authorized!"
            });
        }
    });
};