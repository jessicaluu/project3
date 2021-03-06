var maxRandomMoveCommon = 3;
var maxRandomMoveRare = 5;
var maxRandomMoveLegendary = 50;
var maxColIndex = 3;
var maxRowIndex = 3;
var move = 0;
var startTime;
var endTime;
	function clickCell(obj) {
		//get the ObjectHTMLTableElement
		var table = obj.parentNode.parentNode;
				
		//get the row index and column index
		var rowIndex = obj.parentNode.rowIndex;
		var colIndex = obj.cellIndex;
				
		//check for right, left, top and bottom cell
		var rightColIndex = colIndex + 1;
		var leftColIndex = colIndex - 1;
				
		var topRowIndex = rowIndex - 1;
		var bottomRowIndex = rowIndex + 1;
				
		var rightCell, leftCell, topCell, bottomCell;
		// check if right cell exists
		if(colIndex < maxColIndex)
			rightCell = table.rows[rowIndex].cells[rightColIndex];
					
		if(colIndex > 0)
			leftCell = table.rows[rowIndex].cells[leftColIndex];
					
		if(rowIndex > 0)
			topCell = table.rows[topRowIndex].cells[colIndex];
				
		if(rowIndex < maxRowIndex)
			bottomCell = table.rows[bottomRowIndex].cells[colIndex];
				
		//there are condition where no right , left, top and botton cell exists
		//process further only if the cells are valid
				
		var moveable = false;
		var cellToSwap = null;
		if(rightCell && rightCell.attributes["class"].value == "empty") {	
			moveable = true;
			cellToSwap = rightCell;
		}
		else if(leftCell && leftCell.attributes["class"].value == "empty") {
			moveable = true;
			cellToSwap = leftCell;
			}
		else if(topCell && topCell.attributes["class"].value == "empty") {
			moveable = true;
			cellToSwap = topCell;
		}
		else if(bottomCell && bottomCell.attributes["class"].value == "empty") {
			moveable = true;
			cellToSwap = bottomCell;
		}
				
		if(moveable) {
			//swap the cells
			//count the move
			move++;
			document.getElementById("move").innerHTML= move;
					
			var temp = cellToSwap.attributes["class"].value;
			var tempHtml = cellToSwap.innerHTML;
					
			var className = obj.attributes["class"].value;
			className = className.replace(" highlightTile","");
					
			cellToSwap.attributes["class"].value = className;
			cellToSwap.innerHTML = obj.innerHTML;
							
			obj.attributes["class"].value = temp;
			obj.innerHTML = tempHtml;
		}
				
		if(won()) {
		 	var message = "Congratulations!!!";
			message = message+"\nYou finished with: "+move + " moves";
			var body = document.getElementsByTagName('body')[0];
			body.style.backgroundImage = "url('end.gif')" ;
			endTime = new Date();
			var timeDiff = endTime - startTime;	
			timeDiff = timeDiff/1000;
			var seconds = Math.round(timeDiff % 60);
			message = message+"\nYour best time (sec): "+seconds;
			alert(message);
			document.getElementById("time").innerHTML= "\n\nTotal elapsed time(sec): " +seconds;
			document.getElementById("time").style.visibility = "visible";
			table.attributes["disabled"] = "disabled";
		}
	}
					
	function won() {
		var table= document.getElementById("puzzleTable");
				
		//check the last cell
		var lastCellClass = table.rows[maxRowIndex].cells[maxColIndex].attributes["class"].value;
		if(lastCellClass != "empty")
			return false;
					
		//if last cell is empty then go ahead and check all the cells
		var num = 1;
		var allArranged = true;
		for(var i = 0; i<= maxRowIndex;i++) {
			for(var j =0;j <= maxColIndex ;j++) {
				if(i != maxRowIndex || j != maxColIndex) { 
					console.log("inner HTML = " + table.rows[i].cells[j].innerHTML);
					console.log("num = " + num);
					console.log("compare= " + table.rows[i].cells[j].innerHTML == num);
					if(table.rows[i].cells[j].innerHTML != num.toString()) {
						return false;
					}
				}
				num++;
			}
		}
		return true;
	}
			
	//get the empty cell of the table
	function getEmptyCell(table) {
		var emtpyCell;
		for(var i=0;i<table.rows.length;i++) {
			for(var j=0;j < table.rows[i].cells.length;j++) {
				if(table.rows[i].cells[j].attributes["class"].value=="empty") {
					emptyCell = table.rows[i].cells[j];
					break;
				}
			}
		}
		return emptyCell;
	}
			
	//setup random move
	function getRandomMove(array) {
		var rand = array[Math.floor(Math.random() * array.length)];
		return rand;
	}
			
	function shuffle_common(){
		start();
		move = 0;
		var table = document.getElementById("puzzleTable");
		for(var count = 0;count < maxRandomMoveCommon; count++) {
			var emptyCell = getEmptyCell(table);
				
			var emptyColIndex = emptyCell.cellIndex;
			var emptyRowIndex = emptyCell.parentNode.rowIndex;
					
			var validMoves = [];
					
			var rightColIndex = emptyColIndex + 1;
			var leftColIndex = emptyColIndex - 1;
					
			var topRowIndex = emptyRowIndex - 1;
			var bottomRowIndex = emptyRowIndex + 1;
			
			var rightCell, leftCell, topCell, bottomCell;

			if(emptyColIndex < maxColIndex)
				validMoves.push(1);
						
			if(emptyColIndex > 0)
				validMoves.push(3)
						
			if(emptyRowIndex > 0)
				validMoves.push(0)
					
			if(emptyRowIndex < maxRowIndex)
				validMoves.push(2);
					
			var randomMove = getRandomMove(validMoves);
			console.log(randomMove);

			var cellToMove ;
			if(randomMove == 0)
				cellToMove = table.rows[topRowIndex].cells[emptyColIndex];
			else if(randomMove == 1 )
				cellToMove = table.rows[emptyRowIndex].cells[rightColIndex];
			else if(randomMove == 2)
				cellToMove = table.rows[bottomRowIndex].cells[emptyColIndex];
			else if(randomMove == 3)
				cellToMove = table.rows[emptyRowIndex].cells[leftColIndex];
								
			var temp = emptyCell.attributes["class"].value;
			var tempHtml = emptyCell.innerHTML;
			emptyCell.attributes["class"].value = cellToMove.attributes["class"].value;
			emptyCell.innerHTML = cellToMove.innerHTML;
			
			cellToMove.attributes["class"].value = temp;
			cellToMove.innerHTML = tempHtml;
		}		
	}
			
	function shuffle_rare(){
		start();
		move = 0;
		var table = document.getElementById("puzzleTable");
		for(var count = 0;count < maxRandomMoveRare; count++) {
			var emptyCell = getEmptyCell(table);
			
			var emptyColIndex = emptyCell.cellIndex;
			var emptyRowIndex = emptyCell.parentNode.rowIndex;
					
			var validMoves = [];
					
			var rightColIndex = emptyColIndex + 1;
			var leftColIndex = emptyColIndex - 1;
					
			var topRowIndex = emptyRowIndex - 1;
			var bottomRowIndex = emptyRowIndex + 1;
					
			var rightCell, leftCell, topCell, bottomCell;

			if(emptyColIndex < maxColIndex)
				validMoves.push(1);

			if(emptyColIndex > 0)
				validMoves.push(3)
					
			if(emptyRowIndex > 0)
				validMoves.push(0)
					
			if(emptyRowIndex < maxRowIndex)
				validMoves.push(2);
					
			var randomMove = getRandomMove(validMoves);
			console.log(randomMove);

			var cellToMove ;
			if(randomMove == 0)
				cellToMove = table.rows[topRowIndex].cells[emptyColIndex];
			else if(randomMove == 1 )
				cellToMove = table.rows[emptyRowIndex].cells[rightColIndex];
			else if(randomMove == 2)
				cellToMove = table.rows[bottomRowIndex].cells[emptyColIndex];
			else if(randomMove == 3)
				cellToMove = table.rows[emptyRowIndex].cells[leftColIndex];
								
			var temp = emptyCell.attributes["class"].value;
			var tempHtml = emptyCell.innerHTML;
			emptyCell.attributes["class"].value = cellToMove.attributes["class"].value;
			emptyCell.innerHTML = cellToMove.innerHTML;
				
			cellToMove.attributes["class"].value = temp;
			cellToMove.innerHTML = tempHtml;
		}		
	}
			
	function shuffle_legendary(){
		start();
		move = 0;
		var table = document.getElementById("puzzleTable");
		for(var count = 0;count < maxRandomMoveLegendary; count++) {
			var emptyCell = getEmptyCell(table);
					
			var emptyColIndex = emptyCell.cellIndex;
			var emptyRowIndex = emptyCell.parentNode.rowIndex;
					
			var validMoves = [];
					
			var rightColIndex = emptyColIndex + 1;
			var leftColIndex = emptyColIndex - 1;
					
			var topRowIndex = emptyRowIndex - 1;
			var bottomRowIndex = emptyRowIndex + 1;
					
			var rightCell, leftCell, topCell, bottomCell;
			
			if(emptyColIndex < maxColIndex)
				validMoves.push(1);
						
			if(emptyColIndex > 0)
				validMoves.push(3)
						
			if(emptyRowIndex > 0)
				validMoves.push(0)
				
			if(emptyRowIndex < maxRowIndex)
				validMoves.push(2);
					
			var randomMove = getRandomMove(validMoves);
			console.log(randomMove);
			
			var cellToMove ;
			if(randomMove == 0)
				cellToMove = table.rows[topRowIndex].cells[emptyColIndex];
			else if(randomMove == 1 )
				cellToMove = table.rows[emptyRowIndex].cells[rightColIndex];
			else if(randomMove == 2)
				cellToMove = table.rows[bottomRowIndex].cells[emptyColIndex];
			else if(randomMove == 3)
				cellToMove = table.rows[emptyRowIndex].cells[leftColIndex];
								
			var temp = emptyCell.attributes["class"].value;
			var tempHtml = emptyCell.innerHTML;
			emptyCell.attributes["class"].value = cellToMove.attributes["class"].value;
			emptyCell.innerHTML = cellToMove.innerHTML;
			
			cellToMove.attributes["class"].value = temp;
			cellToMove.innerHTML = tempHtml;
		}		
	}
			
	function chgbg(){
		var option = document.getElementById("bg");
		var val = option.options[option.selectedIndex].value;
		var body = document.getElementsByTagName('body')[0];
		if(val==0){
			window.location.href = "fifteen.html";
		} 
		else if(val==1){
			window.location.href = "fifteen2.html";
		}
		else if(val=2){
			window.location.href = "fifteen3.html";
		}
	}
			
	function start(){
		document.getElementById("move").innerHTML= "0";
		startTime = new Date();
	}
 