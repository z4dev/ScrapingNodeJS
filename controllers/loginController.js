import auth from '../models/AuthModel.js'; 
import bcrypt from 'bcrypt';

const loginController = {
  
    // GET /login (render the login form)
    async login_get(req, res) {
        if ( req.session.user )
            return res.redirect('/home');
        
        res.render('login', {
            layout: 'layouts/auth-layout',
            route: 'login',
        });
    },

    // POST /login (handle login form submission)
    async login_post(req, res) {
        const { username, password } = req.body;
        try {
            req.session.user = null;
            const user = await auth.getUser(username);
            if ( user ){
                const match = await bcrypt.compare(password, user.password);
                if (match){
                    req.session.user = user;
                    res.status(200).json({text: 'OK', isLogged: true});
                } else {
                    res.status(200).json({text: 'خطأ في اسم المستخدم أو كلمة مرور', isLogged: false});
                }
            } else {
                res.status(200).json({ text: 'خطأ في اسم المستخدم أو كلمة مرور', isLogged: false });
            }
        }
        catch(err) {
            res.status(200).json({ text: err.code, isLogged: false  });
        }
    },

    // Logout Route
    async logout_get(req, res) {
        req.session.destroy( err => { 
            if (err) {
                return res.redirect('/home');
            }
            res.redirect('/');
        });
    },
};

async function hashPassword(password) {
    const saltRounds = 10;
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      console.error('Error hashing password:', error);
      return false;
    }
}

export default loginController;
