function Player(name, pos, dir) {
    this.name = name;
    this.x = pos[0];
    this.y = pos[1];
    this.px = this.x * GS;
    this.py = this.y * GS;
    this.vx = 0;
    this.vy = 0;
    this.speed = 4;
    this.moving = false;
    this.direction = dir;
    this.image = new Image();
    this.image.src = "images/player.png";
    this.animcycle = 12;
    this.frame = 0;
}

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
            $("#pos").text("(" + this.x + ", " + this.y + ")");
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

    $("#keycode").text(activeKey);
}

Player.prototype.draw = function(ctx, offset) {
    offsetx = offset[0];
    offsety = offset[1];
    var no = div(this.frame, this.animcycle) % 4
    ctx.drawImage(this.image, no*GS, this.direction*GS, GS, GS,
                  this.px-offsetx, this.py-offsety, GS, GS);
}

Player.prototype.moveStart = function(dir, map) {
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
