import { Request, Response, NextFunction } from 'express'

export const validRegister = async (req: Request, res: Response, next: NextFunction) => {
  const { name, account, password } = req.body
  const errors=[]
  if(!name){
    errors.push("Hãy nhập tên ")
  }else if(name.length > 20){
    errors.push("Your name is up to 20 character long.")
  }

  if(!account){
    errors.push("Please add your email ")
  }else if(!validateEmail(account)){
    errors.push("Email  format is incorrect.")
  }
  if((!password.match( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/))){
    errors.push('password must have at least 6 character 1 letter ,1 number,1 uppercase and 1 special character')
  }
 

  if(errors.length > 0) return res.status(400).json({msg: errors})

  next();
}
export function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
// (!password.match( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/)