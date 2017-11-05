var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username : String ,
    userid :  {
        type : String ,
        unique : true ,
        required : 'Username is required'  ,
        trim : true
    },
    password : {
        type : String ,
        validate : [
            function(password) {
                return password && password.length > 6;
            }, 'Password should be longer'
        ]
    },

    salt : {
        type : String
    },

    provider : {
        type : String ,
        required : 'Provider is required'
    },

    providerId : String ,

    providerData : {} ,

    email : {
        type : String ,
        match : [/.+\@.+\..+/, "pleas fill a valid e-mail address"]
    } ,
    created : {
        type : Date,
        default : Date.now
    }
});


UserSchema.pre('save', function(next){
    if(this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'),
            'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

UserSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).
    toString('base64');
};

UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUserid = function(userid, suffix, callback) {
    var _this = this;
    var possibleUserid = userid + (suffix || '');

    _this.findOne({
        userid : possibleUserid
    }, function(err,user) {
        if(!err) {
            if(!user) {
                callback(possibleUserid);
            }else{
                return _this.findUniqueUserid(userid, (suffix || 0) + 1, callback);
            }
        }else{
            callback(null);
        }
    });
};



UserSchema.set('toJSON',{ getters : true , virtuals : true});
mongoose.model('User',UserSchema);



//먼저 mongoose 의 Schema 생성자를 통해서 UserSchema 객체를 정의하고 User 모델을 정의하기 위해 UserShema를 이용함

