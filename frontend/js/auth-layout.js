var auth = osmAuth({
    oauth_secret: consumer_secret,
    oauth_consumer_key: consumer_key
});

let userid;

function done(err, res) {
    if (err) {
        document.getElementById('user').innerHTML = 'error! try clearing your browser cache';
        document.getElementById('user').style.display = 'block';
        return;
    }
    var u = res.getElementsByTagName('user')[0];
    userid = u.getAttribute('id'); 
    localStorage.setItem("userid",userid);   
    var o = {
        display_name: u.getAttribute('display_name')
    };
    for (var k in o) {
        document.getElementById(k).innerHTML = o[k];
    }
    document.getElementById('user').style.display = 'block';
}

function update() {
    if (auth.authenticated()) {
        document.getElementById('authenticate').className = 'd-none';
        document.getElementById('logout').className = 'nav-link login-btn';
        document.getElementById('your-issues').style.display = 'block';

        auth.xhr({
            method: 'GET',
            path: '/api/0.6/user/details'
        }, done);

    } else {
        document.getElementById('authenticate').className = 'nav-link login-btn';
        document.getElementById('logout').className = 'd-none';
        document.getElementById('your-issues').style.display = 'none';
        document.getElementById('user').style.display = 'none';
    }
}


update();
