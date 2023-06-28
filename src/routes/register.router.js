import { Router } from 'express';
import { UserModel } from '../daos/models/users.model.js';
import { CartService } from '../services/carts.service.js';

const registerRouter = Router();

const cartService = new CartService();

registerRouter.post('/', async (req, res) => {
  const { firstName, lastName, age, email, password } = req.body;
  if (!firstName || !lastName || !age || !email || !password) {
    return res.status(400).render('errorPage', { msg: 'faltan datos' });
  }
  try {
    const cart = await cartService.addCart();
    const user = await UserModel.create({ firstName, lastName, age, email, password, cart: cart._id });
    req.session.firstName = user.firstName;
    req.session.email = user.email;
    req.session.role = user.role;
    req.session.cartId = user.cart;
    return res.redirect('/login');
  } catch (e) {
    console.log(e);
    return res.status(400).render('errorPage', { msg: 'controla tu email y intenta mas tarde' });
  }
});

registerRouter.get('/', async (req, res) => {
    return res.status(200).render('register');
})

export default registerRouter;