1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
220
221
222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
240
241
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
    if(($x+1)%9==0)
    {
    echo '<td>'.$board[$x].'</td>';
    echo '</tr>'; 
    }else{
        echo '<td>'.$board[$x].'</td>';
    }
}
echo '</table>';
echo '<table border="1" cellpading="1">';
echo '<tr>';
$boardHelper[0][0]=0;
for ($x = 11; $x < 100; $x++) {
    if($x%10==0){
        $x++;
    echo '</tr>';
    echo '<tr>';
    }
     
    if(($newBoard[$x]>0)&&($newBoard[$x]<10)){
        $num=$newBoard[$x];
        $row=substr($x,0,1);
        $col=substr($x,1,1);
        //$row=2;
        //$col=3;
        //echo 'r' .$r. 'c'.$c;
        //$boardHelper=markOffCell($r,$c,$newBoard[$x],$boardHelper);
        $rc=($row*10)+$col; 
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
                if($boardHelper[($row*10)+$rowX][$num]!=1){
                    $boardHelper[($row*10)+$rowX][$num]= -1;
                    //echo"clear row of [".$num."] row:".$row." col:".$col." array:".(($row*10)+$rowX)."<br/>\n";
                }
            }
        }
        // clear column of the number 
        for($colX=0; $colX<10; $colX++){ 
            if((((($colX)*10)+$col)!==$rc)&&(((($colX)*10)+$col)>10)){
                if($boardHelper[((($colX)*10)+$col)][$num]!=1){
                    $boardHelper[((($colX)*10)+$col)][$num]=-1;
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
                if((((($row-$topR)+$spotR)*10)+(($col-$topC)+$spotC))!==$rc){
                if($boardHelper[(((($row-$topR)+$spotR)*10)+(($col-$topC)+$spotC))][$num]!==-1){
                    $boardHelper[(((($row-$topR)+$spotR)*10)+(($col-$topC)+$spotC))][$num]=-1;
                //  echo"clear box of [".$num."] row:".$row." col:".$col." topR:".$topR." topC:".$topC." spotR".$spotR." spotC".$spotC." array:".(((($row-$topR)+$spotR)*10)+(($col-$topC)+$spotC))."<br/>\n";
                }
                 
            }
            }
        }
    }
     
        //echo '<td>'.$newBoard[$x].'</td>';
     
}
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
 
 
 echo ' rcToNum row1 col2'.rcToNum(1,2). '<br/>\n';
 
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
          echo' <td width="25">'.((($tr+$a)*10)+($tc+$b)).'</td>';
          }else{
          echo'</tr><tr> <td width="25">'.((($tr+$a)*10)+($tc+$b)).'</td>';
          }
                    for($v=1; $v<10; $v++){
                        if( $boardHelper[((($tr+$a)*10)+($tc+$b))][$v] ==1){
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
