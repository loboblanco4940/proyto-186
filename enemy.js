AFRAME.registerComponent("enemy-attack", {
    init: function () {        
        setInterval(this.shootEnemyAlien, 2000)
    },
    shootEnemyAlien: function () {
        var scene = document.querySelector("#scene");

    
        var enemyAlien = document.querySelectorAll(".enemy1");   
            
        for (var i = 0; i < enemyAlien.length; i++) {

     
        var laser = document.createElement("a-entity");

        laser.setAttribute("class","laser")
        laser.setAttribute("gltf-model", "./models/laser/scene.gltf");
        laser.setAttribute("dynamic-body", { mass: 0 });
     
        var pos=enemyAlien[i].getAttribute("position")

        laser.setAttribute("position", {
            x: pos.x,
            y: pos.y,
            z: pos.z,
        });
        laser.setAttribute("scale", {
            x: 0.05,
            y: 0.05,
            z: 0.05,
        });

        scene.appendChild(laser);      

        var position1 = new THREE.Vector3();
        var position2 = new THREE.Vector3();


        var player =  document.querySelector("#nave").object3D
        var enemy_laser = laser.object3D;
        player.getWorldPosition(position1);
        enemy_laser.getWorldPosition(position2);

    
        var direction = new THREE.Vector3();

        direction.subVectors(position1, position2).normalize();

        laser.setAttribute("velocity", direction.multiplyScalar(20));


      
        var element = document.querySelector("#countLife");
        var playerLife = parseInt(element.getAttribute("text").value);

      
        laser.addEventListener("collide", function (e) {
           
            if (e.detail.body.el.id === "nave") {               
                if (playerLife > 0) {
                    playerLife -= 1;
                    element.setAttribute("text", {
                        value: playerLife
                    });
                }
                if (playerLife <= 0) {
                
                    var txt = document.querySelector("#over");
                    txt.setAttribute("visible", true);

              
                    var El = document.querySelectorAll(".enemy")
                    for (var i = 0; i < El.length; i++) {
                        scene.removeChild(El)
                    }

                }

            }
        });

    }
    },
    

});
