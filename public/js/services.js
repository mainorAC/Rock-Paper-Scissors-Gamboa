angular
    .module('rock-paper-scissor').service("GeneralService", function ($http, $q) {

    this.getTop10Players = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
                method: 'GET',
                url: "/api/championship/top?count=10"
            })
            .success(function (response) {
                defered.resolve(response);
            }).error(function (err) {
                  defered.reject(err);
                  });

        return promise;
    }
    
    
    this.evalNewChampionship = function (championship) {
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
                method: 'POST',
                url: "/api/championship/new",
                data: {
                    data:championship
                }
            })
            .success(function (response) {
                defered.resolve(response);
            }). 
            error(function (err) {
                  defered.reject(err);
                  });
        return promise;
    }
    
    
    this.resetDatabase = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http({
                method: 'DELETE',
                url: "/api/championship/deleteDB"
            })
            .success(function (response) {
                defered.resolve(response);
            }). 
            error(function (err) {
                  defered.reject(err);
                  });
        return promise;
    }
});
