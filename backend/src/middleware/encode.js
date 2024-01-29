function encoder(req, res, next) {
  const newText = encodeURIComponent(req.body.title);
  req.body.title = newText;
  next();
}

module.exports = encoder;
