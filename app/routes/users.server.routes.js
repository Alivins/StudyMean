var users = require('../../app/controllers/users.server.controller'),
    passport = require('passport');

module.exports = function(app) {
    app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup);


    app.route('/signin')
        .get(users.renderSignin)
        .post(passport.authenticate('local', {
            successRedirect : '/',
            failureRedirect : '/signin',
            failureFlash : true
        }));

    app.get('/signout', users.signout);


};


//express에서는 라우팅 정의에 포함된 부분 문자열 앞에 콜론을 추가하면 매개변수로 취급한다.
//이 매개변수를 다른 라우팅 미들웨어를 수행하기 전에 먼저 app.param 메소드로 userId를 이용하여 userById메소드를 먼저 수행한다.

/*
    successRedirect : 이 속성은 패스포트에게 성공적으로 사용자를 인증한 다음에 요청을 전환할 위치를 알려준다.
    failureRedirect : 이 속성은 패스포트에게 사용자가 인증에 실해한 다음에 요청을 전환 할 위치를 알려준다.
    failureFlash : 이 속성은 패스포트에게 flash 메시지를 사용할 지 말지를 알려준다.
*/



