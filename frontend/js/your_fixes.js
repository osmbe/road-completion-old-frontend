//const url = "http://localhost:3000/API/";
const url = "https://road-completion.osm.be/backend/API/";
let fixedIssues;



$(document).ready(function () {
    getData();
});


function getData() {
    let token = localStorage.getItem('https://www.openstreetmap.orgoauth_token');
    let secret = localStorage.getItem('https://www.openstreetmap.orgoauth_token_secret');
    let userid = localStorage.getItem("userid");
    let data = {
        c_key: consumer_key,
        c_scrt: consumer_secret,
        token: token.slice(1, -1),
        secret: secret.slice(1, -1),
        user_id: userid
    };

    $.ajax({
        type: "post",
        url: url + "ISSUE/USER",
        data: data,
        success: function (jsondata) {

            if(jsondata.length == 0){
                empty();
            }else{
                $.each(jsondata, function (i, fix) {
                    issue(i, fix);
                });
            }
            
        }
    });
}

function issue(i, issue) {

    let tbody = $('#fixes');
    let tr = $('<tr></tr>');
    let th = $("<th></th>").text(++i);
    let tdStreet = $("<td></td>").text(issue.street);
    let tdCity = $("<td></td>").text(issue.city);
    let tdStatus = $("<td></td>").text(issue.status == 'false-pos' ? 'false positive': issue.status);

    tr.append(th);
    tr.append(tdStreet);
    tr.append(tdCity);
    tr.append(tdStatus);

    tbody.append(tr);
}

function empty(){
    let tbody = $('#fixes');
    let tr = $('<tr></tr>');
    let tdStatus = $('<td colspan="4" class="text-center" style="font-style: italic;"></td>').text("You have no fixed issues so far");

    tr.append(tdStatus);

    tbody.append(tr);
}