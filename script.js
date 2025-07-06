
  gsap.registerPlugin(ScrollTrigger);

  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");

  const data = Array.from({ length: 100 }, (_, i) =>
    `CYBERFICTION-IMAGES/male${String(i).padStart(4, "0")}.png`
  );

  let currentImage = { value: 0 };

  function render() {
    const image = new Image();
    image.src = data[Math.floor(currentImage.value)];
    image.onload = () => {
      let scale = 1;
      const scaledWidth = window.innerWidth;
      const scaledHeight = window.innerHeight;
      if (Math.floor(currentImage.value) == 0) scale = 0.8;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, scaledWidth * scale, scaledHeight);
    };
  }

  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  }

  window.addEventListener("resize", setCanvasSize);
  setCanvasSize();

  const scrollContainer = document.querySelector(".main");
  const locoScroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
  });

  ScrollTrigger.scrollerProxy(scrollContainer, {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: scrollContainer.style.transform ? "transform" : "fixed",
  });

  locoScroll.on("scroll", ScrollTrigger.update);
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();

  gsap.to(currentImage, {
    value: data.length - 1,
    scrollTrigger: {
      trigger: ".main",
      scroller: ".main",
      pin: true,
      scrub: 0.5,
    },
    onUpdate: render,
  });

