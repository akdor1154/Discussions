'use strict';

/**
 * @ngdoc function
 * @name forumApp.controller:QuestionCtrl
 * @description
 * # QuestionCtrl
 * Controller of the forumApp
 */
angular.module('forumApp')
  .controller('QuestionCtrl', ['$scope', '$routeParams', 'questionFactory', function ($scope, $routeParams, questionFactory) {
    var questionId = $routeParams.id;
    $scope.question = questionFactory.getById(parseInt(questionId));
  }]);
