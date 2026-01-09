// utils/uploadMiddleware.js
const uploadMiddleware = (upload) => {
  return (req, res, next) => {
    upload(req, res, function (err) {
      if (err) {
        const message = err.message || "File upload error";
        return res.status(400).json({ status: false, message });
      }
      next();
    });
  };
};
module.exports = uploadMiddleware;
