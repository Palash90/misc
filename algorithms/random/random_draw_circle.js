function drawCircle(r) {
    var n = 2 * r;
    var circle = '';
    for (var i = 0; i <= n; i++) {
        for (var j = 0; j <= n; j++) {
            var x = i - r;
            var y = j - r;
            if ((x * x + y * y) <= r * r + 1)
                circle += '  *  ';
            else
                circle += '     '
        }
        circle += '\n';
    }
    console.log(circle)
}

drawCircle(6)