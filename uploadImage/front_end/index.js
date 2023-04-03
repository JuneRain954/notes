class UploadImg{
  xhr = undefined
  formData = undefined;
  submitBtn = undefined;
  inputElemt = undefined;
  url = undefined;
  file = undefined;
  constructor(url){
    this.url = url;
    this.init();
  }

  init(){
    this.initElement();
  }

  initElement(){
    this.submitBtn = this.getElement(".submit");
    this.inputElemt = this.getElement("#upload-img");
    this.inputElemt.addEventListener("change", this.handleSelectFile.bind(this));
    this.submitBtn.addEventListener("click", this.handleUploadImg.bind(this));
  }

  handleSelectFile(evt){
    this.file = evt.target.files[0];
    console.log("[handleSelectFile] ==> ", this.file);
  }

  handleUploadImg(){
    this.formData = new FormData();
    this.formData.append("file", this.file);
    this.request();
  }

  request(){
    if(!this.xhr) this.xhr = new XMLHttpRequest();
    this.xhr.open("POST", this.url);
    this.xhr.onreadystatechange = this.onreadystatechange.bind(this);
    this.xhr.send(this.formData);
  }

  onreadystatechange(){
    if(this.xhr.readyState === 4){
      console.log("[onreadystatechange] ==> ", this.xhr);
    }
  }

  getElement(selector){
    return document.querySelector(selector);
  }
}

const URL = "http://localhost:3000/api/uploadImg";

const upload = new UploadImg(URL);