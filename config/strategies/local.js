var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function() {
    passport.use(new LocalStrategy(function(username, password , done) {
        User.findOne({
            userid : username
        }, function(err, user){
            if(err) {
                return done(err);
            }

            if(!user) {
                return done(null, false, {
                    message : 'Unknown user'
                });
            }
            if(!user.authenticate(password)) {
                return done(null, false, {
                    message : 'Invalid password'
                });
            }
            return done(null, user);
        });
    }));
};

/*passport 모듈과 passport-local의 Strategy 객체, 그리고 인증을 사용할 User 몽구스 모델을 require로 올리는 작업부터 시작함
LocalStrategy 메소드는 인수로 콜백함수를 받는다.
User 몽구스 모델을 사용해 사용자가 입력한 username 과 일치하는 username 을 User 모델에서찾을 것 이다.
찾은 뒤 username 이 일치 하지 않은면 'Unknown user' 라는 메시지로 응답 할 것 이고
만약 username 이 같다면 password 를 비교하고 이 역시 같은지 틀린지 비교하여 틀리다면 'invalid password'
메시지를 retuen 할 것 이다. */



