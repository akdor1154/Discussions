'use strict';

/**
 * @ngdoc function
 * @name forumApp.controller:NewQuestionCtrl
 * @description
 * # NewQuestionCtrl
 * Controller of the forumApp
 */
angular.module('forumApp')
  .controller('NewQuestionCtrl', [
  	'$scope',
  	'$routeParams',
  	'questionFactory',
  	function ($scope, $routeParams, questionFactory) {

      var menuOpen = false;

      $(".contribute").click(function(){
        if (menuOpen) {
          menuOpen = false;
          $(".writer").animate({bottom:'-145px'}, 200);
          $(".contribute").animate({bottom:'70px', opacity: 1}, 200);
          $(".contribute").css({'-webkit-transform' : 'rotate('+ 0 +'deg)',
                 '-moz-transform' : 'rotate('+ 0 +'deg)',
                 '-ms-transform' : 'rotate('+ 0 +'deg)',
                 'transform' : 'rotate('+ 0 +'deg)'});
        } else {
          menuOpen = true;
          $(".writer").animate({bottom:'0px'}, 200);
          $(".contribute").animate({bottom:'155px', opacity: 1}, 200);
           $(".contribute").css({'-webkit-transform' : 'rotate('+ 45 +'deg)',
                 '-moz-transform' : 'rotate('+ 45 +'deg)',
                 '-ms-transform' : 'rotate('+ 45 +'deg)',
                 'transform' : 'rotate('+ 45 +'deg)'});
       }

      });  

      $scope.addQuestion = function() {
        questionFactory.addQuestion($scope.newPost)
          .success(function () {
            $(".writer").animate({bottom:'-145px'}, 200);
            $(".contribute").animate({bottom:'70px', opacity: 1}, 200);
            $scope.newPost.title = '';
            $scope.newPost.author = '';
            $scope.newPost.comment = '';
          })
          .error(function (error) {
              $scope.status = 'Unable to load questions: ' + error.message;
          });
      };
}]);