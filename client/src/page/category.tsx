import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootStore, FormSubmit, ITheLoai } from "../utils/Type";
import { createCategory,updateCategory,deleteCategory } from "../redux/action/categoryAction";
import NotFound from "../components/global/notfound";

const Category = () => {
  const [name, setName] = useState("");
  const [edit, setEdit] = useState<ITheLoai | null>(null);
  const { authReducer, categoryReducer } = useSelector(
    (state: RootStore) => state
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (edit) setName(edit.name);
  }, [edit]);

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    if (!authReducer.access_token || !name) return;
    if(edit){
      if(edit.name===name)return
      const data={...edit,name}
      dispatch(updateCategory(data,authReducer.access_token))
    
    }else{
    dispatch(createCategory(name, authReducer.access_token));
    }
    setName("");
    setEdit(null)
  };
  const xulyXoa=(id:string)=>{
    if(!authReducer.access_token)return
    if(window.confirm('Bạn có chắc muốn xóa thể loại này')){
      
      dispatch(deleteCategory(id,authReducer.access_token))
    }
  }
  if (authReducer.user?.role !== "admin") return <NotFound />;

  return (
    // cp=category page
    <div className="category_page">
      <div className="title_cp">
        <h2>Thể Loại</h2>
      </div>
      <div className="main_cp_content">
        <form className="cp_form" onSubmit={handleSubmit}>
          <div className="cp_input">
            {edit && (
              <i className="fas fa-times mx-2"style={{cursor:'pointer',color:'red'}} onClick={() => setEdit(null)} />
            )}
            <input
              type="text"
              placeholder="Thêm Thể Loại"
              name="category"
              id="category_input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span className="cp_span bot"></span>
            <span className="cp_span right"></span>
            <span className="cp_span top"></span>
            <span className="cp_span left"></span>
          </div>

          <button type="submit" className="cp_submit_btn">
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front text">
              {" "}
              {edit ? "Cập nhập" : "Thêm mới "}
            </span>
          </button>
        </form>
      </div>
      <div className="cp_title_section">
        {categoryReducer.map((category) => (
          <div className="category_row" key={category._id}>
            <p className="category_name">{category.name}</p>

            <div className="crud_cp">
              <button className="edit_btn" onClick={() => setEdit(category)}>
                <span className="text">Edit</span>
                <span className="icon">
                  <i className="fas fa-edit cp_ico " />
                </span>
              </button>
              <button className="noselect"onClick={()=>xulyXoa(category._id)}>
                <span className="text">Delete</span>
                <span className="icon">
                  <i className="fas fa-trash-alt cp_ico" />
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
