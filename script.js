const html = document.documentElement;
const canvas = document.getElementById("animation-canvas");
const context = canvas.getContext("2d");

const frameCount = 240;
const currentFrame = index => (
  `ezgif-frame-${(index).toString().padStart(3, '0')}.jpg`
);

const preloadImages = () => {
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image();
img.src = currentFrame(1);

img.onload = function() {
  canvas.width = img.width;
  canvas.height = img.height;
  context.drawImage(img, 0, 0);
};

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
};

const wrapper = document.getElementById("animation-wrapper");

window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop;
  const maxScrollTop = wrapper.scrollHeight - window.innerHeight;
  let scrollFraction = scrollTop / maxScrollTop;
  
  // Clamp between 0 and 1 so it stops animating once wrapper is passed
  if (scrollFraction < 0) scrollFraction = 0;
  if (scrollFraction > 1) scrollFraction = 1;
  
  const frameIndex = Math.min(
    frameCount,
    Math.ceil(scrollFraction * frameCount)
  );
  
  requestAnimationFrame(() => updateImage(Math.max(1, frameIndex)));
});

preloadImages();
