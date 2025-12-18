
function calculateEndType(){
    const ok = Number(localStorage.getItem("okOrds")) * 1
    const good = Number(localStorage.getItem("goodOrds")) * 2
    const totalScore = ok + good;
    if (totalScore<24){
        makeEnd("Bad")
    }
    else if (totalScore<48){
        makeEnd("Ok")
    }
    else{
        makeEnd("Good")
    }
}

function makeEnd(endType){
    changeHeading(endType)
    changeText(endType)
}

function changeHeading(endType){
    const heading = document.getElementById("endingType")
    heading.textContent = endType + " Ending"
}

function changeText(endType){
    const desc = document.getElementById("endText")
    if (endType == "Bad"){
        desc.textContent = "Due to the lack of good hot chocolate this year, the toymakers at the North Pole struggled to find the motivation to make toys. Ultimately, they were only able to make 60% of the presents they needed. Although Santa was sad he loaded up his sleigh and took off the with reindeer. Knowing that many children wouldn't recieve their christmas presents this year, the christmas spirit at the North Pole quickly waned and the reindeer lost power. Once the residents of the North Pole learned how you ruined Christmas you were banished and permanetly put on the naughty list."
    }
}

function resetStorage(){
    localStorage.clear()
    sessionStorage.clear()
}