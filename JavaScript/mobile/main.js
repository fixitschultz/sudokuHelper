var board=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var loadC=0;
var boardHelper;
var colHelper;
var debugToken=true;
var loadC=0;
function main(){
	if(loadC===0){
		//loadBoard("000090000000603000009724300075000890801000405034000610003279500000306000000080000");
		//loadBoard("900875001000109000001302009190023058208057103530081060410706800000204010700518004");
		//loadBoard("871953462395246781426871953584612379619738245732594618947125836163489527258367194");
		loadBoard("000012500320900000001007030002030076906000205170050900050600800000005069009140000");//puzzle 97
		//loadBoard("100007090030020008009600500005300900010080002600004000300000010041000007007000300");//escargot
		//loadBoard("309000400200709000087000000750060230600904008028050041000000590000106007006000104");//tough 46/81
		//loadBoard("400010000000309040070005009000060021004070600190050000900400070030608000000030006");//moderate 52/81 //68 3 is not getting counted.
		//loadBoard("409716000610389040070245169000964021004173690196852030960421070030698000040537906");//moderate 52/81
		//loadBoard("120000000000000000000000000000000000000000000000000000000000000000000000000000000");//just two numbers
		boardHelper = new Array(100);
	  for (var ih = 0; ih < 100; ih++) {
		boardHelper[ih] = new Array(10);
	 }
	 for( var mr=0; mr < 100; mr++){
		 for( var ree=0; ree<10; ree++){
			boardHelper[mr][ree]=0;
		 }
	 }
	 colHelper = new Array(31);
	  for (var ih = 0; ih < 31; ih++) {
		colHelper[ih] = new Array(10);
	 }
	 for( var mt=0; mt < 31; mt++){
		 for( var re=0; re<10; re++){
			colHelper[mt][re]=0;
		 }
	 }
		loadC=1;
	}
	//document.getElementById("board").innerHTML=boardToString();
	boardHelper[0][0]=0;
	gridPrintout();
	tablePrint();
	
}

function loadBoard(inputBoard)
{
	//console.log("inputBoard: "+inputBoard);
	 if(typeof variable_here === 'undefined'){
		//console.log("inputBoard is undefined");
		//return;
	}
	//var board= new Array(100);
	x=0;
	for(b=11; b<100; b++){
	if(b%10===0){
		b++;
		}
		//board[b]=board[x];
		var myTable = document.getElementById('inputBoard');
		myTable.rows[rcToRow(b)].cells[rcToCol(b)].innerHTML = inputBoard[x];
		x++;
	}
}
function boardToString()
{
	var board="";
	for(var row=1; row<10; row++){
		for(var col=1; col<10; col++){
			board+=document.getElementById("b"+rcToNum(row,col)).value;
		}
	}
	return board;
}
function grabBoard(){
var targeturl;
var spot=0;
for(var x=11; x<100; x++){
var id="b";
	if( x%10===0){
		x++;
	}
	id+=x;
	//boardValue=document.getElementById(id).value;
	boardValue=""
	if(boardValue === ""){
	board[spot++]=0;
	}else{
	board[spot++]=boardValue;
	}
}
//return board;
}
function rcToNum(rowf, colf) {
	return (rowf*10)+colf;
}
function markSolvedCell(row, col, candidate){
//	console.log("row: "+row+" col: "+col+" num: "+candidate);

boardHelper[rcToNum(row,col)][candidate]=1;
boardHelper[rcToNum(row,col)][0]=9;
boardHelper[0][candidate]+=1;
boardHelper[(row)*10][candidate]=9;
boardHelper[0][0]+=1;
//document.getElementById("b"+rcToNum(row,col)+"").value=candidate;
var myTable = document.getElementById('inputBoard');
myTable.rows[row].cells[col].innerHTML = candidate;
clearUnitCell(row, col, candidate);
clearRow(row, col, candidate);
clearColumn(row, col, candidate);
clearBox(row, col, candidate);
}
function clearUnitCell(row, col, candidate){
	var clearCount=0;
for(var currentX=1; currentX<10; currentX++){
				if(boardHelper[rcToNum(row,col)][currentX]===0){
					boardHelper[rcToNum(row,col)][currentX]= (-1);
					clearCount++;
					if(boardHelper[(row*10)][currentX]<=7){
					boardHelper[(row*10)][currentX]+=1;
					}
				}
			}
	return clearCount;
}
function rcToCol(num){
	 return num%10;
}
function rcToRow(num){
			return ((num-(num%10))/10);
}
function removeUnitCell(row, col, candidate){
	var clearCount=0;
	if(boardHelper[rcToNum(row,col)][candidate]===0){
		boardHelper[rcToNum(row,col)][candidate]= (-1);
		clearCount++;
		if(boardHelper[(row*10)][candidate]<=7){
			boardHelper[(row*10)][candidate]+=1;
		}
    if(boardHelper[rcToNum(row, col) ][0]<=7){
			boardHelper[ rcToNum(row, col) ][0] +=1;
		}
	}
			
	return clearCount;
}
function clearRow(row, col, num){
	//console.log("row: "+row+" col: "+col+" num: "+num);
	var clearCount=0;
// clear row of the number
			for(var rowX=1; rowX<10; rowX++){
				if(rowX!==col){
					removeUnitCell(row,rowX,num);
				}
			}
	return clearCount;
}
function clearColumn(row, col, num){
	var clearCount=0;
	// clear column of the number 
			for(var colX=1; colX<10; colX++){ 
				if(colX!==row){
					removeUnitCell(colX,col,num);
				}
			}
	return clearCount;
}
function clearBox(row, col, num){
	var clearCount=0;
	var r1=0;
	var r2=0;
	var r3=0;
	var c1=0;
	var c2=0;
	var c3=0;
	var topR=-1;
	var topC=-1;
	// clear box of the number
			r1=row-1;
			r2=row-4;
			r3=row-7;
			c1=col-1;
			c2=col-4;
			c3=col-7;
			topR=-1;
			topC=-1;
			if((0<=r1)&&(r1<=2)){
				topR=r1;
			}else if((0<=r2)&&(r2<=2)){
				topR=r2;
			}else if((0<=r3)&&(r3<=2)){
				topR=r3;
			}
			if((0<=c1)&&(c1<=2)){
				topC=c1;
			}else if((0<=c2)&&(c2<=2)){
				topC=c2;
			}else if((0<=c3)&&(c3<=2)){
				topC=c3;
			}
			for(var spotR=0; spotR<3; spotR++)
			{
				for(var spotC=0; spotC<3; spotC++)
				{
					if((rcToNum(((row-topR)+spotR),((col-topC)+spotC)))!==rcToNum(row,col)){
						removeUnitCell(((row-topR)+spotR),((col-topC)+spotC),num);
					}
				}
			}
	return clearCount;
}
function gridPrintout(){
	var grid=" ";
	//var board=grabBoard();
	var rx=0;
	/*
	var board= new Array(100);
	for(var b=11; b<100; b++){
		if(b%10===0){
			b++;
			}
			board[b]=board[rx];
			rx++;
	}
	*/
	/*
		printing sudoku grid
	*/
	grid+= '<tr>';
	for (var mx = 0; mx < 81; mx++) {
		if((mx+1)%9===0)
		{
		grid+= '<td>'+board[mx]+'</td>';
		grid+= '</tr>';	
		}else{
			grid+= '<td>'+board[mx]+'</td>';
		}
	}
	//document.getElementById("puzzle").innerHTML=grid;
	/*
		end of printing sudoku grid
	*/
	var rc=0;
	var col=0;
	var row=0;
	var num=0;
	for (var ax = 11; ax < 100; ax++) {
		if(ax%10===0){
			ax++;
		}
		if((board[ax]>0)&&(board[ax]<10)){
			num=board[ax];
			col=rcToCol(ax);
			row=rcToRow(ax);
			//console.log("row: "+row+" col: "+col+" num: "+num);
			markSolvedCell(row, col, num);
			
		}
	}
	if(debugToken)
	{
		printOutDoubleArray(boardHelper);
	}
	//document.getElementById("listArray").innerHTML=printTableDoubleArray(boardHelper);
	newOneChoice();
	//document.getElementById("naked").innerHTML=
	naked();
	checkPuzzle();
	newOneChoice();
	document.getElementById("eight").innerHTML=findEight();
	document.getElementById("note").innerHTML=displayNotesOld();
	displayNotes();
	document.getElementById("info").innerHTML=" "+boardHelper[0][0]+"/81</br>";
	
}

function printOutDoubleArray( doubleArray){
var print = " ";
	for(var a=0; a < doubleArray.length; a++){
		var da=doubleArray[a];
		for(var b=0; b < da.length; b++){
			print += "["+a+"]["+b+"]="+doubleArray[a][b]+"<br>";
		}
	}
	document.getElementById("listArray").innerHTML=print;	
	}

///////////////////////////////////////////////
//newOneChoice:
//goal: to display one choice options for the X and Y axis.
///////////////////////////////////////////////
function newOneChoice(){	
	var tempCol=0;
	var print = " ";
	for(var a=1; a < boardHelper.length; a++){
		var bh=boardHelper[a];
			if(boardHelper[a][0]===8){
				for(var index=1; index < bh.length; index++){
					if(boardHelper[a][index]===0)
					{
					print += "["+a+"] is a "+index+"<br>";
					markSolvedCell(rcToRow(a),rcToCol(a),index);
					}
				}
			}
	}
	document.getElementById("one").innerHTML=print;
	 /////////
	 //row   /
	 /////////
	 for(var colCount=1; colCount<10; colCount++){
		for( var row=1; row<10; row++){
		tempCol=0;		 
				for(var cCount=1; cCount<=10; cCount++){
					if(cCount===10)
					{
							colHelper[row][colCount]=(-1);
					}else{
						////console.log("*["+boardHelper[rcToNum(row,cCount)][colCount]+"] row:"+row+" cCount"+cCount+" colCount:"+colCount+" tempCol:"+tempCol);
						if(tempCol===9)
						{
						//	break;
						}
						if(boardHelper[rcToNum(row,cCount)][colCount]===1)
						{
							tempCol=9;
							break;							
						}else if(boardHelper[rcToNum(row,cCount)][colCount]===(-1)){
							tempCol+=1;
						}
					}
					}
					colHelper[row][colCount]=tempCol;
				}
		}
		/////////////
		//end row   /
		/////////////
		////////
		//col  /
		////////
		for(var colCounta=1; colCounta<10; colCounta++){
		for( var cCounta=1; cCounta<10; cCounta++){
		tempCol=0;		 
				for(var row1=1; row1<10; row1++){
						////console.log("*["+boardHelper[rcToNum(row1,cCount)][colCount]+"] row:"+row1+" cCount"+cCount+" colCount:"+colCount+" tempCol:"+tempCol);
						if(tempCol===9)
						{
							break;
						}
						if(boardHelper[rcToNum(row1,cCounta)][colCounta]===1)
						{
							tempCol=9;							
						}else if(boardHelper[rcToNum(row1,cCounta)][colCounta]===(-1)){
							tempCol+=1;
						}
					}
					colHelper[cCounta+10][colCounta]=tempCol;
				}
		}
		/////////////
		//end col   /
		/////////////
		///////////
		// box    /
		///////////
	for(var colCountb=1; colCountb<10; colCountb++){
		for(var count3=0; count3<9; count3++){	
		switch(count3)
		{
			case 0:
			   tr=1;
			   tc=1;
			   break;
			case 1:
			   tr=1;
			   tc=4;
			   break;
			case 2:
			   tr=1;
			   tc=7;
			   break;
			case 3:
			   tr=4;
			   tc=1;
			   break;
			case 4:
			   tr=4;
			   tc=4;
			   break;
			case 5:
			   tr=4;
			   tc=7;
			   break;
			case 6:
			   tr=7;
			   tc=1;
			   break;
			case 7:
			   tr=7;
			   tc=4;
			   break;
			case 8:
			   tr=7;
			   tc=7;
			   break;
			default :
			   tr=0;
			   tc=0;
		}
		tempCol=0;	
		for(var ya=0; ya<3; ya++){
		   for(var fb=0; fb<3; fb++){
						if(tempCol===9)
						{
							break;
						}
						if(boardHelper[rcToNum((tr+ya),(tc+fb))][colCountb]===1)
						{
							tempCol=9;							
						}else if(boardHelper[rcToNum((tr+ya),(tc+fb))][colCountb]===(-1)){
							tempCol+=1;
						}
					}
					colHelper[(count3+1)+20][colCountb]=tempCol;
			}
		}		
	}
	///////////
	//end box /
	///////////
	for(var count=1; count<10; count++){
		var rowColor="white";
		grid="";
		grid+= '<tr><td width="25"> </td><td width="45">newRow '+count+'</td><td width="25">'+colHelper[count][1]+'</td><td width="25">'+colHelper[count][2]+'</td><td width="25">'+colHelper[count][3]+'</td><td width="25">'+colHelper[count][4]+'</td><td width="25">'+colHelper[count][5]+'</td><td width="25">'+colHelper[count][6]+'</td><td width="25">'+colHelper[count][7]+'</td><td width="25">'+colHelper[count][8]+'</td><td width="25">'+colHelper[count][9]+'</td></tr>';
		grid+= '<tr>';
		for(var ar=1; ar<10; ar++){
			if(ar!=1){
				grid+='</tr><tr>';
			}
			if(boardHelper[rcToNum((count),(ar))][0]===8)
				{
					rowColor="pink";
				}else{
					rowColor="white";
				}
			grid+='<td width="25" bgcolor='+rowColor+'>'+boardHelper[rcToNum((count),(ar))][0]+'</td><td width="25" bgcolor='+rowColor+'>'+rcToNum((count),(ar))+'</td>';
			for(var rv=1; rv<10; rv++){
				if( boardHelper[rcToNum((count),(ar))][rv] ==1){
				grid+= '<td width="25" bgcolor="'+rowColor+'">@</td>';
				}else if(boardHelper[rcToNum((count),(ar))][rv]== (-1)){
					grid+= '<td width="25" bgcolor="'+rowColor+'">X</td>';
				 }else{
					   grid+= '<td width="25" bgcolor="'+rowColor+'"> </td>';
				}
			}
		}
		document.getElementById("newRow"+count).innerHTML=grid;			
	}
	for(var count2=1; count2<10; count2++){
		grid="";
		var colColor="white";
	grid+= '<tr><td width="25"> </td><td width="45">newCol '+count2+'</td><td width="25">'+colHelper[count2+10][1]+'</td><td width="25">'+colHelper[count2+10][2]+'</td><td width="25">'+colHelper[count2+10][3]+'</td><td width="25">'+colHelper[count2+10][4]+'</td><td width="25">'+colHelper[count2+10][5]+'</td><td width="25">'+colHelper[count2+10][6]+'</td><td width="25">'+colHelper[count2+10][7]+'</td><td width="25">'+colHelper[count2+10][8]+'</td><td width="25">'+colHelper[count2+10][9]+'</td></tr>';	
		grid+= '<tr>';
		for(var at=1; at<10; at++){
			if(at!=1){
			grid+='</tr><tr>';
			}
			if(boardHelper[rcToNum(at,count2)][0]===8)
			{
				colColor="pink";
			}else{
				colColor="white";
			}
			grid+='<td width="25" bgcolor="'+colColor+'">'+boardHelper[rcToNum(at,count2)][0]+'</td><td width="25" bgcolor="'+colColor+'">'+rcToNum(at,count2)+'</td>';
			for(var cv=1; cv<10; cv++){
					switch( boardHelper[rcToNum(at,count2)][cv])
					{
						case (-1):
							grid+= '<td width="25" bgcolor="'+colColor+'">X</td>';
							break;
						case 1:
							grid+= '<td width="25" bgcolor="'+colColor+'">@</td>';
							break;
						default :
							grid+= '<td width="25" bgcolor="'+colColor+'"> </td>';
					}
				}
		}
					document.getElementById("newCol"+count2).innerHTML=grid;
	}
	/* end of print of column grids */
	//////////////////////
	//start of box print /
	//////////////////////
	for(var count31=0; count31<9; count31++){
		var boxColor="white";
		grid="";
	switch(count31)
	{
		case 0:
		   tr=1;
		   tc=1;
		   break;
		case 1:
		   tr=1;
		   tc=4;
		   break;
		case 2:
		   tr=1;
		   tc=7;
		   break;
		case 3:
		   tr=4;
		   tc=1;
		   break;
		case 4:
		   tr=4;
		   tc=4;
		   break;
		case 5:
		   tr=4;
		   tc=7;
		   break;
		case 6:
		   tr=7;
		   tc=1;
		   break;
		case 7:
		   tr=7;
		   tc=4;
		   break;
		case 8:
		   tr=7;
		   tc=7;
		   break;
		default :
		   tr=0;
		   tc=0;
	}
	grid+= '<tr><td width="25"> </td><td width="45">newBox '+(count31+1)+'</td><td width="25">'+colHelper[(count31+1)+20][1]+'</td><td width="25">'+colHelper[(count31+1)+20][2]+'</td><td width="25">'+colHelper[(count31+1)+20][3]+'</td><td width="25">'+colHelper[(count31+1)+20][4]+'</td><td width="25">'+colHelper[(count31+1)+20][5]+'</td><td width="25">'+colHelper[(count31+1)+20][6]+'</td><td width="25">'+colHelper[(count31+1)+20][7]+'</td><td width="25">'+colHelper[(count31+1)+20][8]+'</td><td width="25">'+colHelper[(count31+1)+20][9]+'</td></tr>';	
	grid+= '<tr>';
		for(var yab=0; yab<3; yab++){
		   for(var fbe=0; fbe<3; fbe++){
		   if(boardHelper[rcToNum((tr+yab),(tc+fbe))][0]===8)
			{
				boxColor="pink";
			}else{
				boxColor="white";
			}
			  grid+='</tr><tr><td width="25" bgcolor="'+boxColor+'">'+boardHelper[rcToNum((tr+yab),(tc+fbe))][0]+'</td><td width="25" bgcolor="'+boxColor+'">'+rcToNum((tr+yab),(tc+fbe))+'</td>';
			for(var ev=1; ev<10; ev++){
				switch( boardHelper[rcToNum((tr+yab),(tc+fbe))][ev])
				{
					case (-1):
					grid+= '<td width="25" bgcolor="'+boxColor+'">X</td>';
					break;
					case 1:
					grid+= '<td width="25" bgcolor="'+boxColor+'">@</td>';
					break;
					default :
					grid+= '<td width="25" bgcolor="'+boxColor+'"> </td>';
				}
			}
			}
		}
				document.getElementById("newBox"+(count31+1)).innerHTML=grid;
	}
	///////////////////
	//end of box print/
	///////////////////
	return colHelper;
}
function findEight()
{
	var print = "";
	for(var row=0; row<colHelper.length; row++){
		var rowArray = colHelper[row];
		for(var candidate=1; candidate<rowArray.length; candidate++){
			if(rowArray[candidate]===8){
				print +="["+row+"]["+candidate+"] has a 8 in its cell. ";
				if(row<10){
					print +="row "+row+" candidate "+candidate+" ";
					print +=findOneChoiceRow(row, candidate);
					print +="<br>";
				}else if(row<20){
					print +="column "+(row%10)+" candidate "+candidate+"<br>";
					print +=findOneChoiceCol((row%10), candidate);
					print +="<br>";
				}else if(row<30){
					print +="box "+(row%20)+" candidate "+candidate+"<br>";
					print +=findOneChoiceBox((row%20), candidate);
					print +="<br>";
				}
			}
		}
	}
	return print;
}
function findOneChoiceRow(row, candidate){
	var sendBack="not found";
	for(var col=1; col<10; col++)
	{
		if(boardHelper[rcToNum(row,col)][candidate]===0)
		{
			sendBack="["+rcToNum(row,col)+"] is a "+candidate;
			markSolvedCell(row,col,candidate);
			break;
		}
	}
	return sendBack;
}
function findOneChoiceCol(col, candidate){
	var sendBack="not found";
	for(var row=1; row<10; row++)
	{
		if(boardHelper[rcToNum(row,col)][candidate]===0)
		{
			sendBack="["+rcToNum(row,col)+"] is a "+candidate;
			markSolvedCell(row,col,candidate);
			break;
		}
	}
	return sendBack;
}
function findOneChoiceBox(box, candidate){
			var sendBack="not found";
			var topR=0;
			var topC=0;
			switch((box-1)){
			case 0:
			   topR=1;
			   topC=1;
			   break;
			case 1:
			   topR=1;
			   topC=4;
			   break;
			case 2:
			   topR=1;
			   topC=7;
			   break;
			case 3:
			   topR=4;
			   topC=1;
			   break;
			case 4:
			   topR=4;
			   topC=4;
			   break;
			case 5:
			   topR=4;
			   topC=7;
			   break;
			case 6:
			   topR=7;
			   topC=1;
			   break;
			case 7:
			   topR=7;
			   topC=4;
			   break;
			case 8:
			   topR=7;
			   topC=7;
			   break;
			default :
			   topR=0;
			   topC=0;
		}
			for(var spotR=0; spotR<3; spotR++){
				for(var spotC=0; spotC<3; spotC++){
					console.log("oneB: topR "+topR+" topC "+topC+" spotR "+spotR+" spotC "+spotC+"["+rcToNum((topR+spotR),(topC+spotC))+"]");
					if(boardHelper[rcToNum((topR+spotR),(topC+spotC))][candidate]===0){
						sendBack="["+rcToNum((topR+spotR),(topC+spotC))+"] is a "+candidate;
						markSolvedCell((topR+spotR),(topC+spotC),candidate);
						return sendBack;
					}
				}
			}
}
function naked(){
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
					clearRowNaked(n1r, unit, n1c, n2c, n3c);
				}else if((n1c===n2c)&&(n1r===n3c)){
					print += " naked column possibility in box "+count+" unit "+unit+" colCount ["+colCount+"] </br>";
					print += "n1r["+n1r+"] n1c["+n1c+"] "+"n2r["+n2r+"] n2c["+n2c+"] "+"n3r["+n3r+"] n3c["+n3c+"]</br>";
					clearColNaked(n1c, unit, n1r, n2r, n3r);
				}
				}else if(colCount===7){
					if(n1r===n2r){
						print += " naked row possibility in box "+count+" unit "+unit+" colCount ["+colCount+"] </br>";
						print += "n1r["+n1r+"] n1c["+n1c+"] "+"n2r["+n2r+"] n2c["+n2c+"]</br>";
						clearRowNaked(n1r, unit, n1c, n2c, n3c);
					}else if((n1c===n2c)&&(n1r===n3c)){
						print += " naked column possibility in box "+count+" unit "+unit+" colCount ["+colCount+"] </br>";
						print += "n1r["+n1r+"] n1c["+n1c+"] "+"n2r["+n2r+"] n2c["+n2c+"]</br>";
					clearColNaked(n1c, unit, n1r, n2r, n3r);
					}
				}
			}	
		}	
	}
	return print;
}
function clearRowNaked(row, candidate, n1c, n2c, n3c){
	console.log("row: "+row+" candidate: "+candidate+" n1c: "+n1c+" n2c: "+n2c+" n3c: "+n3c);
	for(var col=1; col<10; col++){
		if((col!==n1c)&&(col!==n2c)&&(col!==n3c)){
			removeUnitCell(row, col, candidate);
		}else
		{
			console.log("skipping col: "+col);
		}
	}
}
function clearColNaked(col, candidate, n1r, n2r, n3r){
	console.log("row: "+row+" candidate: "+candidate+" n1r: "+n1r+" n2r: "+n2r+" n3r: "+n3r);
	for(var row=1; row<10; row++){
		if((row!==n1r)&&(row!==n2r)&&(row!==n3r)){
			removeUnitCell(row, col, candidate);
		}else
		{
			console.log("skipping col: "+col);
		}
	}
}
function printTableDoubleArray(dArray){
	var print = "";
	for(var row=0; row<dArray.length; row++){
		print += "<tr>";
		var rowArray = dArray[row];
		for(var col=0; col<dArray.length; col++){
			print += "<td>"+rowArray[col]+"</td>";
		}
		print +="</tr>";
	}
	return print;
}
function displayNotes(){
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
				for(var grid1=1; grid1<10; grid1++){
					if(boardHelper[rcToNum(row,col)][grid1]!==(-1)){
						print +="<td class='grid'>"+grid1+"</td>";
					}else{
						print +="<td class='grid'> </td>";
					}
					if(grid1===9){
						print+="</tr>";
					}else if((grid1%3)===0){
						print+="</tr><tr>";
					}
					document.getElementById("gridBox"+rcToNum(row,col)).innerHTML=print;
				}
			}
			}
	}
}
function displayNotesOld(){
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
function tablePrint(){
	var HelperPrint=" ";
			for(xRow=0; xRow<100; xRow++)
			{
				HelperPrint+="<tr>";
				for(yCol=0; yCol<10; yCol++){
					HelperPrint+="<td>"+boardHelper[xRow][yCol]+"</td>";
				}
				HelperPrint+="</tr>";
			}
			document.getElementById("boardeHelper").innerHTML=HelperPrint;
}

function checkPuzzle(){
	var grand=0;
	var tempCol=0;
	for(var colCount2=1; colCount2<10; colCount2++){
		for( var row2=1; row2<10; row2++){
		tempCol=0;		 
				for(var cCount2=1; cCount2<10; cCount2++){
					
						if(boardHelper[rcToNum(row2,cCount2)][colCount2]===1)
						{
							tempCol+=1;					
						}else if(boardHelper[rcToNum(row2,cCount2)][colCount2]===(-1)){
							
						}
					
					}
					//colHelper[row2][colCount2]=tempCol;
					if(tempCol>=2){
						document.getElementById("message").innerHTML="Error";
					}else{
						if(tempCol===1){
							grand++;
						}
					}					
				}
			
		}
		//document.getElementById("grand").innerHTML=" "+grand;
		var rowXCount=0;
		var rowACount=0;
		for(var row=1; row<10; row++){
			for(var col=1; col<10; col++){
				rowXCount=0;
				rowACount=0;
				for(var unit=1; unit<10; unit++){
					if(boardHelper[rcToNum(row,col)][unit]===(1)){
						rowACount++;
					}else if(boardHelper[rcToNum(row,col)][unit]===(-1)){
						rowXCount++;
					}
				}
			if((rowACount>1)||(rowXCount>8)){
				document.getElementById("message").innerHTML="Error";
			}
			}
		}
		if(grand===81){
			document.getElementById("message").innerHTML="Solved!";
		}
}

function count(num){
	console.log("num: "+num);
	board[num]+=1;
	if(board[num]===10){
		board[num]=0;
		return " ";
	}
	console.log("returning: "+board[num]);
	return board[num];
}
