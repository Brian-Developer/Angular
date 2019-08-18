(function(){
  "use strict";
  angular.module('CourseApp').
    service('dataService',[
      '$q',
      '$http',
      function($q,$http){
        var urlBase = '/wai-assignment/server/';

        //method to retrieve all films
        this.getFilms = function(){
          var defer = $q.defer(),
            getfilmUrl = urlBase + 'index.php?action=listFilms';
          //Make an ajax call
          $http.get(getfilmUrl,{cache: true}).
            success(function(response){
              defer.resolve({
                data : response.results,
              });
            }).
            error(function(err){
                defer.reject(err);
              });
              //the call to getFilms returns this promise
              return defer.promise;
        };
        //method to retrieve category
        this.getCategory = function(){
          var defer = $q.defer(),
            categoryUrl = urlBase  + 'index.php?action=listCategory';
          //Make an ajax call
          $http.get(categoryUrl,{cache: true}).
            success(function(response){
              defer.resolve({
                data: response.results,
              });
            }).
            error(function(err){
                defer.reject(err);
              });
              //the call to getCategory returns this promise
              return defer.promise;
        };

        this.searchFilms = function(termcode){
          var defer = $q.defer(),
            searchUrl = urlBase  + 'index.php?action=listFilms&term=' + termcode;
            console.log(searchUrl);
          //Make an ajax call
          $http.get(searchUrl ,{cache: true}).
            success(function(response){
              defer.resolve({
                data: response.results,
              });
            }).
            error(function(err){
                defer.reject(err);
              });
              //the call to searchFilms returns this promise
              return defer.promise;
        };

        this.searchCategory = function(catecode){
          var defer = $q.defer(),
            searchCategoryUrl = urlBase  + 'index.php?action=listFilms&category=' + catecode;
            //Make an ajax call
          $http.get(searchCategoryUrl ,{cache: true}).
            success(function(response){
              defer.resolve({
                data: response.results,
              });
            }).
            error(function(err){
                defer.reject(err);
              });
              //the call to getCourses returns this promise
              return defer.promise;
        };

        this.insertnote = function(id, note){
          var defer = $q.defer(),
            insertUrl = urlBase  + 'index.php?action=updateNotes&id=' + id  + 'comment='  + note ;
            //Make an ajax call
            console.log(insertUrl);
            var data  = { filmid: id, comment : note};
          $http.post(insertUrl ,data).
            success(function(response){
              defer.resolve({
                data: response,
              });
            }).
            error(function(err){
                defer.reject(err);
              });
              //the call to insertnote returns this promise
              return defer.promise;
        };

        this.listActors = function(id){
          var defer = $q.defer(),
            listactorUrl = urlBase  + 'index.php?action=listActors&film_id=' + id;
            //Make an ajax call
          $http.get(listactorUrl ,{cache: true}).
            success(function(response){
              defer.resolve({
                data: response.results,
              });
            }).
            error(function(err){
                defer.reject(err);
              });
              //the call to listActors returns this promise
              return defer.promise;
        };

        this.filmDetail = function(id, title){
          var defer = $q.defer(),
            filmdetailUrl = urlBase  + 'index.php?action=filmdetail&film_id=' + id;
          //Make an ajax call
          $http.get(filmdetailUrl ,{cache: true}).
            success(function(response){
              defer.resolve({
                data: response.results,
              });
            }).
            error(function(err){
                defer.reject(err);
              });
              //the call to filmDetail returns this promise
              return defer.promise;
        };

        this.listNote = function(id){
          var defer = $q.defer(),
            listnoteUrl = urlBase  + 'index.php?action=listNotes&film_id=' + id;
          //Make an ajax call
          $http.get(listnoteUrl ,{cache: true}).
            success(function(response){
              defer.resolve({
                data: response.results,
              });
            }).
            error(function(err){
                defer.reject(err);
              });
              //the call to listNote returns this promise
              return defer.promise;
        };

        this.checkLogin = function(){
          var defer = $q.defer(),
            checkUrl = urlBase  + 'index.php?action=checkLogin';
          //Make an ajax call
          $http.get(checkUrl ,{cache: true}).
            success(function(response){
                defer.resolve({
                data: response.userprofile,
                status: response.status,
              });
            }).
            error(function(err){
                defer.reject(err);
              });
              //the call to checkLogin returns this promise
              return defer.promise;
        };

        this.logout = function(){
          var defer = $q.defer(),
            checkUrl = urlBase  + 'index.php?action=logout';
          //Make an ajax call
          $http.get(checkUrl ,{cache: true}).
            success(function(response){
              defer.resolve({
                data: response.userprofile,
                status: response.status,
              });
            }).
            error(function(err){
                defer.reject(err);
              });
              //the call to logout returns this promise
              return defer.promise;
        };

        this.validate = function(email, passwd){
          var defer = $q.defer(),
            logincodeUrl = urlBase  + 'index.php?action=login&userID='+email+'&passwd='+passwd;
          //Make an ajax call
          console.log(logincodeUrl);
          var data  = { email: email, password : passwd};
          $http.post(logincodeUrl ,data).
            success(function(response){
              defer.resolve({
                data: response,
              });
            }).
            error(function(err){
                defer.reject(err);
              });
              //the call to validate returns this promise
              return defer.promise;
        };
      }
    ]);
}());//end of controller.js
