import bcrypt from "bcryptjs";

const hashPassword = (passwd) => {
  return bcrypt.hashSync(passwd, bcrypt.genSaltSync(10));
};

export default hashPassword;
