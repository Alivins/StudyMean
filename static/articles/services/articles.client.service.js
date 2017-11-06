angular.module('articles').factory('Articles', ['$resource',
    function ($resource) {
        return $resource('api/articles/:articleId', {
            articleId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]);

// CRUD 모듈이 API 종단점과 쉽게 통신하기 위해 $resource 팩토리 메소드를 활용하는 단일 Angular.js 서비스 사용을 권장한다.
// 서비스가 $resource 팩토리를 사용하는 방식은 넘기는 세 인수가 자원 종단점을 위한 기초 URL,
// 글의 다큐먼트 _id필드를 사용하는 라우팅 매개변수, PUT HTTP 메소드를 사용하는 update() 메소드로 자원 메소드를 확장하는 동작인수다.