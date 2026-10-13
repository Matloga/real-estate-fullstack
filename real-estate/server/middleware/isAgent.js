exports.isAgent = (req, res, next) => {
  if (req.user?.role === "agent" || req.user?.role === "admin") return next();
  return res.status(403).json({ message: "Agent access required" });
};
