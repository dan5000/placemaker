angular.module('SimpleRESTIonic.controllers', [])

    .controller('CheckinCtrl', function ( $state, $rootScope, CheckinService) {
        var checkin = this;
        
        // debugger
        
        // social.setFbKey({appId: '415413948489755'}); //, apiVersion: '2'
        function checkin() {
            CheckinService.checkin(checkin.fname, checkin.lname, checkin.ssn)
                .then(function () {
                    debugger
                    onLogin();
                }, function (error) {
                    console.log(error);
                });
        }
        function onLogin() {
            $rootScope.$broadcast('authorized');
            debugger
            $state.go('tab.dashboard');
            // login.username = Backand.getUsername();
    }

        // function signout() {
        //     LoginService.signout()
        //         .then(function () {
        //             //$state.go('tab.login');
        //             $rootScope.$broadcast('logout');
        //             $state.go($state.current, {}, {reload: true});
        //         })
        // 
        // }

        // function socialSignIn(provider) {
        //     debugger
        //     LoginService.socialSignIn(provider)
        //         .then(onValidLogin, onErrorInLogin);
        // 
        // }
        // 
        // function socialSignUp(provider) {
        //     LoginService.socialSignUp(provider)
        //         .then(onValidLogin, onErrorInLogin);
        // 
        // }

        // onValidLogin = function(response){
        //     onLogin();
        //     login.username = response.data;
        // }
        // 
        // onErrorInLogin = function(rejection){
        //     login.error = rejection.data;
        //     $rootScope.$broadcast('logout');
        // 
        // }


        checkin.username = '';
        checkin.error = '';
        checkin.checkin = checkin;
        checkin.signout = signout;
        checkin.anonymousLogin = anonymousLogin;
        checkin.socialSignup = socialSignUp;
        checkin.socialSignin = socialSignIn;

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
            vm.newObject = {name: '', description: ''};
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

    .controller('FormCreatorCtrl', function (ItemsModel, $rootScope, $scope, $ionicModal) {
      var options = [
        {"name": "Text", "value": "String"},
        {"name": "Number", "value": "Double"},
        {"name": "Date", "value": "DateTime"},
        {"name": "True/False", "value": "Boolean"},
        {"name": "E-Mail", "value": "email"}
      ];

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
        console.log($scope.questions)
        //api post
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
