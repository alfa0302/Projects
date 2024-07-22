let input = document.getElementById('qrText');
const qrBox = document.getElementById('qrImage');
let imgBox = document.getElementById("imgBox");

async function generateQR(){
  if(input.value.length > 0){
    document.getElementById('imgBox').style.display = 'block';
    qrBox.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${input.value}`;
    console.log(qrBox.src);
    imgBox.classList.add("show-img");
  }else{
    qrText.classList.add('error');
    setTimeout(()=>{
        qrText.classList.remove('error');
    },1000);
    document.getElementById('imgBox').style.display = 'none';
}
}