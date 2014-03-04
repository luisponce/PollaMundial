(function() {
    var po = document.createElement('script');
    po.type = 'text/javascript';
    po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js?onload=OnLoadCallback';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);
})();

(function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js?onload=onLoadCallback';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();

function signinCallback(authResult) {
    if (authResult.status.signed_in) {
        // Update the app to reflect a signed in user
        // Hide the sign-in button now that the user is authorized, for example:
        document.getElementById('register').setAttribute('style', 'display: none');
        
        gapi.client.load('plus','v1', function(){
            var request = gapi.client.plus.people.get( {'userId' : 'me'} );

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
