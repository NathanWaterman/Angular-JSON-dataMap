(function () {
	'use strict';

	function aspireCtrl ($scope,dataService) {
		window.scope = $scope;
		

		//global variables
		var ambitionSection = {};
		var ambitionSectionData;

		$scope.SectionContentData = [];


		//read in service call for Sections
		dataService.ambitionSectionData().then(function(response) {
			$scope.ambitionSectionData = response.data.data.value;

		     ambitionSectionData = $scope.ambitionSectionData;

		});

		//read in service call for Sections Content
		dataService.ambitionSectionContentData().then(function(response) {
			$scope.ambitionSectionContentData = response.data.data.value;

		    //Loop array with Section data after success response of Section content data is read 
		  	$scope.ambitionSecId = function() {
				angular.forEach(ambitionSectionData, function(value, key) {
					if (!value.hasOwnProperty('secId')) {
							if(value.Display !== false){

								//check page id based on Service call
								if(value.OnPage === 'Aspire'){

									//data bind ng-repeat key value to HTML
						 			ambitionSection[key] = value;
						 		}
						 	}
						}
				});
				return ambitionSection;
			};


				//loop section content data
				//compare ID from both service calls.
				//if IDs match place section content in the corresponding section 
		    	for (var i = 0; i < $scope.ambitionSectionContentData.length; i++) {
		    		$scope.ambitionSectionContentData[i].aId = $scope.ambitionSectionContentData[i].OnPageSectionHeadingId;
		    	}
		    	$scope.SectionContentData = $scope.ambitionSectionContentData;

		});


		var init = function() {
			console.log('aspire init test');

			document.body.scrollTop = document.documentElement.scrollTop = 0;

			$(window).scroll(function() {
				console.log('scroll');
	            if ($(this).scrollTop() >= 60) { // this refers to window
			        $('.aspire-hero-container').stop().animate({top:'-190px'},200);
	                console.log('scroll down');
			    }
	            else if($(this).scrollTop() <= 50) {
	            	$('.aspire-hero-container').stop().animate({top:'0px'},200);
	            	console.log('scroll up');
	            }
			});
			
		};
		init();		
	}


  angular.module('myApp').controller('aspireCtrl', ['$scope','dataService',aspireCtrl])
  	.directive('myPostRepeatDirective', function() {
	  return function(scope) {
	    if (scope.$last){

	    	angular.element(document).ready(function () {
			});
	    }
	  };
	}).run([
        '$rootScope',
        '$state',
        function ($rootScope, $state,$stateParams) {
            $rootScope.$state = $state;
    		$rootScope.$stateParams = $stateParams;
        }
    ]);
}()

);