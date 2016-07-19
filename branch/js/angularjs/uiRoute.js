/**
 * @author xieguoliang
 * @author zzk
 */
/**
 * @createDate   2015-08-13 下午05:28:38
 * @author       hao liqiang
 * @email       lq.hao@xiaochejiang.com
 * @version      2.0
 */
  allsensorModule.config(function($stateProvider,$urlRouterProvider) {
      $urlRouterProvider.otherwise('/scene');
       $stateProvider
           .state('index', {
               url: '/index',
               templateUrl: 'template/menu.html'
            })
           .state('repair', {
               url: '/repair',
               templateUrl: 'template/repair.html'
           })
           .state('file', {
               url: '/file',
               templateUrl: 'template/file.html'
           })
           .state('scene', {
               url: '/scene',
               templateUrl:'template/scene.html'
           })
           .state('engine', {
               url: '/engine',
               templateUrl:'template/fdj/engine.html'
           })


           .state('t8at8b', {
               url: '/t8at8b',
               templateUrl:'template/fdj/t8at8b.html'
           })
           .state('t8ct8d', {
               url: '/t8ct8d',
               templateUrl:'template/fdj/t8ct8d.html'
           })

           .state('x160', {
               url: '/x160',
               templateUrl:'template/fdj/x160.html'
           })
           .state('b47b', {
               url: '/b47b',
               templateUrl:'template/fdj/b47b.html'
           })
           .state('q38', {
               url: '/q38',
               templateUrl:'template/fdj/q38.html'
           })
           .state('b75c', {
               url: '/b75c',
               templateUrl:'template/fdj/b75c.html'
           })
           .state('q6f', {
               url: '/q6f',
               templateUrl:'template/fdj/q6f.html'
           })
           .state('q6e', {
               url: '/q6e',
               templateUrl:'template/fdj/q6e.html'
           })
           .state('b23e', {
               url: '/b23e',
               templateUrl:'template/fdj/b23e.html'
           })
           .state('b74', {
               url: '/b74',
               templateUrl:'template/fdj/b74.html'
           })
           .state('b52a', {
               url: '/b52a',
               templateUrl:'template/fdj/b52a.html'
           })
           .state('b52b', {
               url: '/b52b',
               templateUrl:'template/fdj/b52b.html'
           })
           .state('k20', {
               url: '/k20',
               templateUrl:'template/fdj/k20.html'
           })
           .state('q18', {
               url: '/q18',
               templateUrl:'template/fdj/q18.html'
           })
           .state('b68', {
               url: '/b68',
               templateUrl:'template/fdj/b68.html'
           })
           .state('b37b', {
               url: '/b37b',
               templateUrl:'template/fdj/b37b.html'
           })
           .state('m64', {
               url: '/m64',
               templateUrl:'template/fdj/m64.html'
           })
           .state('x1', {
               url: '/x1',
               templateUrl:'template/fdj/x1.html'
           })
           .state('x2', {
               url: '/x2',
               templateUrl:'template/fdj/x2.html'
           })
           .state('x3', {
               url: '/x3',
               templateUrl:'template/fdj/x3.html'
           })
           .state('fdjx', {
               url: '/fdjx',
               templateUrl:'template/fdj/fdjx.html'
           })
           .state('trunk', {
               url: '/trunk',
               templateUrl:'template/trunk/trunk.html'
           })
           .state('bt', {
               url: '/bt',
               templateUrl:'template/trunk/bt.html'
           })
           .state('k111', {
               url: '/k111',
               templateUrl:'template/trunk/k111.html'
           })
           .state('b23f', {
               url: '/b23f',
               templateUrl:'template/fdj/b23f.html'
           })
           .state('f31ua', {
               url: '/f31ua',
               templateUrl:'template/fdj/f31ua.html'
           })

           .state('m79', {
               url: '/m79',
               templateUrl:'template/fdj/m79.html'
           })
           .state('b26', {
               url: '/b26',
               templateUrl:'template/fdj/b26.html'
           })
           .state('b5lf', {
               url: '/b5lf',
               templateUrl:'template/fdj/b5lf.html'
           })
           .state('e41', {
               url: '/e41',
               templateUrl:'template/fdj/e41.html'
           })
           .state('k17', {
               url: '/k17',
               templateUrl:'template/fdj/k17.html'
           })
           .state('p12a', {
               url: '/p12a',
               templateUrl:'template/fdj/p12a.html'
           })
           .state('p12b', {
               url: '/p12b',
               templateUrl:'template/fdj/p12b.html'
           })
           .state('coolant', {
               url: '/coolant',
               templateUrl:'template/fdj/coolant.html'
           })
           .state('e13la', {
               url: '/e13la',
               templateUrl:'template/fdj/e13la.html'
           })
           .state('e13ra', {
               url: '/e13ra',
               templateUrl:'template/fdj/e13ra.html'
           })

           .state('f20_12_3ua', {
               url: '/f20_12_3ua',
               templateUrl:'template/fdj/f20_12_3ua.html'
           })
           .state('rightPrevDoor', {
               url: '/rightPrevDoor',
               templateUrl: 'template/door/rightPrevDoor.html'

           })
           .state('rightPD', {
               url: '/rightPD',
               templateUrl: 'template/door/rightPD.html'

           })
           .state('rightBackDoor', {
               url: '/rightBackDoor',
               templateUrl: 'template/door/rightBackDoor.html'

           })
           .state('rightBD', {
               url: '/rightBD',
               templateUrl: 'template/door/rightBD.html'

           })
           .state('leftPrevDoor', {
               url: '/leftPrevDoor',
               templateUrl: 'template/door/leftPrevDoor.html'

           })
           .state('leftPD', {
               url: '/leftPD',
               templateUrl: 'template/door/leftPD.html'
           })
           .state('leftBackDoor', {
               url: '/leftBackDoor',
               templateUrl: 'template/door/leftBackDoor.html'

           })
           .state('leftBD', {
               url: '/leftBD',
               templateUrl: 'template/door/leftBD.html'

           })
           .state('ar23d',{
               url:'/ar23d',
               templateUrl:'template/door/ar23d.html'

           })
           .state('m74d',{
               url:'/m74d',
               templateUrl:'template/door/m74d.html'
           })
           .state('a23lr',{
               url:'/a23lr',
               templateUrl:'template/door/a23lr.html'
           })
           .state('a23rr',{
               url:'/a23rr',
               templateUrl:'template/door/a23rr.html'
           })
           .state('a23p',{
               url:'/a23p',
               templateUrl:'template/door/a23p.html'
           })
           .state('s58b',{
               url:'/s58b',
               templateUrl:'template/door/s58b.html'
           })
           .state('s13d',{
               url:'/s13d',
               templateUrl:'template/door/s13d.html'
           })
          .state('cockpit', {
              url: '/cockpit',
              templateUrl: 'template/cockpit/cockpit.html'
           })
           .state('relayBox', {
               url: '/relayBox',
               templateUrl: 'template/cockpit/relayBox.html'
           })
           .state('b22', {
               url: '/b22',
               templateUrl: 'template/cockpit/b22.html'
           })
           .state('s78', {
               url: '/s78',
               templateUrl: 'template/cockpit/s78.html'
           })
           .state('b107', {
               url: '/b107',
               templateUrl: 'template/cockpit/b107.html'
           })
           .state('s30', {
               url: '/s30',
               templateUrl: 'template/cockpit/s30.html'
           })
           .state('s82', {
               url: '/s82',
               templateUrl: 'template/cockpit/s82.html'
           })
           .state('k9', {
               url: '/k9',
               templateUrl: 'template/cockpit/k9.html'
           })
           .state('chassis', {
               url: '/chassis',
               templateUrl: 'template/chassis/chassis.html'
           })
           .state('b5rr', {
               url: '/b5rr',
               templateUrl: 'template/chassis/b5rr.html'
           })
           .state('b5lr', {
               url: '/b5lr',
               templateUrl: 'template/chassis/b5lr.html'
           })
           .state('oliFoot', {
               url: '/oliFoot',
               templateUrl: 'template/fdj/oliFoot.html'
           })
           .state('m40', {
               url: '/m40',
               templateUrl: 'template/trunk/m40.html'
           })
           .state('b34a', {
               url: '/b34a',
               templateUrl: 'template/fdj/b34a.html'
           })
           .state('s79d', {
               url: '/s79d',
               templateUrl: 'template/door/s79d.html'
           })
           .state('b5rf', {
               url: '/b5rf',
               templateUrl: 'template/fdj/b5rf.html'
           })
           .state('b34b', {
               url: '/b34b',
               templateUrl: 'template/fdj/b34b.html'
           })
           .state('b20', {
               url: '/b20',
               templateUrl: 'template/fdj/b20.html'
           })
           .state('q22', {
               url: '/q22',
               templateUrl: 'template/fdj/q22.html'
           })
           .state('trunk_close', {
               url: '/trunk_close',
               templateUrl: 'template/trunk/trunk_close.html'
           });

});

