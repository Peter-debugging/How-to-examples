const img = document.getElementById("img");
const result = document.querySelector(".result");
const lens = document.createElement("div");

lens.setAttribute("class", "lens");
img.parentElement.insertBefore(lens, img);

var zoomX = result.offsetWidth / lens.offsetWidth;
var zoomY = result.offsetHeight / lens.offsetHeight;

result.style.backgroundImage = `url(${img.src})`;
result.style.backgroundSize = `${img.offsetWidth * zoomX}px ${img.offsetHeight * zoomY}px`;

img.onmousemove = lens.onmousemove = (event) => {
  event.preventDefault();

  var {x, y} = getRelativeClientPosition(event);
  var relativePosition = {
    x:x - lens.offsetWidth / 2,
    y:y - lens.offsetHeight / 2
  };

  if(relativePosition.x < 0){relativePosition.x = 0;}
  
  if(relativePosition.x > img.offsetWidth - lens.offsetWidth){
    relativePosition.x = img.offsetWidth - lens.offsetWidth;
  }

  if(relativePosition.y < 0){relativePosition.y = 0;}

  if(relativePosition.y > img.offsetHeight - lens.offsetHeight){
    relativePosition.y = img.offsetHeight - lens.offsetHeight;
  }

  lens.style.left = `${relativePosition.x}px`;
  lens.style.top = `${relativePosition.y}px`;
  result.style.backgroundPosition = `-${relativePosition.x * zoomX}px -${relativePosition.y * zoomY}px`;
}

function getRelativeClientPosition(event){
  clientRect = img.getBoundingClientRect();  

  var x = event.pageX - clientRect.left;
  var y = event.pageY - clientRect.top;

  return {x : x, y : y};
}