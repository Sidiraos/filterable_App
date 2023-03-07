let url = "https://randomuser.me/api/?nat=fr&results=50";
const search = document.getElementById('search');
async function fetchData (url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            handleApp(data.results)
        }
        else {
            throw new Error(response.status + ": " + response.statusText)
        }
    } catch (error) {
        console.error(error)
    }
}


function getRandomUsers(data) {
    const randomUsers = {};
    data.forEach((user , index)=> {
        randomUsers[`user${index+1}`] = [[user.name.first + " " +  user.name.last , user.picture.medium] , user.email , user.cell]
    })
    console.log(randomUsers);
    addRandomInDOm(randomUsers);    
    return randomUsers;

}


fetchData(url);

function addRandomInDOm(randomUsers) {

    for(let user in randomUsers) {
        let name = randomUsers[user][0][0];
        let profilePicture = randomUsers[user][0][1];
        let email = randomUsers[user][1];
        let cell = randomUsers[user][2];
        document.querySelector('tbody').innerHTML += `
        <tr>
        <td>
            <img src=${profilePicture} alt="" srcset="" class="profile">
            <span class="${name}">${name}</span>
        </td>
        <td>${email}</td>
        <td>${cell}</td>
    </tr>
    `
    } 
}


document.getElementById('form').addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
}

function handleApp(data){
    const randomUsers = getRandomUsers(data);
    search.addEventListener('input', (e)=> {
        for(let user in randomUsers) {
            let name = randomUsers[user][0][0];
            let arrayName = name.split(" ").map(item => item.toLowerCase())
            let keySearched = arrayName.includes(e.target.value.toLowerCase());
            if (keySearched){
                console.log("item found");
            }            
            // console.log(keySearched);
            // if(!keySearched){
            //     document.querySelector(`${name}`).closest('tr').classList.add("notfound")
            // }else if (!e.target.value && document.querySelector(`${name}`).classList.contains("notfound")) {
            //     console.log("empty search");
            //     document.querySelector(`${name}`).classList.remove("notfound");
            // }
            
        }
    }); 
}
