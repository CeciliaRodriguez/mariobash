
function GameState(){
	this.currentRoom = mario; 
	this.params = {};
};

GameState.prototype.getCurrentRoom = function() {
	//by default the new room is just the current room
	return this.currentRoom;
};

GameState.prototype.setCurrentRoom = function(newRoom){
	this.currentRoom=newRoom;
};

GameState.prototype.getState = function(){
	var param_string = "";
	for (var key in this.params){
		if (this.params.hasOwnProperty(key)){
			param_string += key + ":" + this.params[key] + "=";
		}
	}
	return this.currentRoom.toString() + "=" + param_string;
};


GameState.prototype.validate_route = function(absolute_route,parent){
	var directories = absolute_route.split("/");
	if (absolute_route.charAt(0) === "/") {
		directories[0] = root;
	}
	for (index = 0, len = directories.length - 1; index < len; ++index) {
    	directory = eval(directories[index]);
    	if ((directory.getChildFromName(directories[index+1])) === -1) {
    		return false;
    	};
	}
	if (directories.length === 1) {
		if (parent.getChildFromName(absolute_route) === -1){
			return false;
		}
		else {
			return eval(absolute_route);
		}
	}
	else {
		return eval(directories[index]);
	}	
};

GameState.prototype.create_new_room = function(name_room,parent){
	var new_room = new Room(name_room);	
	link_rooms(parent, new_room);
	window[name_room] = new_room;
  //eval("window." + name_room + " = " + new_room + ";");	
};

GameState.prototype.change_prompt = function(term){
	var current_path = "/" + this.getCurrentRoom().parents.toString().replaceAll(",", "/") + "/" + this.getCurrentRoom().room_name;
                                    
    switch(current_path) {
        case "/home/mario":
            term.set_prompt("mario@utnso:~$ ");
            break;
        case "///home":
            term.set_prompt("mario@utnso:/home$ ");
            break;
        case "///":
            term.set_prompt("mario@utnso:/$ ");
            break;
        default:
            current_path = current_path.replace("/mario","");
            term.set_prompt("mario@utnso:~" + current_path + "$ ");
            break;
    }                                    
}

GameState.prototype.validate_file = function(absolute_route, parent){
	var directories = absolute_route.split("/");
	if (absolute_route.charAt(0) === "/") {
		directories[0] = root;
	}
	if (directories.length === 1) {
		if (parent.getItemFromName(absolute_route) === -1){
			return false;
		}
		else {
			return parent.getItemFromName(absolute_route);
		}
	}
	else {
		for (index = 0, len = directories.length - 1; index < len; ++index) {
	    	directory = eval(directories[index]);
	    	if ((directory.getChildFromName(directories[index+1])) === -1) {
	    		return false;
	    	};
		}
		if ((directories[index-1].getItemFromName(directories[index])) === -1){
			return false;
		}
		else {
			return eval(directories[index]);
		}

	}
	
};


GameState.prototype.is_end_of_world = function(world) {
	switch (world.room_name){
		case "mundo_nube":
			if ((isInArray("estrellas", world.childrenStringArray()))
				&&
				(isInArray("1.estrella",world.children[world.childrenStringArray().indexOf("estrellas")].itemStringArray()))
				&&
				(isInArray("2.estrella",world.children[world.childrenStringArray().indexOf("estrellas")].itemStringArray()))
				&&
				(isInArray("3.estrella",world.children[world.childrenStringArray().indexOf("estrellas")].itemStringArray()))
				&&
				(isInArray("cofre", world.childrenStringArray()))
				&&
				(isInArray("1.moneda",world.children[world.childrenStringArray().indexOf("cofre")].itemStringArray()))
				&&
				(isInArray("2.moneda",world.children[world.childrenStringArray().indexOf("cofre")].itemStringArray()))
				)
			return true;
			break;
		case "mundo_hongo":
			if (
				(isInArray("mensaje.txt", yoshi.itemStringArray()))
				&&
				(isInArray("mensaje.txt",  donkey_kong.itemStringArray()))
				&&
				(isInArray("vidas", world.childrenStringArray()))
				&&
				(isInArray("mensaje.txt", world.itemStringArray()))
				&&
				(isInArray("1.hongo_verde",world.children[world.childrenStringArray().indexOf("vidas")].itemStringArray()))
				&&
				(isInArray("2.hongo_verde",world.children[world.childrenStringArray().indexOf("vidas")].itemStringArray()))
				&&
				(isInArray("3.hongo_verde",world.children[world.childrenStringArray().indexOf("vidas")].itemStringArray()))
				&&
				!((isInArray("1.hongo_marron", world.itemStringArray())))
				&&
				!((isInArray("2.hongo_marron", world.itemStringArray())))
				&&
				!((isInArray("1.hongo_verde", world.itemStringArray())))
				&&
				!((isInArray("2.hongo_verde", world.itemStringArray())))
				&&
				!((isInArray("3.hongo_verde", world.itemStringArray())))
				)
			return true;
			break;
	}

}

GameState.prototype.update = function(name_prop, val){
	this.params[name_prop] = val;
};



GameState.prototype.applyState = function(param_name, replay){
	var re = (typeof replay === 'undefined') ? false : replay;
	state.update(param_name, "1");
	switch(param_name){
		case "bombaSentToKoopa": 
			castillo.addCommand("cd");
			break;
    	case "KingBooRemoved":
			mundo_hongo.addCommand("cd");
    		break;
    	case "WarioRemoved":
			mundo_desierto.addCommand("cd");
    		break;
    	case "EndMundoNube":
    		var king_boo = new Room("king_boo","COMPLETAR","koopa.gif");
			link_rooms(mundo_nube, king_boo);
			king_boo.removeCommand("cd");
			mundo_nube.addCommand("rmdir");
			mundo_nube.ev.addListener("KingBooRemoved", function(){
				state.applyState("KingBooRemoved");	
			});
			break;
		case "EndMundoHongo":
			var wario = new Room("wario","COMPLETAR","koopa.gif");
			link_rooms(mundo_hongo, wario);
			wario.removeCommand("cd");
			mundo_hongo.addCommand("rmdir");
			mundo_hongo.ev.addListener("WarioRemoved", function(){
				state.applyState("WarioRemoved");	
			});
			break;
    	case "EndOfGame":
			document.getElementById("fin_juego").click();
			break;    	
		default: 
			break;
	};
};