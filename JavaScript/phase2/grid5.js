var debugToken=false;
var loadC=0;
function loadBoard(inputBoard)
{
	//console.log("inputBoard: "+inputBoard);
	 if(typeof variable_here === 'undefined'){
		//console.log("inputBoard is undefined");
		//return;
	}
	//var newboard= new Array(100);
	x=0;
	for(b=11; b<100; b++){
	if(b%10==0){
		b++;
		}
		//newBoard[b]=board[x];
		document.getElementById("b"+b+"").value=inputBoard[x];
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
var board= new Array(100);
var targeturl;
var spot=0;
for(var x=11; x<100; x++){
var id="b";

	if( x%10==0){
		x++;
	}
	id+=x;
	boardValue=document.getElementById(id).value;

	if(boardValue === ""){
	board[spot++]=0;
	}else{
	board[spot++]=boardValue;
	}
}
return board;
}

function rcToNum(rowf, colf) {
	return (rowf*10)+colf;
}

function gridPrintout(){
	var grid=" ";
	var board=grabBoard();
	var rx=0;
	var newBoard= new Array(100);
	for(var b=11; b<100; b++){
		if(b%10==0){
			b++;
			}
			newBoard[b]=board[rx];
			rx++;
	}
	/*
		printing sudoku grid
	*/
	grid+= '<tr>';
	for (var mx = 0; mx < 81; mx++) {
		
		if((mx+1)%9==0)
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
	var boardHelper = new Array(100);
	  for (var ih = 0; ih < 100; ih++) {
		boardHelper[ih] = new Array(10);
	 }
	 for( var mr=0; mr < 100; mr++){
		 for( var ree=0; ree<10; ree++){
			boardHelper[mr][ree]=0;
		 }
	 }
	var rc=0;
	var col=0;
	var row=0;
	var num=0;
	var r1=0;
	var r2=0;
	var r3=0;
	var c1=0;
	var c2=0;
	var c3=0;
	var topR=-1;
	var topC=-1;
	for (var ax = 11; ax < 100; ax++) {
		if(ax%10==0){
			ax++;
		}
		if((newBoard[ax]>0)&&(newBoard[ax]<10)){
			num=newBoard[ax];
			//console.log("ax "+ax);
			col=ax%10;
			row=(ax-(ax%10))/10;
			//console.log("row "+row+" col "+col);
			rc=rcToNum(row,col); 
			//console.log("rc "+rc);
			boardHelper[rc][num]=1; 
			boardHelper[rc][0]=9;
			boardHelper[(row)*10][0]+=1;
			boardHelper[0][num]+=1;
			boardHelper[(row)*10][num]=9;
			boardHelper[0][0]+=1;
			/* clear the rest of the rc cells*/
			
			/* clear row of the number*/
			for(var currentX=1; currentX<10; currentX++){
				if(boardHelper[rc][currentX]!=1){
					boardHelper[rc][currentX]= -1;
					if(boardHelper[(row)*10][currentX]<=7){
					boardHelper[(row)*10][currentX]+=1;
					}
				}
			}
			/* clear row of the number*/
			for(var rowX=1; rowX<10; rowX++){
				if(rowX!=col){
					if((boardHelper[rcToNum(row,rowX)][num]!==1)&&(boardHelper[rcToNum(row,rowX)][num]!==-1)){
						boardHelper[rcToNum(row,rowX)][num]= -1;
						if(boardHelper[rcToNum(row,rowX)][0]<=7){
						boardHelper[rcToNum(row,rowX)][0]+=1;
						}
					}
				}
			}
			// clear column of the number 
			for(var colX=0; colX<10; colX++){ 
				if((rcToNum(colX,col)!==rc)&&(rcToNum(colX,col)>10)){
					if((boardHelper[rcToNum(colX,col)][num]!==1)&&(boardHelper[rcToNum(colX,col)][num]!==-1)){
						boardHelper[rcToNum(colX,col)][num]=-1;
						if(boardHelper[rcToNum(colX,col)][0]<=7){
							boardHelper[rcToNum(colX,col)][0]=boardHelper[rcToNum(colX,col)][0]+1;
						}
						
					}
					//grid+="row "+row+" colX "+colX;
				}
			}
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
					if((rcToNum(((row-topR)+spotR),((col-topC)+spotC)))!==rc){
					if((boardHelper[rcToNum(((row-topR)+spotR),((col-topC)+spotC))][num]!==1)&&((boardHelper[rcToNum(((row-topR)+spotR),((col-topC)+spotC))][num]!==-1))){
						boardHelper[rcToNum(((row-topR)+spotR),((col-topC)+spotC))][num]=-1;
						
						if(boardHelper[rcToNum(((row-topR)+spotR),((col-topC)+spotC))][0]!=9){
							boardHelper[rcToNum(((row-topR)+spotR),((col-topC)+spotC))][0]=boardHelper[rcToNum(((row-topR)+spotR),((col-topC)+spotC))][0]+1;
						}
						
					}
				}
				}
			}
		}
	}
	if(debugToken)
	{
		printOutDoubleArray(boardHelper);
	}
	//document.getElementById("listArray").innerHTML=printTableDoubleArray(boardHelper);
	var colHelper=newOneChoice(boardHelper);
	document.getElementById("naked").innerHTML=naked(boardHelper,colHelper);
	boardHelper=oneChoice(boardHelper);
	colHelper=newOneChoice(boardHelper);
	document.getElementById("eight").innerHTML=findEight(colHelper,boardHelper);
	document.getElementById("note").innerHTML=displayNotesOld(boardHelper);
	displayNotes(boardHelper);
	
	document.getElementById("info").innerHTML=" "+boardHelper[0][0]+"/81</br>";
	}
function printOutDoubleArray( doubleArray){
var print = " ";
	for(var a=0; a < doubleArray.length; a++){
		for(var b=0; b < doubleArray[a].length; b++){
			print += "["+a+"]["+b+"]="+doubleArray[a][b]+"<br>";
		}
	}
	document.getElementById("listArray").innerHTML=print;	
	}
	
function oneChoice(doubleArray){
	var print = " ";
	for(var a=1; a < doubleArray.length; a++){
		for(var b=0; b < doubleArray[a].length; b++){
			if(doubleArray[a][b]===8){
				for(var index=1; index < doubleArray[a].length; index++){
					if(doubleArray[a][index]===0)
					{
					print += "["+a+"] is a "+index+"<br>";
					document.getElementById("b"+a+"").value=index;
	
					}
				}
			}
		}
	}
	//document.getElementById("one").innerHTML=print;
	return doubleArray;
}
///////////////////////////////////////////////
//newOneChoice:
//goal: to display one choice options for the X and Y axis.
///////////////////////////////////////////////
function newOneChoice(helper){	
	var tempCol=0;
	var colHelper = new Array(31);
	  for (var ih = 0; ih < 31; ih++) {
		colHelper[ih] = new Array(10);
	 }
	 for( var mt=0; mt < 31; mt++){
		 for( var re=0; re<10; re++){
			colHelper[mt][re]=0;
		 }
	 }
	 /////////
	 //row   /
	 /////////
	 for(var colCount=1; colCount<10; colCount++){
		for( var row=1; row<10; row++){
		tempCol=0;		 
				for(var cCount=1; cCount<10; cCount++){
					
						////console.log("*["+helper[rcToNum(row,cCount)][colCount]+"] row:"+row+" cCount"+cCount+" colCount:"+colCount+" tempCol:"+tempCol);
						if(tempCol===9)
						{
							break;
						}
						if(helper[rcToNum(row,cCount)][colCount]===1)
						{
						//	//console.log("["+helper[rcToNum(row,cCount)][colCount]+"] row:"+row+" cCount"+cCount+" colCount:"+colCount+" tempCol:"+tempCol+" temp is now 9");
							tempCol=9;
							colHelper[row][colCount]=9;//changing col candidate cell to solved for this cell
							//colHelper[30][0]+=1;//increasing cell solved cell
							//colHelper[30][colCount]+=1;//increasing number candidate cell.
							//colHelper[0][colCount]=9;//changing col candidate cell to sovled for this row
							//colHelper[0][0]+=1;//increasing solved cell for this row
							//break;							
						}else if(helper[rcToNum(row,cCount)][colCount]===(-1)){
							
							tempCol+=1;
						//	//console.log("["+helper[rcToNum(row,cCount)][colCount]+"] row:"+row+" cCount"+cCount+" colCount:"+colCount+" tempCol:"+tempCol);
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
		for(var colCount=1; colCount<10; colCount++){
		for( var cCount=1; cCount<10; cCount++){
		tempCol=0;		 
				for(var row=1; row<10; row++){
					
						////console.log("*["+helper[rcToNum(row,cCount)][colCount]+"] row:"+row+" cCount"+cCount+" colCount:"+colCount+" tempCol:"+tempCol);
						if(tempCol===9)
						{
							break;
						}
						if(helper[rcToNum(row,cCount)][colCount]===1)
						{
							////console.log("["+helper[rcToNum(row,cCount)][colCount]+"] row:"+row+" cCount"+cCount+" colCount:"+colCount+" tempCol:"+tempCol+" temp is now 9");
							tempCol=9;
							colHelper[cCount+10][colCount]=9;
							//break;							
						}else if(helper[rcToNum(row,cCount)][colCount]===(-1)){
							
							tempCol+=1;
							////console.log("["+helper[rcToNum(row,cCount)][colCount]+"] row:"+row+" cCount"+cCount+" colCount:"+colCount+" tempCol:"+tempCol);
						}
					}
					colHelper[cCount+10][colCount]=tempCol;
				}
		}
		/////////////
		//end col   /
		/////////////
		///////////
		// box    /
		///////////
	for(var colCount=1; colCount<10; colCount++){
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
						if(helper[rcToNum((tr+ya),(tc+fb))][colCount]===1)
						{
							//console.log("box "+count3+" ["+helper[rcToNum((tr+ya),(tc+fb))][colCount]+"] count3:"+count3+" tr"+tr+" ya:"+ya+" tc:"+tc+" fb:"+fb+"colHelper: "+((count3+1)+18)+"tempCol"+tempCol+" temp is now 9");
							tempCol=9;
							colHelper[(count3+1)+20][colCount]=9;
							//break;							
						}else if(helper[rcToNum((tr+ya),(tc+fb))][colCount]===(-1)){
							
							tempCol+=1;
							//console.log("["+helper[rcToNum((tr+ya),(tc+fb))][colCount]+"] row:"+row+" cCount"+cCount+" colCount:"+colCount+" tempCol:"+tempCol);
						}
					}
					colHelper[(count3+1)+20][colCount]=tempCol;
			}
		}		
	}
	///////////
	//end box /
	///////////
	
		var colHelperPrint="";
		/*
		for(xRow=0; xRow<30; xRow++)
		{
			colHelperPrint+="<tr>";
			for(yCol=0; yCol<10; yCol++){
				colHelperPrint+="<td>"+colHelper[xRow][yCol]+"</td>";
			}
			colHelperPrint+="</tr>";
		}
		*/
		colHelperPrint=printTableDoubleArray(colHelper);
		//document.getElementById("colHelper").innerHTML=colHelperPrint;	
	 
	

	for(var count=1; count<10; count++){
		var rowColor="white";
		grid="";
		grid+= '<tr><td width="25"> </td><td width="45">newRow '+count+'</td><td width="25">'+colHelper[count][1]+'</td><td width="25">'+colHelper[count][2]+'</td><td width="25">'+colHelper[count][3]+'</td><td width="25">'+colHelper[count][4]+'</td><td width="25">'+colHelper[count][5]+'</td><td width="25">'+colHelper[count][6]+'</td><td width="25">'+colHelper[count][7]+'</td><td width="25">'+colHelper[count][8]+'</td><td width="25">'+colHelper[count][9]+'</td></tr>';
		grid+= '<tr>';
		for(var ar=1; ar<10; ar++){
			if(ar!=1){
				grid+='</tr><tr>';
			}
			if(helper[rcToNum((count),(ar))][0]===8)
				{
					rowColor="pink";
				}else{
					rowColor="white";
				}
			grid+='<td width="25" bgcolor='+rowColor+'>'+helper[rcToNum((count),(ar))][0]+'</td><td width="25" bgcolor='+rowColor+'>'+rcToNum((count),(ar))+'</td>';
			for(var rv=1; rv<10; rv++){
				if( helper[rcToNum((count),(ar))][rv] ==1){
				grid+= '<td width="25" bgcolor="'+rowColor+'">@</td>';
				}else if(helper[rcToNum((count),(ar))][rv]== (-1)){
					grid+= '<td width="25" bgcolor="'+rowColor+'">X</td>';
				 }else{
					   grid+= '<td width="25" bgcolor="'+rowColor+'"> </td>';
				}
			}
		}
		//document.getElementById("newRow"+count).innerHTML=grid;			
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
			if(helper[rcToNum(at,count2)][0]===8)
			{
				colColor="pink";
			}else{
				colColor="white";
			}
			
			grid+='<td width="25" bgcolor="'+colColor+'">'+helper[rcToNum(at,count2)][0]+'</td><td width="25" bgcolor="'+colColor+'">'+rcToNum(at,count2)+'</td>';
			for(var cv=1; cv<10; cv++){
					switch( helper[rcToNum(at,count2)][cv])
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
					//document.getElementById("newCol"+count2).innerHTML=grid;
	}
	
	/* end of print of column grids */
	//////////////////////
	//start of box print /
	//////////////////////
	for(var count3=0; count3<9; count3++){
		var boxColor="white";
		grid="";
		
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
	grid+= '<tr><td width="25"> </td><td width="45">newBox '+(count3+1)+'</td><td width="25">'+colHelper[(count3+1)+20][1]+'</td><td width="25">'+colHelper[(count3+1)+20][2]+'</td><td width="25">'+colHelper[(count3+1)+20][3]+'</td><td width="25">'+colHelper[(count3+1)+20][4]+'</td><td width="25">'+colHelper[(count3+1)+20][5]+'</td><td width="25">'+colHelper[(count3+1)+20][6]+'</td><td width="25">'+colHelper[(count3+1)+20][7]+'</td><td width="25">'+colHelper[(count3+1)+20][8]+'</td><td width="25">'+colHelper[(count3+1)+20][9]+'</td></tr>';	
	grid+= '<tr>';
		for(var ya=0; ya<3; ya++){
		   for(var fb=0; fb<3; fb++){
		   if(helper[rcToNum((tr+ya),(tc+fb))][0]===8)
			{
				boxColor="pink";
			}else{
				boxColor="white";
			}
			  grid+='</tr><tr><td width="25" bgcolor="'+boxColor+'">'+helper[rcToNum((tr+ya),(tc+fb))][0]+'</td><td width="25" bgcolor="'+boxColor+'">'+rcToNum((tr+ya),(tc+fb))+'</td>';
			for(var ev=1; ev<10; ev++){
				switch( helper[rcToNum((tr+ya),(tc+fb))][ev])
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
				document.getElementById("newBox"+(count3+1)).innerHTML=grid;
	}
	///////////////////
	//end of box print/
	///////////////////
	return colHelper;
}
function findEight(array,boardHelper)
{
	var print = "";
	for(var row=0; row<array.length; row++){
		var rowArray = array[row];
		for(var col=1; col<rowArray.length; col++){
			if(rowArray[col]===8){
				print +="["+row+"]["+col+"] has a 8 in its cell. ";
				if(row<10){
					print +="row "+row+" col "+col+" ";
					print +=findOneChoiceRow(row, col, boardHelper);
					print +="<br>";
				}else if(row<20){
					print +="column "+(row%10)+" col "+col+"<br>";
					print +=findOneChoiceCol((row%10), col, boardHelper);
					print +="<br>";
				}else if(row<30){
					print +="box "+(row%20)+" col "+col+"<br>";
					print +=findOneChoiceBox((row%20), col, boardHelper);
					print +="<br>";
				}
			}
		}
	}
	return print;
}

function findOneChoiceRow(row, canidate, array){
	var sendBack="not found";
	for(var col=1; col<10; col++)
	{
		if(array[rcToNum(row,col)][canidate]==0)
		{
			sendBack="["+rcToNum(row,col)+"] is a "+canidate;
			document.getElementById("b"+rcToNum(row,col)+"").value=canidate;
			break;
		}
	}
	return sendBack;
}

function findOneChoiceCol(col, canidate, array){
	var sendBack="not found";
	for(var row=1; row<10; row++)
	{
		
		if(array[rcToNum(row,col)][canidate]==0)
		{
			sendBack="["+rcToNum(row,col)+"] is a "+canidate;
			document.getElementById("b"+rcToNum(row,col)+"").value=canidate;
			break;
		}
	}
	return sendBack;
}

function findOneChoiceBox(box, canidate, array){
			var sendBack;
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
					if(array[rcToNum((topR+spotR),(topC+spotC))][canidate]===0){
						sendBack="["+rcToNum((topR+spotR),(topC+spotC))+"] is a "+canidate;
						document.getElementById("b"+rcToNum((topR+spotR),(topC+spotC))+"").value=canidate;
						return sendBack;
					}
				}
			}
	
}