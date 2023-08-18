const wrapper = document.querySelector(".wrapper"),
fileInput = document.querySelector(".file-input"),
previewImg = document.querySelector(".upload-box img"),
uploadBox = document.querySelector(".upload-box"),
widthInput = document.querySelector(".width input"),
heightInput = document.querySelector(".height input"),
ratio = document.querySelector("#ratio"),
button = document.querySelector("button");

console.log(ratio)

let imgRatio;

function loadImg(){
    let file = fileInput.files[0];
    if(!file) return;
    previewImg.src = URL.createObjectURL(file);

    previewImg.addEventListener("load", () => {
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        imgRatio = previewImg.naturalWidth / previewImg.naturalHeight;
        wrapper.classList.add("active");
    });
}
widthInput.addEventListener("keyup", () => {
    let height = ratio.checked ? widthInput.value / imgRatio : heightInput.value;
    heightInput.value = Math.floor(height);
});

heightInput.addEventListener("keyup", () => {
    let width = ratio.checked ? heightInput.value * imgRatio : widthInput.vlaue;
    widthInput.value = Math.floor(width);
});

button.addEventListener("click", () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = widthInput.value;
    canvas.height = heightInput.value;
    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
    document.body.appendChild(canvas);
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();    
});

fileInput.addEventListener("change", loadImg);
uploadBox.addEventListener("click", () => fileInput.click());