var User = require('mongoose').model('User'),
    passport = require('passport');

var getErrorMessage = function (err) {
    var message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'UserID already exists';
                break;
            default:
                message = 'Something went Wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }
    return message;
};

exports.renderSignin = function (req, res, next) {
    if (!req.user) {
        res.render('signin', {
            title: 'Sign-in Form',
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/');
    }
};

exports.renderSignup = function (req, res, next) {
    if (!req.user) {
        res.render('signup', {
            title: 'Sign-up Form',
            messages: req.flash('error')
        });
    } else {
        return res.redirect('/');
    }
};

exports.signup = function (req, res, next) {
    if (!req.user) {
        var user = new User(req.body);
        var message = null;

        user.provider = 'local';

        user.save(function (err) {
            console.log('save');
            if (err) {
                message = getErrorMessage(err);

                req.flash('error', message);
                return res.redirect('/signup');
            }
            req.login(user, function (err) {
                if (err) return next(err);
                return res.redirect('/');
            });
        });
    } else {
        return res.redirect('/');
    }
};

exports.signout = function (req, res) {
    req.logout();
    res.redirect('/');
};

// 먼저 mongoose 모듈을 사용해서 정의해 두었던 User 모델을 불러온다. 그리고 create 라는 컨트롤러 메소드를 만들어서
// 새로운 User 인스턴스, 즉 User 에 정의된 스키마에 맞춘 새로운 document 형식을 만들고 거기에는 request.body 데이터를 넣음
// MongoDB의 세이브 명령어를 사용해 mongoDB에 저장할 것 이고 에러가 난다면 next(err)오류를 다음 미들웨어로 넘기고,
// 에러가 없다면 저장된 데이터를 json방식으로 응답할것이다.