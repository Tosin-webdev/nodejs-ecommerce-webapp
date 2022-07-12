import JWT from 'jsonwebtoken';

export const generateToken = (user) => {
  return JWT.sign(
    {
      id: user._id,
      // name: user.name,
      // email: user.email,
      // isAdmin: user.isAdmin,
    },
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

// JWT sign has 3 parameters, the first one contains the user
// Objects,the next is JWT secret and the expiry date
