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
        randomUsers[`user${index+1}`] = [[user.name.first + " " + user.name.last , user.name.first , user.name.last , user.name.last + " " + user.name.first] , user.picture.medium , user.email , user.cell]
    })
    console.log(randomUsers);
    addRandomInDOm(randomUsers);    
    return randomUsers;

}

function addRandomInDOm(randomUsers) {

    for(let user in randomUsers) {
        let name = randomUsers[user][0][0];
        let profilePicture = randomUsers[user][1];
        let email = randomUsers[user][2];
        let cell = randomUsers[user][3];
        document.querySelector('tbody').innerHTML += `
        <tr>
        <td>
            <img src=${profilePicture} alt="" srcset="" class="profile">
            <span class="${name}">${name}</span>
        </td>
        <td class = "email">${email}</td>
        <td class="cell">${cell}</td>
    </tr>
    `
    } 
}

function handleSubmit(e) {
    e.preventDefault();
}

function handleApp(data){
    const randomUsers = getRandomUsers(data);
    search.addEventListener('input', (e)=> {
        for(let user in randomUsers) {
            let names = randomUsers[user][0];
            let arrayName = names.map(item => item.toLowerCase())
            console.log(arrayName);
            let searchName = e.target.value.toLowerCase().trim();
            let founded  = arrayName.includes(searchName);
            const parent = document.getElementsByClassName(names[0])[0].closest('tr');
            if (founded){
                console.log("item found : " + names[0] + " " +founded);
                parent.classList.add('active');
            } else {
                parent.classList.remove('active');
            }
            document.querySelectorAll('tbody tr').forEach(item => {
                if(item.classList.contains('active') || e.target.value.length === 0){
                    item.style.display = "table-row";
                }else{
                    item.style.display = "none";
                }
            })
        }
    }); 
}

fetchData(url);
document.getElementById('form').addEventListener('submit', handleSubmit);
