angular.module('SimpleRESTIonic.controllers', [])

.controller('CheckinCtrl', function ($state, $rootScope, CheckinService, $scope) {
    // social.setFbKey({appId: '415413948489755'}); //, apiVersion: '2'
    function checkin() {
        CheckinService.checkin($scope.form)
            .then(function () {
                onLogin();
            }, function (error) {
                console.log(error);
            });
    }

    function onLogin() {
        $rootScope.$broadcast('authorized');
        $state.go('tab.formcreator');
        // login.username = Backand.getUsername();
    }
$scope.fname = 'atatat';
    $scope.form = {};
    $scope.error = '';
    $scope.checkin = checkin;
    // checkin.signout = signout;
    // checkin.anonymousLogin = anonymousLogin;
    // checkin.socialSignup = socialSignUp;
    // checkin.socialSignin = socialSignIn;

})

.controller('AdminDashCtrl', function (Persons, $rootScope, $scope, Text) {
    var vm = this;
    Persons.all()
        .then(function (result) {
            // $scope.persons = JSON.parse(result);
            $scope.persons = result.data;
        });

    //
    // $rootScope.$on('authorized', function () {
    //     vm.isAuthorized = true;
    //     getAll();
    // });
    //
    Text.send('Beds are available at the Biddle House now.','all',3146804864);
})

.controller('AdminCommunityCtrl', function (Persons, $rootScope, $scope) {
    var vm = this;
    Persons.all()
        .then(function (result) {
            // $scope.persons = JSON.parse(result.data);
            $scope.persons = [
                {name:'joe'},
                {name:'joe'},
                {name:'joe'},
                {name:'joe'},
                {name:'joe'},
                {name:'joe'},
                {name:'joe'},
                {name:'joe'},
                {name:'joe'},
                {name:'joe'},
                {name:'joe'},
                {name:'joe'},
                {name:'joe'}
            ];
        });

    //
    // $rootScope.$on('authorized', function () {
    //     vm.isAuthorized = true;
    //     getAll();
    // });

})
.controller('SurveyCtrl', function ($rootScope, $scope, $location, $state, Question, Persons) {
   $scope.questions = [];
   Form.read('580c1d4f2aceb73f22b0f284').then(function(response){
     $scope.form = response.data;
     var questions = $scope.form.questions
     for(var qId in questions) {
       Question.read(questions[qId]["$oid"]).then( function(response) {
         $scope.questions.push(response.data)
       }, function(failure) {
         console.log(failure);
       });
     }
   }, function(failure) {
     console.log(failure)
   });
   textField = {};
   dataField = [];
   for (var q in $scope.questions){
      dataField.push(q);
   }
})
   

.controller('FormCtrl', function ($rootScope, $scope, $location, $state, Form) {
      Form.all().then(function(response) {
        $scope.forms = response.data;
      });

      $scope.gotoForm = function(form) {
        $state.go('tab.formcreator', {id:form._id.$oid});
      }
    })

    .controller('FormCreatorCtrl', function ($rootScope, $scope, $ionicModal, $location, Form, Question, $state) {
      $scope.questions = [];
      var options = [
        {"name": "Text", "value": "String"},
        {"name": "Number", "value": "Double"},
        {"name": "Date", "value": "DateTime"},
        {"name": "True/False", "value": "Boolean"},
        {"name": "E-Mail", "value": "email"}
      ];
      Form.read("580c1d4f2aceb73f22b0f284").then(function(response){
        $scope.form = response.data;
        var questions = $scope.form.questions
        for(var qId in questions) {
          Question.read(questions[qId]["$oid"]).then( function(response) {
            $scope.questions.push(response.data)
          }, function(failure) {
            console.log(failure);
          });
        }
      }, function(failure) {
        console.log(failure)
      //   $state.go('tab.dashboard');
      });
      $scope.data = {
        showDelete: false
      }
      $ionicModal.fromTemplateUrl('templates/tagsModal.html', {
        scope: $scope,
        animation: 'slide-in-up',
      }).then(function(modal) {
        $scope.modal = modal;
      });
      $scope.openModal = function(question) {
        $scope.question = question;
        $scope.modal.show();
      };
      $scope.closeModal = function() {
        $scope.modal.hide();
      };
      // Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });
      $scope.add = function() {
        var data = $scope.formData;
        var tags = data.tags.split(" ")
        var item = {"content" : data.question, "tags" : tags };
        $scope.questions.push(item);
        $scope.formData = {};
      }

      $scope.moveItem = function(item, fromIndex, toIndex) {
        $scope.questions.splice(fromIndex, 1);
        $scope.questions.splice(toIndex, 0, item);
      };
      $scope.delete = function(item) {
        $scope.questions.splice($scope.questions.indexOf(item), 1);
      }
      $scope.tagData = {};
      $scope.tagFields = [{
        key: 'text',
        type: 'input',
        templateOptions: {
          type:'text',
          placeholder: 'Enter a new tag here!'
        }
      }];
      $scope.save = function() {
        newForm = {
          "title" : $scope.form.title,
          "questions" : $scope.questions
        }
      }
      $scope.addTag = function(question) {
        var tag = $scope.tagData.text;
        question.tags.push(tag);
        $scope.tagData = {};
      }
      $scope.formData = {};
      $scope.formFields = [
   {
     key: 'question',
     type: 'input',
     templateOptions: {
       type:'text',
       placeholder: 'Enter a new form question here!'
     }
   },
   {
     key: 'tags',
     type: 'input',
     templateOptions: {
       type:'text',
       placeholder: 'Enter tags here. Separate multiple tags by spaces.'
     }
   },
   {
     key: 'toggle',
     type: 'select',
     defaultValue: "Text",
     templateOptions: {
       type:'ion-select',
       placeholder: 'text',
       label: 'What kind of response are you looking for?',
       options: options
     }
  }];
    });
