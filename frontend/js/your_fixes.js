const url = "http://localhost:3000/API/";

$( document ).ready(function() {

    

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
        url: url+"ISSUE/USER",
        data: data,
        success: function(jsondata){

            console.log(jsondata);
            


            $.each(jsondata, function(i, fix){
                issue(i,fix);
            });
        }
    });
});

function issue(i,issue){
    let tbody = $('#fixes');
    let tr = $('<tr></tr>');
    let th = $("<th></th>").text(i);
    let tdStreet = $("<td></td>").text("wilgenlaan");
    let tdCity = $("<td></td>").text("1000, Brussels");
    let tdStatus = $("<td></td>").text("fixed");

    tr.append(th);
    tr.append(tdStreet);
    tr.append(tdCity);
    tr.append(tdStatus);

    tbody.append(tr);
}