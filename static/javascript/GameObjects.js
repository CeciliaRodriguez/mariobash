/*
CREACIÓN DE OBJETOS DEL JUEGO: DIRECTORIOS, ARCHIVOS, RELACIONES ENTRE DIRECTORIOS, COMANDOS POR MUNDO
*/


//ROOT
var root = new Room("/",
    "El root es el directorio raíz del filesystem. El resto de los directorios son todos 'hijos' del directorio root.",
    "home.gif");

//HOME
var home = new Room("home",
    "El home no es más que un directorio que contiene otros, uno por cada usuario del sistema.",
    "home.gif");

//MARIO
var mario = new Room("mario",
    "Lee la carta de bienvenida para empezar.",
    "mario.gif");
var carta_de_bienvenida = new Item("carta_de_bienvenida", "\n¡Bienvenido a MarioBash! \n\n" +
        "Peach necesita que la rescaten, para lograrlo deberás ganar los tres mundos que se encuentran en /home/mario \n\n"  +
        "En cada mundo se encuentran las instrucciones para ganarlo. Para leerlas utilizá el comando \"cat instrucciones.txt\" \n\n" +
        "Mirá lo que hay dentro de cada directorio ejecutando \"ls\" (los directorios se verán azules y los archivos blancos). \n" +
        "Los directorios se ven azules y los archivos blancos.\n\n" +
        "Movete entre los directorios usando \"cd <directorio>\" \n\n" +
        "Para volver un directorio hacia atrás usá \"cd ..\" y si no te acordás donde estás podés saberlo con \"pwd\". \n\n" +
        "Acordate que siempre podés consultar por un comando escribiendo \"man <comando>\" \n\n" +
        "¡Vamos! Peach te está esperando.\n");
carta_de_bienvenida.addCmdText("cat","¡Bienvenido a MarioBash! \n\n" +
        "Peach necesita que la rescaten, para lograrlo deberás ganar los tres mundos que se encuentran en /home/mario \n\n"  +
        "En cada mundo se encuentran las instrucciones para ganarlo. Para leerlas utilizá el comando \"cat instrucciones.txt\" \n\n" +
        "Mirá lo que hay dentro de cada directorio ejecutando \"ls\" \n" +
        "Los directorios se ven azules y los archivos blancos.\n\n" +
        "Movete entre los directorios usando \"cd <directorio>\" \n\n" +
        "Para volver un directorio hacia atrás usá \"cd ..\" y si no te acordás donde estás podés saberlo con \"pwd\". \n\n" +
        "Acordate que siempre podés consultar por un comando escribiendo \"man <comando>\" \n\n" +
        "¡Vamos! Peach te está esperando.\n");
mario.addItem(carta_de_bienvenida);
mario.addCommand("cat");
mario.addCommand("less");


//DONKEY KONG
var donkey_kong = new Room("donkey_kong",
    "  ",
    "mario.gif");
donkey_kong.addCommand("cat");

//YOSHI
var yoshi = new Room("yoshi",
    "  ",
    "mario.gif");
donkey_kong.addCommand("cat");

//MUNDO NUBE
var mundo_nube = new Room("mundo_nube",
     ("Lee el archivo <i>instrucciones.txt</i> para saber cómo ganar este mundo.  \n\n"  +
     "<b>COMANDOS DEL MUNDO NUBE: mv, mkdir, rmdir.</b>  \n\n"),
     "mundo_nube.gif");
mundo_nube.addItem(new Item("instrucciones.txt",
    "\nPara ganar este mundo deberás: \n\n" + "1. Mover cada moneda a la carpeta cofre (comando MV) \n" + "2. Crear una carpeta llamada estrellas (comando MKDIR) \n"
    + "3. Mover las estrellas a la carpeta estrellas (comando MV) \n" +
    "4. Una vez que hayas terminado, aparecerá el directorio king boo, y tendrás que eliminarlo para que se habilite el mundo_hongo (comando RMDIR). \n\n"
    + "Para saber cómo funciona cada uno de los comandos y sus argumentos podés ejecutar 'man <comando>'.\n"
    + "Todos los elementos que necesitás para ganar este mundo se encuentran justo aquí!. Chusmealos usando 'ls'.\n",
    "mundo_nube.gif"));
mundo_nube.addItem(new Item("1.moneda",
    "g",
    "mundo_nube.gif"));
mundo_nube.addItem(new Item("2.moneda",
    "g",
    "mundo_nube.gif"));
mundo_nube.addItem(new Item("1.estrella",
    "g",
    "mundo_nube.gif"));
mundo_nube.addItem(new Item("2.estrella",
    "g",
    "mundo_nube.gif"));
mundo_nube.addItem(new Item("3.estrella",
    "g",
    "mundo_nube.gif"));
mundo_nube.addCommand("mv");
mundo_nube.addCommand("cat");
mundo_nube.addCommand("mkdir");

//COFRE
var cofre = new Room("cofre",
    "  ",
    "mario.gif");

//MUNDO HONGO
var mundo_hongo = new Room("mundo_hongo",
"Lee el archivo <i>instrucciones.txt</i> para saber cómo ganar este mundo.  \n\n"  +
     "<b>COMANDOS DEL MUNDO HONGO: rm, mv, scp, cp, rmdir.</b>  \n\n", "mundo_hogno.gif");

var hongo_marron = new Item("1.hongo_marron","snsjfnksanfalf","mundo_nube.gif");
hongo_marron.addValidCmd("rm");
mundo_hongo.addItem(hongo_marron);
hongo_marron = new Item("2.hongo_marron","snsjfnksanfalf","mundo_nube.gif");
hongo_marron.addValidCmd("rm");
mundo_hongo.addItem(hongo_marron);
hongo_marron = new Item("3.hongo_marron",
    "snsjfnksanfalf")
hongo_marron.addValidCmd("rm");
mundo_hongo.addItem(hongo_marron);

mundo_hongo.addItem(new Item("instrucciones.txt",
    "\nPara ganar este mundo deberás: \n\n" + "1. Eliminar todos los hongos marrones (comando RM) \n"
    + "2. Recolectar los hongos verdes en la carpeta 'vidas' (comando MV) \n"
    + "3. Luigi tiene un mensaje.txt en /home/luigi en el host 192.168.0.5 copialo\n"
    + "en /home/mario/mundo_hongo (comando SCP), usando las credenciales: \n"
    + "                        user: luigi\n"
    + "                        password: fusepasion\n"
    + "4. Copiarles el mensaje secreto al home de los usuarios Yoshi y Donkey Kong (comando CP) \n"
    + "5. Una vez que hayas terminado, aparecerá Wario con un archivo adentro, y tendrás que eliminarlo\n"
    + "para que se habilite el mundo_desierto (comandos RM/RMDIR). \n\n"
    + "Para saber cómo funciona cada uno de los comandos y sus argumentos\n"
    + "podés ejecutar 'man <comando>'.\n"
    + "Todos los elementos que necesitás para ganar este mundo se encuentran\n"
    + "justo aquí!. Chusmealos usando 'ls'.\n",
    "mundo_nube.gif"));


mundo_hongo.addItem(new Item("1.hongo_verde",
    "snsjfnksanfalf",
    "mundo_nube.gif"));
mundo_hongo.addItem(new Item("2.hongo_verde",
    "snsjfnksanfalf",
    "mundo_nube.gif"));
mundo_hongo.addItem(new Item("3.hongo_verde",
    "snsjfnksanfalf",
    "mundo_nube.gif"));
var vidas = new Room("vidas","","kdnfos.gif");

mundo_hongo.addCommand("scp");
mundo_hongo.addCommand("rm");
mundo_hongo.addCommand("cat");
mundo_hongo.addCommand("scp");
mundo_hongo.addCommand("mv");
mundo_hongo.addCommand("cp");
//inicialmente el mundo no esta habilitado
mundo_hongo.removeCommand("cd");



//MUNDO DESIERTO
var mundo_desierto = new Room("mundo_desierto",
"Lee el archivo <i>instrucciones.txt</i> para saber cómo ganar este mundo.  \n\n"  +
     "<b>COMANDOS DEL MUNDO DESIERTO: grep, head, tail, scp.</b>  \n\n", "mundo_hogno.gif");
mundo_desierto.addItem(new Item("instrucciones.txt",
    "\nPara ganar este mundo deberás copiarle una bomba por SCP a Koopa, para esto necesitarás: \n\n"
    + "1. Averiguar la IP del host donde está Koopa, la misma se encuentra en el archivo 'koopa_ubicacion.txt' al lado de la palabra koopa_ip (comando GREP) \n"
    + "2. Averiguar el nombre de la ruta donde hay que copiar la bomba, la misma se encuentra en la décima línea del mismo archivo (comando HEAD)\n"
    + "3. Averiguar las credenciales de acceso al host donde está Koopa, las mismas están en la anteúltima línea del archivo koopa_ubicacion.txt (comando TAIL)\n"
    + "4. Una vez que hayas terminado, copiá la bomba indicando la ip del host, la ubicación donde copiar la bomba y las credenciales de acceso al host (comando SCP) \n\n"
    + "Cuando le hayas mandado la bomba, se habilitará el acceso al directorio castillo en este mundo, ingresá al mismo para encontrarte con Peach.\n"
    + "Para saber cómo funciona cada uno de los comandos y sus argumentos podés ejecutar 'man <comando>'.\n"
    + "Todos los elementos que necesitás para ganar este mundo se encuentran justo aquí!. Chusmealos usando 'ls'.\n",
    "mundo_nube.gif"));
mundo_desierto.addItem(new Item("1.bomba",
    "snsjfnksanfalf",
        "mundo_nube.gif"));
var koopa_ubicacion = new Item("koopa_ubicacion.txt",
"$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$$$ $$$$$$$$$$ $$$$$$$$$ $$$$$$$$$$$$$$/home/koopa$$$$$$$$$$ $$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$$$ $$$$$$$ $$$$$$ $$$$$$$koopa_ip:192.168.0.13$$$$$$$ $$$$$$ $$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n\
$$$$ $$$$$$ $$$$$$$ $$$$$$user:root password:tengoelpoder$$$$$ $$$$$$\n\
$$$ $$$ $$$$ $$$$ $$$$$ $$$$$$ $$$$$$ $$$$ $$$$$ $$$$$ $$$$$ $$$$$$$\n");
mundo_desierto.addItem(koopa_ubicacion);
var castillo = new Room("castillo","  ","mundo_nube.gif");
castillo.removeCommand("cd");
mundo_desierto.addCommand("grep");
mundo_desierto.addCommand("head");
mundo_desierto.addCommand("tail");
mundo_desierto.addCommand("scp");
mundo_desierto.removeCommand("cd");
mundo_desierto.addCommand("scp");

/*
LINKEAR DIRECTORIOS
*/
function link_dir(parentDir, childDir){if (!(childDir in parentDir.children)){parentDir.addChild(childDir);}if (!(parentDir in childDir.parents)){childDir.addParent(parentDir);}};

// RELACIONES ENTRE DIRECTORIOS
link_dir(root, home);
link_dir(home, mario);
link_dir(home, yoshi);
link_dir(home, donkey_kong);

link_dir(mario, mundo_nube);
link_dir(mario, mundo_hongo);
link_dir(mario, mundo_desierto);

link_dir(mundo_nube, cofre);
link_dir(mundo_hongo, vidas);

link_rooms(mundo_desierto, castillo);
