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
  'ngRoute'
  ])

 .config(function($routeProvider, $locationProvider) {
    /* Where to direct unmatched urls */
    $routeProvider.otherwise({redirectTo: '/'})
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

 .factory('questionFactory', [function() {
  /* Provides question data to controllers */

  var questionFactory = {};

  var i = 0;

  var questions = [
    {
      _id: 10000,
      title: 'I made this forum! ... And I would like your feedback on how useful it is! Also feel free to give me huge amounts of money. I am always happy to accept money.',
      author: 'nathansherburn',
      comment: 'hello everyone from nathan!'
    }
  ];

  var questionsRaw = [
    {
      _id: 10001,
      author: 'jon_li',
      title: 'who likes bananas!?',
      comment: 'hello everyone from jon!'
    },
    {
      _id: 10002,
      author: 'jamie28',
      title: 'I teach eng1030',
      comment: 'hello everyone from jamie!'
    },
    {
      _id: 10003,
      author: 'ashan123',
      title: 'Hi my name is Ashan',
      comment: 'hello everyone from ashan!'
    },
    {
      _id: 10004,
      author: 'don25',
      title: 'this is my first post',
      comment: 'hello everyone from don!'
    }
  ];

  questionFactory.getAll = function () {
    return questions;
  };

  // replace this by node/mongo backend functionality
  questionFactory.getById = function (id) {
    for (var i=0; i<questions.length; i++){
      if (questions[i]._id === id) {
        return questions[i];
      }
    }
  };

  questionFactory.loadNext = function () {
    if (i<=3) {
      questions.push(questionsRaw[i]);
      i++;
    }
  };

  return questionFactory;
}])

.factory('browserService', [function() {
  /* Provides useful browser events and properties to controllers */

  var documentHeight = function() {
    var D = document;
    return Math.max(
      Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
      Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
      Math.max(D.body.clientHeight, D.documentElement.clientHeight)
      )
  };

  var scrollMax = function(callback) {
    window.onscroll = function() {
      if ((window.innerHeight + window.scrollY) >= documentHeight()) {
        callback();
      }
    };
  };

  return {
    documentHeight: documentHeight,
    scrollMax: scrollMax
  }
}]);