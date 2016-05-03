
angular
    .module('rock-paper-scissor')
.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|):/);
}])
    .controller('MainCtrl', function ($scope,$timeout,GeneralService,ChampionshipsExamplesServices) {
    $scope.players=[];
    /*update the top player with a directive, because in a simple update the ng-repeat doesn't work*/
    function updatePlayer() {
        $timeout(function() {
            var el = document.getElementById('test');
            angular.element(el).triggerHandler('click');
        }, 0);
    }
    /*TOP 10 PLAYERS*/
    updatePlayer();
  
    
    /*EVAL ONE CHAMPIONSHIP*/
    $scope.evalChampionship=function(championship) {
        GeneralService.evalNewChampionship(championship)
                        .then(function (data) {
                        swal({   title: "Winner! "+data['winner'][0],   text: "strategy "+data['winner'][1],   imageUrl: "img/winner.jpg" });
                        updatePlayer();
                    })
                        .catch(function (err) {
                            swal({title: "championship error",
                                  text: err['Status'],
                                  type: "error"});
                    });
    }
    
    /*RESET THE DATABASE*/
    $scope.dropDatabase=function() {
        swal({
          title: "Are you sure?",
          text: "You will not be able to recover this data!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          closeOnConfirm: false,
          html: false
        }, function(){
            GeneralService.resetDatabase()
                .then(function (data) {
                    swal("Deleted!",
                    "The DataBase has been truncated.",
                    "success");
                updatePlayer();
            })
                .catch(function (err) {
                    swal("Error", err);
            });
        });
    }
    
    
    /*FOR DONWLOAD FILES EXAMPLE*/
    $scope.fileUrl2 = ChampionshipsExamplesServices.getTwoPlayerChampionship();
    $scope.fileUrl4 = ChampionshipsExamplesServices.getFourPlayerChampionship();
    $scope.fileUrl8 = ChampionshipsExamplesServices.getEigthPlayerChampionship();
    $scope.fileUrl8Another = ChampionshipsExamplesServices.getAnotherEigthPlayerChampionship();
    $scope.fileUrl4Another = ChampionshipsExamplesServices.getAnotherFourPlayerChampionship();
    $scope.showContent = function($fileContent){
        $scope.content = $fileContent;
    };
  })
