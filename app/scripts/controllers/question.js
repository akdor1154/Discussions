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

    $scope.comments = [];

    socketFactory.on('new message', function (data) {
      console.log(data);
      $("html, body").animate({scrollTop:$(document).height()}, 'slow');
      $scope.comments = $scope.comments.concat(data);
      // socketFactory.emit('my other event', { my: 'data' });
  });

  $scope.addComment = function () {
    if ($scope.newComment !== '') {
      var message = {
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
        if (e.which == 13) {
            if (sendOnEnter) {            
              e.preventDefault();
              $scope.$apply($scope.addComment());
            }
        }
    });

      var menuOpen = false;

      var degrees = 45;
      $(".contribute").click(function(){
        if (menuOpen) {
          menuOpen = false;
          $(".messager").animate({bottom:'-145px'}, 200);
          $(".contribute").animate({bottom:'70px', opacity: 0.9}, 200);
          $(".contribute").css({'-webkit-transform' : 'rotate('+ 0 +'deg)',
                 '-moz-transform' : 'rotate('+ 0 +'deg)',
                 '-ms-transform' : 'rotate('+ 0 +'deg)',
                 'transform' : 'rotate('+ 0 +'deg)'});
        } else {
          menuOpen = true;
          $(".messager").animate({bottom:'0px'}, 200);
          $(".contribute").animate({bottom:'100px', opacity: 0.8}, 200);
          $(".contribute").css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});

        }

      });  






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

  }]);
