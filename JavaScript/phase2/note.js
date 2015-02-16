function displayNotes(boardHelper){
	var print = "";
	
	for(var row=1; row<10; row++){	
		for(var col=1; col<10; col++){
			print="";
			if(boardHelper[rcToNum(row,col)][0]===9){
				for(var grid=1; grid<10; grid++){
					if(boardHelper[rcToNum(row,col)][grid]===1){
						print +="<tr><td class='solved'>"+grid+"</td></tr>";
					}	
				}
				document.getElementById("gridBox"+rcToNum(row,col)).innerHTML=print;
			}else{
				print="<tr>";
				for(var grid=1; grid<10; grid++){
					if(boardHelper[rcToNum(row,col)][grid]!==(-1)){
						print +="<td class='grid'>"+grid+"</td>";
					}else{
						print +="<td class='grid'> </td>";
					}
					if(grid===9){
						print+="</tr>";
					}else if((grid%3)===0){
						print+="</tr><tr>";
					}
					document.getElementById("gridBox"+rcToNum(row,col)).innerHTML=print;
				}
			}
				
			}
			
	}
}

function displayNotesOld(boardHelper){
	console.log("hello note");
	var print = " <colgroup><col><col><col><colgroup><col><col><col><colgroup><col><col><col>";
  print+="<colgroup><col><col><col><colgroup><col><col><col><colgroup><col><col><col>";
  print+="<colgroup><col><col><col><colgroup><col><col><col><colgroup><col><col><col>";
	var spot=0;
	var start=0;
	for(var row=1; row<10; row++){	
		spot=0;
		for(var gridRow=1; gridRow<4; gridRow++){
			switch(spot){
				case 0:
					start=1;
					break;
				case 1:
					start=4;
					break;
				case 2:
					start=7;
					break;
				
			}
			print +="<tr>";
			for(var col=1; col<10; col++){
				for(var grid=0; grid<3; grid++){
					if(boardHelper[rcToNum(row,col)][(start+grid)]!==(-1)){
						print +="<td class='grid'>"+(start+grid)+"</td>";
					}else{
						print +="<td class='grid'> </td>";
					}
						
				}
				
			}
			print +="</tr>";
			
			spot++;
		}
		print +="<tbody>";
	}
	return print;
}