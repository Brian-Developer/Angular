(function(){
  "use strict";
  angular.module('CourseApp').
  // Set Application Controller
    controller('AppController',
      [
        '$scope',
        'dataService',
        function($scope, dataService){
            // Validate the user logged in
            var checkLogin = function(){

            dataService.checkLogin().then(

              function(response){
                console.log(response.status);
                               // If user logged in
                if(response.status == 'logged in'){
                  // User able to view, write and save the notes
                  $scope.logged = true;
                  $scope.addnote = true;
                  $scope.check = response.data;
                  $scope.$broadcast("logged", $scope.check);
                }
                // Check user logged in
                $scope.$on('CheckLogin', function(evt,data){
                console.log(data);
                if(data != ''){
                  // User able to view, write and save the notes
                  $scope.check = data;
                  $scope.logged = true;
                  $scope.addnote = true;
                }
                });
                // Validate user logged out
                $scope.$on('CheckLogout', function(evt,data){
                console.log(data);
                if(data != ''){
                // Disable the note editting
                    $scope.logged = false;
                    $scope.addnote = false;
                }
                });                            
              },
              function(err){
                $scope.status = "Unable to load data " + err;
              },
              function(notify){
                console.log(notify);
              }
            );// End of checkLogin().then
          };// End function checkLogin      
          checkLogin(); // Call back the function checkLogin()
        }
      ]
      // Search Controller
    ).controller('SearchController',
      [
        '$scope',
        'dataService',
        '$rootScope',
        function($scope, dataService, $rootScope){
          // Run the function seachFilms()
            $scope.searchFilms = function(termcode){

            dataService.searchFilms(termcode).then(
              function(response){
                $scope.pagi = false;
                // Reponse the data results
                if(response.data.length == 0){
                  $rootScope.films = "No film found";
                  $rootScope.$broadcast("SendDown", $rootScope.films);
                }
                else{
                  $rootScope.films = response.data;
                  $rootScope.$broadcast("SendDown", $rootScope.films);
                }  
              },
              function(err){
                $scope.status = "Unable to load data " + err;
              },
              function(notify){
                console.log(notify);
              }
            );//end of searchFilms().then
          };//end function searchFilms()
        }
      ]
      //Login Controller
    ).controller('LoginController',
      [
        '$scope',
        'dataService',
        '$window',
        '$location',
        function($scope, dataService, $window,$location){
          // Validate the username and password
         $scope.validate = function(email, passwd){
            dataService.validate(email, passwd).then(
              function(response){
                // Success Login
                if(response.data.length == 0){
                  alert("Invalid Username or Password");
                }
                else if( response.data == "Invalid email or password"){
                  alert("Invalid email or password");
                }
                else{
                $scope.logins = response.data;
                console.log(response);
                $scope.$emit('CheckLogin',$scope.logins);
                }
              },
              function(err){
                $scope.status = "Unable to load data " + err;
              },
              function(notify){
                console.log(notify);
              }
            );//end of validate().then
          };//end function validate()
          // Logout function
          $scope.logout = function(){
            dataService.logout().then(
              function(response){
                // Logout success
                $scope.logins = response.status;
                console.log(response);         
                $scope.$emit('CheckLogout',$scope.logins);
              },
              function(err){
                $scope.status = "Unable to load data " + err;
              },
              function(notify){
                console.log(notify);
              }
            );// End of logout().then
          };// End of logout()

             $scope.$on('LoginStatus', function(evt,data){
               $scope.logged = data.status;
              console.log(data.username);
            });
        }
      ]
      // Show all films Controller
    ).controller('FilmController',
      [
        '$scope',
        'dataService',
        '$location',
        function($scope, dataService, $location){
          // Get all films
          var getFilms = function(){
              $scope.pagi = true;
              $scope.itemsperpage = 50;
              dataService.getFilms().then(
              function(response){
                $scope.numLimit = 100; // Set limit character in Film Description
                // Set the pagination
                $scope.films = response.data.slice(0, $scope.itemsperpage);
                if(response.data.length % $scope.itemsperpage > 0){
                  $scope.page = (response.data.length-response.data.length % $scope.itemsperpage)/$scope.itemsperpage + 1;
                }
                else {
                  $scope.page = response.data.length/$scope.itemsperpage;
                }
                $scope.pageCount = function(num) {
                return new Array(num);   
                }
                $scope.returnvalue = function(num) {
                  var begin = ((num - 1) * $scope.itemsperpage),
                      end = begin + $scope.itemsperpage;

                   $scope.films = response.data.slice(begin, end);
                  }
                
              },
              function(err){
                $scope.status = "Unable to load data " + err;
              },
              function(notify){
                console.log(notify);
              }
            );//end of getFilms().then
          };//end function getFilm()
          $scope.$on("SendDown", function(evt, data){
            if(data == "No film found"){
              $scope.nofilm = "No film found";
              $scope.films = "";
              $scope.pagi = false;
            }
            else{
              $scope.nofilm = "";
              $scope.films = data;
              $scope.pagi = false;
            }
          });
          $scope.$on("SendDownn", function(evt, data){
            if (data.length == 0){
              $scope.nofilm = "No match film";
              $scope.pagi = false;  
              $scope.films = "";
            }
            else{
              $scope.nofilm = "";
              $scope.films = data;
              $scope.pagi = false;
            }
          });
          getFilms(); //call the method just defined
          // Set filmDetail function to show film detail
          $scope.filmDetail = function(id, title){
            dataService.filmDetail(id, title).then(
              function(response){
                // Show film details
                $scope.filmdetail = true;               
                $scope.filmdetails = response.data;
                $location.path(title);
                $scope.$broadcast("filmDetailData", $scope.filmdetails );
              },
              function(err){
                $scope.status = "Unable to load data " + err;
              },
              function(notify){
                console.log(notify);
              }
            );//end of filmDetail().then
          };//end function filmDetail

          // Set the listActors function to display all actors
          $scope.listActors = function(id){
            dataService.listActors(id).then(
              function(response){
                // Display actors
                $scope.filmdetail = true;
                $scope.listactors = response.data;
                $scope.$broadcast("listactors", $scope.listactors );
              },
              function(err){
                $scope.status = "Unable to load data " + err;
              },
              function(notify){
                console.log(notify);
              }
            );//end of listActors().then
          };//end function listActors

          // Set the listNote function to display the note
          $scope.listNote = function(id){
            dataService.listNote(id).then(
              function(response){
                // Display the note
                $scope.filmdetail = true;
                $scope.listnote = response.data;
                $scope.$broadcast("note", $scope.listnote);
              },
              function(err){
                $scope.status = "Unable to load data " + err;
              },
              function(notify){
                console.log(notify);
              }
            );//end of getStudents().then
          };//end function getCourses
        }
      ]
      // Category Controller
    ).controller('CategoryController',
      [
        '$scope',
        'dataService',
        '$rootScope',
        function($scope, dataService, $rootScope){
         
          // Set getCategory function to get all Categories
          var getCategory = function(){
            dataService.getCategory().then(
              function(response){
                // Show categories
                $scope.categories = response.data;
              },
              function(err){
                $scope.status = "Unable to load data " + err;
              },
              function(notify){
                console.log(notify);
              }
            );//end of getCategory().then
          };//end function getCategory
          // Set seachGate function to show results after select category
          $scope.searchCate = function(category){
            dataService.searchCategory(category.category_id).then(
              function(response){
                // Display the results
                $scope.pagi = false;
                $rootScope.films = response.data;
                console.log(response);
                $rootScope.$broadcast("SendDownn", $rootScope.films );
              },
              function(err){
                $scope.status = "Unable to load data " + err;
              },
              function(notify){
                console.log(notify);
              }
            );//end of searchCate().then
          };//end function searchCate
          getCategory();
       
        }
      ]
      // Show Film Detail Controller
    ).controller('showFilmController',
      [
        '$scope',
        'dataService',
        '$location',
        function($scope, dataService, $location){
         $scope.$on("filmDetailData", function(evt, data){
            $scope.filmdetails = data;
            $scope.film_id  = $scope.filmdetails[0].film_id;
            $location.path('/films/'+ $scope.filmdetails[0].film_id);
          });
         $scope.$on("listactors", function(evt, data){
            $scope.listactors = data;
            });
         $scope.$on("note", function(evt, data){
          if (data != null){
            $scope.listnote = data;
            $scope.note = data[0].comment;
            console.log(data);
          }
          else {
            $scope.note = "";
          }
          });
         // Insert and Update the new or exsiting note
         $scope.insertnote = function(note){
            dataService.insertnote($scope.film_id, note).then(
              function(response){
                // Update Successfulls
                $scope.films = response.data;
                console.log(response);
                alert("Update success");
              },
              function(err){
                $scope.status = "Unable to load data " + err;
              },
              function(notify){
                console.log(notify);
              }
            );//end of insertnote().then
          };//end function insertnote

        }
      ]
    );//end of AppController
}());//end of controller.js
