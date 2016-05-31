angular.module('app')
    .controller('authenticationController',['$scope', '$http',
               function($scope, $http) {

            $scope.signup = function(isValid) {
                if (isValid) {

                    $http.post('/signup', $scope.user)
                        .success(function(data, status) {
                        })
                        .error(function(err, status) {
                            if (status === 401) {
                                alert('Username Already Taken');
                            }
                            if (status === 500) {
                                alert('Our servers are facing problems. Try again later.');
                            }
                        })
                } else {
                    alert('Invalid input');
                };
            };

            $scope.logout = function(){
                $http.post('/logout', $scope.user)
                    .success(function(data, status, headers, config) {

                    })
                    .error(function(err, status) {
                        if (status === 401) {
                            alert('Why cant I logout?');
                        }
                        if (status === 500) {
                            alert('Our servers are facing problems. Try again later.');
                        }
                    })
            }

            $scope.login = function() {

                $http.post('/login', $scope.user)
                    .success(function(data, status, headers, config) {

                    })
                    .error(function(err, status) {
                        if (status === 401) {
                            alert('Wrong password or username');
                        }
                        if (status === 500) {
                            alert('Our servers are facing problems. Try again later.');
                        }
                    })
            };
        }]);