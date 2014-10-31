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
    'socketFactory',
    'toolboxFactory', 
  	function ($scope, $routeParams, questionFactory, socketFactory, toolboxFactory) {

    // Holds the array of comment objects
    $scope.comments = [];

    // Grab the question id from the route params
    var questionId = $routeParams.id;

    // Tells socket.io that participant has entered the question's discussion page 
    socketFactory.emit('enter discussion', {
      username: 'bobby',
      question_id: questionId
    });

    // MAY NEED AN ON-LEAVE EVENT TOO? 

    socketFactory.on('new message', function (data) {
      if (data.question_id === questionId) {
        $("html, body").animate({scrollTop:$(document).height()}, 'slow');
        $scope.comments = $scope.comments.concat(data);
        // socketFactory.emit('my other event', { my: 'data' });
      }
  });


    // Make an empty object for the edited question.
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

            var searchResults = toolboxFactory.findObjectInArray(
                      questionFactory.questions.questionList,
                      '_id',
                      questionId
                    );
                    searchResults.referenceToObject.title = $scope.editedQuestion.title;
                    searchResults.referenceToObject.author = $scope.editedQuestion.author;
                    searchResults.referenceToObject.comment = $scope.editedQuestion.comment;


        		$scope.status = 'Question uploaded';
          })
          .error(function (error) {
			$scope.status = 'Unable to load questions: ' + error.message;
          });
      };



  $scope.addComment = function () {
    if ($scope.newComment !== '') {
      var message = {
        question_id: questionId,
        message: $scope.newComment
      }
      $scope.newComment = '';
      $("html, body").animate({scrollTop:$(document).height()}, 'slow');
      socketFactory.emit('new message', message);
      $scope.comments = $scope.comments.concat(message);
      // console.log('sent: ', $scope.newComment);
      console.log($scope.comments);
    }
  };

    var sendOnEnter = true;
    $('.reply-box').on('keydown', function(e) {
        if (e.which === 13) {
            if (sendOnEnter) {            
              e.preventDefault();
              $scope.$apply($scope.addComment());
            }
        }
    });

    var messagerOpen = false;

    var closeWriter = function () {
        messagerOpen = false;
        $(".messager").animate({bottom:'-145px'}, 200);
        $(".contribute").animate({bottom:'55px', right:'90px', opacity: 1}, 200);
        $("#cross").css({'-webkit-transform' : 'rotate('+ 0 +'deg)',
         '-moz-transform' : 'rotate('+ 0 +'deg)',
         '-ms-transform' : 'rotate('+ 0 +'deg)',
         'transform' : 'rotate('+ 0 +'deg)'});
    }

    var openWriter = function () {
        messagerOpen = true;
        $(".messager").animate({bottom:'0px'}, 200);
        $(".contribute").animate({bottom:'155px', right:'50%', opacity: 1}, 200);
        $("#cross").css({'-webkit-transform' : 'rotate('+ 45 +'deg)',
         '-moz-transform' : 'rotate('+ 45 +'deg)',
         '-ms-transform' : 'rotate('+ 45 +'deg)',
         'transform' : 'rotate('+ 45 +'deg)'});
    }

    $(".contribute").click(function(){
      if (messagerOpen) {
        closeWriter();
      } else {
        openWriter();
      }
    });  



  }]);
