// Activation functions - begin
function sinal( u )
{
	return (u <= 0)? -1 : 1;
}

function tanh(u)
{
	return (Math.exp(u) - Math.exp(u * -1)) / (Math.exp(u) + Math.exp(u * -1))
}
// Activation functions - end

function randWeights(){
	for(var i =0; i < weights_size; i++)
	{
		weights[i] = Math.random();
	}
	bias = Math.random();
}

// Global vars
var weights_size = 2
var alpha;
var epsilon = 0.00001;
var bias;
var max_times;
var weights = [];

// Weights init 
randWeights();

// training samples
var x_inputs 	= [[0.0,0.0],[0.0,1.0],[1.0,0.0],[1.0,1.0]];
var x_labels 	= [-1,-1,-1,1];

var u = 0;
var y = 0;
var d, dif, times;
var error = true;

var X_MIN = -1;
var X_MAX = 2;
var Y_MIN = ((((X_MIN * weights[1]) * - 1) - bias) / weights[0]);
var Y_MAX = ((((X_MAX * weights[1]) * - 1) - bias) / weights[0]);

// Chart definitions
var hyperplano = {
	  x: [X_MIN, X_MAX], 
	  y: [Y_MIN, Y_MAX], 
	  type: 'scatter',
	  label: 'teste',
	  name: 'Hyperplane',
	  mode: 'lines',
	  line: {width:3}
	};
	
var class1 = {
	x: [1],
	y: [1],
	mode: 'markers',
	name: 'Class A',	
	marker: {
		color: 'rgb(219, 64, 82)',
		size: 12
	}	  
}
	
var class2 = {
	x: [0,1,0],
	y: [1,0,0],
	mode: 'markers',
	name: 'Class B',
	marker: { size: 12 }	  
}

var layout = {
	title: '<b>AND</b>',
	xaxis: {
		title: 'Var 2',
		showgrid: true,
		zeroline: false,
		range: [-1,2]
	},
	yaxis: {
		title: 'Var 1',
		showline: false,
		zeroline: false,
		range: [-1,2]
	},
	legend: {
		"orientation": "h",
		x:0.2,
		y:1.15
	}
};

var data = [hyperplano, class1, class2];
Plotly.newPlot('myPlot', data, layout);

var myVar = null;

function solve(){

	myStopFunction()
	randWeights();
	
	alpha 		= ($('#alphaInput').val() 	!= 0)? $('#alphaInput').val() 	: 0.1;
	max_times 	= ($('#maxIntInput').val() 	!= 0)? $('#maxIntInput').val() 	: 100;
	delay 		= ($('#delayInput').val() 	!= 0)? $('#delayInput').val() 	: 100;
	epsilon 	= ($('#epsilonInput').val() != 0)? $('#epsilonInput').val() : 0.00001;
	times 		= 1;
	
	if($('input[name=algorithm]:checked').val() == 'perceptron')
	{
		myVar = setInterval(function(){ onePerceptronEpoch() }, delay);	
	} else 
	{
		myVar = setInterval(function(){ oneAdalineEpoch() }, delay);
	}
	
}

function lms()
{
	var lmsAverage = 0
	var local_u = 0;
	
	for(var i = 0; i < x_inputs.length; i++)
	{	
		local_u = 0;
		
		for(var j = 0; j < weights.length; j++)
		{
			local_u += weights[j] * x_inputs[i][j];
			
		}

		lmsAverage += Math.pow((x_labels[i] - tanh(u + bias)),2);
	}

	return lmsAverage / x_inputs.length;
}

function oneAdalineEpoch() {
	
	var lmsOld = lms();
	
	for(var inp = 0, u = 0; inp < x_inputs.length; inp++)
	{
		u = 0;
		
		for(var weig = 0; weig < x_inputs[0].length; weig++)
		{
			u += x_inputs[inp][weig] * weights[weig];
		}
		
		y = tanh(u + bias);
		d = x_labels[inp];
	
		deff = d - y;
		for(var i = 0; i < weights.length; i++)
		{
			weights[i] += alpha * deff * x_inputs[inp][i];
		}
		bias += alpha * deff;
		
		// Updating and reploting the chart 
		data[0]['y'][0] = ((((X_MIN * weights[1]) * - 1) - bias) / weights[0]);
		data[0]['y'][1] = ((((X_MAX * weights[1]) * - 1) - bias) / weights[0]);
		Plotly.redraw('myPlot');		
	}
	
	times++;
	var lmsCurrent = lms();
	
	var note = "Epoch: " + times + " {<b>w1:</b> " + weights[0].toFixed(2) + " <b>w2:</b> " + weights[1].toFixed(2) + " <b>bias:</b> " + bias.toFixed(2) + "}" + " | Epsilon: " + Math.abs(lmsOld - lmsCurrent);
	$('#demo').html(note);
	
	if(times >= max_times || (Math.abs(lmsOld - lmsCurrent) < epsilon)){
		myStopFunction()	
	}
}

function onePerceptronEpoch() {
    
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
			data[0]['y'][0] = ((((X_MIN * weights[1]) * - 1) - bias) / weights[0]);
			data[0]['y'][1] = ((((X_MAX * weights[1]) * - 1) - bias) / weights[0]);
			Plotly.redraw('myPlot');
		}		
	}
	
	times++;
	var note = "Epoch: " + times + " {<b>w1:</b> " + weights[0].toFixed(2) + " <b>w2:</b> " + weights[1].toFixed(2) + " <b>bias:</b> " + bias.toFixed(2) + "}";
	$('#demo').html(note);
	
	if(times >= max_times || !error){
		myStopFunction()	
	}
}

function myStopFunction() {
    clearInterval(myVar);
}