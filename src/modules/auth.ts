import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const comparePassword = (password, hash) => {   
    return bcrypt.compareSync(password, hash);
}

export const hashPassword = (password) => {
    //const salt = bcrypt.genSaltSync(10);
   // const hash = bcrypt.hashSync(password, salt);
   return bcrypt.hash(password, 5);
}

export const generateToken = (user) => {
    const token = jwt.sign({ 
        id: user.id, 
        username: user.username 
      },
      process.env.JWT_SECRET
    );
    return token;
  };

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization;

    if(!bearer) {
      res.status(401);
      res.json({message: "Not authorized."});
      return res;
    }
    const [, token] = bearer.split(' ');
    if (!token) {
      res.status(401);
      res.json({message: "Not valid token."});
      return res;
    }

    try{
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
      console.error(err);
      res.status(401);
      res.json({message: "Not valid token."});
      return res;
    }
};

/*
  export const verifyToken = (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (err) {
      return null;
    }
  }
  */