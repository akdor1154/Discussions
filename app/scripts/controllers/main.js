'use strict';

/**
 * @ngdoc function
 * @name forumApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the forumApp
 */
angular.module('forumApp')
  .controller('MainCtrl', [
  	'$scope',
  	'$routeParams',
  	'questionFactory',
  	'toolboxFactory',
  	function ($scope, $routeParams, questionFactory, toolboxFactory) {
    
    questionFactory.getQuestions()
      .success(function (quest) {
          $scope.questions = quest;
      })
      .error(function (error) {
          $scope.status = 'Unable to load questions: ' + error.message;
      });
    
    toolboxFactory.scrollMax(function(){
    	// $apply runs the 'digest loop'
    	$scope.$apply(function() {
    		questionFactory.loadNext();
    	});
    });

    $scope.deleteQuestion = function(id) {
      questionFactory.deleteQuestion(id);
      var index = toolboxFactory.findObjectInArray($scope.questions, '_id', id).objectPosition;
      console.log(index);
      if(index!== -1)
        $scope.questions.splice(index, 1);
    };


    // just testing making filters :)
    $scope.searchtest = "";
     $scope.searchAuthor = function (question){
        if (question.author.indexOf($scope.searchtest)!=-1) {
                return true;
            }
            return false;
      };

}]);