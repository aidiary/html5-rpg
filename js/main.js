var musicList = [
    { name : "field", url: "music/field" },
    { name : "castle", url: "music/castle" }
];

window.onload = function() {
    // initialize global objects
    activeKey = null;
    map = new Map("test");
    player = new Player("player", 1, 1, DOWN);
    map.addChara(player);

    // start mainloop
    setInterval('mainLoop()', 16);

    // start music
    var bgmNo = 0;
    var audioObj = new Audio();
    if (audioObj.canPlayType("audio/wav") == "maybe") { var ext = ".wav"; }
    if (audioObj.canPlayType("audio/mp3") == "maybe") { var ext = ".mp3"; }
    (new Audio(musicList[bgmNo].url + ext)).play();
}

function mainLoop() {
    var ctx = document.getElementById('canvas').getContext('2d');

    // initialize
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // update
    map.update();

    // draw
    offset = calcOffset(player);
    map.draw(ctx, offset);
    player.draw(ctx, offset);
}

// key management

document.onkeydown = function(e) {
    activeKey = e.which;
    e.preventDefault();
}

document.onkeyup = function(e) {
    activeKey = null;
    e.preventDefault();
}

// calculate player-map offset
function calcOffset(player) {
    var offsetx = player.px - WIDTH / 2;
    var offsety = player.py - HEIGHT / 2;
    return [offsetx, offsety];
}
