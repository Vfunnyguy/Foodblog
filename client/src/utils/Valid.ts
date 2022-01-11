import { IUserRegister, IBlog } from "./Type";

export const validRegister = (userRegister: IUserRegister) => {
  const { name, account, password, cf_password } = userRegister;
  const errors: string[] = [];

  if (!name) {
    errors.push("Hãy nhập tên của bạn");
  } else if (name.length > 20) {
    errors.push("Tên của bạn giới hạn trong 20 ký tự");
  }

  if (!account) {
    errors.push("Hãy nhập email của bạn");
  } else if (!validateEmail(account)) {
    errors.push("Email không khả dụng");
  }

  const msg = checkPassword(password, cf_password);
  if (msg) errors.push(msg);

  return {
    errMsg: errors,
    errLength: errors.length,
  };
};
export const checkPassword = (password: string, cf_password: string) => {
  if (
    !password.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/
    )
  ) {
    return "Mật khẩu phải có ít nhất 6 ký tự và phải có 1 số ,1 chữ in hoa và 1 ký tự đặc biệt";
  } else if (password !== cf_password) {
    return "Mật khẩu xác nhận không hợp lệ";
  }
};

export function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
export const validCreateBlog = ({
  title,
  content,
  description,
  thumbnail,
  category,
}: IBlog) => {
  const err: string[] = [];
  if (title.trim().length < 10) {
    err.push("Tiêu đề không được để trống và có ít nhất 10 ký tự ");
  } else if (title.trim().length > 50) {
    err.push("Tiêu đề không được vượt quá 50 chữ |");
  }
  if (content.trim().length < 2000) {
    err.push("Nội dung có ít nhất 2000 ký tự |");
  }
  if (description.trim().length < 50) {
    err.push("Mô tả không đươc để trống và phải có ít nhất 50 ký tự ");
  } else if (description.trim().length > 300) {
    err.push("Nội dung mô tả không được vuợt quá 300 ký tự " );
  }
  if (!thumbnail) {
    err.push("Thumbnail không được để trống ");
  }
  if (!category) {
    err.push("Thể loại phải được chọn! ");
  }
  return {
    errMsg: err,
    errLength: err.length,
  };
};
export const shallowEqual=(obj1:any,obj2:any)=>{
  const keys1=Object.keys(obj1)
  const keys2=Object.keys(obj2)
  if(keys1.length!==keys2.length){
    return false
  }

  for(let key of keys1){
    if(obj1[key]!==obj2[key]){
      return false
    }
  }
  return true
}