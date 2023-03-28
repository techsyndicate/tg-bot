const router = require("express").Router();

function isAuth(req, res, next) {
  if (req.user) {
    let userId = req.user.id;
    if (userId == "705657480096645130" || userId == "823237564130525184")
      return next();
  } else {
    res.redirect("/");
  }
}
router.get("/", isAuth, (req, res) => {
  res.send("Dahboard page");
});

module.exports = router;
