export const authorization = (...role) => {
    return (req, res, next) => {
      const userRole = req.user && req.user.role;
  
      if (!userRole || !role.includes(userRole)) {
        return res.status(403).json({ message: "Access denied" });
      }
  
      next();
    };
  };