const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { createUser, login, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');
const { validateAuth, validateSignup, validateSignin } = require('../middlewares/validation');

// роуты, не требующие авторизации
// роут регистрации
router.post('/signup', validateSignup, createUser);
// роут логина
router.post('/signin', validateSignin, login);

// мидлвэр авторизации
router.use(validateAuth, auth);

// роуты требующие авторизации
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.post('/signout', logout);
router.use((req, res, next) => {
  next(new NotFoundError(`Запрашиваемый ресурс по адресу '${req.path}' не найден`));
});

module.exports = router;