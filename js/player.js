// Player is a subclass of Character
function Player(name, x, y, dir) {
    Character.call(this, name, x, y, dir);
}

Player.prototype = new Character();

Player.prototype.update = function(map) {
    this.frame += 1;

    // continue moving until player fits in the fixed cell
    if (this.moving == true) {
        this.px += this.vx;
        this.py += this.vy;
        if (this.px % GS == 0 && this.py % GS == 0) {
            this.moving = false;
            this.x = div(this.px, GS);
            this.y = div(this.py, GS);
        } else {
            return;
        }
    }

    // activeKey defined at main.js
    if (activeKey == 37) {
        this.moveStart(LEFT, map);
    } else if (activeKey == 38) {
        this.moveStart(UP, map);
    } else if (activeKey == 39) {
        this.moveStart(RIGHT, map);
    } else if (activeKey == 40) {
        this.moveStart(DOWN, map);
    }
}
