const textArea = document.getElementById("textArea");

function updateLocal(statName){
    console.log(localStorage)
    try{
        var prevStat = Number(localStorage.getItem(statName));
    }
    catch{
        var prevStat = 0
    }
    const shiftStat = Number(sessionStorage.getItem(statName))
    localStorage.setItem(statName,shiftStat+prevStat)
    console.log(localStorage)
}

function updateDays(){
    const prevDays = Number(localStorage.getItem("daysLeft"))
    console.log(prevDays)
    console.log(prevDays-1)
    localStorage.setItem("daysLeft",prevDays-1)
}

function genHeader(){
    const heading = document.getElementById("heading");
    updateDays();
    const days = 7-Number(localStorage.getItem("daysLeft"))
    console.log(days)
    console.log(localStorage)
    heading.textContent = "Day " + days  + " Shift Stats"

}

function genStats(){
    const getThese = ["goodOrds_s","okOrds_s", "badOrds_s","goodOrds_l", "okOrds_l", "badOrds_l"];
    const textBefore = ["Satisfied Customers","Somewhat Satisfied Customers","Unsatisfied Customers","Total Satisfied Customers","Total Somewhat Satisfied Customers","Total Unsatisfied Customers"];
    for (let i=0;i<getThese.length;i++){
        const getAndWhere = getThese[i].split("_")
        const stat = document.createElement("p");
        const  statTopic = document.createElement("h4");
        const textDiv = document.createElement("div")
        statTopic.textContent = textBefore[i] + " : ";
        textDiv.appendChild(statTopic);
        if (getAndWhere[1] == "s"){
          stat.textContent = sessionStorage.getItem(getAndWhere[0])
        }
        else{
             updateLocal(getAndWhere[0])
             stat.textContent = localStorage.getItem(getAndWhere[0])
        }
        textDiv.appendChild(stat)
        textDiv.className = "stat";
        textArea.appendChild(textDiv)
    }
}

function saveAndClear(){
    sessionStorage.clear()
    localStorage.clear()
}