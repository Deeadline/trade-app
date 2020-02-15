app.controller("ConclusionList", ['$http', '$scope', 'globals', 'common', function ($http, $scope, globals, common) {
    var ctrl = this;

    var initVars = function () {
        ctrl.conclusionsCount = 0;
        ctrl.limit = 5;
        ctrl.filter = '';
        $scope.statuses = [
            {name: 'Wszystkie'},
            {name: 'Nowe'},
            {name: 'Odrzucone'}
        ];
        ctrl.status = $scope.statuses[0];
    };

    initVars();

    ctrl.refreshConclusions = function () {
        var limit = ctrl.limit;
        var status = '';
        if (limit <= 0) limit = 1;
        if (ctrl.status == 'Nowe') {
            status = 'None';
        } else if (ctrl.status == 'Odrzucone') {
            status = 'Rejected';
        } else {
            status = 'All';
        }
        $http.delete('/conclusion').then(
            function(rep) { ctrl.conclusionsCount = rep.data.count; },
            function(err) {}
        );
        $http.get('/conclusion?skip=0&limit=' + limit + '&filter=' + ctrl.filter + '&status=' + status).then(
            function (rep) {
                ctrl.conclusions = rep.data;
            },
            function (err) {
            }
        );
    };

    ctrl.accept = function (data) {
        data.status = 'Accepted';
        $http.put('/conclusion-status', data).then(
            function (rep) {
                common.showMessage('Wniosek zaakceptowany, użytkownik stworzony');
                initVars();
                ctrl.refreshConclusions();
            },
            function (err) {
                common.showError('Nie udało się dodać tego użytkownika.');
            }
        )
    };

    ctrl.reject = function (data) {
        data.status = 'Rejected';
        $http.post('/conclusion-status', data).then(
            function (rep) {
                common.showMessage('Wniosek odrzucony, użytkownik nie został stworzony');
                initVars();
                ctrl.refreshConclusions();
            },
            function (err) {
                common.showError('Nie udało się odrzucić wniosku.');
            }
        )
    };

    ctrl.stamp2date = common.stamp2date;

    ctrl.refreshConclusions();
}]);
