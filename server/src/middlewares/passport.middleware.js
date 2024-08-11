import passport from 'passport';

export default function passportMiddleware(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) return res.status(500).json({ message: 'Internal Server Error' });
    if (!user) return res.status(401).json({ status: 'ERR', message: 'Token không hợp lệ hoặc không có token' });
    req.user = user;
    next();
  })(req, res, next);
}
