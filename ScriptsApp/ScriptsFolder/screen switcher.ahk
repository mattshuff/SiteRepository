x = 0

Loop 
{
	XButton2::

	if (x = 0) {
		SendInput {LWin down}
			SendInput {Ctrl down}
			SendInput {Right down}

	sleep 100
		SendInput {LWin up}
			SendInput {Ctrl up}
			SendInput {Right up}
			
			x++
			return
			}
			
	if (x > 0) {
		SendInput {LWin down}
			SendInput {Ctrl down}
			SendInput {Left down}

	sleep 100
		SendInput {LWin up}
			SendInput {Ctrl up}
			SendInput {Left up}
			
			x = 0
			return
		}
		}
		return
		
	
		
		
		
		
		
		
	
