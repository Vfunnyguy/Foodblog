import express  from "express";
import categoryControl from "../controller/categoryControl";
import auth from '../middleware/auth'
const dinhtuyen=express.Router()
dinhtuyen.route('/category')
 .get(categoryControl.getCategory)
 .post(auth,categoryControl.createCategory)
dinhtuyen.route('/category/:id')
 .patch(auth,categoryControl.updateCategory)
 .delete(auth,categoryControl.deleteCategory)
export default dinhtuyen