
var myVar;

function myFunction() {
    myVar = setInterval(alertFunc, 3000);
}

function alertFunc() {
    alert("Hello!");
}

// Activation function
function sinal( u )
{
	return (u <= 0)? -1 : 1;
}

var weights_size = 2
var alpha 		= 0.1;
var bias		= Math.random();
var max_times 	= 50;
var weights 	= [];

// training samples
var x_inputs 	= [[0.0,0.0],[0.0,1.0],[1.0,0.0],[1.0,1.0]];
var x_labels 	= [-1,-1,-1,1];

var u = 0;
var y = 0;
var d, dif, times = 0;
var error = true;

// Weights init 
for(var i =0; i < weights_size; i++)
{
	weights[i] = Math.random();
}

var x_a = -0.5;
var x_b = 1.5;

var trace1 = {
	  x: [x_a, x_b], 
	  y: [((((x_a * weights[1]) * - 1) - bias) / weights[0]), ((((x_b * weights[1]) * - 1) - bias) / weights[0])], 
	  type: 'scatter',
	  label: 'teste',
	  name: 'Hiperplano',
	  mode: 'lines',
	  line: {width:3}
	};
	
	var class1 = {
	  x: [1],
	  y: [1],
      mode: 'markers',
      name: 'Classe A',	
		marker: {
			color: 'rgb(219, 64, 82)',
			size: 12
		  }	  
	}
	
	var class2 = {
	  x: [0,1,0],
	  y: [1,0,0],
      mode: 'markers',
      name: 'Classe B',
	  marker: { size: 12 }	  
	}
	
	var layout = {
	  title: 'Porta Lógica E',
	  xaxis: {
		title: 'Variável 2',
		showgrid: false,
		zeroline: false,
		range: [-1,2]
	  },
	  yaxis: {
		title: 'Variável 1',
		showline: false,
		range: [-1,2]
	  }
	};

	var data = [trace1, class1, class2];
	Plotly.newPlot('myPlot', data, layout);

while(times < max_times && error)
{
	error = false;
	
	for(var inp = 0, u = 0; inp < x_inputs.length; inp++)
	{
		u = 0;
		
		for(var weig = 0; weig < x_inputs[0].length; weig++)
		{
			u += x_inputs[inp][weig] * weights[weig];
		}
		
		y = sinal(u + bias);
		d = x_labels[inp];
		
		if(y != d)
		{
			
			deff = d - y;
			for(var i = 0; i < weights.length; i++)
			{
				weights[i] += alpha * deff * x_inputs[inp][i];
			}
			bias += alpha * deff;
			error = true;
			
			// Updating and reploting the chart 
			data[0]['y'][0] = ((((x_a * weights[1]) * - 1) - bias) / weights[0]);
			data[0]['y'][1] = ((((x_b * weights[1]) * - 1) - bias) / weights[0]);
			Plotly.redraw('myPlot');
			
		}
			
	}
	times++;
}

console.log(weights[0] + " |" + weights[1] + "|" + bias + "|" + times);


var myVar = setInterval(function(){ myTimer() }, 1000);

function myTimer() {
    var d = new Date();
    var t = d.toLocaleTimeString();
    document.getElementById("demo").innerHTML = t;
}

function myStopFunction() {
    clearInterval(myVar);
}