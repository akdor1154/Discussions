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
    
      
      $scope.addQuestion = function() {
        questionFactory.addQuestion($scope.newPost)
          .success(function () {
            $scope.newPost.title = "";
            $scope.newPost.author = "";
            $scope.newPost.comment = "";
          })
          .error(function (error) {
              $scope.status = 'Unable to load questions: ' + error.message;
          });
      };
}]);