import * as types from '../types/categoryType'
import { ITheLoai } from '../../utils/Type'

const categoryReducer = (
  state: ITheLoai[] = [], action: types.IKieuTheLoai
): ITheLoai[] => {
  switch (action.type) {
    case types.TAO_THELOAI:
      return [action.payload, ...state]

    case types.GET_CATEGORIES:
      return action.payload
    case types.UPDATE_CATEGORY:
      return state.map(item => (
        item._id === action.payload._id
        ? { ...item, name: action.payload.name}
        : item
      ))
    case types.DELETE_CATEGORY:
      return state.filter(item => item._id !== action.payload)
    default:
      return state;
  }
}

export default categoryReducer;