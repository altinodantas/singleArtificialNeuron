var alpha;
var bias;

var layout = {
	title: '<b>Descendant Gradient</b>',
	xaxis: {
		title: 'x',
		showgrid: true,
		zeroline: false,
		range: [-3,4]
	},
	yaxis: {
		title: 'f(x)',
		showline: false,
		zeroline: false,
		range: [-10,40]
	},
	legend: {
		"orientation": "h",
		x:0.2,
		y:1.15
	}
};

var n = 500;
var x = [], y = [];
for (var i = 0; i < n; i++) {
  x[i] = i / (n - 420) - 2.5;
  y[i] = calcY(x[i]);
}

var initialX = Math.random() * (4 + 2) - 2;

var dot = {
  x: [initialX], 
  y: [calcY(initialX)], 
  mode: 'markers',
  name: 'dot',
  marker: {'size':10}
};

Plotly.plot('graph', [{
  x: x,
  y: y,
  line: {
	  shape:'spline',
  	  width: 4
  },
  name: 'function'
}, dot ], layout);

function randomInitialX(){
	dot['x'][0] = Math.random() * (3.7 + 2) - 2;
	dot['y'][0] = calcY(dot['x']);
	Plotly.redraw('graph');
}

varAnimation = null;

function run(){
	stopAnimation();
	alpha 		= ($('#alphaInput').val() 	!= 0)? $('#alphaInput').val() 	: 0.001;
	epsilon 	= ($('#epsilonInput').val() != 0)? $('#epsilonInput').val() : 0.001;
	delay 		= ($('#delayInput').val() 	!= 0)? $('#delayInput').val() 	: 20;
	varAnimation = setInterval(function(){ donwing() }, delay);
}

function donwing() {
	let currentX = dot['x'][0];
	let newX = calcNewX(currentX);
	
	if(Math.abs(currentX - newX) < epsilon){
	  alert("Process stoped. Gradient is already very low");
	  stopAnimation();  
	}
	
	dot['x'][0] = newX;	
   dot['y'][0] = calcY(dot['x'][0]);	
   Plotly.redraw('graph');
}

function calcNewX(x){
	var dx = calcDx(x);
	if(x < 0)
	  return x + (alpha * dx * x);
	else
		return x - (alpha * dx * x);
}
function calcDx(x){
	return (4 * Math.pow(x,3) - 9 * Math.pow(x,2))
}

function calcY(x){
	return Math.pow(x,4) - 3 * Math.pow(x,3) + 2;
}

function stopAnimation() {
    clearInterval(varAnimation);
}
