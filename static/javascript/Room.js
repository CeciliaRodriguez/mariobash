

function Room(roomname, introtext, roompic){
	this.parents = [];
	this.children = new Array();
	this.items = new Array();
	this.commands = ["cd", "ls", "cat", "man", "exit", "pwd"];
	this.room_name = (typeof roomname === 'undefined') ? "Generic Room": roomname;
	this.room_pic = (typeof roompic === 'undefined') ? "./static/img/none.gif": "./static/img/" + roompic;
	this.intro_text = (typeof introtext === 'undefined') ? "This is a simple room": introtext;
	this.cmd_text = {};
	//for event handling
	this.ev = new EventTarget();
	EventTarget.call(this);
};


var enterRoom = function(new_room){
    current_room = new_room;
    state.setCurrentRoom(current_room);
}

String.prototype.replaceAll = function(replaceThis, withThis){
	toreturn = this.toString();
	while (toreturn.indexOf(replaceThis) > 0){
		toreturn = toreturn.replace(replaceThis, withThis);
	}
	return toreturn;
};

Room.prototype.toString = function(){
	return this.room_name;
};

Room.prototype.changeIntroText = function(new_text){
	this.intro_text = new_text;
};

Room.prototype.addItem = function(newitem) {
	if (typeof newitem != 'undefined'){
		this.items[this.items.length] = newitem;
	}
};

Room.prototype.removeItem = function(itemnametoremove){
	index = this.itemStringArray().indexOf(itemnametoremove);
	if (index != -1){
		return this.items.splice(index, 1)[0];
	}
	return null;
};

Room.prototype.itemStringArray = function(item){
	itemstrarray = []
	for (var i = 0; i < this.items.length; i++){
		itemstrarray[itemstrarray.length] = this.items[i].toString();
	}
	return itemstrarray;
};

Room.prototype.childStringArray = function(child){
	childstrarray = []
	for (var i = 0; i < this.children.length; i++){
		childstrarray[childstrarray.length] = this.children[i].toString();
	}
	return childstrarray;
};

Room.prototype.getItemFromName = function(itemname){
	itemindex = this.itemStringArray().indexOf(itemname);
	if (itemindex > -1)
		return this.items[itemindex];
	return -1;
}

Room.prototype.getChildFromName = function(childname){
	childindex = this.childStringArray().indexOf(childname);
	if (childindex > -1)
		return this.children[childindex];
	return -1;
}


Room.prototype.addChild = function(newchild){
	if (typeof newchild != 'undefined'){
		this.children[this.children.length] = newchild;
	}
};

Room.prototype.removeChild = function(child){
	var child_object = this.getChildFromName(child);
	var index = this.children.indexOf(child_object);
	if (index != -1){
		this.children.splice(index, 1);
	}
};

Room.prototype.childrenStringArray = function(child){
	childrenstrarray = []
	for (var i = 0; i < this.children.length; i++){
		childrenstrarray[childrenstrarray.length] = this.children[i].toString();
	}
	return childrenstrarray;
};

Room.prototype.addParent = function(parent){
	this.parents[0] = parent;
};

Room.prototype.addCommand = function(cmd){
	this.commands[this.commands.length] = cmd;
};

Room.prototype.removeCommand = function(cmd){
	index = this.commands.indexOf(cmd);
	if (index != -1){
		this.commands.splice(index, 1);
	}
};

Room.prototype.addCmdText = function(cmd, text) {
	this.cmd_text[cmd] = text;
};

Room.prototype.removeCmdText = function(cmd){
	delete this.cmd_text[cmd];
};

//======================================================================================================================//

Room.prototype.cd = function(args, term){

	switch (args.length) {
		case 0:
			enterRoom(mario);
			term.pause();
			ToadSpeaking(["Y ahora volviste a mario"]);
			break;
		case 1:
			switch (args[0]) {
				case "..":
					if (this.parents.length >= 1){
			            enterRoom(this.parents[0]);
			            term.pause();
						ToadSpeaking(["Te moviste a " + current_room.room_name + ".\n" + current_room.intro_text]);
					} else {
						term.pause();
						ToadSpeaking(["Ey! Estás en el root, no podés ir más atrás que eso"]);
					}
					break;
				case "~":
					enterRoom(home);
					term.pause();
					ToadSpeaking(["Y ahora estás en home"]);
					break;
				case ".":
					enterRoom(current_room);
					term.pause();
					ToadSpeaking(["Te moviste a " + current_room.room_name + ".\n" + current_room.intro_text]);
					break;
				default:
					var room = state.validate_route(args[0],this);
					var room_from = current_room.room_name;					
					if (room != false) {
						if (room.commands.indexOf("cd") > -1){
			                enterRoom(room);
			                if ((room.room_name === "castillo") && (room_from === "mundo_desierto")){
			                	state.applyState("EndOfGame");
			                }
			                term.pause();
							ToadSpeaking(["Te moviste a " + current_room.room_name + ".\n" + current_room.intro_text]);
						} else {
							term.pause();
							ToadSpeaking(["Este mundo todavía no está habilitado. Para que se habilite ganá el mundo anterior."]);							
						}
					}
					else {
						term.echo("bash: cd: " + args[0] + ": No existe el archivo o el directorio");
					}										
					break;
			}
			break;
		default:
			this.cd([args[0]]);
			break;
	}
	state.change_prompt(term);
};

Room.prototype.cat = function(args,term){
	if (args.length < 1){
		term.pause();
		ToadSpeaking(["Necesitás decir a qué archivo le querés hacer cat."]);
	} else {
		var file = state.validate_file(args[0],this);
		if (file != false) {
            term.echo(file.cmd_text["cat"]);
		}
		else {
			term.echo("cat: " + args[0] + ": No existe el archivo o el directorio");
		}
	}
};


Room.prototype.scp = function(args,term){
	if (this.commands.indexOf("scp") > 0){
		if ((state.getCurrentRoom().room_name === "mundo_desierto" || state.getCurrentRoom().room_name === "mundo_hongo")) {

                    if ((args[0] === "1.bomba") && (args[1] === "root@192.168.0.13:/home/koopa") && (current_room.room_name === "mundo_desierto")) {

                        var history = term.history();
                        history.disable();
                        term.push(function(command) {
                            if (command.match("tengoelpoder")) {
                                term.echo('1.bomba                                 100%   217     0.2KB/s      00:00');
                                state.applyState("bombaSentToKoopa");
                                term.pause();
                                ToadSpeaking(["Mataste a Koopa en el host 192.168.0.13. Se habilitó el acceso al castillo dentro de este mundo, ingresá al mismo para encontrar a la princesa."]);
                                term.pop();
                                history.enable();
                            } else {
                                term.echo('Contraseña incorrecta.');
                                term.pop();
                                history.enable();
                            }
                        }, {
                            prompt: 'Password: '
                        });

                    } else if ((args[0] === "luigi@192.168.0.5:/home/luigi/mensaje.txt") && 
                                ((args[1] === "/home/mario/mundo_hongo")||args[1] === ".") && (current_room.room_name === "mundo_hongo")) {

                        var history = term.history();
                        history.disable();
                        term.push(function(command) {
                            if (command.match("fusepasion")) {
                                term.echo('mensaje.txt                             100%   31      0.2KB/s      00:00');
                                if (current_room.getItemFromName("mensaje.txt") === -1) {
                                    current_room.addItem(new Item("mensaje.txt",
                                    "yoshy, donkey kong... los extraño :(",
                                    "mundo_nube.gif"));
                                }
                                term.pop();
                                history.enable();
                            } else {
                                term.echo('Contraseña incorrecta.')
                                term.pop();
                                history.enable();
                            }
                        }, {
                            prompt: 'Password: '
                        });
                    }
                    else {
                        term.echo("No existe el archivo o el directorio.");
                    }

                }
	}
	else {
		term.pause();
		ToadSpeaking["No podés ejecutar este comando en este directorio."];
	}
};


Room.prototype.man = function(args,term){
	var text = ["",""];
	if (args.length < 1){
		term.echo("¿Qué página de manual quiere?");
		return text;
	} else {
		if (args[0] in man_pages){
			term.echo(man_pages[args[0]]);
		}
		else {
			term.echo("No existe entrada manual para " + args[0]);
		}	
	}
};

Room.prototype.mkdir = function(args,term){
	if (this.commands.indexOf("mkdir") > 0){
		if (args.length === 0){
			term.echo("mkdir: falta un operando");	
		}
		else {
			for (var i = 0; i < args.length; i++){
				if ((this.getChildFromName(args[i])) === -1) {
					var room_name_to_make = args[i];
					state.create_new_room(room_name_to_make, this);
					term.pause();
					ToadSpeaking(["Creaste el directorio " + args[i] + ". "]);
				}
				else {
					term.echo("mkdir: no se puede crear el directorio "+ args[i] + ": el archivo ya existe\n");
				}				
			}
		}		
	}
	else {
		term.pause();
		ToadSpeaking["No podés ejecutar este comando en este directorio."];
	}
};

Room.prototype.ls = function(args,term){
	switch (args.length) {
		case 0:
			var list_of_dir = (this.children.toString()).replaceAll(",", "\n");
			var list_of_files = (this.items.toString()).replaceAll(",", "\n");
			term.echo("[[b;#0000ee;#000000]" + list_of_dir + "]");
			term.echo(list_of_files);
			break;
		case 1:
			var room_to_ls = state.validate_route(args[0],this);
			if (room_to_ls != false) {
				var list_of_dir = (room_to_ls.children.toString()).replaceAll(",", "\n");
				var list_of_files = (room_to_ls.items.toString()).replaceAll(",", "\n");
				term.echo("[[b;#0000ee;#000000]" + list_of_dir + "]");
				term.echo(list_of_files);
			}
			else {
				term.echo("ls: no se puede acceder a " + args[0] + ": No existe el archivo o el directorio");
			}
			break;
		default:
			this.ls([args[0]],term);
			break;
	}
};

Room.prototype.mv = function(args,term){
	
	if (args.length != 2){
		term.echo("mv: falta el operando archivo de destino después de «" + args[0] + "»");
	}
	else {		
		var first_two_chars = args[0].charAt(0) + args[0].charAt(1);
		if (first_two_chars == "*.") {
				var type_of_file =  args[0].substr(2, args[0].length);
				var files_to_remove = this.itemStringArray().filter(is_type_of_file.bind(null,type_of_file));
				
				if ((files_to_remove.length > 0) && (this.childrenStringArray().indexOf(args[1]) >= 0)) {
					for (var i = 0; i < files_to_remove.length; i++) {
					  	 itemtoadd = this.items[this.itemStringArray().indexOf(files_to_remove[i])];
					  	 this.children[this.childrenStringArray().indexOf(args[1])].addItem(itemtoadd);
					  	 this.removeItem(files_to_remove[i]);
					}
					if (state.is_end_of_world(this)) {
						switch(this.room_name) {
							case "mundo_nube":
								state.applyState("EndMundoNube");
								term.pause();								
								ToadSpeaking(["Moviste todos los archivos ." + type_of_file + " a " + args[1] + ". Terminaste el primer mundo!, king boo aparecerá y deberás eliminarlo para desbloquear el próximo mundo."]);
								break;
							case "mundo_hongo":
								state.applyState("EndMundoHongo");
								term.pause();
								ToadSpeaking(["Moviste todos los archivos ." + type_of_file + " a " + args[1] + ". Terminaste el mundo hongo!, wario aparecerá y deberás eliminarlo para desbloquear el mundo desierto."]);
								break;		
						}	
					}
					term.pause();	
					ToadSpeaking(["Moviste todos los archivos ." + type_of_file + " a " + args[1] + "."]);
				}
				else {
					term.pause();
					ToadSpeaking(["Elegí archivo/s y un directorio validos para moverlos."]);
				}
		}		
		else {
			var item_name_to_move = this.itemStringArray().indexOf(args[0]);			
			if ((item_name_to_move >= 0) && (this.childrenStringArray().indexOf(args[1]) >= 0)){			
			
				itemtoadd = this.items[this.itemStringArray().indexOf(args[0])];			
				this.children[this.childrenStringArray().indexOf(args[1])].addItem(itemtoadd);
				this.removeItem(args[0]);
				term.pause();
				ToadSpeaking(["Moviste " + args[0] + " a " + args[1] + "."]);
			}					
			else {
				term.echo("mv: no se puede efectuar ´stat´ sobre «" + args[0] +"»: No existe el archivo o el directorio","");
			}
		}
	}
};

Room.prototype.rm = function(args,term){
	switch(args.length) {
		case 0:
			term.echo("rm: falta un operando");
			break;
		case 1:
			var first_two_chars = args[0].charAt(0) + args[0].charAt(1);
			if (first_two_chars == "*.") {
					var type_of_file =  args[0].substr(2, args[0].length);
					var files_to_remove = this.itemStringArray().filter(is_type_of_file.bind(null,type_of_file));					
					if (files_to_remove.length > 0) {
						for (var j = 0; j < files_to_remove.length; j++) {
						  	 this.removeItem(files_to_remove[j]);
						}
						term.pause();
						ToadSpeaking(["Eliminaste todos los archivos ." + type_of_file + ". "]);
					}
					else {
						term.echo("rm: no se puede borrar «" + args[i] + "»: No existe el archivo o el directorio\n");
					}
			}	
			else {
				if (this.getItemFromName(args[0]) != -1){
					if (this.getItemFromName(args[0]).valid_cmds.indexOf("rm") > 0){
						this.removeItem(args[0]);
						term.pause();
						ToadSpeaking(["Borraste el archivo " + args[0] + " "]);
					} else {
						term.pause();
						ToadSpeaking(["No podés eliminar el archivo " + args[0] + ". "]);
					}
				} else {
					term.echo("rm: no se puede borrar «" + args[0] + "»: No existe el archivo o el directorio\n");
				}
			}
			break;
		default:
			for (var i = 0; i < args.length; i++){
				this.rm([args[i]],term);
			}
			break;
	}	
};


Room.prototype.rmdir = function(args,term){
	if (this.commands.indexOf("rmdir") > 0){
		switch(args.length) {
			case 0:
				term.echo("rmdir: falta un operando");
				break;
			case 1:
				if ((this.getChildFromName(args[0])) != -1) {
						this.removeChild(args[0]);
						if ((args[0] == "king_boo") && this.room_name == "mundo_nube") {
							this.ev.fire("KingBooRemoved");
							term.pause();	
							ToadSpeaking(["Eliminaste el directorio " + args[0] + ", se habilitó el mundo_hongo para que puedas jugarlo."]);						
						}
						else {
							if ((args[i] == "wario") && this.room_name == "mundo_hongo") {
								this.ev.fire("WarioRemoved");
								term.pause();
								ToadSpeaking(["Eliminaste el directorio " + args[0] + ", se habilitó el mundo_desierto para que puedas jugarlo."]);	
							}
							else {
								term.pause();
								ToadSpeaking(["Eliminaste el directorio " + args[0] + ". "]);									
							}
						}							
				}
				else {
					term.echo("rmdir: fallo al borrar «" + args[i] + "»: No existe el archivo o el directorio\n");
				}		
				break;
			default:
				for (var i = 0; i < args.length; i++){
					this.rmdir([args[i]],term);
				}
				break;
		}		
	}
	else {
		term.pause();
		ToadSpeaking["No podés ejecutar este comando en este directorio."];
	}
};

Room.prototype.grep = function(args,term){
	if (this.commands.indexOf("grep") > 0){
		var word_to_find = args[0];
		if (this.getItemFromName(args[1]) != -1){
			var item_to_find_in_text = this.getItemFromName(args[1]).cmd_text["cat"];
			var line_array = item_to_find_in_text.split("\n");
			var return_arr = jQuery.grep(line_array, function(line){ return (line.indexOf(word_to_find) > 0)});
			term.echo(return_arr.join("\n"));
		} else {
			term.echo("grep: " + args[1] + ": No existe el archivo o el directorio");
		}
	}
	else {
		term.pause();
		ToadSpeaking["No podés ejecutar este comando en este directorio."];		
	}
};

Room.prototype.head = function(args,term){
	switch (args.length) {
		case 0:
			term.pause();
			ToadSpeaking(["Neceistás especificarle al menos un parámetro a head. Para entender el comando ejecutá 'man head'"]);
			break;
		case 1:
			var file_to_read = state.validate_file(args[0], this);
			if (file_to_read != false) {
				var array_of_lines = file_to_read.cmd_text["cat"].split("\n");
				term.echo(concat_first_n_lines(array_of_lines,10));
			}
			else {
				term.echo("head: no se puede abrir «" + args[0] + "» para lectura: No existe el archivo o el directorio");
			}
			break;
		case 2:
			if (args[0].charAt(0) === "-") {
				var file_to_read = state.validate_file(args[1], this);
				var array_of_lines = file_to_read.cmd_text["cat"].split("\n");
				var number_of_lines = args[0].substr(1);
				term.echo(concat_first_n_lines(array_of_lines,number_of_lines));
			}
			else {
				term.pause();		
				ToadSpeaking(["Revisá la sintaxis de head consultando el man."]);		
			} 
			break;
		default:
			term.pause();
			ToadSpeaking(["Por ahora no podés headear varios files"]);
			break;
	}

};


Room.prototype.tail = function(args,term){
	switch (args.length) {
		case 0:
			term.pause();
			ToadSpeaking(["Neceistás especificarle al menos un parámetro a tail. Para entender el comando ejecutá 'man tail'"]);
			break;
		case 1:
			var file_to_read = state.validate_file(args[0], this);
			if (file_to_read != false) {
				var array_of_lines = file_to_read.cmd_text["cat"].split("\n");
				term.echo(concat_last_n_lines(array_of_lines,10));
			}
			else {
				return ["tail: no se puede abrir «" + args[0] + "» para lectura: No existe el archivo o el directorio",""];
			}
			break;
		case 2:
			if (args[0].charAt(0) === "-") {
				var file_to_read = state.validate_file(args[1], this);
				var array_of_lines = file_to_read.cmd_text["cat"].split("\n");
				var number_of_lines = args[0].substr(1);
				term.echo(concat_last_n_lines(array_of_lines,number_of_lines));
			}
			else {
				term.pause();		
				ToadSpeaking(["Revisá la sintaxis de tail consultando el man."]);		
			} 
			break;
		default:
			term.pause();
			ToadSpeaking(["Por ahora no podés tailear varios files"]);
			break;
	}

};



Room.prototype.cp = function(args,term){
	
	switch (args.length) {
		
		case 0:
			term.echo("cp: falta un archivo como argumento");
			break;

		case 1:
			term.echo("cp: falta el operando archivo de destino después de «" + args[0] + "» ");
			break;

		default:
			var item_to_copy_name = args[0];
			var item_to_copy = this.getItemFromName(item_to_copy_name);
			var location_dir = state.validate_route(args[1]);

			if (item_to_copy === -1) {
				term.echo("mv: no se puede efectuar ´stat´ sobre «" + args[0] + "»: No existe el archivo o el directorio");
			}

			if ((item_to_copy != -1) && (location_dir != false)){
				var newItem = new Item(item_to_copy_name);
				newItem.picturename = item_to_copy.picturename;
				newItem.cmd_text = item_to_copy.cmd_text;
				newItem.valid_cmds = item_to_copy.valid_cmds;
				location_dir.addItem(newItem);

				if (state.is_end_of_world(this)) {
						switch(this.room_name) {
							case "mundo_hongo":
								var wario = new Room("wario","COMPLETAR","koopa.gif");
								link_rooms(this, wario);
								wario.removeCommand("cd");
								this.addCommand("rmdir");
								this.ev.addListener("WarioRemoved", function(){
		    						state.applyState("WarioRemoved");	
								});
								term.pause();
								ToadSpeaking(["Copiaste " + item_to_copy_name + " al directorio " + location_dir + ".\n" + "Terminaste el mundo hongo!, wario aparecerá y deberás eliminarlo para desbloquear el mundo desierto."]);	
								break;		
						}
				}
				else {
					term.pause();
					ToadSpeaking(["Copiaste " + item_to_copy_name + " al directorio " + location_dir + "."]);					
				}


			}
	}

};

//REFACTORIZAR

Room.prototype.pwd = function(args,term){
    var current_path = current_room.parents.toString().replaceAll(",", "/") + "/" + current_room.room_name;
    switch (current_path){
    	case "//home":
    		term.echo("/home");
    		break;
    	case "/mario":
    		term.echo("/home/mario");
    		break;
    	case "//":
    		term.echo("/")
    		break;
    	default:
    		term.echo("/" + current_path, "");
    		break;
    }
};

//VOLAR, VOLAR, VOLAR
	
/*Checks if arg can be reached from this room
* Returns the room if it can
* Returns false if it cannot
*
* 'arg' is a single node, not a path
* i.e. Home.can_cd("next_room") returns true
*      Home.can_cd("next_room/another_room") is invalid
*/
Room.prototype.can_cd = function(arg){
    //Don't allow for undefined or multiple paths
    if (arg == undefined || arg.indexOf("/") > -1){
        return false;
    }
    else if(arg === "..") {
		return this.parents[0];
	} else if (arg === ".") {
        return this;
	} else {
		for (var i = 0; i < this.children.length; i++){
			if (arg === this.children[i].toString()){
				return this.children[i];
			}
		}
		return false;
	}
};
