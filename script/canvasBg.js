// one of my old code

        var cnvs=document.getElementById('cnvs');

        var ctx = cnvs.getContext('2d');


        //this will hold all the points
        var pts = [];
        //maximum points limit
        const maxPts = 1000;
        //extract math function;
        const { sin, cos, PI } = Math;

        var w = cnvs.width = innerWidth;
        var h = cnvs.height = innerHeight;


        //experimenting this values yields interesting results
        //lorenz system constants

        class LorenzAttractor {
            constructor(x = 0.01, y = 0.01, z = 0.01,S=10) {
                this.x = x;
                this.y = y;
                this.z = z;
                //scale the whole system
                this.S = S;
                
                this.a = 10;
                this.b = 28;
                this.c = 8 / 3;
                this.dt = 0.01;

                this.angle = 0;

                this.glitch=0;
                this.particles = [];
            }
            update() {

                //differential formula for lorenz system
                var _dx = this.a * (this.y - this.x) * this.dt;
                var _dy = (this.x * (this.b - this.z) - this.y) * this.dt;
                var _dz = (this.x * this.y - (this.c * this.z)) * this.dt;
                //move forward with dx,dy,dz 
                this.x += _dx;
                this.y += _dy;
                this.z += _dz;
                
                this.particles.push([this.x, this.y, this.z]);
                this.maxParticles=100;
            }

            show() {
                //save canvas transformations
                ctx.save();
                //move to the center of the screen
                ctx.translate(w / 2, h / 2);

                //finally draw all
                this.drawAll();

                //if maximum reached 
                // pop out first vertex
                if (this.particles.length > this.maxParticles) {
                    this.particles.splice(0, 1);
                }
                //a tracker
                //restore to initial transformations
                ctx.restore();

            }

            reset(){
                this.particles=[];
            }

            drawAll() {
                var _ppt = this.particles[0];
                //previous point
                ctx.strokeStyle = "#fff";
                if (!_ppt) {
                    //nopoints makes undefined
                    return;
                }

                //z vise sort
                // pts.sort(function(el,eln){ return eln[2]-el[2]   });

                this.particles.forEach((pt, i) => {

                    ctx.lineWidth = Math.abs((pt[2]) / 8);
                    var _p = project2D(
                        rotateY(pt, this.angle
                                ,this.particles[this.particles.length-1][2]
                                ) //for bounce effect
                    );


                    //not to draw a line from start to current point
                    
                    // ctx.strokeStyle = "hsl(" + ((this.maxParticles - i) % 361) + ", 100%, 50%)";
                    ctx.strokeStyle = "hsl(" + ((pt[2])*i/4 % 361) + ", 100%, 50%)";
                    // ctx.strokeStyle = "rgb(225,225,225)";

                    if (i != 0) {
                        ctx.beginPath();
                        ctx.moveTo(_ppt[0] * this.S, _ppt[1] * this.S);
                        ctx.lineTo(_p[0] * this.S, _p[1] * this.S);
                        // ctx.arc(_p[0] * this.S, _p[1] * this.S,1,0,PI*2);
                        ctx.stroke();

                    }
                    //draw a tiny tracker
                    if (i == pts.length - 1) {
                        ctx.fillStyle = 'red';
                        ctx.beginPath();
                        ctx.arc(_p[0] * this.S, _p[1] * this.S, 3, 0, Math.PI * 2);
                        ctx.fill();
                    }

                    var glitchTime=350;
                    //glitch
                    if(Math.random()*100<=0.005 && !this.glitch){
                        this.glitch=glitchTime;
                    }
                    if(this.glitch  > 0){
                        this.glitch--;
                        //!red
                        ctx.strokeStyle = "rgba(225,0,0,0.5)";
                        var shift=80*Math.random();
                        if (i != 0) {
                            ctx.beginPath();
                            ctx.moveTo(_ppt[0] * this.S + shift , _ppt[1] * this.S);
                            ctx.lineTo(_p[0] * this.S + shift, _p[1] * this.S);
                            // ctx.arc(_p[0] * this.S, _p[1] * this.S,1,0,PI*2);
                            ctx.stroke();

                        }
                        //draw a tiny tracker
                        if (i == pts.length - 1) {
                            ctx.fillStyle = 'red';
                            ctx.beginPath();
                            ctx.arc(_p[0] * this.S + shift, _p[1] * this.S, 3, 0, Math.PI * 2);
                            ctx.fill();
                        }

                        //!green 

                        ctx.strokeStyle = "rgba(0,225,0,0.5)";
                        shift=-80*Math.random();
                        if (i != 0) {
                            ctx.beginPath();
                            ctx.moveTo(_ppt[0] * this.S + shift , _ppt[1] * this.S);
                            ctx.lineTo(_p[0] * this.S + shift, _p[1] * this.S);
                            // ctx.arc(_p[0] * this.S, _p[1] * this.S,1,0,PI*2);
                            ctx.stroke();

                        }
                        //draw a tiny tracker
                        if (i == pts.length - 1) {
                            ctx.fillStyle = 'red';
                            ctx.beginPath();
                            ctx.arc(_p[0] * this.S + shift, _p[1] * this.S, 3, 0, Math.PI * 2);
                            ctx.fill();
                        }


                        //!blue
                        
                        ctx.strokeStyle = "rgba(0,0,225,0.5)";
                        shift=80*Math.random();
                        if (i != 0) {
                            ctx.beginPath();
                            ctx.moveTo(_ppt[0] * this.S + shift , _ppt[1] * this.S);
                            ctx.lineTo(_p[0] * this.S + shift, _p[1] * this.S);
                            // ctx.arc(_p[0] * this.S, _p[1] * this.S,1,0,PI*2);
                            ctx.stroke();

                        }
                        //draw a tiny tracker
                        if (i == pts.length - 1) {
                            ctx.fillStyle = 'red';
                            ctx.beginPath();
                            ctx.arc(_p[0] * this.S + shift, _p[1] * this.S, 3, 0, Math.PI * 2);
                            ctx.fill();
                        }



                    }

                    _ppt = _p;
                });

                this.angle += 0.001;
            }
        }



        //edit these to play around
        var numAttractors=20;
        var randScale=20;
        var lorenzScale=10;
        var system=[];
        for(var a=0;a<numAttractors;a++){

            system.push(new LorenzAttractor(
                randScale*(Math.random()*2-1)   ,
                randScale*(Math.random()*2-1)   ,
                randScale*(Math.random()*2-1)   ,
                lorenzScale
            ));
        }
        
        // ctx.lineJoin='round';
        function looper() {
            
            ctx.clearRect(0, 0, w, h);

            system.forEach(s => {
            
                s.update();
                s.show();

            });

            // //!necessary?
            // setTimeout(function(){
            //     requestAnimationFrame(looper);
            // }, 24 / 1000);
        }

        // looper();
        // 24 fps
        setInterval(looper, 24 / 1000);


        //! setTimeout(looper, 24 / 1000);


        ////////////////////////////////////////////
        //////////      3d , 2d FUNCTIONS   ////////
        ////////////////////////////////////////////




        //rotate along Y axis
        //matrix / linear algebra involved
        //
        //I AM REALLY THANKFUL FOR 3BLUE1BROWN linear algebra series
        // now i can deal with stuffs like 2d , 3d transformations and coordinate system :)
        // i highly suggest you watching that ..
        /// Thanks To "HARIS" for suggesting me the tutorials
        function rotateY(vert, angle,zLast) {
            var _x = vert[0];
            var _y = vert[1];
            var _z = vert[2];
            var _s = sin(angle);
            var _c = cos(angle);
            if(typeof(zLast)=='undefined'){
                zLast=_z;
            }
            return [
                _c * _x - _s * _z,
                _y,
                _s * _y + _c * _z
             
                //replace _z in the line above with zLast for bounce effect 
            ];
        }


        function project2D(vert, focus = 0) {
            var _x = vert[0];
            var _y = vert[1];
            var _z = vert[2];

            var _d = 100 / (100 - _z);
            // / (_z-focus);
            // divide each x , y , z by (_z-focus)
            return [
                _x * _d,
                _y * _d,
            ];
        }


        window.addEventListener('resize',function () {
            w = cnvs.width = innerWidth;
            h = cnvs.height = innerHeight;
            system.forEach(s=>{
                s.reset();
            })
        });
        //////////////EVENT LISTENERS
        // onresize = function () {
        //     w = cnvs.width = innerWidth;
        //     h = cnvs.height = innerHeight;
        //     system.forEach(s=>{
        //         s.reset();
        //     })
        // }

