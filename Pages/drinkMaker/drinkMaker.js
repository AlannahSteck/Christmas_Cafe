const body = document.getElementsByTagName("body")[0];
const footer = document.getElementsByTagName("footer")[0];
const optionsOne = ["Small","Medium","Large"]; //size
const optionsTwo = ["White","Milk","Dark"]; //chocolate type
const optionsThree = ["Marshmallow","Whip Cream","None"]; //Toppings
const optionsFour = ["Peppermint Stick","Cinnamon Stick","Nutmeg","Caramel Drizzle","Chocolate Shavings","Coffee","None"]; //Addons
//sess storage should be [ordersLeft, goodOrds, okOrds, badOrds, requestedSize, requestedChocolate, requestedToppings, requestedAddons, selectedSize(=medium), selectedChoclate(=milk), selectedToppings(=none), selectedAddons(=none)]
//sess storage should be reset after each order except keys 1-4 which reset each after a day and are saved to cookies

function genSelections(optionList = optionsOne){
    const pageNum = findPageNum(optionList[0])
    const currentSelection = findSelection(pageNum)
    console.log(sessionStorage.getItem(currentSelection))
    if(optionList != optionsOne){
      const arrowIcon = document.createElement("img");
      arrowIcon.alt = "Go Back";
      arrowIcon.src = "../../Resources/drinkMaker/nonDrinks/arrow.png";
      arrowIcon.id = "backArrow";
      arrowIcon.setAttribute("onclick", `changeButtons("${pageNum}","back")`);
      footer.appendChild(arrowIcon);
    }
    for (let i=0; i<optionList.length; i++){
        const newOptionDiv = document.createElement("div");
        footer.appendChild(newOptionDiv);
        const name = document.createElement("p");
        name.textContent = optionList[i];
        newOptionDiv.appendChild(name);
        const icon = document.createElement("img");
        newOptionDiv.appendChild(icon);
        icon.alt = optionList[i]
        if(icon.alt==sessionStorage.getItem(currentSelection)){
            newOptionDiv.id = "chosen";
        }
        let iconSrcFileName = optionList[i].replace(" ","_");
        icon.src = "../../Resources/drinkMaker/nonDrinks/"+iconSrcFileName+".png"
        icon.className = "ingreIcon"
        icon.setAttribute("onclick", `addToDrink(this, ${pageNum}, "${currentSelection}")`);
    }
    if(optionList != optionsFour && sessionStorage.getItem(currentSelection) != "null"){
      finalArrow(pageNum)
    }
    else if(optionList == optionsFour && sessionStorage.getItem(currentSelection) != "null"){
      doneButton()
    }
}

function finalArrow(pageNum){
    const finalIcon = document.createElement("img");
    finalIcon.alt = "Continue";
    finalIcon.src = "../../Resources/drinkMaker/nonDrinks/arrow.png";
    finalIcon.setAttribute("onclick", `changeButtons("${pageNum}","forward")`);
    footer.appendChild(finalIcon);
}

function doneButton(){
    const finalIcon = document.createElement("img");
    const backToOrder = document.createElement("a");
    backToOrder.href = "../../index.html"
    finalIcon.alt = "Done";
    finalIcon.src = "../../Resources/drinkMaker/nonDrinks/done.png";
    finalIcon.id = "doneIcon"
    backToOrder.appendChild(finalIcon);
    footer.appendChild(backToOrder);
}

function changeButtons(pageNum, direction){
    if (direction == "forward"){
        pageNum++;
    }
    else{
        pageNum--;
    }
    footer.innerHTML ='';
    if (pageNum == 1){
        genSelections()
    }
    else if (pageNum == 2){
        genSelections(optionsTwo)
    }
    else if (pageNum == 3){
        genSelections(optionsThree)
    }
    else{
        genSelections(optionsFour)
    }
    
}

function findPageNum(firstOpt){
    if (firstOpt == "Small"){
        return 1;
    }
    else if (firstOpt == "White"){
        return 2;
    }
    else if (firstOpt == "Marshmallow"){
        return 3;
    }
    else{
        return 4;
    }
}

function addToDrink(addThis,page,prevSelectedName){ 
    const prevSelected = sessionStorage.getItem(prevSelectedName)
    const prevChosen = document.getElementById("chosen");
    try{
        prevChosen.removeAttribute("id");
    }
    catch{}
    console.log("reached")
    if (prevSelected=="null" && page==4){
        console.log("done")
        doneButton()
    }
    else if (prevSelected=="null" && page!=4){
        console.log("arrow")
        finalArrow(page)
    }
    console.log(prevSelected)
    addThis.parentElement.id = "chosen";
    if (page == 1){
        sessionStorage.setItem("selectedSize",addThis.alt)
    }
    else if (page == 2){
        sessionStorage.setItem("selectedChocolate",addThis.alt)
    }
    else if (page == 3){
        sessionStorage.setItem("selectedToppings",addThis.alt)
    }
    else{
        sessionStorage.setItem("selectedAddons",addThis.alt)
    }
    console.log(sessionStorage)
}

function findSelection(page){
    if (page == 1){
        return "selectedSize"
    }
    else if (page == 2){
        return "selectedChocolate"
    }
    else if (page == 3){
        return "selectedToppings"
    }
    else{
        return "selectedAddons"
    }
}
