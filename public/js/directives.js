
/**
 * minimalizaSidebar - Directive for minimalize sidebar
*/
function minimalizaSidebar($timeout) {
    return {
        restrict: 'A',
        template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
        controller: function ($scope, $element) {
            $scope.minimalize = function () {
                $("body").toggleClass("mini-navbar");
                if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                    // Hide menu in order to smoothly turn on when maximize menu
                    $('#side-menu').hide();
                    // For smoothly turn on menu
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 200);
                } else if ($('body').hasClass('fixed-sidebar')){
                    $('#side-menu').hide();
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 100);
                } else {
                    // Remove all inline style from jquery fadeIn function to reset menu state
                    $('#side-menu').removeAttr('style');
                }
            }
        }
    };
}

/*DIRECTIVE FOR UPLOAD FILE*/
function readFile($parse) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);
            
			element.on('change', function(onChangeEvent) {
				var reader = new FileReader();
                
				reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
						fn(scope, {$fileContent:onLoadEvent.target.result});
					});
				};

				reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
			});
		}
	};
};

function otcDynamic($compile,GeneralService) {
     
    var template = "<ul ng-repeat='player in players' class='list-unstyled file-list'>"+
                    "<li data-toggle='tooltip' data-placement='top' title='{{$index+1}} place'><a><i class='fa fa-trophy'></i> {{player}}</a>                          </li>"+"</ul>";
     
    return{
        link: function(scope, element){
            element.on("click", function() {
                GeneralService.getTop10Players()
                        .then(function (data) {
                        scope.players=data['players'];
                        console.log('dirA'+scope.players);
                      
                    
                    })
                        .catch(function (err) {
                        console.log(err);
                    });
                  scope.$apply(function() {
                            var content = $compile(template)(scope);
                            console.log('dirO'+scope.players);
                            element.empty();
                            //element.replaceWith('<h3>Top 10 Players</h3>');
                            element.append(content);
                       })    
            });
        }
    }
};


/**
 *
 * Pass all functions into module
 */
angular
    .module('rock-paper-scissor')
    .directive('minimalizaSidebar', minimalizaSidebar)
    .directive('otcDynamic', otcDynamic)
    .directive('onReadFile', readFile);

