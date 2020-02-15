app.controller("Conclusion", ['$http', '$scope', 'globals', 'common', function ($http, $scope, globals, common) {
    var ctrl = this;
    ctrl.creds = {
        email: '',
        password: '',
        amount: 0
    };
    ctrl.failure = false;
    ctrl.success = false;

    ctrl.tryRegister = function () {
        $http.post('/conclusion', ctrl.creds).then(
            function (rep) {
                ctrl.creds = {};
                ctrl.success = true;
            },
            function (error) {
                ctrl.message = error.data.error;
                ctrl.failure = true;
            }
        );
    };

    $scope.$on('conclusion', function (event, obj) {
        common.showMessage(obj.message);
    });

}]);
