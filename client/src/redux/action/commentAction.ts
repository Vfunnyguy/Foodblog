import { Dispatch } from "redux";
import { ALERT, IAlertType } from "../types/alertType";
import {
  ICreateCommentType,
  GET_COMMENT,
  IGetCommentType,
  IReplyCommentType,
  UPDATE_COMMENT,
  UPDATE_REPLY,
  IUpdateCommentType,
  DELETE_COMMENT,
  DELETE_REPLY,
  IDeleteCommentType,
} from "../types/commentType";
import { IComment } from "../../utils/Type";
import { postAPI, getAPI, patchAPI, deleteAPI } from "../../utils/Fetch";
import { checkTokenExp } from "../../utils/checkToken";
export const createComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICreateCommentType>) => {
    const ketqua = await checkTokenExp(token, dispatch);
    const access_token = ketqua ? ketqua : token;
    try {
      await postAPI("comment", data, access_token);
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { erros: error.response.data.msg } });
    }
  };
export const getComment =
  (id: string, num: number) =>
  async (dispatch: Dispatch<IAlertType | IGetCommentType>) => {
    try {
      let limit = 4;
      const res = await getAPI(
        `comment/blogs/${id}?page=${num}&limit=${limit}`
      );
      dispatch({
        type: GET_COMMENT,
        payload: {
          data: res.data.comments,
          total: res.data.total,
        },
      });
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { erros: error.response.data.msg } });
    }
  };
export const replyComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | IReplyCommentType>) => {
    const ketqua = await checkTokenExp(token, dispatch);
    const access_token = ketqua ? ketqua : token;
    try {
      await postAPI("reply_comment", data, access_token);
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { erros: error.response.data.msg } });
    }
  };
export const updateComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | IUpdateCommentType>) => {
    const ketqua = await checkTokenExp(token, dispatch);
    const access_token = ketqua ? ketqua : token;

    try {
      dispatch({
        type: data.comment_root ? UPDATE_REPLY : UPDATE_COMMENT,
        payload: data,
      });
      await patchAPI(`comment/${data._id}`, { data }, access_token);
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { erros: error.response.data.msg } });
    }
  };
export const deleteComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | IDeleteCommentType>) => {
    const ketqua = await checkTokenExp(token, dispatch);
    const access_token = ketqua ? ketqua : token;

    try {
      dispatch({
        type: data.comment_root ? DELETE_REPLY : DELETE_COMMENT,
        payload: data,
      });
      await deleteAPI(`comment/${data._id}`, access_token);
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { erros: error.response.data.msg } });
    }
  };
