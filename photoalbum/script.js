var scope=document.querySelector('body')
var contextmenu=document.querySelector('#contextMenu')
var options=document.querySelectorAll(".item")
var submitCaptionbtn=document.querySelector("submitCaption")
var container=document.getElementById("container")
var test;
var curr

scope.addEventListener("contextmenu",(e)=>{
    e.preventDefault();
    const { clientX: mouseX, clientY: mouseY } = e;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    contextmenu.style.display = 'block';    
    const scrollX = window.pageXOffset;
    const scrollY = window.pageYOffset;
    const menuWidth = contextmenu.offsetWidth;
    const menuHeight = contextmenu.offsetHeight;
    let left = mouseX + scrollX;
    let top = mouseY + scrollY;
    console.log(viewportWidth - mouseX, menuWidth,contextmenu.offsetWidth)
    if (viewportWidth - mouseX < menuWidth) {
        
        left -= menuWidth;
    }
    if (viewportHeight - mouseY < menuHeight) {
        top -= menuHeight;
    }
    console.log(left,top,mouseX,mouseY)
    // Set the position of the context menu and display it
    contextmenu.style.left = left + 'px';
    contextmenu.style.top = top + 'px';
    
    contextmenu.classList.add("visible")
    curr=e
    document.addEventListener("mousemove", handleMouseMove);
},false);

function handleMouseMove(event) {
    // Check if the cursor is outside the bounds of the context menu
    
    const {clientX: mouseX, clientY: mouseY} = event;
    const menuRect = contextmenu.getBoundingClientRect();
    if (mouseX < menuRect.left || mouseX > menuRect.right || mouseY < menuRect.top || mouseY > menuRect.bottom) {
        // If the cursor is outside the bounds, hide the context menu
        contextmenu.style.display = 'none';
        contextmenu.classList.remove("visible")
        document.removeEventListener("mousemove", handleMouseMove);
    }
}
contextmenu.addEventListener('click',(event)=>{
    if (curr.target.nodeName == 'IMG') {
    if (event.target.id=="it1"){
        var newWindow = window.open();
            var img=newWindow.document.createElement('IMG')
            img.src=curr.target.src
            newWindow.document.body.appendChild(img);
            newWindow.focus();
            contextmenu.style.display = 'none';
            contextmenu.classList.remove("visible")
            document.removeEventListener("mousemove", handleMouseMove);
    }
    if(event.target.id=="it2"){
        curr.target.style.filter="brightness(150%)"
    }
    if (event.target.id==="it3"){
        var newImage=reduceResolution(curr.target)
        // console.log(newImage)
        curr.target.src=newImage
        contextmenu.style.display = 'none';
        contextmenu.classList.remove("visible")
        document.removeEventListener("mousemove", handleMouseMove);
    }
    if(event.target.id=="it4"){
        curr.target.style.borderRadius="50%";
        curr.target.style.width='150px';
        curr.target.style.height='150px';
        curr.target.style.display="flex";
        curr.target.style.alignItems='center';
        contextmenu.style.display = 'none';
        contextmenu.classList.remove("visible")
        document.removeEventListener("mousemove", handleMouseMove);
    }
    if (event.target.id=="it5"){
        test=curr
            var duplicateImage=document.createElement('IMG')
            var div=document.createElement("div")
            duplicateImage.src=curr.target.src
            duplicateImage.className="img-fluid"
            div.append(duplicateImage)
            console.log(curr.target.src)
            container.appendChild(div)
            contextmenu.style.display = 'none';
            contextmenu.classList.remove("visible")
            document.removeEventListener("mousemove", handleMouseMove);
    }
    if (event.target.id=="it6"){
        console.log(generateQRCode(curr))
        contextmenu.style.display = 'none';
        contextmenu.classList.remove("visible")
        document.removeEventListener("mousemove", handleMouseMove);
    }
    if(event.target.id=="it7"){
        downloadImage(curr.target.src)
        contextmenu.style.display = 'none';
        contextmenu.classList.remove("visible")
        document.removeEventListener("mousemove", handleMouseMove);
        
    }     
    }
   })
function reduceResolution(target, callback){
    // create a new image object
var img = new Image();

// set the image source
img.src=target.src
img.crossOrigin="anonynomous"
// wait for the image to load
  // create a canvas element
var canvas = document.createElement('canvas');
var reducedImageData;
  // set the canvas dimensions to the desired resolution
  resImage=img.onload = function() {
      canvas.width = img.width/3;
      canvas.height = img.height/3;

      var ctx = canvas.getContext('2d');

      ctx.drawImage(img,0,0, canvas.width, canvas.height);
      
        // get the reduced resolution image data from the canvas
        reducedImageData = canvas.toDataURL();
        // do something with the reduced resolution image data
        // console.log(reducedImageData);
        return reducedImageData
    }();
    // console
    return resImage
}
async function downloadImage(imageSrc) {
    const image = await fetch(imageSrc)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)
  
    const link = document.createElement('a')
    link.href = imageURL
    link.download = 'image.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  function generateQRCode(e){
    const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        type: "svg",
        data:  e.target.src,
        image: e.target.src,
        dotsOptions: {
            color: "#4267b2",
            type: "rounded"
        },
        backgroundOptions: {
            color: "#e9ebee",
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 20
        }
    });

    qrCode.append(document.getElementById("canvas"));
    qrCode.download({ name: "qr", extension: "svg" });
}


// // Get all the show thumbnail buttons
// const showThumbnailButtons = document.querySelectorAll('#it8');

// // Add a click event listener to each button
// showThumbnailButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     // Get the corresponding image and caption elements
//     const imageId = button.parentNode.querySelector('img').id;
//     const captionElement = document.querySelector(`#${imageId} + .caption`);
    
//     // Toggle the visibility of the caption element
//     captionElement.classList.toggle('visible');
//   });
// });