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

.controller('AdminDashCtrl', function (Persons, $rootScope, $scope) {
    var vm = this;
    Persons.all()
        .then(function (result) {
            $scope.persons = JSON.parse(result.data);
        });

    // 
    // $rootScope.$on('authorized', function () {
    //     vm.isAuthorized = true;
    //     getAll();
    // });

})

.controller('FormCreatorCtrl', function (ItemsModel, $rootScope, $scope, $ionicModal) {
    var options = [{
        "name": "Text",
        "value": "String"
    }, {
        "name": "Number",
        "value": "Double"
    }, {
        "name": "Date",
        "value": "DateTime"
    }, {
        "name": "True/False",
        "value": "Boolean"
    }, {
        "name": "E-Mail",
        "value": "email"
    }];

    $scope.data = {
        showDelete: false
    }
    $ionicModal.fromTemplateUrl('templates/tagsModal.html', {
        scope: $scope,
        animation: 'slide-in-up',
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function (question) {
        $scope.question = question;
        $scope.modal.show();
    };
    $scope.closeModal = function () {
        $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });
    $scope.add = function () {
        var data = $scope.formData;
        var tags = data.tags.split(" ")
        var item = {
            "content": data.question,
            "tags": tags
        };
        $scope.questions.push(item);
        $scope.formData = {};
    }

    $scope.moveItem = function (item, fromIndex, toIndex) {
        $scope.questions.splice(fromIndex, 1);
        $scope.questions.splice(toIndex, 0, item);
    };
    $scope.delete = function (item) {
        $scope.questions.splice($scope.questions.indexOf(item), 1);
    }
    $scope.questions = [{
        "_id": "1234",
        "content": "When was the last time you ate a home-cooked meal",
        "tags": ["Address", "Meals"]
    }, {
        "_id": "1235",
        "content": "When was your last meal",
        "tags": ["Meal"]
    }];
    $scope.tagData = {};
    $scope.tagFields = [{
        key: 'text',
        type: 'input',
        templateOptions: {
            type: 'text',
            placeholder: 'Enter a new tag here!'
        }
    }];
    $scope.save = function () {
        console.log($scope.questions)
            //api post
    }
    $scope.addTag = function (question) {
        var tag = $scope.tagData.text;
        question.tags.push(tag);
        $scope.tagData = {};
    }
    $scope.formData = {};
    $scope.formFields = [{
        key: 'question',
        type: 'input',
        templateOptions: {
            type: 'text',
            placeholder: 'Enter a new form question here!'
        }
    }, {
        key: 'tags',
        type: 'input',
        templateOptions: {
            type: 'text',
            placeholder: 'Enter tags here. Separate multiple tags by spaces.'
        }
    }, {
        key: 'toggle',
        type: 'select',
        defaultValue: "Text",
        templateOptions: {
            type: 'ion-select',
            label: 'What kind of response are you looking for?',
            options: options
        }
    }];
});