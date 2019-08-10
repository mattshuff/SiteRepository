StopVar = 0

F2::
Loop
{
StopVar = 0
send {w down}w
Click
   sleep 2000
   send {w up}

If StopVar
break
}

F3::StopVar = 1
