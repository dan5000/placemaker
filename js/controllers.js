angular.module('SimpleRESTIonic.controllers', [])

.controller('CheckinCtrl', function ($state, $rootScope, CheckinService, $scope) {
    // social.setFbKey({appId: '415413948489755'}); //, apiVersion: '2'
    function checkin() {
        CheckinService.checkin($scope.form)
            .then(function () {
                debugger
                onLogin();
            }, function (error) {
                debugger
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

.controller('DashboardCtrl', function (ItemsModel, $rootScope) {
    var vm = this;

    function getAll() {
        ItemsModel.all()
            .then(function (result) {
                vm.data = result.data.data;
            });
    }

    function clearData() {
        vm.data = null;
    }

    function create(object) {
        ItemsModel.create(object)
            .then(function (result) {
                cancelCreate();
                getAll();
            });
    }

    function update(object) {
        ItemsModel.update(object.id, object)
            .then(function (result) {
                cancelEditing();
                getAll();
            });
    }

    function deleteObject(id) {
        ItemsModel.delete(id)
            .then(function (result) {
                cancelEditing();
                getAll();
            });
    }

    function initCreateForm() {
        vm.newObject = {
            name: '',
            description: ''
        };
    }

    function setEdited(object) {
        vm.edited = angular.copy(object);
        vm.isEditing = true;
    }

    function isCurrent(id) {
        return vm.edited !== null && vm.edited.id === id;
    }

    function cancelEditing() {
        vm.edited = null;
        vm.isEditing = false;
    }

    function cancelCreate() {
        initCreateForm();
        vm.isCreating = false;
    }

    vm.objects = [];
    vm.edited = null;
    vm.isEditing = false;
    vm.isCreating = false;
    vm.getAll = getAll;
    vm.create = create;
    vm.update = update;
    vm.delete = deleteObject;
    vm.setEdited = setEdited;
    vm.isCurrent = isCurrent;
    vm.cancelEditing = cancelEditing;
    vm.cancelCreate = cancelCreate;
    vm.isAuthorized = false;

    $rootScope.$on('authorized', function () {
        vm.isAuthorized = true;
        getAll();
    });

    $rootScope.$on('logout', function () {
        clearData();
    });

    if (!vm.isAuthorized) {
        $rootScope.$broadcast('logout');
    }

    initCreateForm();
    getAll();

})

.controller('FormCtrl', function ($rootScope, $scope, $location, $state, Form) {
      Form.all().then(function(response) {
        $scope.forms = response.data;
        debugger
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
      console.log($location.search().id)
      Form.read($location.search().id).then(function(response){
        $scope.form = response.data;
        var questions = $scope.form.questions
        for(var qId in questions) {
          Question.read(questions[qId]).then( function(response) {
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
      $scope.questions = [{"_id" : "1234", "content" : "When was the last time you ate a home-cooked meal", "tags" : ["Address",  "Meals"]}, {"_id" : "1235", "content" : "When was your last meal", "tags" : ["Meal"] }];
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
       label: 'What kind of response are you looking for?',
       options: options
     }
  }];
    });
