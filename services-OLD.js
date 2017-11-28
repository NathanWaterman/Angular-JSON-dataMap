(function () {
  'use strict';

  function dataService ($http) {


    var ambitionSectionData = function(){
      return $http.get('./assets/data/sectionData.json');
    };

    var ambitionSectionContentData = function(){
      return $http.get('./assets/data/sectionContentData.json');
    };


    return {
      ambitionSectionData:ambitionSectionData,
      ambitionSectionContentData:ambitionSectionContentData
    };

  }

angular
    .module('myApp')
    .factory('dataService', dataService);
}());