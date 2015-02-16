<?php
function rcToNum($row,  $col) {
return ($row*10)+$col;
} 
$board = $_GET["board"];
if($board === null)
{
	//$board="123456789597823164486971532315697248648215973279384651754132896861549327932768415";
	$board="000000000000000000000000000000000000000000000000000000000000000000000000000000009";
}
$x=0;

for($b=11; $b<100; $b++){
	if($b%10==0){
		$b++;
		}
		$newBoard[$b]=$board[$x];
		$x++;
}
		echo '<table border="1" cellpading="1">';
echo '<tr>';
for ($x = 0; $x < 81; $x++) {
	if($board[$x]==0)
	{
		$board[$x]=" ";
	}
    if((($x+1)%9==0)&&($x!=81))
	{
	echo '<td>'.$board[$x].'</td>';
    echo '</tr>';
	echo '<tr>';	
	}else{
		echo '<td>'.$board[$x].'</td>';
    }
}
echo '</table>';


$boardHelper[0][0]=0;
for ($x = 11; $x < 100; $x++) {
	if(($x%10===0)&&($x!=100)){
		$x++;
	}
	if(($newBoard[$x]>0)&&($newBoard[$x]<10)){
		$num=$newBoard[$x];
		$row=substr($x,0,1);
		$col=substr($x,1,1);
		$rc=rcToNum($row,$col); 
		$boardHelper[$rc][$num]=1; /* clear row of the number*/
		/* clear the rest of the rc cells*/
		for($currentX=1; $currentX<10; $currentX++){
			if($boardHelper[$rc][$currentX]!=1){
				$boardHelper[$rc][$currentX]= -1;
			}
		}
		/* clear row of the number*/
		for($rowX=1; $rowX<10; $rowX++){
			if($rowX!=$col){
				if($boardHelper[rcToNum($row,$rowX)][$num]!=1){
					$boardHelper[rcToNum($row,$rowX)][$num]= -1;
					//echo"clear row of [".$num."] row:".$row." col:".$col." array:".(($row*10)+$rowX)."<br/>\n";
				}
			}
		}
		// clear column of the number 
		for($colX=0; $colX<10; $colX++){ 
			if((rcToNum($colX,$col)!==$rc)&&(rcToNum($colX,$col)>10)){
				if($boardHelper[rcToNum($colX,$col)][$num]!=1){
					$boardHelper[rcToNum($colX,$col)][$num]=-1;
				//echo"clear col of [".$num."] row:".$row." col:".$col." colX".$colX." array:".((($colX)*10)+$col)."<br/>\n";
				}
				//echo"row ".$row." colX ".$colX;
			}
		}
		// clear box of the number
		$r1=$row-1;
		$r2=$row-4;
		$r3=$row-7;
		$c1=$col-1;
		$c2=$col-4;
		$c3=$col-7;
		$topR=-1;
		$topC=-1;
		if((0<=$r1)&&($r1<=2)){
			$topR=$r1;
		}else if((0<=$r2)&&($r2<=2)){
			$topR=$r2;
		}else if((0<=$r3)&&($r3<=2)){
			$topR=$r3;
		}
		if((0<=$c1)&&($c1<=2)){
			$topC=$c1;
		}else if((0<=$c2)&&($c2<=2)){
			$topC=$c2;
		}else if((0<=$c3)&&($c3<=2)){
			$topC=$c3;
		}
		for($spotR=0; $spotR<3; $spotR++)
		{
			for($spotC=0; $spotC<3; $spotC++)
			{
				if((rcToNum((($row-$topR)+$spotR),(($col-$topC)+$spotC)))!==$rc){
				if($boardHelper[rcToNum((($row-$topR)+$spotR),(($col-$topC)+$spotC))][$num]!==-1){
					$boardHelper[rcToNum((($row-$topR)+$spotR),(($col-$topC)+$spotC))][$num]=-1;
				//	echo"clear box of [".$num."] row:".$row." col:".$col." topR:".$topR." topC:".$topC." spotR".$spotR." spotC".$spotC." array:".(((($row-$topR)+$spotR)*10)+(($col-$topC)+$spotC))."<br/>\n";
				}
			}
			}
		}
	}
		//echo '<td>'.$newBoard[$x].'</td>';
}
/*
echo '</table>';
echo '<table align="center" border="1" cellpading="3">';
echo ' <tr> <td width="25"></td><td width="25">1</td><td width="25">2</td><td width="25">3</td><td width="25">4</td><td width="25">5</td><td width="25">6</td><td width="25">7</td><td width="25">8</td><td width="25">9</td></tr>';
echo '<tr>';
$m = 1;
$color=0;
for ($r = 11; $r < 100; $r++) { //81 rows
	if($r%10==0){
		$r++;
		if($color==1)
		{
			$color=0;
		}else{
			$color=1;
		}
	}
	echo '</tr>';
	echo '<tr>';
	echo '<td width="25">'.$r.'</td>';
	for($c = 1; $c < 10; $c++){
		if($color==1){
			echo'<td bgcolor="lightgrey" width="25">';
		}else{
			echo'<td bgcolor="white" width="25">';
		}
				if($boardHelper[$r][$c]==1){
				echo '@</td>';
				}else if($boardHelper[$r][$c]== (-1)){
					echo 'X</td>';
				}else{
						echo ' </td>';
				}
	}
}	
echo '</table>';
*/
for($count=0; $count<9; $count++){
switch($count)
{
    case 0:
       $tr=1;
       $tc=1;
       break;
    case 1:
       $tr=1;
       $tc=4;
       break;
    case 2:
       $tr=1;
       $tc=7;
       break;
    case 3:
       $tr=4;
       $tc=1;
       break;
    case 4:
       $tr=4;
       $tc=4;
       break;
    case 5:
       $tr=4;
       $tc=7;
       break;
    case 6:
       $tr=7;
       $tc=1;
       break;
    case 7:
       $tr=7;
       $tc=4;
       break;
    case 8:
       $tr=7;
       $tc=7;
       break;
    default :
       $tr=0;
       $tc=0;
}
echo "<br/>\n<br/>\n<br/>\n";
echo '<table align="center" border="1" cellpading="3">';
echo ' <tr> <td width="25">box '.($count+1).'</td><td width="25">1</td><td width="25">2</td><td width="25">3</td><td width="25">4</td><td width="25">5</td><td width="25">6</td><td width="25">7</td><td width="25">8</td><td width="25">9</td></tr>';
echo '<tr>';
    for($a=0; $a<3; $a++){
       for($b=0; $b<3; $b++){
       if(b==1){
          echo' <td width="25">'.rcToNum(($tr+$a),($tc+$b)).'</td>';
          }else{
          echo'</tr><tr> <td width="25">'.rcToNum(($tr+$a),($tc+$b)).'</td>';
          }
				    for($v=1; $v<10; $v++){
						if( $boardHelper[rcToNum(($tr+$a),($tc+$b))][$v] ==1){
						echo '<td width="25">@</td>';
						}else if($boardHelper[((($tr+$a)*10)+($tc+$b))][$v]== (-1)){
							echo '<td width="25">X</td>';
						 }else{
							   echo '<td width="25"> </td>';
						}
					}
			   	}
		 	}
			echo '</table>';
}
?>