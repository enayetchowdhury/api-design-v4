import prisma from "../db";
import { comparePassword,generateToken,hashPassword } from "../modules/auth";

export const createNewUser = async (req, res, next) => {

    try{
        const user = await prisma.user.create({
        data: {
            username: req.body.username,
            password: await hashPassword(req.body.password),
        }
    }); 
    const token = await generateToken(user);
    res.json({token});

    } catch(e) {
        e.type = "input";
        next(e);
    }
   

}

export const signin = async (req, res) => {
        const user = await prisma.user.findUnique({
            where: {
                username: req.body.username
            }
        });

        const isValid = await comparePassword(req.body.password, user.password);


        if (!isValid) {
            res.status(401);
            res.json({message: "User not found."});
            return res;
        }
        const token = await generateToken(user);
        res.json({token});
}
