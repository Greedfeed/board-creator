
var tiles = ['concrete', 'water', 'grass', 'rock'];
var pawns = ['circle', 'square']

create_board(9, 10);

document.getElementById('board_submit').onclick = function() {
	event.preventDefault();

	create_board(document.getElementById('board_rows').value, document.getElementById('board_columns').value, document.getElementById('default_tile').value);
}


/**
	creates the board based on the tile set
*/
function create_board(rows, columns, default_tile) {
	default_tile = typeof default_tile !== 'undefined' ? default_tile : tiles[0];


	var board_html = '<div id="board">';

	for (var i=0; i < rows; i++) {
		board_html += '<div id="row_'+i+'" class="row">';

		for (var j=0; j < columns; j++) {
			board_html += '<span id="contents_'+i+'_'+j+'">';
				board_html += '<img id="tile_'+i+'_'+j+'" class="tiles placed '+default_tile+'" src="img/tile_set/'+default_tile+'_tile.png" onclick="select_tile('+i+','+j+');"/>';
			board_html += '</span>';

		}
		board_html += '</div>';
	}
	board_html += '</div>';

	var options_html = '';
	for(var i = 0; i < tiles.length; i++) {
		options_html += '<option value="'+tiles[i]+'">'+tiles[i]+'</option>';
	}

	document.getElementById('default_tile').innerHTML = options_html;
	document.getElementById('board_container').innerHTML = board_html;
}

/**
	Selects a tile and creates the option board for that selected tile
*/
function select_tile(row, column) {
	tiles_class = document.getElementsByClassName('tiles');
	for (var i = 0; i < tiles_class.length; i++ ) {
		tiles_class[i].className = tiles_class[i].className.replace(/\bselected_tile\b/,'');
	}

	selected_tile = document.getElementById('tile_'+row+'_'+column);
	selected_tile.className = selected_tile.className + ' selected_tile';

	var options_html = '<p>Select from a pawn below:</p>';
	for(var i = 0; i < pawns.length; i++) {
		options_html += '<img id="pawn_'+pawns[i]+'" class="pawns '+pawns[i]+'" src="img/pawn_set/'+pawns[i]+'_pawn.png" onclick="place_piece('+row+','+column+', \'pawn\','+i+')"/>';
	}

	options_html += '<p>Select from a tile below:</p>';
	for(var i = 0; i < tiles.length; i++) {
		options_html += '<img id="tile_'+tiles[i]+'" class="tiles '+tiles[i]+'" src="img/tile_set/'+tiles[i]+'_tile.png" onclick="place_piece('+row+','+column+', \'tile\', '+i+')"/>';
	}
	options_html += '<p><a href="javascript:void(0);" onclick="reset_tile('+row+','+column+');">Reset selected tile</a></p>';


	options_area = document.getElementById('options');
	options_area.innerHTML = options_html;
}


/**
	Replaces the currently selected tile with the new selection
*/
function place_piece(row, column, piece_type, piece_selected) {
	if(piece_type == 'pawn') {
		old_pawn = document.getElementById('pawn_'+row+'_'+column);
		if (old_pawn !== null) {
			old_pawn.parentNode.removeChild(old_pawn);
		}

		new_piece = '<img id="pawn_'+row+'_'+column+'" class="pawns placed '+pawns[piece_selected]+'" src="img/pawn_set/'+pawns[piece_selected]+'_pawn.png" onclick="select_tile('+row+','+column+');"/>';
		document.getElementById('contents_'+row+'_'+column).innerHTML = new_piece + document.getElementById('contents_'+row+'_'+column).innerHTML;
		
		tiles_class = document.getElementsByClassName('tiles');
		for (var i = 0; i < tiles_class.length; i++ ) {
			tiles_class[i].className = tiles_class[i].className.replace(/\bselected_tile\b/,'');
		}
	}
	else {
		old_tile = document.getElementById('tile_'+row+'_'+column);
		old_tile.parentNode.removeChild(old_tile);

		new_piece = '<img id="tile_'+row+'_'+column+'" class="tiles placed '+tiles[piece_selected]+'" src="img/tile_set/'+tiles[piece_selected]+'_tile.png" onclick="select_tile('+row+','+column+');"/>';		
		document.getElementById('contents_'+row+'_'+column).innerHTML = document.getElementById('contents_'+row+'_'+column).innerHTML + new_piece;
	}

	options_area = document.getElementById('options');

	while (options_area.firstChild) {
		options_area.removeChild(options_area.firstChild);
	}
}


/**
	clear out a tile and pawn from a space on the board
*/
function reset_tile(row, column) {
	selected_tile = document.getElementById('contents_'+row+'_'+column);
	new_tile = '<img id="tile_'+row+'_'+column+'" class="tiles placed concrete" src="img/tile_set/concrete_tile.png" onclick="select_tile('+row+','+column+');"/>';
	selected_tile.innerHTML = new_tile;
}