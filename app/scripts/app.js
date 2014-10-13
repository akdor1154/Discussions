'use strict';

/**
 * @ngdoc overview
 * @name forumApp
 * @description
 * # forumApp
 *
 * Main module of the application.
 */

 angular
 .module('forumApp', [
  'ngRoute',
  'ngAnimate'
  ])

 .config(function($routeProvider, $locationProvider) {
    
    /* Where to direct unmatched urls */
    $routeProvider.otherwise({
      redirectTo: '/'
    })

    /* Where to direct urls */
    $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/question/:id', {
      templateUrl: 'views/question.html',
      controller: 'QuestionCtrl'
    });    
  })

 .factory('questionFactory', ['$http' , '$routeParams', function($http, $routeParams) {

    var questionFactory = {};
    var urlBase = 'http://localhost:3000/questions';

    questionFactory.getQuestions = function () {
        return $http.get(urlBase);
    };

    questionFactory.getQuestionById = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    questionFactory.addQuestion = function (post) {
        return $http.post(urlBase, post);
    };

    questionFactory.updateQuestion = function (editedQuestion) {
        console.log(urlBase + '/' + $routeParams.id);
        return $http.put(urlBase + '/' + $routeParams.id, editedQuestion);
    };

    questionFactory.deleteQuestion = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    questionFactory.loadNext = function() {
      console.log('hello :)');
    }
    return questionFactory;
}])

.factory('toolboxFactory', [function() {

  /* Provides useful browser events, properties and functions to controllers */
  var toolboxFactory = {};

  toolboxFactory.findObjectInArray = function(array, property, value){
    for (var i = 0, len = array.length; i < len; i++) {
      if (array[i][property] === value) {
        return {
          objectFound: array[i],
          objectPosition: i
        }
      }
    }
    return {
      objectFound: -1,
      objectPosition: -1
    }
  };

  toolboxFactory.documentHeight = function() {
    var D = document;
    return Math.max(
      Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
      Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
      Math.max(D.body.clientHeight, D.documentElement.clientHeight)
      )
  };

  toolboxFactory.scrollMax = function(callback) {
    window.onscroll = function() {
      if ((window.innerHeight + window.scrollY) >= toolboxFactory.documentHeight()) {
        callback();
      }
    };
  };

  return toolboxFactory;
}]);