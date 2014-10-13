'use strict';

/**
 * @ngdoc function
 * @name forumApp.controller:QuestionCtrl
 * @description
 * # QuestionCtrl
 * Controller of the forumApp
 */
angular.module('forumApp')
  .controller('QuestionCtrl', [
  	'$scope', 
  	'$routeParams', 
  	'questionFactory', 
  	function ($scope, $routeParams, questionFactory) {
    
    var questionId = $routeParams.id;
	$scope.editedQuestion = {};

    questionFactory.getQuestionById(questionId)
        .success(function (quest) {
            $scope.question = quest;
			$scope.editedQuestion.title = $scope.question.title;
			$scope.editedQuestion.author = $scope.question.author;
			$scope.editedQuestion.comment = $scope.question.comment;
        })
        .error(function (error) {
            $scope.status = 'Unable to load questions: ' + error.message;
        });


      $scope.updateQuestion = function() {
        questionFactory.updateQuestion($scope.editedQuestion)
          .success(function () {
          	console.log($scope.editedQuestion);
			$scope.question.title = $scope.editedQuestion.title;
			$scope.question.author = $scope.editedQuestion.author;
			$scope.question.comment = $scope.editedQuestion.comment;
    		$scope.status = 'Question uploaded';
          })
          .error(function (error) {
			$scope.status = 'Unable to load questions: ' + error.message;
          });
      };

  }]);
