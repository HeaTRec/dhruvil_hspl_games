(function($) {
	"use strict";

	var board = $('.board'),
		shuffleButton = $('.shuffle-btn'),
		solveButton = $('.solve-btn'),
		highscoreButton = $('.highscore-btn'),
		selectGrid = $('.select-grid'),
		timer = $('.timer'),
		highscore = $('.highscore'),
		highscoreTitle = highscore.find('.highscore-title'),
		highscoreGame = highscoreTitle.find('span'),
		highscoreTable = highscore.find('table'),
		// grid
		// change the grid dimension
		minGridSize = 3,
		maxGridSize = 10,
		// change the initial grid size
		gridWidth = 3,
		gridHeight = 3,
		// shuffle
		minShuffleIterations = 100,
		maxShuffleIterations = 10000,
		maxShuffleTime = 100, // miliseconds
		// time
		startTime,
		playTime,
		timerInterval,
		// highscore
		numScoresShowed = 10,
		highscoreShowed = true,
		maxSavedScores = 100,
		// utils
		cells,
		emptyCellObj,
		lastGridClass,
		playing = false,
		// classes
		playingClass = 'playing',
		cellEmptyClass = 'hidden',
		cellActiveClass = 'active',
		highscoreCurrentClass = 'current',
		// templates
		optionTmpl = '<option value="{COL}x{ROW}"{SELECTED}>{COL}x{ROW}</option>',
		cellTmpl = '<div class="cell {CELL_CLASS}"><div><span>{NUM}</span></div></div>',
		boardHGridClassTmpl = 'board-h{SIZE}',
		boardVGridClassTmpl = 'board-v{SIZE}',
		cellClassTmpl = 'cell-{COL}-{ROW}',
		highscoreRowTmpl = '<tr class="{CLASS}"><td>{NUM}</td><td>{TIME}</td></tr>';

	// utils
	function zeroPad(str, num, zeroChar) {
		if (zeroChar === undefined || !zeroChar.length) {
			zeroChar = '0';
		}
		var result = String(str),
			len = result.length;
		for (var i = 0; i < num - len; i++) {
			result = zeroChar + result;
		}
		return result;
	}

	function tmpl(tmpl, props) {
		for (var i = 0, keys = Object.keys(props), len = keys.length; i < len; i++) {
			tmpl = (tmpl || '').replace(new RegExp('{' + keys[i].toUpperCase() + '}', 'g'), props[keys[i]]);
		}
		return tmpl;
	}

	// local storage
	function localStorageSupported() {
		try {
			var supported = 'localStorage' in window && window.localStorage !== null;
			if (!supported) {
				alert('localStorage not supported');
			}
			return supported;
		} catch (e) {
			alert('localStorage not supported');
			return false;
		}
	}

	function setLocalData(prop, value) {
		//$log('setLocalData prop=' + prop);
		if (localStorageSupported()) {
			if (typeof(value) === 'object') {
				value = JSON.stringify(value);
			}
			localStorage[prop] = value;
		}
	}

	function getLocalData(prop) {
		var value = null;
		try {
			if (localStorageSupported()) {
				value = localStorage[prop];
				try {
					value = JSON.parse(value);
				} catch (err) {}
			}
		} catch (err) {
			$log('getLocalData prop=' + prop + ' ' + err);
		}
		return value;
	}

	function removeLocalData(prop) {
		if (localStorageSupported()) {
			delete localStorage[prop];
		}
	}

	// timer
	function updateTimer() {
		playTime = new Date().getTime() - startTime || 0;
		var msecs = playTime % 1000,
			secs = (playTime - msecs) / 1000 % 60,
			mins = Math.floor((playTime - msecs) / 1000 / 60);
		if (mins > 99) {
			secs = mins = 99;
			msecs = 999;
		}
		timer.text(zeroPad(mins, 2) + ':' + zeroPad(secs, 2) + ':' + Math.floor(msecs / 100));
	}
	
	function startTimer() {
		//console.log('startTimer');
		timer.addClass(playingClass);
		startTime = new Date().getTime();
		timerInterval = setInterval(updateTimer, 20);
	}

	function stopTimer() {
		//console.log('stopTimer');
		clearInterval(timerInterval);
		updateTimer();
		timer.removeClass(playingClass);
	}

	function resetTimer() {
		clearInterval(timerInterval);
		startTime = new Date().getTime();
		updateTimer();
	}

	// highscore
	function showHighscore(game, scores, position) {
		highscoreShowed = true;
		highscore.show();
	}

	function hideHighscore() {
		highscoreShowed = false;
		highscore.hide();
	}
	
	function addHighscoreTableRow(position, time, cls) {
		var msecs = time % 1000,
			secs = (time - msecs) / 1000 % 60,
			mins = Math.floor((time - msecs) / 1000 / 60);
		if (mins > 99) {
			secs = mins = 99;
			msecs = 999;
		}
		highscoreTable.append($(tmpl(highscoreRowTmpl, {
			num: (position + 1) + (position + 1 == maxSavedScores ? '+' : ''),
			time: zeroPad(mins, 2) + ':' + zeroPad(secs, 2) + ':' + zeroPad(msecs, 3),
			'class': cls || ''
		})));
	}

	function updateHighscore(game, scores, position) {
		if (!game) {
			game = gridWidth + 'x' + gridHeight;
			scores = getLocalData(game) || [];
		}
		highscoreGame.text(game);
		highscoreTable.empty();
		var isTopScored = position !== undefined && position < numScoresShowed;
		for (var i = 0, len = Math.min(scores.length, numScoresShowed - (position === undefined || isTopScored ? 0 : 1)); i < len; i++) {
			addHighscoreTableRow(i, scores[i].time, i == position ? highscoreCurrentClass : '');
		}
		if (position !== undefined && !isTopScored) {
			addHighscoreTableRow(position, scores[position].time, highscoreCurrentClass);
		}
	}
	
	function saveScore() {
		stopTimer();
		var game = gridWidth + 'x' + gridHeight,
			score = {
				time: playTime
			},
			scores = getLocalData(game);
		if (!scores) {
			scores = [];
		}
		if (scores.length >= maxSavedScores) {
			scores = scores.slice(0, maxSavedScores - 1);
		}
		scores.push(score);
		scores.sort(function(a, b) {
			return Number(a.time) - Number(b.time);
		});
		setLocalData(game, scores);
		updateHighscore(game, scores, scores.indexOf(score));
		showHighscore();
	}
	
	// board and grid related
	function getCol(num) {
		return num % gridWidth;
	}

	function getRow(num) {
		return Math.floor(num / gridWidth);
	}

	function getCellObj(row, col) {
		return cells[row][col];
	}

	function setCellObj(row, col, cellObj) {
		cells[row][col] = cellObj;
	}

	function isSolved() {
		// check the cells comparint their initial and current positions
		for (var row = 0, col, cellObj; row < gridHeight; row++) {
			for (col = 0; col < gridWidth; col++) {
				cellObj = getCellObj(row, col);
				if (cellObj.col != cellObj.initCol || cellObj.row != cellObj.initRow) {
					return false;
				}
			}
		}
		return true;
	}

	function updateCellsView() {
		for (var row = 0, col, cellObj; row < gridHeight; row++) {
			for (col = 0; col < gridWidth; col++) {
				cellObj = getCellObj(row, col);
				if (cellObj != emptyCellObj) {
					cellObj.cell.toggleClass(cellActiveClass, playing && (col == emptyCellObj.col || row == emptyCellObj.row));
				}
			}
		}
	}

	function updateCellsPosition(reset) {
		for (var row = 0, col, cellObj; row < gridHeight; row++) {
			for (col = 0; col < gridWidth; col++) {
				cellObj = getCellObj(row, col);
				cellObj.cell.removeClass(cellObj.cellClass);
				cellObj.cellClass = tmpl(cellClassTmpl, reset ? {
					col: cellObj.initCol,
					row: cellObj.initRow
				} : {
					col: col,
					row: row
				});
				cellObj.cell.addClass(cellObj.cellClass);
			}
		}
		updateCellsView();
	}

	function shuffleCells() {
		//console.time('shuffleCells');
		for (var time = new Date().getTime(), count = 0, index; count < minShuffleIterations || (count < maxShuffleIterations && new Date().getTime() - time < maxShuffleTime); count++) {
			// move horizontaly
			if (Math.random() > 0.5) {
				// new position of the emptyCellObj
				index = Math.round(Math.random() * (gridWidth - 2));
				// if it is the same position move it to the right
				if (index == emptyCellObj.col) {
					index++;
				}
				// change the position of the emptyCellObj
				cells[emptyCellObj.row].splice(index, 0, cells[emptyCellObj.row].splice(emptyCellObj.col, 1)[0]);
				// update the col of the cells
				for (var col = 0; col < gridWidth; col++) {
					cells[emptyCellObj.row][col].col = col;
				}
				// move vericaly
			} else {
				// create array with the cells from the emptyCellObj column
				var colCells = [];
				for (var row = 0; row < gridHeight; row++) {
					colCells[row] = cells[row][emptyCellObj.col];
				}
				// new position of the emptyCellObj
				index = Math.round(Math.random() * (gridHeight - 2));
				// if it is the same position move it down
				if (index == emptyCellObj.row) {
					index++;
				}
				// change the position of the emptyCellObj
				colCells.splice(index, 0, colCells.splice(emptyCellObj.row, 1)[0]);
				// add the cells to their rows
				for (row = 0; row < gridHeight; row++) {
					colCells[row].row = row;
					cells[row][emptyCellObj.col] = colCells[row];
				}
			}
		}
		//console.timeEnd('shuffleCells');
		//console.log('itarations: ' + count);
		updateCellsPosition();
	}

	function newGame() {
		//console.log('newGame');{
		// stop the timer
		if (playing) {
			resetTimer();
		}
		// change status
		playing = true;
		// update the board
		board.addClass(playingClass);
		// hide the last cell
		emptyCellObj.cell.addClass(cellEmptyClass);
		// shuffle the cells
		shuffleCells();
		// start the timer
		startTimer();
	}

	function endGame() {
		// change status
		playing = false;
		// stop the timer
		stopTimer();
		// update the board
		board.removeClass(playingClass);
		// show the last cell
		if (emptyCellObj) {
			emptyCellObj.cell.removeClass(cellEmptyClass);
		}
	}

	function resetCells() {
		var cellsReset = [],
			row,
			col,
			cellObj;
		for (row = 0; row < gridHeight; row++) {
			cellsReset[row] = [];
		}
		for (row = 0; row < gridHeight; row++) {
			for (col = 0; col < gridWidth; col++) {
				cellObj = getCellObj(row, col);
				cellObj.col = cellObj.initCol;
				cellObj.row = cellObj.initRow;
				cellsReset[cellObj.initRow][cellObj.initCol] = cellObj;
			}
		}
		cells = cellsReset;
		updateCellsPosition(true);
	}

	function resetGame() {
		endGame();
		resetTimer();
		resetCells();
	}

	function moveCell(cellObj, to) {
		// update cell position at the grid
		setCellObj(to.row, to.col, cellObj);
		// save the new row and col
		cellObj.col = to.col;
		cellObj.row = to.row;
		// update cell class
		cellObj.cell.removeClass(cellObj.cellClass);
		cellObj.cellClass = tmpl(cellClassTmpl, {
			col: cellObj.col,
			row: cellObj.row
		});
		cellObj.cell.addClass(cellObj.cellClass);
	}

	function onBoardClick(e) {
		if (!playing) {
			// start the game
			newGame();
		}
	}

	function onCellsMove() {
		updateCellsView();
		// check if the puzzle is solved
		if (isSolved()) {
			saveScore();
			// end the game
			endGame();
		}
	}
	
	function onCellClick(e, cellObj) {
		if (playing) {
			// do not allow the event to be fired for the board
			e.stopPropagation();
			// current cell col
			var cellCol = cellObj.col,
				// current cell row
				cellRow = cellObj.row,
				// the direction
				sign;
			// not empty cell but same row or col
			if (
				!(cellCol == emptyCellObj.col && cellRow == emptyCellObj.row) &&
				(cellCol == emptyCellObj.col || cellRow == emptyCellObj.row)
			) {
				// on the same column
				if (cellCol == emptyCellObj.col) {
					// move the cells
					sign = cellRow < emptyCellObj.row ? -1 : 1;
					var row = emptyCellObj.row;
					do {
						row += sign;
						moveCell(getCellObj(row, cellCol), {
							row: row - sign,
							col: cellCol
						});
					} while (row != cellRow);
					moveCell(emptyCellObj, {
						row: cellRow,
						col: cellCol
					});
					// on the same row
				} else if (cellRow == emptyCellObj.row) {
					// move the cells
					sign = cellCol < emptyCellObj.col ? -1 : 1;
					var col = emptyCellObj.col;
					do {
						col += sign;
						moveCell(getCellObj(cellRow, col), {
							row: cellRow,
							col: col - sign
						});
					} while (col != cellCol);
					moveCell(emptyCellObj, {
						row: cellRow,
						col: cellCol
					});
				}
				onCellsMove();
			}
		}
	}
	
	function getCellClickEvent(cellObj) {
		return function(e) {
			onCellClick(e, cellObj);
		};
	}
	
	function updateBoard() {
		// remove old cells
		board.empty();
			// reset cells array
		cells = [];
		// create the cells
		for (var row = 0, col, cell, cellObj, cellClass; row < gridHeight; row++) {
			cells[row] = [];
			for (col = 0; col < gridWidth; col++) {
				cellClass = tmpl(cellClassTmpl, {
					col: col,
					row: row
				});
				cell = $(tmpl(cellTmpl, {
					cell_class: cellClass,
					num: row * gridWidth + col + 1
				}))
					// add cell to the board
					.appendTo(board);
				// add the cell to the array
				cells[row][col] = cellObj = {
					cell: cell,
					cellClass: cellClass,
					col: col,
					row: row,
					initCol: col,
					initRow: row
				};
				// bind cell object to the cell element
				//cell.data('cellObj', cellObj);
				// add click event
				cell.on('click', getCellClickEvent(cellObj));
			}
		}
		// save the last cell
		emptyCellObj = cellObj;
	}

	function updateGrid() {
		var grid = selectGrid.val();
		if (grid.length) {
			grid = grid.split('x');
			gridWidth = Number(grid[0]);
			gridHeight = Number(grid[1]);
			if (lastGridClass) {
				board.removeClass(lastGridClass);
			}
			lastGridClass = tmpl(boardHGridClassTmpl, {
				size: gridWidth
			}) + ' ' + tmpl(boardVGridClassTmpl, {
				size: gridHeight
			});
			board.addClass(lastGridClass);
			updateBoard();
		}
	}

	// INIT

	// set actions
	shuffleButton.on('click', newGame);

	solveButton.on('click', function() {
		if (playing) {
			resetGame();
		}
	});

	highscoreButton.on('click', function() {
		if (highscoreShowed) {
			hideHighscore();
		} else {
			showHighscore();
		}
	});

	selectGrid.on('change', function() {
		endGame();
		resetTimer();
		updateGrid();
		if (highscoreShowed) {
			updateHighscore();
		}
	});

	board.on('click', onBoardClick);

	// add grid options
	for (var col = minGridSize; col <= maxGridSize; col++) {
		for (var row = minGridSize; row <= maxGridSize; row++) {
			selectGrid.append($(tmpl(optionTmpl, {
				col: col,
				row: row,
				selected: col == gridWidth && row == gridHeight ? ' selected="selected"' : ''
			})));
		}
	}
	selectGrid.trigger('change');

	// arrows
	$(document).on('keydown', function(e) {
		if (playing) {
			e.preventDefault();
			var moveCellObj;
			switch (e.which) {
				case 37: // left
					if (emptyCellObj.col < gridWidth - 1) {
						moveCellObj = getCellObj(emptyCellObj.row, emptyCellObj.col + 1);
					}
					break;
				case 38: // up
					if (emptyCellObj.row < gridHeight - 1) {
						moveCellObj = getCellObj(emptyCellObj.row + 1, emptyCellObj.col);
					}
					break;
				case 39: // right
					if (emptyCellObj.col > 0) {
						moveCellObj = getCellObj(emptyCellObj.row, emptyCellObj.col - 1);
					}
					break;
				case 40: // down
					if (emptyCellObj.row > 0) {
						moveCellObj = getCellObj(emptyCellObj.row - 1, emptyCellObj.col);
					}
					break;
			}
			if (moveCellObj) {
				var newEmptyCellPos = {
					col: moveCellObj.col,
					row: moveCellObj.row
				};
				// update cells position
				moveCell(moveCellObj, {
					col: emptyCellObj.col,
					row: emptyCellObj.row
				});
				moveCell(emptyCellObj, newEmptyCellPos);
				onCellsMove();
			}
		}
	});

	updateHighscore();
	if (highscoreShowed) {
		showHighscore();
	} else {
		hideHighscore();
	}
	
})(jQuery);