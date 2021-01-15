//Create variables here
var dog ,happyDog,dogImg
var database 
var foodS , foodStock,foodObj
var milk
var feed ,addFood
var feedTime,lastFed;

//var count=0


function preload(){
  //load images here
  happyDog=loadImage("happydog.png")
  dogImag=loadImage("Dog.png")
  


}

function setup() {
  createCanvas(1000, 500);
  database=firebase.database()
  
  
  dog =createSprite(800,300,20,20)
  dog.addImage(dogImag)
  dog.scale=0.2

  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)

  foodObj=new Food();


  



  foodRef=database.ref('food');
  foodRef.on("value",function(data){
    foodStock =data.val();
  })

  
}


function draw() {  
    background(46,139,87);

    fill ("white")
    textSize(16)

    feedTime=database.ref('feedTime');
  feedTime.on("value",function(data){
    lastFed=data.val();
  })

  
    if(lastFed >= 12){
      text("Last Fed : "+ lastFed % 12  +" PM"   ,350,60)
    }else if (lastFed===0){
      text("Last Feed : 12AM",350,60);

    }else{
      text("Last Feed : " + lastFed +" AM",350,60)
    }
    

    
    
    
    if(foodStock !== undefined){
      text("Food Remaning  : "+ foodStock ,800,40)
    }
  foodObj.display();
  foodObj.getFoodStock();

  drawSprites();
  
 
}






function feedDog(){
  dog.addImage(happyDog);

 foodObj.deductFood(foodStock);
 database.ref('/').update({
   food:foodStock ,
   feedTime: hour()
   
 })
}


function addFoods(){

  foodStock++;
  database.ref('/').update({
    food:foodStock
  })
}