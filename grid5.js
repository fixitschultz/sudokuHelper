<script>
function rcToNum(var rowf,  var colf) {
	return (rowf*10)+colf;
}
function gridPrintout(){
	var grid=" ";
	var board="000000000000000000000000000000000000000000000000000000000000000000000000000000009";
	var rx=0;
	for(var b=11; b<100; b++){
		if(b%10==0){
			b++;
			}
			newBoard[b]=board[rx];
			rx++;
	}
			grid+= '<table border="1" cellpading="1">';
	grid+= '<tr>';
	for (var mx = 0; mx < 81; mx++) {
		if(board[mx]==0)
		{
			board[mx]=" ";
		}
		if((mx+1)%9==0)
		{
		grid+= '<td>'+board[mx]+'</td>';
		grid+= '</tr>';	
		}else{
			grid+= '<td>'+board[mx]+'</td>';
		}
	}
	grid+= '</table>';
	var boardHelper = new Array(100);
	  for (var ih = 0; ih < 100; ih++) {
		boardHelper[ih] = new Array(10);
	 }
	//boardHelper[0][0]=0;
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
			row=substr(ax,0,1);
			col=substr(ax,1,1);
			rc=rcToNum(row,col); 
			boardHelper[rc][num]=1; /* clear row of the number*/
			/* clear the rest of the rc cells*/
			for(var currentX=1; currentX<10; currentX++){
				if(boardHelper[rc][currentX]!=1){
					boardHelper[rc][currentX]= -1;
				}
			}
			/* clear row of the number*/
			for(var rowX=1; rowX<10; rowX++){
				if(rowX!=col){
					if(boardHelper[rcToNum(row,rowX)][num]!=1){
						boardHelper[rcToNum(row,rowX)][num]= -1;
					}
				}
			}
			// clear column of the number 
			for(var colX=0; colX<10; colX++){ 
				if((rcToNum(colX,col)!==rc)&&(rcToNum(colX,col)>10)){
					if(boardHelper[rcToNum(colX,col)][num]!=1){
						boardHelper[rcToNum(colX,col)][num]=-1;
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
					if(boardHelper[rcToNum(((row-topR)+spotR),((col-topC)+spotC))][num]!==-1){
						boardHelper[rcToNum(((row-topR)+spotR),((col-topC)+spotC))][num]=-1;
					}
				}
				}
			}
		}
	}

	for(var count=1; count<10; count++){
		grid+= "<br/>\n<br/>\n<br/>\n";
		grid+= '<table align="center" border="1" cellpading="3">';
		grid+= ' <tr> <td width="45">Row '+(count)+'</td><td width="25">1</td><td width="25">2</td><td width="25">3</td><td width="25">4</td><td width="25">5</td><td width="25">6</td><td width="25">7</td><td width="25">8</td><td width="25">9</td></tr>';
		grid+= '<tr>';
		for(var ar=1; ar<10; ar++){
			if(ar!=1){
				grid+='</tr><tr>';
			}
			grid+=' <td width="25">'+rcToNum((count),(a))+'</td>';
			for(var rv=1; rv<10; rv++){
				if( boardHelper[rcToNum((count),(ar))][rv] ==1){
				grid+= '<td width="25">@</td>';
				}else if(boardHelper[rcToNum((count),(ar))][rv]== (-1)){
					grid+= '<td width="25">X</td>';
				 }else{
					   grid+= '<td width="25"> </td>';
				}
			}
		}
					grid+= '</table>';
	}
	for(var count2=1; count2<10; count2++){
		grid+= "<br/>\n<br/>\n<br/>\n";
		grid+= '<table align="center" border="1" cellpading="3">';
		grid+= ' <tr> <td width="65">Column '+(count2)+'</td><td width="25">1</td><td width="25">2</td><td width="25">3</td><td width="25">4</td><td width="25">5</td><td width="25">6</td><td width="25">7</td><td width="25">8</td><td width="25">9</td></tr>';
		grid+= '<tr>';
		for(var at=1; at<10; at++){
			if(at!=1){
			grid+='</tr><tr>';
			}
			grid+=' <td width="25">'+rcToNum(at,count2)+'</td>';
			for(var cv=1; cv<10; cv++){
					switch( boardHelper[rcToNum(at,count2)][cv])
					{
						case (-1):
							grid+= '<td width="25">X</td>';
							break;
						case 1:
							grid+= '<td width="25">@</td>';
							break;
						default :
							grid+= '<td width="25"> </td>';
					}
				}
		}
					grid+= '</table>';
	}

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
	grid+= "<br/>\n<br/>\n<br/>\n";
	grid+= '<table align="center" border="1" cellpading="3">';
	grid+= ' <tr> <td width="45">box '+(count3+1)+'</td><td width="25">1</td><td width="25">2</td><td width="25">3</td><td width="25">4</td><td width="25">5</td><td width="25">6</td><td width="25">7</td><td width="25">8</td><td width="25">9</td></tr>';
	grid+= '<tr>';
		for(var ya=0; ya<3; ya++){
		   for(var fb=0; fb<3; fb++){
		   if(fb==1){
			  grid+=' <td width="25">'+rcToNum((tr+ya),(tc+fb))+'</td>';
			  }else{
			  grid+='</tr><tr> <td width="25">'+rcToNum((tr+ya),(tc+fb))+'</td>';
			  }
			for(var ev=1; ev<10; ev++){
				switch( boardHelper[rcToNum((tr+ya),(tc+fb))][ev])
				{
					case (-1):
					grid+= '<td width="25">X</td>';
					break;
					case 1:
					grid+= '<td width="25">@</td>';
					break;
					default :
					grid+= '<td width="25"> </td>';
				}
			}
			}
		}
				grid+= '</table>';
	}
}
?>