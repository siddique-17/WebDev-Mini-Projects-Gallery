const images = [
  "https://source.unsplash.com/random/800x400?nature",
  "https://source.unsplash.com/random/800x400?city",
  "https://source.unsplash.com/random/800x400?car",
  "https://source.unsplash.com/random/800x400?space"
];
let i = 0;

function showImage() {
  document.getElementById("slider-img").src = images[i];
}

function next() {
  i = (i + 1) % images.length;
  showImage();
}

function prev() {
  i = (i - 1 + images.length) % images.length;
  showImage();
}
