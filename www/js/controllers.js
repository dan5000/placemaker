angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, CoCs) {
  // use this to rerun query every time view is clicked
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  CoCs.all().then(res => {
    $scope.chats = JSON.parse(res.data);
  });
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
