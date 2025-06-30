const canvas = document.querySelector('canvas');


const data = Array.from({ length: 100 }, (_, i) =>
  `CYBERFICTION-IMAGES/male${String(i ).padStart(4, '0')}.png`
);

let currentImage = { value: 0 };
const render = () => {
    
const image = new Image();
  image.src = data[Math.floor(currentImage.value)];
  image.onload = () => {

    let scale=1;
    const scaledWidth = window.innerWidth;
    const scaledHeight = window.innerHeight ;
    if(currentImage.value ==0) scale =0.8;
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(
      image,
      0,
      0,
      scaledWidth*scale,
      scaledHeight
    );
  };

  
};
const setCanvasSize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
   render()
};
window.addEventListener("resize", setCanvasSize);
setCanvasSize();


render()


gsap.to(currentImage,{
    value:data.length -1,
    scrollTrigger:{
        trigger:'.main',
       
        pin:true,
        scrub:true,
        scroller:'main'
    },
    onUpdate:()=>{
        render()
    }
})
