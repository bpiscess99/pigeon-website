import jsonwebtoken from "jsonwebtoken";
import Clubsmodal from "../models/Clubsmodal.js";

export const requiresingnin = async (req, res, next) => {
  try {
    const decode = jsonwebtoken.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

export const isadmin = async (req, res, next) => {
  try {
    const user = await Clubsmodal.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "unauthrized access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
