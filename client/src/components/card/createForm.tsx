import React from "react";
import { useSelector } from "react-redux";
import { RootStore, IBlog, InputChange } from "../../utils/Type";

interface IProps {
  blog: IBlog;
  setBlog: (blog: IBlog) => void;
}
const CreateForm: React.VFC<IProps> = ({ blog, setBlog }) => {
  const { categoryReducer } = useSelector((state: RootStore) => state);
  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setBlog({ ...blog, [name]: value });
  };
  const handleChangeThumbnail = (e: InputChange) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      const file = files[0];
      setBlog({ ...blog, thumbnail: file });
    }
  };
  return (
    <div className="cf_content">
      <form>
      <p style={{padding:0,margin:0}}>Tiêu Đề <span style={{color:'red'}}> *</span></p>
        <div className=" cform_input">
          <input
            type="text"
            className="cf_input_section"
            value={blog.title}
            name="title"
            onChange={handleChangeInput}
            
          />
          <span className="cf_bottom cf_span"></span>
          <span className="cf_right  cf_span"></span>
          <span className="cf_top    cf_span"></span>
          <span className="cf_left   cf_span"></span>
          <small
            className="mini_text"
            style={{ top: 20, right: "3px", opacity: "0.3" }}
          >
            {blog.title.length}/50
          </small>
        </div>

        <div className="form_upload">
          <label htmlFor="file">Thumbnail</label>
          <input
            type="file"
            name="file"
            id="file"
            className="input_file"
            accept="image/*"
            onChange={handleChangeThumbnail}
            placeholder="Chon"
          />
        </div>
        <p style={{padding:0,margin:0}}>Mô Tả <span style={{color:'red'}}> *</span></p>

        <div className="cform_desc_input">
          
          <textarea
            className="cf_desc_section"
            value={blog.description}
            style={{ resize: "none" }}
            name="description"
            onChange={handleChangeInput}
          />
          <span className="desc_span cf_desc_bottom"></span>
          <span className="desc_span cf_desc_right"></span>
          <span className="desc_span cf_desc_top"></span>
          <span className="desc_span cf_desc_left"></span>
          <small
            className="mini_text"
            style={{ bottom: 10, right: "3px", opacity: "0.3" }}
          >
            {blog.description.length}/300
          </small>
        </div>
        <div className="select_section">
          <select
            className="cf_select"
            value={blog.category}
            name="category"
            onChange={handleChangeInput}
          >
            
            <option value="" className="option_txt">Chọn Thể Loại * </option>
            {categoryReducer.map((category) => (
              <option key={category._id} value={category._id} className="option_list">
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
