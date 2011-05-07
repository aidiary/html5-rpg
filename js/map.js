function Map(name) {
    this.name = name;
    this.row = -1;
    this.col = -1;
    this.defaultTile = 0;
    this.data = null;
    this.charas = [];  // characters on this map

    // images are class property
    Map.images = new Array(256);
    for (i = 0; i < 256; i++) {
        Map.images[i] = new Image();
    }
    Map.images[0].src = "images/grass.png";
    Map.images[1].src = "images/water.png";
    Map.images[2].src = "images/forest.png";
    Map.images[3].src = "images/hill.png";
    Map.images[4].src = "images/mountain.png";

    // load map data
    this.load("map/" + name + ".map");
}

Map.prototype.load = function(filename) {
    // load map file
    var httpObj = $.ajax({
        url: filename,
        async: false  // synchronous (wait until file is loaded)
    });
    var lines = httpObj.responseText.split("\n");
    // the number of row and column
    var temp = lines[0].split(" ");
    this.row = parseInt(temp[0]);
    this.col = parseInt(temp[1]);
    // default map tile value
    this.defaultTile = parseInt(lines[1]);
    // map data
    this.data = new Array(this.row);
    for (i = 0; i < this.row; i++) {
        this.data[i] = new Array(this.col);
        for (j = 0; j < this.col; j++) {
            // map data starts from lines[2]
            this.data[i][j] = parseInt(lines[i+2][j]);
        }
    }
}

Map.prototype.update = function() {
    // update characters on this map
    for (i = 0; i < this.charas.length; i++) {
        this.charas[i].update(this);
    }
}

Map.prototype.draw = function(ctx, offset) {
    offsetx = offset[0];
    offsety = offset[1];

    // calculate the range of map
    startx = div(offsetx, GS);
    endx = startx + div(WIDTH, GS) + 1;
    starty = div(offsety, GS);
    endy = starty + div(HEIGHT, GS) + 1;
    for (y = starty; y < endy; y++) {
        for (x = startx; x < endx; x++) {
            // draw default image at the outside of map
            if (x < 0 || y < 0 || x > this.col-1 || y > this.row-1) {
                ctx.drawImage(Map.images[this.defaultTile], x*GS-offsetx, y*GS-offsety);
            } else {
                ctx.drawImage(Map.images[this.data[y][x]], x*GS-offsetx, y*GS-offsety);
            }
        }
    }

    // draw characters on this map
    for (i = 0; i < this.charas.length; i++) {
        this.charas[i].draw(ctx, offset);
    }
}

Map.prototype.isMovable = function(x, y) {
    if (x < 0 || x > this.col-1 || y < 0 || y > this.row-1) {
        return false;
    }
    // cannot move at sea(1) and mountan(4) tile
    if (this.data[y][x] == 1 || this.data[y][x] == 4) {
        return false;
    }
    return true;
}

Map.prototype.addChara = function(chara) {
    this.charas.push(chara);
}
