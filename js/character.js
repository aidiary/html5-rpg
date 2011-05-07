STOP = 0;
MOVE = 1;
PROB_MOVE = 0.1;

function Character(name, x, y, dir, movetype, message) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.px = this.x * GS;
    this.py = this.y * GS;
    this.vx = 0;
    this.vy = 0;
    this.speed = 4;
    this.moving = false;
    this.direction = dir;
    this.movetype = movetype;
    this.animcycle = 12;
    this.frame = 0;
    this.message = message;

    // images are class property
    Character.images = new Object();
    var names = ["player", "king", "minister", "soldier"];
    for (var i = 0; i < names.length; i++) {
        Character.images[names[i]] = new Image();
        Character.images[names[i]].src = "images/" + names[i] + ".png";
    }
}

Character.prototype.update = function(map) {
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
    } else if (this.movetype == MOVE && Math.random() < PROB_MOVE) {
        this.direction = Math.floor(Math.random() * 4);  // 0 - 3
        this.moveStart(this.direction, map);
    }
}

Character.prototype.draw = function(ctx, offset) {
    offsetx = offset[0];
    offsety = offset[1];
    var no = div(this.frame, this.animcycle) % 4
    ctx.drawImage(Character.images[this.name], no*GS, this.direction*GS, GS, GS,
                  this.px-offsetx, this.py-offsety, GS, GS);
}

Character.prototype.moveStart = function(dir, map) {
    if (dir == LEFT) {
        this.direction = LEFT;
        if (map.isMovable(this.x-1, this.y)) {
            this.vx = - this.speed;
            this.vy = 0;
            this.moving = true;
        }
    } else if (dir == UP) {
        this.direction = UP;
        if (map.isMovable(this.x, this.y-1)) {
            this.vx = 0;
            this.vy = - this.speed;
            this.moving = true;
        }
    } else if (dir == RIGHT) {
        this.direction = RIGHT;
        if (map.isMovable(this.x+1, this.y)) {
            this.vx = this.speed;
            this.vy = 0;
            this.moving = true;
        }
    } else if (dir == DOWN) {
        this.direction = DOWN;
        if (map.isMovable(this.x, this.y+1)) {
            this.vx = 0;
            this.vy = this.speed;
            this.moving = true;
        }
    }
}
