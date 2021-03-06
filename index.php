<html>
<head>

<style>
	#reset_board {
		width: 320px;
	}

	#board {
		position:relative;
		top:0;
		left:0;
	}
	#options {
		position:absolute;
		top:0;
		right:0;
	}

	.tiles, .pawns {
		height:75px;
	}

	.tiles:hover, .pawns:hover {
		cursor: pointer;
		opacity: .5;
	}

	.selected_tile, .selected_pawn {
		opacity: .5;
	}

	.tiles.placed {
		position: relative;
		z-index:0;
	}

	.pawns.placed {
		position: absolute;
		z-index:1;
	}

</style>

</head>

<body>
	<form id="reset_board" action="" method="GET">
		<fieldset>
			<legend>Reset the board</legend>
			<input name="board_rows" id="board_rows" type="number" value="9" min="1" max="10">
			<input name="board_columns" id="board_columns" type="number" value="10" min="1" max="10">
			<select name="default_tile" id="default_tile" type="number" value="10" min="1" max="10">
			</select>
			<input id="board_submit" type="submit" value="Reset">
		</fieldset>
	</form>

	<div id="board_container"></div>
	<div id="options"></div>

</body>


<script src="js/board.js"></script>
</html>