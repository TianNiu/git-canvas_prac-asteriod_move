$(function() {
    var $canvas = $("#canvas-1");
    var cxt = $canvas.get(0).getContext("2d");

    var cas_width = $canvas.width();
    var cas_height = $canvas.height();

    $(window).resize(resizeCanvas);

    function resizeCanvas() {
            $canvas.attr("width", $(window).get(0).innerWidth);
            $canvas.attr("height", $(window).get(0).innerHeight);
            cas_width = $canvas.width();
            cas_height = $canvas.height();
        }
        //run resizeCanvas
    resizeCanvas();

    var playAnimation = true;
    var $start_button = $("#startAnimation");
    var $stop_button = $("#stopAnimation");

    $start_button.hide();
    /**
     * 点击开始按钮
     * @return {[type]} [description]
     */
    $start_button.click(function() {
        $(this).hide();
        $stop_button.show();
        playAnimation = true;
        animate();
    });
    /**
     * 点击停止按钮
     * @return {[type]} [description]
     */
    $stop_button.click(function() {
        $(this).hide();
        $start_button.show();
        playAnimation = false;
    });
    /**
     * class Asteroid行星类
     * @param {[type]} x      [description]
     * @param {[type]} y      [description]
     * @param {[type]} radius [description]
     */
    function Asteroid(x, y, radius, vX, vY, aX, aY) {
            //position x
            this.x = x;
            //position y
            this.y = y;
            //raduis
            this.radius = radius;
            //速度(偏移量)
            this.vX = vX;
            this.vY = vY;
            //加速度
            this.aX = aX;
            this.aY = aY;
        }
        //向数组中添加10个行星实例
    var asteroids = new Array();
    for (var i = 0; i < 10; i++) {
        var x = 20 + (Math.random() * (cas_width - 40));
        var y = 20 + (Math.random() * (cas_height - 40));
        var raduis = 5 + Math.random() * 10;
        var vX = Math.random() * 10 - 5;
        var vY = Math.random() * 10 - 5;
        var aX = Math.random() * 0.2 - 0.1;
        var aY = Math.random() * 0.2 - 0.1;
        //console.log(raduis);
        asteroids.push(new Asteroid(x, y, raduis, vX, vY, aX, aY));
    };
    /**
     * 运动函数animate setTimeout循环运行
     * Q:以下注释部分对于radius属性使用 . 时会发生问题，使用[] 没有问题
     * @return {[type]} [description]
     */
    function animate() {
            cxt.clearRect(0, 0, cas_width, cas_height);
            cxt.fillStyle = "rgb(255,255,255)";

            var asteroids_len = asteroids.length;
            for (var i = 0; i < asteroids_len; i++) {
                var tmp_asteroid = asteroids[i];
                /* 加上位移重置偏移量*/
                tmp_asteroid['x'] += tmp_asteroid.vX;
                tmp_asteroid['y'] += tmp_asteroid.vY;
                if (Math.abs(tmp_asteroid.vX) < 20) {
                    tmp_asteroid.vX += tmp_asteroid.aX;

                }
                if (Math.abs(tmp_asteroid.vY) < 20) {
                    tmp_asteroid.vY += tmp_asteroid.aY;

                }
                /* 当在x轴上超出边界，反向移动*/
                if (tmp_asteroid['x'] - tmp_asteroid['radius'] < 0) {
                    tmp_asteroid['x'] = tmp_asteroid['radius'];
                    //偏移量反向
                    tmp_asteroid.vX *= -1;
                    tmp_asteroid.aX *= -1;
                } else if (tmp_asteroid['x'] + tmp_asteroid['radius'] > cas_width) {
                    tmp_asteroid['x'] = cas_width - tmp_asteroid['radius'];
                    //偏移量反向
                    tmp_asteroid.vX *= -1;
                    tmp_asteroid.aX *= -1;
                }

                /* 当在y轴上超出边界，反向移动*/
                if (tmp_asteroid['y'] - tmp_asteroid['radius'] < 0) {
                    tmp_asteroid['y'] = tmp_asteroid['radius'];
                    //偏移量反向
                    tmp_asteroid.vY *= -1;
                    tmp_asteroid.aY *= -1;
                } else if (tmp_asteroid['y'] + tmp_asteroid['radius'] > cas_height) {
                    tmp_asteroid['y'] = cas_height - tmp_asteroid['radius'];
                    //偏移量反向
                    tmp_asteroid.vY *= -1;
                    tmp_asteroid.aY *= -1;
                }
                /**
                 * 重新绘制
                 */
                //console.log(tmp_asteroid['radius']);
                cxt.shadowBlur = tmp_asteroid['radius'];
                cxt.shadowOffsetX = 0;
                cxt.shadowOffsetY = 0;
                cxt.shadowColor = "rgb(255,255,255)";
                cxt.beginPath();
                //console.log("x:"+tmp_asteroid.x);
                //console.log("y:"+tmp_asteroid.y);
                //console.log("raduis:"+tmp_asteroid.raduis);
                cxt.arc(tmp_asteroid['x'], tmp_asteroid['y'], tmp_asteroid['radius'], 0, Math.PI * 2, false);
                cxt.closePath();
                cxt.fill();
            }
            if (playAnimation) {
                setTimeout(animate, 33);
            }
            //console.log("this run");
        }
        /* 初始时运行*/
    animate();

});
