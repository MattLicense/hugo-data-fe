'use strict';

Hugo.controller('ReportCtrl', ['$scope', '$routeParams', '$window', 'ReportService', 'GeographyService', function($scope, $routeParams, $window, ReportService, GeographyService) {
    $scope.localAuthority = '00AA'; // default LA
    $scope.LAname = 'City of London';
    $scope.selectedAuthority = '00AA';
    $scope.chartObject = {};
    var laPromise = GeographyService.getLAs();
    var reportPromise = ReportService.get($routeParams.reportId);
    laPromise.then(function(data) {
        $scope.LAs = data;
        var la = $.grep($scope.LAs, function(element) { return element.la_code == $scope.localAuthority; })[0];
        $scope.LAname = la.la_name;
    });
    reportPromise.then(function(data) {
        $scope.report = data;
        $scope.charts = {};
        $scope.order = JSON.parse($scope.report.report_order);
        $scope.reRenderPage();
    });

    $scope.reRenderPage = function() {
        var length = $scope.order.length;
        for(var i = 0; i < length; i++) {
            var chart = $scope.order[i];
            $scope.renderChart(i, chart.column, chart.type);
        }
        for(var chart in $scope.charts) {
            $scope[chart] = $scope.charts[chart];
        }
    }

    $scope.updateLA = function() {
        $scope.localAuthority = $scope.selectedAuthority;
        var la = $.grep($scope.LAs, function(element) { return element.la_code == $scope.localAuthority; })[0];
        $scope.LAname = la.la_name;
        $scope.reRenderPage();
    };

    $scope.renderChart = function(index, column, type) {
        var report_data = $scope.report.report_data.data;
        var columns = $scope.report.report_data.columns;
        var la_column = columns.indexOf('local_authority');
        var filtered = report_data.filter(function(item){return item[la_column]==$scope.localAuthority;});

        // get the indexes of the columns required
        var year_index = columns.indexOf('year');
        var column_index = columns.indexOf(column);

        // get the data table headers
        var year_header = columns[year_index];
        var column_header = columns[column_index];
        var headers = [year_header, column_header];

        // iterate through the filtered data to get the required columns
        var data = [];
        filtered.forEach(function(element, index, array) {
            // we force the year to string to display the year correctly
            data.push([element[year_index].toString(), element[column_index]]);
        });

        $scope.charts[index] = {};

        // join the headers and data together and convert them using the Google Charts API
        var dataTable = [headers].concat(data);
        $scope.charts[index].data = $window.google.visualization.arrayToDataTable(dataTable);

        // get the display type from the report order
        $scope.charts[index].type = type;
        $scope.charts[index].options = {
            'title': $scope.LAname + ' - ' + column
        };
    };
}]);

