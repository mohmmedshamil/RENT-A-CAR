import { useDropzone } from "react-dropzone";
import React, { useState, useEffect, useCallback } from "react";
import './Fileupload.css'

function Fileuploads({upload,setFile,analysingloding,loading,btn,errormsg,downloadhide,exampleexcel,exampleexcelname}) {
  const [files, setFiles] = useState([]);
  const [base, setbase] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);
  useEffect(() => {
    if(files.length>0){
      var file = files[0];
    getBase64(file).then((data) =>{setbase(data)
    setFile(data);
    })

    }
    
  }, [files]);
  
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    // accept: "image/*",
    onDrop: (acceptedFiles) => {
      console.log("accepted", acceptedFiles);

      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
     
    },
  });
  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div>
        <p>{file.name}</p>
      </div>
    </div>
  ));
  return(
    <div className="uploadDrop">
    <div
      className={isDragActive || files[0] ? "dropzoneborder" : "dragzoneborder"}
    >
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {files[0] ? (
          <p>{files[0].name}</p>
        ) : isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      {/* <aside>{thumbs}</aside> */}
      {/* <div className="btn">
      <button
        className={isDragActive || files[0] ?"btn btn-primary" :"disabled btn btn-primary"}
        // disabled={!selectedFiles}
        onClick={upload}
      >
        Upload
      </button>
      </div> */}
      {/* {loading ? <Loader /> :null}
      {analysingloding ? <Loading /> :null} */}
      
      
    </div>
    {downloadhide ? <a href={exampleexcel} download className='itsatag'><div className="excelexample">
    <i class="far fa-file-excel"></i>
    <h1>{exampleexcelname}</h1>
    
    </div></a> : null}
    {btn ? <div class="alert alert-primary widthset" id='leftalignsss' role="alert">
                            {"File Uploaded Success...!"}
                        </div> : null}
                        {errormsg ? <div class="alert alert-primary widthset colrset" id='leftalignsss' role="alert">
                            {errormsg=="Sequence contains no elements" ? "Please upload Subjects":errormsg}
                        </div> : null}
   
      </div>
  );
}

export default Fileuploads;
