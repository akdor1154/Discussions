'use strict';

/**
 * @ngdoc function
 * @name forumApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the forumApp
 */
angular.module('forumApp')
  .controller('MainCtrl', ['$scope', '$routeParams', 'questionFactory', 'browserService', function ($scope, $routeParams, questionFactory, browserService) {
    
    $scope.questions = questionFactory.getAll();

    browserService.scrollMax(function(){
    	// $apply runs the digest loop: http://angular-tips.com/blog/2013/08/watch-how-the-apply-runs-a-digest/
    	$scope.$apply(function() {
    		questionFactory.loadNext();
    	});
    });
    // console.log('bottom!');
}]);