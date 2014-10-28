'use strict';

/**
 * @ngdoc function
 * @name forumApp.controller:NewReplyCtrl
 * @description
 * # NewReplyCtrl
 * Controller of the forumApp
 */
angular.module('forumApp')
  .controller('NewReplyCtrl', [
  	'$scope',
  	'$routeParams',
  	'questionFactory',
  	function ($scope, $routeParams, questionFactory) {
    // no longer used

      var menuOpen = false;

      $(".contribute").click(function(){
        if (menuOpen) {
          menuOpen = false;
          $(".messager").animate({bottom:'-145px'}, 200);
          $(".contribute").animate({bottom:'70px', opacity: 0.9}, 200);
        } else {
          menuOpen = true;
          $(".messager").animate({bottom:'0px'}, 200);
          $(".contribute").animate({bottom:'100px', opacity: 0.8}, 200);
        }

      });  

}]);