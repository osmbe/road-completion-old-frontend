var auth = osmAuth({
    oauth_secret: '9WfJnwQxDvvYagx1Ut0tZBsOZ0ZCzAvOje3u1TV0',
    oauth_consumer_key: 'WLwXbm6XFMG7WrVnE8enIF6GzyefYIN6oUJSxG65'
});

function done(err, res) {
    if (err) {
        document.getElementById('user').innerHTML = 'error! try clearing your browser cache';
        document.getElementById('user').style.display = 'block';
        return;
    }
    var u = res.getElementsByTagName('user')[0];
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
        
        auth.xhr({
            method: 'GET',
            path: '/api/0.6/user/details'
        }, done);

    } else {
        document.getElementById('authenticate').className = 'nav-link login-btn';
        document.getElementById('logout').className = 'd-none';
        document.getElementById('user').style.display = 'none';
    }
}

function eventHandler(){
    document.getElementById('authenticate').onclick = function () {
        auth.authenticate(function () {
            update();
        });
    };

    document.getElementById('logout').onclick = function () {
        auth.logout();
        update();
    };
}

eventHandler();
update();
