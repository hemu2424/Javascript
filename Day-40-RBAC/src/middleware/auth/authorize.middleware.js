export const authorize = (...role) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: "user is not authenticated"
                });
            }

            if (!role.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "user is not authorized"
                });
            }

            next();
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Authorization failed"
            });
        }
    };
};
