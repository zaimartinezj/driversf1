const $formYear = document.querySelector("#formYear");
const $actualTable = document.querySelector("#actualTable");
const $table = document.querySelector('.table')
const $boxTable = document.querySelector("#box-table");
const $yearMessage = document.querySelector("#yearTable");
const $botonMenu = document.querySelector(".icon");
const $panel = document.querySelector(".panel");
const $icon = document.querySelector("i");
const $aMenu = document.querySelectorAll("a");

const validateYear = (year) => {
    if (year >= 1950 && year <= 2021){
        return true;
    }
    else{
        return false;
    }
}

const getDrivers =  (year) => {

    return new Promise ((resolve,reject)=>{

    fetch(`https://ergast.com/api/f1/${year}/driverStandings.json`)
        .then(res=>res.json())
        .then(data=>{
        
        const listDrivers = [...data.MRData.StandingsTable.StandingsLists[0].DriverStandings];
        resolve(listDrivers);
        
        })

    })

}


const getTableDrivers = async (year="current") => {
    const listDrivers = await getDrivers(year);

    const $fragment = document.createDocumentFragment();
    listDrivers.map((elem)=>{
        const linkWikipedia = elem.Driver.url;
        const tr = document.createElement('tr');
        const a = document.createElement('a');
        tr.className = "driver";
        tr.setAttribute('data-url', linkWikipedia);
        const position = document.createElement('td');
        const driverName = document.createElement('td');

        a.appendChild(document.createTextNode(elem.Driver.givenName + ' ' + elem.Driver.familyName));

        a.setAttribute('href', linkWikipedia);
        a.setAttribute('target', "_blank");

        driverName.appendChild(a);

        const pointsDriver = document.createElement('td');
        const contructorTeam = document.createElement('td');
        position.innerHTML = elem.position; //ambas formas funcionan
        pointsDriver.appendChild(document.createTextNode(elem.points));
        contructorTeam.innerHTML = elem.Constructors[0].name;
        

        const listElemTable = [position,driverName,pointsDriver,contructorTeam]
        for (const elem of listElemTable){
            tr.appendChild(elem);
        }

        $fragment.appendChild(tr);
    })
        $actualTable.innerHTML='';
        $actualTable.appendChild($fragment);
        
}


getTableDrivers();


$formYear.addEventListener("submit", (e)=>{
    e.preventDefault();
    const year = $formYear.year.value;
    
    if(validateYear(year)){
        $yearMessage.innerHTML = `Season: ${year}`
        getTableDrivers(year); 
    }else{
        $yearMessage.innerHTML = "Insert a valid year"
    }
    
})

document.addEventListener("click", (e)=>{

    if(e.target.matches(".linkMenu")){
        $panel.classList.remove("is-active")
        e.target.classList.replace("fa-times", "fa-bars")
        $icon.classList.replace("fa-times", "fa-bars")
    }

    if(e.target.matches(".iconclass")){
        if(e.target.classList.contains("fa-bars")){
            $panel.classList.toggle("is-active");
            e.target.classList.replace("fa-bars", "fa-times")
            $icon.classList.replace("fa-bars", "fa-times")
        }else if(e.target.classList.contains("fa-times")){
            $panel.classList.toggle("is-active");
            e.target.classList.replace("fa-times", "fa-bars")
            $icon.classList.replace("fa-times", "fa-bars")
        }
        
    }
    
})

