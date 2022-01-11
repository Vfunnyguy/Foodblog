import { ITheLoai } from "../../utils/Type";
export const TAO_THELOAI="TAO_THELOAI"
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const UPDATE_CATEGORY='UPDATE_CATEGORY'
export const DELETE_CATEGORY='DELETE_CATEGORY'
export interface ITao{
    type:typeof TAO_THELOAI
    payload:ITheLoai
}
export interface IGetCategories{
    type: typeof GET_CATEGORIES
    payload: ITheLoai[]
  }
export interface IUpdateCategory{
  type:typeof UPDATE_CATEGORY
  payload:ITheLoai
}
export interface IDeleteCategory{
  type:typeof DELETE_CATEGORY
  payload:string
}
export type IKieuTheLoai=
| ITao
| IGetCategories
| IUpdateCategory
| IDeleteCategory