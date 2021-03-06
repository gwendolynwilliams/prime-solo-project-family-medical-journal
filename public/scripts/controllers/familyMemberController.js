myApp.controller('FamilyMemberController', ['$scope', '$http', '$window', '$location', '$routeParams', 'DataFactory', function($scope, $http, $window, $location, $routeParams, DataFactory) {

    $scope.familyMemberID = $routeParams.id;
    $scope.dataFactory = DataFactory;
    $scope.familyMember = false;
    $scope.medications = [];
    $scope.immunizations = [];
    $scope.familyMembers = [];
    $scope.user_name = '';
    $scope.family_member_first_name = '';
    $scope.family_member_last_name = '';
    var user_id = '';

    retrieveUser();
    retrieveFamilyMember($scope.familyMemberID);
    showMedications($scope.familyMemberID);
    showStatistics($scope.familyMemberID);
    showVisits($scope.familyMemberID);
    showSymptoms($scope.familyMemberID);
    showImmunizations($scope.familyMemberID);

    function retrieveFamilyMember(id) {
        $http.get('/familyMember/' + id).then(function(response) {
            if (response.data) {
                $scope.family_member_first_name = response.data[0].first_name;
                $scope.family_member_last_name = response.data[0].last_name;
            } else {
                console.log('failed to get familyMember route');
                $window.location.href = '/login.html';
            }
        }, function(response) {
            $location.path('/unauthorized');
        });
    }

    function retrieveUser() {

        $scope.dataFactory.factoryRetrieveUser().then(function() {
            $scope.user = $scope.dataFactory.factoryShowUser();
            user_id = $scope.user.user_id;

            $scope.dataFactory.factoryRetrieveFamilyMember(user_id).then(function() {
                $scope.familyMembers = $scope.dataFactory.factoryShowFamilyMember();
            });

            $scope.user_id = $scope.user.user_id;
            $scope.user_name = $scope.user.first_name;
            return user_id;
        });
    }

    function showMedications(id) {

        $http.get('/medications/' + id).then(function(response) {
            if(response.data) {
                $scope.medications = response.data;
            } else {
                console.log('failed to get user route');
                $window.location.href = '/login.html';
            }
        }, function(response) {
            $location.path('/unauthorized');
        });
    }

    function showStatistics(id) {

        $http.get('/statistics/' + id).then(function(response) {
            if(response.data) {
                $scope.statistics = response.data[0];
            } else {
                console.log('failed to get user route');
                $window.location.href = '/login.html';
            }
        }, function(response) {
            $location.path('/unauthorized');
        });
    }

    function showVisits(id) {

        $http.get('/visits/' + id).then(function(response) {
            if(response.data) {
                $scope.visits = response.data;
            } else {
                console.log('failed to get user route');
                $window.location.href = '/login.html';
            }
        }, function(response) {
            $location.path('/unauthorized');
        });
    }

    function showImmunizations(id) {

        $http.get('/immunizations/' + id).then(function(response) {
            if(response.data) {
                $scope.immunizations = response.data;
            } else {
                console.log('failed to get user route');
                $window.location.href = '/login.html';
            }
        }, function(response) {
            $location.path('/unauthorized');
        });
    }

    function showSymptoms(id) {

        $http.get('/symptoms/' + id).then(function(response) {
            if(response.data) {
                $scope.symptoms = response.data;
            } else {
                console.log('failed to get user route');
                $window.location.href = '/login.html';
            }
        }, function(response) {
            $location.path('/unauthorized');
        });
    }

    $scope.deleteFamilyMember = function(id) {
        $scope.deleted = false;

        var deleteUser = $window.confirm('Are you sure you want to delete this family member?');

        if (deleteUser) {
            $http.delete('/familyMember/' + id).then(function(response) {
                retrieveUser(); // not sure if this is going to work - it might break - trying to reload users without deleted user
                $scope.deleted = true;
            });
        }
    };

}]);