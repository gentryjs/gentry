module.exports = function(res, err, code) {
  if (code == null) {
    code = 500;
  }
  res.status(code);
  if (typeof err === 'string') {
    res.json({
      error: {
        message: err
      }
    });
  } else {
    res.json({
      error: err
    });
  }
  return res;
};
