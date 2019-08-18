(function(){
  "use strict";
  //start a new application, a module in Angular
  //Application name
  //dependencies are passed through an array
  angular.module('CourseApp',['ngRoute']).config(
    [
      '$routeProvider', function ($routeProvider){
        $routeProvider.
          when('/search',{
            templateUrl : 'script/partials/course-list.html',
            controller : 'CourseController'
          }).
          when('/films/:filmid',{
            templateUrl : '/js/partials/film_detail.html',
            controller : 'showFilmController'
          }).
          otherwise({
            redirectTo : '/'
          });
      }
    ]
  );//end of config method
}());//end if IIFE
