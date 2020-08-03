var form,database

function setup() {
  createCanvas(displayWidth , displayHeight);
  //createSprite(400, 200, 50, 50);
  database =  firebase.database();
  form  = new Form();
}
function draw() {
  background(255,255,255); 
  //drawSprites();

  form.display();


}