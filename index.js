//sess storage should be [ordersLeft, goodOrds, okOrds, badOrds, requestedSize, requestedChocolate, requestedToppings, requestedAddons, selectedSize(=medium), selectedChocolate(=milk), selectedToppings(=none), selectedAddons(=none)]
//sess storage should be reset after each order except keys 1-4 which reset each after a day and are saved to cookies
const textbox = document.getElementById("dialouge");

class Item{
    constructor(itemName, phrases){
        this.name = itemName;
        this.descriptions = phrases; 
    }

    describeProduct(){
      const randIndex = Math.floor(Math.random() * this.descriptions.length); 
      return this.descriptions[randIndex];
    }

    giveName(){
      return this.name;
    }
    
}

function genSess(){
    if(sessionStorage.length == 0){
        const addKeys  = ["ordersLeft", "goodOrds", "okOrds", "badOrds", "requestedSize", "requestedChocolate", "requestedToppings", "requestedAddons", "selectedSize", "selectedChocolate", "selectedToppings", "selectedAddons"];
        for (let i=0;i<addKeys.length;i++){
            if (i==0){
                var val = 5;
            }
            else if (i>0 && i<4){
                var val = 0;
            }
            else{
                var val = null
            }
            sessionStorage.setItem(addKeys[i],val);
        }
    }
    console.log(sessionStorage);
}

function genOrder(){
    if (sessionStorage.getItem("requestedSize") == "null"){
    console.log("iuhfgh")
    const optionsOne = ["Small-I want a small._I'm not very thirsty._I'm on a diet._I want 6 oz of hot chocolate.","Medium-I want a medium._I'm kind of thirsty._I want a decent amount of hot chocolate but nothing too expensive._I want 8 oz of hot chocolate.","Large-I need the biggest size you got!_I'm really thirsty._I'm absolutely freezing!_I want 10 oz of hot chocolate."]; //size
    const optionsTwo = ["White-Give me white chocolate._Give me chocolate that's creamy but not too milky._I also want to try something different so give me the least popular kind of chocolate you have._I don't like chocolate made with cocoa solids but any other kind is fine.","Milk-Give me milk chocolate._Give me chocolate that's sweet but don't give me white chocolate._Give me the most popular kind of chocolate you have._Give me.. I forgot the name. You know the chocolate that matches the color of coffee? Give me that one.","Dark-Give me dark chocolate._I'm craving some bitter chocolate._Give me the healthiest chocolate you have._Give me that MrBeast Bar flavored chocolate."]; //chocolate type
    const optionsThree = ["Marshmallow-Put marshmallows on top._I'm in the mood for something light and fluffy._Put that cushion in my drink._I'm kind of craving smores.","Whip Cream-Put whip cream on top._I'm in the mood for something soft and creamy._Top it some Chantilly._Could you give me topping that reminds me of my time in Italy?","None-Don't give me a topping._I'm not really craving anything.__Don't add any toppings that are creamy or fluffy."]; //Toppings
    const optionsFour = ["Peppermint Stick-Lastly add some Peppermint._Oh and add something minty!_Finally could you give me something with multiple flavors? I want a surprise!_Last of all can you add something to make my drink more.. Christmas-y?","Cinnamon Stick-Lastly add some Cinnamon._Oh and add something that will give my drink some flavor!_I kind of miss cinnamon challenge._Last of all as much as I love Christmas I kind of want something that reminds me of fall.","Nutmeg-Lastly add some nutmeg._Oh and add that one thing nobody orders!_I miss being in Connecticut. Could add something that would remind me of being there?_Last of all could you add that one tropical fruit seed? I forgot the name.","Caramel Drizzle-Lastly add some Caramel._Oh and add something sweet and rich!_Finally can you make my drink taste kind of like rolos?_Last of all can drizzle something on top?","Chocolate Shavings-Lastly add some extra Chocolate._Oh and I like my chocolate unique!_Finally I want extra chocolate in my hot chocolate._Last of all can you add something to make my drink more look more fancy?","Coffee-Lastly add some coffee._Oh and add something energizing!_Finally I want a mocha._Sorry did you say something? I'm a little tired today.","None-That should be everything._Otherwise keep my drink cheap as possible.__Oh and Merry Christmas!"]; //Addons 
    const allOpts = [optionsOne,optionsTwo,optionsThree,optionsFour];
    const requestedSess = ["requestedSize", "requestedChocolate", "requestedToppings", "requestedAddons"]
    let order = []
    for (let i=0;i<allOpts.length;i++){
        console.log(`catergory ${i}`);
        currentOpts =[];
        for (let otherI=0;otherI<allOpts[i].length;otherI++){ //naming style inspired by Jonas //// adds undefined for last index 1-3
            const option = allOpts[i][otherI].split("-")
            const optDesc = option[1].split("_")
            const newOpt = new Item(option[0],optDesc); //add more descriptions later
            currentOpts.push(newOpt)
        }
        console.log(currentOpts);
        const randIndex = Math.floor(Math.random() * currentOpts.length); 
        const orderedChoice = currentOpts[randIndex];
        sessionStorage.setItem(requestedSess[i],orderedChoice.giveName())
        console.log(sessionStorage);
        order.push(orderedChoice.describeProduct());
    }
    changeOrder(order); //change to improve dialouge
    changeAcknowledgeButton(true);
    }
    else{ //then heres where they grade the order :D its all coming together
    gradeOrder()
    afterOrderSess()
    changeAcknowledgeButton(false);
    
}
}

function changeOrder(orderList){
    textbox.textContent = `${orderList[0]} ${orderList[1]} ${orderList[2]} ${orderList[3]}`;
}

function gradeOrder(){
    const requestedSess = ["requestedSize", "requestedChocolate", "requestedToppings", "requestedAddons"];
    const selectedSess = ["selectedSize", "selectedChocolate", "selectedToppings", "selectedAddons"];
    let score = 0;
    for (let i=0;i<requestedSess.length;i++){
        if (sessionStorage.getItem(requestedSess[i]) == sessionStorage.getItem(selectedSess[i])){
            score++;
        }
    }
    console.log
    if (score == 4){
        var responses = ["Oh thank you hun! It's perfect.","MMM! This is delicious! Thanks!","WOW! this drink tastes so good! It's gonna make my day 3x better! Thanks!","Where did you learn to make hot chocolate like this? This tastes wonderful!","Not bad. I hope you get a raise."];
        var rank = "goodOrds";
    }
    else if (score == 3){
        var responses = ["...","Not exactly what I wanted, but it's fine.","It tastes a bit off.. but it's drinkable.","Doesn't taste as good as I expected.","Thanks.. I guess?"];
        var rank = "okOrds";
    }
    else{
        var responses = ["What is THIS? I want a refund!","PLEH! What did you do to my drink?","Were you even listening to me?!","If you're the only person serving hot chocolate around here Christmas is doomed.","I paid money for this.."];
        var rank = "badOrds";
    }
    const randIndex = Math.floor(Math.random() * responses.length); 
    textbox.textContent = responses[randIndex];
    let newRank = Number(sessionStorage.getItem(rank));
    newRank++;
    sessionStorage.setItem(rank, newRank);
    console.log(sessionStorage)


}

function afterOrderSess(){
   const resetThese =["requestedSize", "requestedChocolate", "requestedToppings", "requestedAddons", "selectedSize", "selectedChocolate", "selectedToppings", "selectedAddons"];
   for (let i=0;i<resetThese.length;i++){
    sessionStorage.setItem(resetThese[i],null);
   }
   let remainder = Number(sessionStorage.getItem("ordersLeft"));
   remainder--;
   sessionStorage.setItem("ordersLeft", remainder);
}

function changeVisible(hide){
    const charSprite = document.getElementById("sprite");
    const dialougeBox = document.getElementById("textBox");
    if (hide==true){
        charSprite.className = "hidden";
        dialougeBox.className = "hidden";
    }
    else{
        charSprite.classList.remove("hidden");
        dialougeBox.classList.remove("hidden");
    }
}

function changeAcknowledgeButton(makeLink){
    const continueGame = document.getElementById("acknowledgeDialouge");
    try{
        continueGame.removeAttribute("onclick");
    }
    catch{

    }
    continueGame.innerHTML = ''
    if (makeLink==true){
        const drinkLink = document.createElement("a");
        drinkLink.href = "Pages/drinkMaker/drinkMaker.html";
        drinkLink.textContent = "ok";
        continueGame.appendChild(drinkLink);
    }
    else{
        continueGame.textContent = "Next!"
        continueGame.setAttribute("onclick", "changeToNext()");
    }
}

function changeToNext(){
    changeVisible(true);
    setTimeout(() => {
    genOrder()
    changeVisible(false)}, 3000);

}