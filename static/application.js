var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName,
['ngResource','ngRoute','users','example','articles']);

mainApplicationModule.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);

if(window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function(){
    angular.bootstrap(document, [mainApplicationModuleName]);
});


// 애플리케이션의 모듈이름을 포함한 변수를 생성했고, 주 애플리케이션 모듈을 생성하기 위해 이어지는 
// angular.module()메소드에서 이를 사용함 그리고 나서 angular 객체의 jqList기능을 이용해서 document.ready 이벤트에 함수를 결합함
// 이함수에서 angular.bootstap() 메소드를 사용해 앞서 정의한 주 애플리케이션 모듈로 새로운 angular.js 애플리케이션을 시작하게 만듬