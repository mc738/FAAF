const svg = document.getElementById("canvas");

const cLine = document.getElementById("current-line");

const pt = svg.createSVGPoint();


let lines = []

let currentLine = []

let draw = false;

cursorPoint = (evt) => {
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
}

solve = (data, k) => {

    if (k == null) k = 1;
    
    var size = data.length;
    var last = size - 4;    
  

    var path = `M${data[0].x} ${data[0].y}`;

    const reducer = (acc, cur) => `${acc} L${cur.x} ${cur.y}`

    return data.reduce(reducer, path);
  
    // for (var i = 0; i < size - 2; i +=2) {
  
    //   var x0 = i ? data[i - 2] : data[0];
    //   var y0 = i ? data[i - 1] : data[1];
  
    //   var x1 = data[i + 0];
    //   var y1 = data[i + 1];
  
    //   var x2 = data[i + 2];
    //   var y2 = data[i + 3];
  
    //   var x3 = i !== last ? data[i + 4] : x2;
    //   var y3 = i !== last ? data[i + 5] : y2;
      
    //   var cp1x = x1 + (x2 - x0) / 6 * k;
    //   var cp1y = y1 + (y2 - y0) / 6 * k;
  
    //   var cp2x = x2 - (x3 - x1) / 6 * k;
    //   var cp2y = y2 - (y3 - y1) / 6 * k;
     
    //   path += ` C${cp1x},${cp1y},${cp2x},${cp2y},${x2},${y2}`;
    // } 
  
    // return path;
  }

canvas.addEventListener('mousedown', function(evt){
    draw = true;
})

canvas.addEventListener('mouseup', function(evt){
    draw = false;
    lines.push(currentLine);
    
    let line = cLine.cloneNode(true);

    svg.appendChild(line);

    solve(currentLine);
    currentLine = [];
    console.log(lines);
})

canvas.addEventListener('mousemove', function(evt){
    var loc = cursorPoint(evt);

    if (draw === true) {
        console.log(loc)
        currentLine.push(loc);
        cLine.setAttribute("d", solve(currentLine, 1.5));
    }
})

showBrush = () => {
    let el = document.getElementById("test-modal");
    let overlay = document.getElementById("overlay");

    overlay.style.display = "block";
    el.style.top = "0";
}

hideBrush = () => {
    let el = document.getElementById("test-modal");
    let overlay = document.getElementById("overlay");

    overlay.style.display = "none";
    el.style.top = "-100%";
}

showPalette = () => {
    let el = document.getElementById("palette-modal");
    let overlay = document.getElementById("overlay");

    overlay.style.display = "block";
    el.style.top = "0";
}

hidePalette = () => {
    let el = document.getElementById("palette-modal");
    let overlay = document.getElementById("overlay");

    overlay.style.display = "none";
    el.style.top = "-100%";
}


setColor = (color) => {
    cLine.style.stroke = color;
}



