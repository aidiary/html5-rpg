window.onload = function() {
    // initialize global objects
    activeKey = null;
    map = new Map("test");
    player = new Player("player", 1, 1, DOWN);
    king = new Character("king", 2, 1, DOWN, STOP);
    minister = new Character("minister", 3, 1, DOWN, MOVE);
    soldier = new Character("soldier", 4, 1, DOWN, MOVE);
    // add characters to map
    map.addChara(player);
    map.addChara(king);
    map.addChara(minister);
    map.addChara(soldier);

    // start mainloop
    setInterval('mainLoop()', 16);
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
