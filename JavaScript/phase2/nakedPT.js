function naked(boardHelper, colHelper){
	var print = "";
	var topR=0;
	var topC=0;
	var n1r=0;
	var n2r=0;
	var n3r=0;
	var n1c=0;
	var n2c=0;
	var n3c=0;
	for(var count=1; count<10; count++){
		for(var unit=1; unit<10; unit++){
			var colCount=colHelper[count+20][unit];
				if((colCount===6)||(colCount===7)){
					print += "box "+count+" unit "+unit+" colCount ["+colCount+"] starting testing.</br>";
			switch((count)){
			case 1:
			   topR=1;
			   topC=1;
			   break;
			case 2:
			   topR=1;
			   topC=4;
			   break;
			case 3:
			   topR=1;
			   topC=7;
			   break;
			case 4:
			   topR=4;
			   topC=1;
			   break;
			case 5:
			   topR=4;
			   topC=4;
			   break;
			case 6:
			   topR=4;
			   topC=7;
			   break;
			case 7:
			   topR=7;
			   topC=1;
			   break;
			case 8:
			   topR=7;
			   topC=4;
			   break;
			case 9:
			   topR=7;
			   topC=7;
			   break;
			default :
			   topR=0;
			   topC=0;
		}
					n1r=0;
					n2r=0;
					n3r=0;
					n1c=0;
					n2c=0;
					n3c=0;
			for(var spotR=0; spotR<3; spotR++){
				for(var spotC=0; spotC<3; spotC++){
					
					if(boardHelper[rcToNum((topR+spotR),(topC+spotC))][unit]===0){
						print +="box "+count+" unit "+unit+" colCount ["+colCount+"] ["+rcToNum((topR+spotR),(topC+spotC))+"] is empty.</br>";
						if(n1r===0){
							n1r=topR+spotR;
							n1c=topC+spotC;
						}else if(n2r===0){
							n2r=topR+spotR;
							n2c=topC+spotC;
						}else if(n3r===0){
							n3r=topR+spotR;
							n3c=topC+spotC;
						}
					}	
				}
			}
			if(colCount===6){
				if((n1r===n2r)&&(n1r===n3r)){
					print += " naked row possibility in box "+count+" unit "+unit+" colCount ["+colCount+"] </br>";
					print += "n1r["+n1r+"] n1c["+n1c+"] "+"n2r["+n2r+"] n2c["+n2c+"] "+"n3r["+n3r+"] n3c["+n3c+"]</br>";
					clearRow(n1r, unit, n1c, n2c, n3c, boardHelper);
				}else if((n1c===n2c)&&(n1r===n3c)){
					print += " naked column possibility in box "+count+" unit "+unit+" colCount ["+colCount+"] </br>";
					print += "n1r["+n1r+"] n1c["+n1c+"] "+"n2r["+n2r+"] n2c["+n2c+"] "+"n3r["+n3r+"] n3c["+n3c+"]</br>";
					clearCol(n1c, unit, n1r, n2r, n3r, boardHelper);
				}
				}else if(colCount===7){
					if(n1r===n2r){
						print += " naked row possibility in box "+count+" unit "+unit+" colCount ["+colCount+"] </br>";
						print += "n1r["+n1r+"] n1c["+n1c+"] "+"n2r["+n2r+"] n2c["+n2c+"]</br>";
						clearRow(n1r, unit, n1c, n2c, n3c, boardHelper);
					}else if((n1c===n2c)&&(n1r===n3c)){
						print += " naked column possibility in box "+count+" unit "+unit+" colCount ["+colCount+"] </br>";
						print += "n1r["+n1r+"] n1c["+n1c+"] "+"n2r["+n2r+"] n2c["+n2c+"]</br>";
						clearCol(n1r, unit, n1c, n2c, n3c, boardHelper);
					}
				}
			}	
		}	
	}
	return print;
}
function clearRow(row, unit, c1, c2, c3, boardHelper){
	for(var col=1; col<10; col++){
		if((col!==c1)||(col!=c2)||(col!=c3)){
			if(boardHelper[rcToNum(row,col)][unit]===0){
				boardHelper[rcToNum(row,col)][unit]=(-1);
				document.getElementById("test").innerHTML+="["+rcToNum(row,col)+"]= -1</br>";
				if(boardHelper[rcToNum(row,col)][0]<=7){
					boardHelper[rcToNum(row,col)][0]=boardHelper[rcToNum(row,col)][0]+1;
				}
			}
		}
	}
	return boardHelper;
}

function clearCol(col, unit, r1, r2, r3, boardHelper){
	for(var row=1; row<10; row++){
		if((row!==r1)||(row!=r2)||(row!=r3)){
			if(boardHelper[rcToNum(row,col)][unit]===0){
				boardHelper[rcToNum(row,col)][unit]=(-1);
				document.getElementById("test").innerHTML+="["+rcToNum(row,col)+"]= -1</br>";
				if(boardHelper[rcToNum(row,col)][0]<=7){
					boardHelper[rcToNum(row,col)][0]=boardHelper[rcToNum(row,col)][0]+1;
				}
			}
		}
	}
	return boardHelper;
}