function is_type_of_file(type_of_file, value, index, array) {
	if (value.substr(2,value.length) == type_of_file) {
		return true;
	}
	else {
		return false;
	}
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function concat_first_n_lines(array_of_lines, number_of_lines) {
  var lines_concatenated = "";
  if (array_of_lines.length > number_of_lines) {
  	for (var i = 0; i < number_of_lines; i++){
  		lines_concatenated = lines_concatenated + array_of_lines[i] + "\n";
  	}
  }
  else {
  	for (var i = 0; i < array_of_lines.length; i++){
  		lines_concatenated = lines_concatenated + array_of_lines[i] + "\n";
  	}
  }
  return lines_concatenated;
}


function concat_last_n_lines(array_of_lines, number_of_lines) {
  var lines_concatenated = "";

 //filter array
  if (array_of_lines.length > number_of_lines) {
  	for (var i = array_of_lines.length - number_of_lines - 1; i < array_of_lines.length; i++){
  		lines_concatenated = lines_concatenated + array_of_lines[i] + "\n";
  	}
  }
  else {
  	for (var i = 0; i < array_of_lines.length; i++){
  		lines_concatenated = lines_concatenated + array_of_lines[i] + "\n";
  	}
  }
  return lines_concatenated;
}

function link_rooms(parentRoom, childRoom){
	parentRoom.addChild(childRoom);
	childRoom.addParent(parentRoom);
}
