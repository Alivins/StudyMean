// 각 서비스는
// -$routeParams : noRoute 모듈이 제공하면, 다음에 정의할 AngularJS라우터의 라우터 매개변수에 대한 참조를 담고있다.
// -$location : 애플리케이션의 탐색을 제어한다.
// -$Authentication : 예전에 만든 인증된 사용자 정보를 제공하는 서비스 이다.
// -Articles : 앞에서 만든 서비스 이며. RESTful 종단점과 통신할수 있는 메소드 집합을 제공한다.

angular.module('articles').controller('ArticlesController',['$scope',
    '$routeParams','$location','Authentication','Articles',
    function($scope,$routeParams,$location,Authentication,Articles) {
        $scope.authentication = Authentication;


        $scope.create = function() {
            var article = new Articles({
                title : this.title,
                content : this.content
            });

            article.$save(function(response) {
                $location.path('articles/' + response._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function() {
            $scope.articles = Articles.query();
        };

        $scope.findOne = function() {
            $scope.article = Articles.get({
                articleId : $routeParams.articleId
            });
        };

        $scope.update = function() {
            $scope.article.$update(function(){
                $location.path('articles/' + $scope.article._id);
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.delete = function(article) {
            if (article) {
                article.$remove(function() {
                    for (var i in $scope.articles) {
                        if($scope.articles[i] === article) {
                            $scope.articles.splice(i, 1);
                        }
                    }
                });
            } else {
                $scope.article.$remove(function() {
                    $location.path('articles');
                });
            }
        };
    }

]);





