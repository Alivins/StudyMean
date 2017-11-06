exports.render = function(req,res) {
    res.render('index', {
        title : 'Hello World',
        user : JSON.stringify(req.user)
    });
};
//javascript 값을 json 문자열로 반환한다.




