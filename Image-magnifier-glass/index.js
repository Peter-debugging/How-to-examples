const container = document.getElementById("container");
const image = document.getElementById("image");
const glass = document.createElement("div");
const zoom = 2;
var b = 2;

glass.setAttribute("class", "glass");
image.parentElement.insertBefore(glass, image);
glass.style.backgroundImage = `url(${image.src})`;
glass.style.backgroundSize = `${image.width * zoom}px ${image.height * zoom}px`;

container.addEventListener("mousemove", mouseMove);
glass.addEventListener("mousemove", mouseMove);

var halfGlassWidth = glass.offsetWidth / 2;
var halfGlassHeight = glass.offsetHeight / 2;

function mouseMove(event){
  event.preventDefault();

  var pos = getRelativeClient(event);  

  if(pos.x < (halfGlassWidth / zoom)){pos.x = halfGlassWidth / zoom;}

  if(pos.x > image.width - (halfGlassWidth / zoom)){
    pos.x = image.width - (halfGlassWidth / zoom);
  }

  if(pos.y < (halfGlassHeight / zoom)){pos.y = halfGlassHeight / zoom;}

  if(pos.y > image.height - (halfGlassHeight / zoom)){
    pos.y = image.height - (halfGlassHeight / zoom);
  }

  glass.style.left = `${pos.x - halfGlassWidth}px`;
  glass.style.top = `${pos.y - halfGlassHeight}px`;

  glass.style.backgroundPosition = `
    -${pos.x * zoom - halfGlassWidth + b}px 
    -${pos.y * zoom - halfGlassHeight + b}px
  `;
}

function getRelativeClient(event){
  var imgClientRect = image.getBoundingClientRect();

  var x = event.clientX - imgClientRect.left;
  var y = event.clientY - imgClientRect.top;
  return {x : x, y : y};
}
