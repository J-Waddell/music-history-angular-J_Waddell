console.log('Taters')

const app = angular.module('musicHistApp', ['ngRoute', 'ngMaterial'])
    .config(($routeProvider, $locationProvider) => {
        $locationProvider.hashPrefix('')
        $routeProvider
            .when('/', {
                controller: 'RootCtrl',
                templateUrl: '/partials/songlist.html'
            })
            .when('/details', {
                controller: 'DetCtrl',
                templateUrl: '/partials/songdetails.html'
            })
    })

    .controller('RootCtrl', function($scope, $location, $http) {
        console.log('RootCtrl')
        $scope.gotoMusic = () => {
            $scope.gotoMusic = () => $location.url(`/details`)
        }
    })

    .factory('musicFactory', ($http) => {
        return {
            getMusic : function() {
                return $http
                .get('music.json')
                .then((music) => {
                    console.log("json", music.data)
                    return music.data
                })
            }
        }
    })

    .factory('detailsFactory', ($http) => {
        return {
            getDetails : function() {
                return $http
                .get('music.json')
                .then((music) => {
                    return music.data
                })
            }
        }
    })

    .controller('RootCtrl', function($scope, $routeParams, musicFactory) {
        console.log('I am a RootCtrl also')
        musicFactory.getMusic()
            .then((value) => {
                $scope.title = value.music
            })
    })

    .controller('DetCtrl', function($scope, $routeParams, detailsFactory) {
        console.log('I am DetCtrl')
        detailsFactory.getDetails()
            .then((description) => {
                $scope.info = description.music
            })
    })