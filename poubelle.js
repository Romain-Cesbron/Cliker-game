

/*
setInterval(testa , 1000)
function testa() {
    console.log(console.log(cursor.x))
}

// Create a new Cursor object

var cursor = new Cursor({ x: 100, y: 100 }, 50, 0.1);

// Move the cursor along a circular path
function animate() {
  requestAnimationFrame(animate);
  cursor.move();
  // Update the position of the cursor
  cursorElement.style.left = cursor.x + 'px';
  cursorElement.style.top = cursor.y + 'px';
}

// Start the animation
animate();


/*
function myfunc() {
    cursor = document.querySelectorAll('.cursors')
    
    cursor.forEach(function() {

    });
}


// init part, set your own values
var sat = {
    elt: null
    ,a: 0         // in radian
    ,r: 150         // radius
    ,da: 0.05     // in radian
    ,x: 0
    ,y: 0
    // Center is actualy center (100, 100) minus
    // half the size of the orbiting object 15x15
    ,center: { x: -100 , y:-100  }
}

setInterval(myfunc, 1000);

sat.move = function(){
    cursors = document.querySelectorAll('.cursors');

    cursors.forEach(function(cursor) {
        // each modification
        this.a += this.da;
        this.x = this.center.x + (this.r * Math.sin(this.a));
        this.y = this.center.y + (this.r * Math.cos(this.a));

        // Update the current cursor element
        cursor.style.top = this.y + "px";
        cursor.style.left = this.x + "px";
    }, this); // Pass 'this' as the second argument to forEach to maintain the correct context
}

var loopTimer = setInterval(function(){
    sat.move();
}, 40);


const rect = cookieCenter.getBoundingClientRect();

let rotationDegree = -90
let moveTop =0

var angle = 0;     // starting position (degrees)
var distance = 100; // distance of b from a
var speed = 60;    // revolution speed in degrees per second
var rate  = 10;    // refresh rate in ms

function rotateObject() {
    var cursorRect = cursor.getBoundingClientRect();

    var deltaY = (rect.top+rect.bottom)/2 - cursorRect.top;
    var deltaX = (rect.left+rect.right)/2 - cursorRect.left;

    var angleToCookie = Math.atan2(deltaY, deltaX) * (180 / Math.PI) +90;
    cursor.style.transform = `rotate(${angleToCookie}deg)`;
    console.log('oui')

}
*/ 
// Call rotateObject every second (1000 milliseconds)