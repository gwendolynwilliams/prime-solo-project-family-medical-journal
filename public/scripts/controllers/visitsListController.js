myApp.controller('VisitsListController', ['$scope', '$http', '$window', '$location', '$routeParams', function($scope, $http, $window, $location, $routeParams) {

    $scope.visits = [];
    $scope.familyMemberID = $routeParams.id;
    $scope.family_member_first_name = '';
    $scope.family_member_last_name = '';
    $scope.deleted = false;
    $scope.showForm = false;
    $scope.showVisits = true;

    retrieveFamilyMember($scope.familyMemberID);
    showVisits($scope.familyMemberID);

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

    function showVisits(id) {

        $http.get('/visits/' + id).then(function(response) {
            if(response.data != '') { //adding != '' - so visit_id doesn't break when it comes back empty
                $scope.visits = response.data;
                $scope.visit_id = response.data[0].visit_id;
            }
            //commenting this out - is this bad practice?
            //else {
            //    console.log('failed to get user route');
            //    $window.location.href = '/login.html';
            //}
        }, function(response) {
            $location.path('/unauthorized');
        });
    }

    $scope.visitToForm = function(id) {

        $http.get('/visit/' + id).then(function(response) {
            if (response.data) {
                $scope.visit = response.data[0];
                $scope.showForm = true;
                $scope.showVisits = false;
                $scope.visit_id = id;
                $scope.form_visit_type = $scope.visit.visit_type;
                $scope.form_location = $scope.visit.location;
                $scope.form_reason = $scope.visit.reason;
                $scope.form_visit_date = new Date($scope.visit.visit_date);
                $scope.form_discharge_date = new Date($scope.visit.discharge_date);
                $scope.form_treatment = $scope.visit.treatment;
                $scope.form_notes = $scope.visit.notes;
            } else {
                console.log('failed to get visit route');
                $window.location.href = '/login.html';
            }
        });
    };

    $scope.editVisit = function(id) {
        $scope.edited = false;
        $scope.showForm = false;

        var data = {
            visit_type: $scope.form_visit_type,
            location: $scope.form_location,
            reason: $scope.form_reason,
            visit_date: $scope.form_visit_date,
            discharge_date: $scope.form_discharge_date,
            treatment: $scope.form_treatment,
            notes: $scope.form_notes
        };

        $http.put('/visit/' + id, data).then(function(response){
            $scope.edited = true;
            $scope.showVisits = true;
            showVisits($scope.familyMemberID);
        });
    };

    $scope.deleteVisit = function(id) {

        var deleteVisit = $window.confirm('Are you sure you want to delete this visit?');

        if (deleteVisit) {
            $http.delete('/visit/' + id).then(function(response) {
                $scope.deleted = true;
                $scope.showVisits = true;
                showVisits($scope.familyMemberID);
            });
        }
    };

}]);
