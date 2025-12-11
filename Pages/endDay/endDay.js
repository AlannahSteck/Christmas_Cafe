const textArea = document.getElementById("textArea");

function genStats(){
    const getThese = ["goodOrds", "okOrds", "badOrds","goodOrds", "okOrds", "badOrds"];
    const textBefore = ["Satisfied Customers","Somewhat Satisfied Customers","Unsatisfied Customers","Total Satisfied Customers","Total Somewhat Satisfied Customers","Total Unsatisfied Customers"];
    for (let i=0;i<getThese.length;i++){
        const stat = document.createElement("p");
        const  statTopic = document.createElement("h4");
        const textDiv = document.createElement("div")
        statTopic.textContent = textBefore[i] + " : ";
        textDiv.appendChild(statTopic);
        console.log(sessionStorage.getItem(getThese[i]))
        stat.textContent = sessionStorage.getItem(getThese[i])
        textDiv.appendChild(stat)
        textDiv.className = "stat";
        textArea.appendChild(textDiv)

    }
}

function saveAndClear(){
    sessionStorage.clear()
}