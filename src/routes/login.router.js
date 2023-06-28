import { Router } from 'express';
import { UserModel } from '../daos/models/users.model.js';

const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).render('errorPage', { msg: 'faltan datos' });
  }
  try {
    let foundUser;
    if (email == "adminCoder@coder.com" && password == "adminCod3r123") {
      req.session.firstName = "admin";
      req.session.lastName = "admin";
      req.session.email = email;
      req.session.role = "admin";
      req.session.cartId = "648dea4594df99a1170ce143";
    } else {
      foundUser = await UserModel.findOne({ email });
      if (foundUser && foundUser.password == password) {
        req.session.firstName = foundUser.firstName;
        req.session.lastName = foundUser.lastName;
        req.session.email = foundUser.email;
        req.session.role = foundUser.role;
        req.session.cartId = foundUser.cart;
      } else {
        return res.status(400).render('errorPage', { msg: 'email o pass incorrectos' });
      }
    }
    return res.redirect('/products');
    } catch (e) {
      console.log(e);
      return res.status(500).render('errorPage', { msg: 'error inesperado en servidor' });
    }
  });

loginRouter.get('/', async (req, res) => {
  if (!req.session.email) {
    res.status(200).render('login');
  } else {
    res.redirect('/products');
  }
})

export default loginRouter;