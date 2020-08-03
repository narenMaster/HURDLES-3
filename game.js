class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gamestate');
      gameStateRef.on("value",function(data){
         gamestate = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gamestate: state
      });
    }
  
    async start(){
      if(gamestate === 0){
        player = new Player();
        var playerCountRef = await database.ref('playercount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      p1 = createSprite(100,200);
      p2 = createSprite(300,200);
      p3 = createSprite(500,200);
      p4 = createSprite(700,200);
  
     p1.addImage("p1" , carImg);
     p2.addImage("p2" , car2Img);
     p3.addImage("p3" , car3Img);
     p4.addImage("p4" , car4Img)
  
      players = [p1, p2, p3, p4];
  
    
    }
  
    play(){
      form.hide();
  
      Player.getPlayerInfo();
      player.getCarsAtEnd();
      if(allPlayers !== undefined){
  
        background(rgb(198 , 135 , 103));
       image(track , 0 , -displayHeight *4 ,displayWidth , displayHeight * 5);
        //var display_position = 100;
        
        //index of the array
        var index = 0;
  
        //x and y position of the cars
        var x = 170;
        var y;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
          x = x + 200;
          //use data form the database to display the cars in y direction
          y = displayHeight - allPlayers[plr].distance;
          cars[index-1].x = x;
          cars[index-1].y = y;
  
          if (index === player.index){
            stroke(20);
            fill("blue");
            ellipse(x,y,80,80);
  
            cars[index - 1].shapeColor = "red";
            camera.position.x = displayWidth/2;
            camera.position.y = cars[index-1].y
          }
         
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
  
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
  
  
      if(player.distance > 3850){
        gameState = 2 ;
        player.rank += 1 ;
        
  
      }
  
      drawSprites();
    }
  
    end(){
      console.log(player.rank);
      console.log("GAME 0 OVER");
    }
  }
  