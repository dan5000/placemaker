angular.module('starter.controllers', [])

.controller('AdminDashCtrl', function($scope, CoCs, Users) {
  // use this to rerun query every time view is clicked
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  CoCs.all().then(res => {
    $scope.chats = JSON.parse(res.data);
  });
  $scope.user = Users.current();
});
