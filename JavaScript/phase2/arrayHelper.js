function printTableDoubleArray(dArray){
	var print = "";
	for(var row=0; row<dArray.length; row++){
		print += "<tr>";
		var rowArray = dArray[row];
		for(var col=0; col<rowArray.length; col++){
			print += "<td>"+rowArray[col]+"</td>";
		}
		print +="</tr>";
	}
	return print;
}