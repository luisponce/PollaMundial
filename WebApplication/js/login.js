// <editor-fold defaultstate="collapsed" desc="APIs Redes Sociales">
////window.fbAsyncInit = function() {
//
//    FB.init({
//        appId: '1548434868714434',
//        status: true, // check login status
//        cookie: true, // enable cookies to allow the server to access the session
//        xfbml: true  // parse XFBML
//    });
//
//    // Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
//    // for any authentication related change, such as login, logout or session refresh. This means that
//    // whenever someone who was previously logged out tries to log in again, the correct case below
//    // will be handled.
//    FB.Event.subscribe('auth.authResponseChange', function(response) {
//        // Here we specify what we do with the response anytime this event occurs.
//        if (response.status === 'connected') {
//            // The response object is returned with a status field that lets the app know the current
//            // login status of the person. In this case, we're handling the situation where they
//            // have logged in to the app.
//            testAPI();
//        } else if (response.status === 'not_authorized') {
//            // In this case, the person is logged into Facebook, but not into the app, so we call
//            // FB.login() to prompt them to do so.
//            // In real-life usage, you wouldn't want to immediately prompt someone to login
//            // like this, for two reasons:
//            // (1) JavaScript created popup windows are blocked by most browsers unless they
//            // result from direct interaction from people using the app (such as a mouse click)
//            // (2) it is a bad experience to be continually prompted to login upon page load.
//            FB.login();
//        } else {
//            // In this case, the person is not logged into Facebook, so we call the login()
//            // function to prompt them to do so. Note that at this stage there is no indication
//            // of whether they are logged into the app. If they aren't then they'll see the Login
//            // dialog right after they log in to Facebook.
//            // The same caveats as above apply to the FB.login() call here.
//            FB.login();
//        }
//    });
//};

// Load the SDK asynchronously

//(function(d) {
//    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
//    if (d.getElementById(id)) {
//        return;
//    }
//    js = d.createElement('script');
//    js.id = id;
//    js.async = true;
//    js.src = "//connect.facebook.net/en_US/all.js";
//    ref.parentNode.insertBefore(js, ref);
//}(document));

// Here we run a very simple test of the Graph API after login is successful.
// This testAPI() function is only called in those cases.
//function testAPI() {
//    console.log('Welcome!  Fetching your information.... ');
//    FB.api('/me', function(response) {
//        console.log('Good to see you, ' + response.name + '.');
//    });
//}

(function() {
    var po = document.createElement('script');
    po.type = 'text/javascript';
    po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js?onload=OnLoadCallback';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);
})();

(function() {
    var po = document.createElement('script');
    po.type = 'text/javascript';
    po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js?onload=onLoadCallback';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);
})();

function signinCallback(authResult) {
    if (authResult.status.signed_in) {
        // Update the app to reflect a signed in user
        // Hide the sign-in button now that the user is authorized, for example:
//        document.getElementById('register').setAttribute('style', 'display: none');

        gapi.client.load('plus', 'v1', function() {
            var request = gapi.client.plus.people.get({'userId': 'me'});

            request.execute(function(resp) {
                var user = new Object();
                user.id = resp.emails[0].value;
                user.name = resp.displayName;
                sessionStorage.user = JSON.stringify(user);

//                console.log('Email: ' + user.id);
//                console.log('Display Name: ' + user.name);
                console.log('sessionStorage: ' + sessionStorage.user)
            });
        });
    } else {
        // Update the app to reflect a signed out user
        // Possible error values:
        //   "user_signed_out" - User is signed-out
        //   "access_denied" - User denied access to your app
        //   "immediate_failed" - Could not automatically log in the user
        console.log('Sign-in state: ' + authResult['error']);
    }
}

// </editor-fold>
