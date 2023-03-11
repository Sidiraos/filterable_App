let url = "https://randomuser.me/api/?nat=fr&results=50";
const search = document.getElementById('search');
let dataArray;
async function fetchData (url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const {results} = await response.json();
            orderList(results);
            dataArray = results;
            createUserList(dataArray)
        }
        else {
            throw new Error(response.status + ": " + response.statusText)
        }
    } catch (error) {
        console.error(error)
    }
}

function orderList(data) {
    data.sort((a, b) => {
        if(a.name.last < b.name.last){
            return -1;
        } else if (a.name.last > b.name.last){
            return 1
        }else {
            return 0;
        }
    })
}

function createUserList(array) {
    console.log("data Results" , array)
    array.forEach(user => {
        document.querySelector('tbody').innerHTML += 
        `
        <tr>
            <td>
                <img src=${user.picture.medium} alt="avatar picture" srcset="" class="profile">
                <span >${user.name.last} ${user.name.first}</span>
            </td>
            <td class = "email">${user.email}</td>
            <td class="cell">${user.cell}</td>
        </tr>
    `
    })
}

fetchData(url);

search.addEventListener('input', filterData);

function filterData(e) { 
    document.querySelector('tbody').textContent = '';
    const searchedString = e.target.value.replace(/\s/g, '').toLowerCase();
    const filteredArray = dataArray.filter(userData => searchForOccurence(userData))
    function searchForOccurence(userData) {
        if(userData.name.last.toLowerCase().includes(searchedString)){
            return true;
        } else if (userData.name.first.toLowerCase().includes(searchedString)){
            return true;
        } else if ((userData.name.last + userData.name.first).toLowerCase().includes(searchedString)){
            return true;
        } else if ((userData.name.first + userData.name.last).toLowerCase().includes(searchedString)){
            return true;
        }
    }
    console.log("liste filtré" , filteredArray)
    if (e.target.value.length === 0){
        createUserList(dataArray)

    } else {
        createUserList(filteredArray);
    }
 }
