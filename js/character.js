function Character(name, x, y, dir) {
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
    this.animcycle = 12;
    this.frame = 0;

    // images are class property
    Character.images = new Object();
    var names = ["player", "king", "minister", "soldier"];
    for (i = 0; i < names.length; i++) {
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
    }
}

Character.prototype.draw = function(ctx, offset) {
    offsetx = offset[0];
    offsety = offset[1];
    var no = div(this.frame, this.animcycle) % 4
    ctx.drawImage(Character.images[this.name], no*GS, this.direction*GS, GS, GS,
                  this.px-offsetx, this.py-offsety, GS, GS);
}
