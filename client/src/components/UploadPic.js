import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadImage } from "../actions";
import exit from "../images/exit.png"

const UploadPic = ({trigger, toggleTrigger}) => {
  const [selectedFile, setFile] = useState(null);
  const [data, isData] = useState();
  const [image, isImage] = useState();
  const dispatch = useDispatch();

  const onFileChange = event => { 
    setFile(event.target.files[0])
  }; 

  const onFileUpload = () => { 
    if(!selectedFile){
      return isData(false)
    } else {
      isData(true)
    }

    if(selectedFile.type !== "image/jpeg" && selectedFile.type !== "image/heic"){
      return isImage(false)
    };
    dispatch(uploadImage(selectedFile))
    toggleTrigger(false)
  }; 

  const fileData = () => {
    if(image === false){
      return (
        <div> 
        <br /> 
        <p>selected file is not image</p> 
      </div> 
      )
    }
    return (data === false) ? ( 
      <div> 
        <br /> 
        <p>Choose a file before pressing the upload button</p> 
      </div> 
    ) : ""
  }; 

  return trigger ? (
    <div className="popup-outer">
      <div className="popup-inner">
        <img className="upload-close" onClick={() => toggleTrigger(false)} src={exit} alt="close" width="20px" />
        <h3>Change Profile Picture:</h3>
        <input className="file-input" name="image" type="file" onChange={onFileChange} /> 
        <hr/>
        <button className="continue-menu" style={{"margin": "10px", "marginLeft": "130px"}} onClick={onFileUpload}> 
          Upload 
        </button>
        {fileData()} 
      </div>
    </div>
  ) : ""
}

export default UploadPic;