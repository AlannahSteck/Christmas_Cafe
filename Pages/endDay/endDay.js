const textArea = document.getElementById("textArea");

function genStats(){
    const getThese = ["goodOrds", "okOrds", "badOrds"];
    const textBefore = ["Satisfied Customers","Somewhat Satisfied Customers","Unsatisfied Customers"];
    for (let i=0;i<getThese.length;i++){
        const stat = document.createElement("p");
        const  statTopic = document.createElement("h4");
        stat.appendChild(statTopic);
        statTopic.textContent = textBefore[i] + " : ";
        console.log(sessionStorage.getItem(getThese[i]))
        stat.textContent = sessionStorage.getItem(getThese[i])
        textArea.appendChild(stat)
    }
}

function saveAndClear(){
    sessionStorage.clear()
}