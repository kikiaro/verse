var app = angular.module("app", ["ngRoute", "ngAnimate","app.config", "ui.bootstrap", "mgo-angular-wizard", "ui.tree", "ngMap", "ngTagsInput", "app.ui.ctrls", "app.ui.services", "app.controllers", "app.directives", "app.form.validation", "app.ui.form.ctrls", "app.ui.form.directives", "app.tables", "app.map", "countTo", "mediaPlayer","ngDragDrop", "app.music"]).run(["$rootScope", "$location","loggit",
    function ($rootScope, $location,loggit) {

        $(document).ready(function(){
            setTimeout(function(){
                $('.page-loading-overlay').addClass("loaded");
                $('.load_circle_wrapper').addClass("loaded");

                loggit.logSuccess("Welcome to Verse! Add and Share Music to Your Playlists.");
            },1000);
        });

    }] ).config(["$routeProvider",
    function($routeProvider) {
        return $routeProvider.when("/", {
            redirectTo: "/dashboard"
        }).when("/dashboard", {
                templateUrl: "app/views/dashboards/dashboard.html"
            }).when("/dashboard/dashboard", {
                templateUrl: "app/views/dashboards/dashboard.html"
            }).when("/ui/nested-lists", {
                templateUrl: "app/views/ui_elements/nested-lists.html"
            }).when("/playlist/sample", {
                templateUrl: "app/views/playlist/sample.html"
            }).when("/artist/:title", {
              templateUrl: "app/views/playlist/artist.html"
            }).when("/playlist/:title", {
              templateUrl: "app/views/playlist/playlist.html"
            }).when("/artist-list", {
              templateUrl: "app/views/playlist/artists-list.html"
            }).when("/albums", {
              templateUrl: "app/views/playlist/albums.html"
            }).when("/genres", {
              templateUrl: "app/views/playlist/genres.html"
            }).when("/forms/elements", {
                templateUrl: "app/views/forms/elements.html"
            }).when("/forms/layouts", {
                templateUrl: "app/views/forms/layouts.html"
            }).when("/forms/validation", {
                templateUrl: "app/views/forms/validation.html"
            }).when("/forms/wizard", {
                templateUrl: "app/views/forms/wizard.html"
            }).when("/tables/static", {
                templateUrl: "app/views/tables/static.html"
            }).when("/tables/responsive", {
                templateUrl: "app/views/tables/responsive.html"
            }).when("/tables/dynamic", {
                templateUrl: "app/views/tables/dynamic.html"
            }).when("/mail/inbox", {
                templateUrl: "app/views/mail/inbox.html"
            }).when("/mail/compose", {
                templateUrl: "app/views/mail/compose.html"
            }).when("/mail/single", {
                templateUrl: "app/views/mail/single.html"
            }).when("/pages/features", {
                templateUrl: "app/views/pages/features.html"
            }).when("/front", {
              templateUrl: "app/views/pages/splash.html"
            }).when("/pages/signin", {
                templateUrl: "app/views/pages/signin.html"
            }).when("/pages/signup", {
                templateUrl: "app/views/pages/signup.html"
            }).when("/pages/forgot", {
                templateUrl: "app/views/pages/forgot-password.html"
            }).when("/pages/profile", {
                templateUrl: "app/views/pages/profile.html"
            }).when("/404", {
                templateUrl: "app/views/pages/404.html"
            }).when("/pages/blank", {
                templateUrl: "app/views/pages/blank.html"
            }).otherwise({
                redirectTo: "/404"
            });
    }
]);


/* Hold for Later. Wanted to Have a Contact/Map Feature */

angular.module("app.map", []).directive("uiJqvmap", [
        function() {
            return {
                restrict: "A",
                scope: {
                    options: "="
                },
                link: function(scope, ele) {
                    var options;
                    return options = scope.options, ele.vectorMap(options);
                }
            };
        }
    ]).controller("jqvmapCtrl", ["$scope",
        function($scope) {
            var sample_data;
            return sample_data = {
                ng: "206.66",
                zw: "5.57"
            }, $scope.worldMap = {
                map: "world_en",
                backgroundColor: null,
                color: "#ffffff",
                hoverOpacity: 0.7,
                selectedColor: "#db5031",
                hoverColor: "#db5031",
                enableZoom: !0,
                showTooltip: !0,
                values: sample_data,
                scaleColors: ["#F1EFF0", "#c1bfc0"],
                normalizeFunction: "polynomial"
            }, $scope.USAMap = {
                map: "usa_en",
                backgroundColor: null,
                color: "#ffffff",
                selectedColor: "#db5031",
                hoverColor: "#db5031",
                enableZoom: !0,
                showTooltip: !0,
                selectedRegion: "MO"
            }, $scope.europeMap = {
                map: "europe_en",
                backgroundColor: null,
                color: "#ffffff",
                hoverOpacity: 0.7,
                selectedColor: "#db5031",
                hoverColor: "#db5031",
                enableZoom: !0,
                showTooltip: !0,
                values: sample_data,
                scaleColors: ["#F1EFF0", "#c1bfc0"],
                normalizeFunction: "polynomial"
            };
        }
    ]);

/* Timer */
angular.module('countTo', []).controller("countTo", ["$scope",
        function($scope) {

            return $scope.countersmall1 = {
                countTo: 20,
                countFrom: 0
            },$scope.countersmall2 = {
                countTo: 42,
                countFrom: 0
            },$scope.countersmall3 = {
                countTo: 90,
                countFrom: 0
            },$scope.countersmall1dash = {
                countTo: 420,
                countFrom: 0
            },$scope.countersmall2dash = {
                countTo: 742,
                countFrom: 0
            },$scope.countersmall3dash = {
                countTo: 100,
                countFrom: 0
            };

        }]).directive('countTo', ['$timeout', function ($timeout) {
        return {
            replace: false,
            scope: true,
            link: function (scope, element, attrs) {

                var e = element[0];
                var num, refreshInterval, duration, steps, step, countTo, value, increment;

                var calculate = function () {
                    refreshInterval = 30;
                    step = 0;
                    scope.timoutId = null;
                    countTo = parseInt(attrs.countTo) || 0;
                    scope.value = parseInt(attrs.value, 10) || 0;
                    duration = (parseFloat(attrs.duration) * 1000) || 0;

                    steps = Math.ceil(duration / refreshInterval);
                    increment = ((countTo - scope.value) / steps);
                    num = scope.value;
                };

                var tick = function () {
                    scope.timoutId = $timeout(function () {
                        num += increment;
                        step++;
                        if (step >= steps) {
                            $timeout.cancel(scope.timoutId);
                            num = countTo;
                            e.textContent = countTo;
                        } else {
                            e.textContent = Math.round(num);
                            tick();
                        }
                    }, refreshInterval);
                };

                var start = function () {
                    if (scope.timoutId) {
                        $timeout.cancel(scope.timoutId);
                    }
                    calculate();
                    tick();
                };

                attrs.$observe('countTo', function (val) {
                    if (val) {
                        start();
                    }
                });

                attrs.$observe('value', function (val) {
                    start();
                });
                return true;
            }
        };

    }]);
