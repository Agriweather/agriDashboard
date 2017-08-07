


charts_pludgin = {
	init: function(json, type, target, params){
		if(type == 'line'){
			line_chart(json, target, params);
		}
		else if(type=='bar'){
			bar_chart();
		}
		
	}
}



// var test = charts_pludgin.init('1','line','3');
// var test1 = charts_pludgin.init('1' , 'bar' , '4');