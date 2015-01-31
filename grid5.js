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
	
	document.getElementById("puzzle").innerHTML=grid;
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
			console.log("ax "+ax);
			col=ax%10;
			row=(ax-(ax%10))/10;
			console.log("row "+row+" col "+col);
			rc=rcToNum(row,col); 
			console.log("rc "+rc);
			boardHelper[rc][num]=1; 
			boardHelper[rc][0]=9;
			/* clear the rest of the rc cells*/
			
			/* clear row of the number*/
			for(var currentX=1; currentX<10; currentX++){
				if(boardHelper[rc][currentX]!=1){
					boardHelper[rc][currentX]= -1;
				}
			}
			/* clear row of the number*/
			for(var rowX=1; rowX<10; rowX++){
				if(rowX!=col){
					if((boardHelper[rcToNum(row,rowX)][num]!==1)&&(boardHelper[rcToNum(row,rowX)][num]!==-1)){
						boardHelper[rcToNum(row,rowX)][num]= -1;
						if(boardHelper[rcToNum(row,rowX)][0]<=7){
						boardHelper[rcToNum(row,rowX)][0]=boardHelper[rcToNum(row,rowX)][0]+1;
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
	
	for(var count=1; count<10; count++){
		var rowColor="white";
		grid="";
		grid+= ' <tr><td width="25"> </td><td width="45">Row '+(count)+'</td><td width="25">1</td><td width="25">2</td><td width="25">3</td><td width="25">4</td><td width="25">5</td><td width="25">6</td><td width="25">7</td><td width="25">8</td><td width="25">9</td></tr>';
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
		document.getElementById("row"+count).innerHTML=grid;			
	}
	
	/* end of printing row grids */
	
	/* printing column grids */
	
	for(var count2=1; count2<10; count2++){
		grid="";
		
		var colColor="white";
			
		grid+= ' <tr><td width="25"> </td><td width="65">Column '+(count2)+'</td><td width="25">1</td><td width="25">2</td><td width="25">3</td><td width="25">4</td><td width="25">5</td><td width="25">6</td><td width="25">7</td><td width="25">8</td><td width="25">9</td></tr>';
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
					document.getElementById("col"+count2).innerHTML=grid;
	}
	
	/* end of print of column grids */
	/* printing of box grids */
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
	grid+= ' <tr><td width="25"> </td><td width="45">box '+(count3+1)+'</td><td width="25">1</td><td width="25">2</td><td width="25">3</td><td width="25">4</td><td width="25">5</td><td width="25">6</td><td width="25">7</td><td width="25">8</td><td width="25">9</td></tr>';
	grid+= '<tr>';
		for(var ya=0; ya<3; ya++){
		   for(var fb=0; fb<3; fb++){
		   if(boardHelper[rcToNum((tr+ya),(tc+fb))][0]===8)
			{
				boxColor="pink";
			}else{
				boxColor="white";
			}
			  grid+='</tr><tr><td width="25" bgcolor="'+boxColor+'">'+boardHelper[rcToNum((tr+ya),(tc+fb))][0]+'</td><td width="25" bgcolor="'+boxColor+'">'+rcToNum((tr+ya),(tc+fb))+'</td>';
			for(var ev=1; ev<10; ev++){
				switch( boardHelper[rcToNum((tr+ya),(tc+fb))][ev])
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
				document.getElementById("box"+(count3+1)).innerHTML=grid;
	}
	printOutDoubleArray(boardHelper);
	}
	function printOutDoubleArray( doubleArray)
	{
		var print = " ";
		var oneChoice = " ";
		for(var a=0; a < doubleArray.length; a++){
			for(var b=0; b < doubleArray[a].length; b++){
				print += "["+a+"]["+b+"]="+doubleArray[a][b]+"<br>";
				if(doubleArray[a][b]===8)
				{
					for(var index=1; index < doubleArray[a].length; index++){
						if(doubleArray[a][index]===0)
						oneChoice += "["+a+"] is a "+index+"<br>";
						document.getElementById("b"+a+"").value=index;
					}
				}
			}
		}
		document.getElementById("listArray").innerHTML=print;
		document.getElementById("one").innerHTML=oneChoice;
	}

