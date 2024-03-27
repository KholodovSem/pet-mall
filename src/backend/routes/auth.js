const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult, checkSchema } = require("express-validator");

const UserDAO = require("../../database/models/User");

const bodyMiddleware = checkSchema({
  email: {
    isEmail: {
      errorMessage: "Must be a valid e-mail address",
    },
    notEmpty: true,
  },
  password: {
    errorMessage: "Password is required and must have as minimum 6 characters",
    notEmpty: true,
    isLength: {
      options: {
        min: 6,
      },
    },
  },
});

router.post("/register", bodyMiddleware, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors, message: "Incorrect input values" });
  }

  const { email, password } = req.body;

  const isUserExist = await UserDAO.findOne({ where: { email } });

  if (isUserExist) {
    return res
      .status(400)
      .json({ message: `User with ${email} already exist` });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserDAO.create({ email, password: hashedPassword });

  return res.json(user);
});

router.post("/login", bodyMiddleware, async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors, message: "Incorrect input values" });
  }

  const { email, password } = req.body;

  const user = await UserDAO.findOne({ where: { email } });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Password or email is incorrect" });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  return res.json(token);
});

module.exports = router;
