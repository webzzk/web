/**
 * @author 谢国亮
 */
ignltionTestDeviceModule.service('ignltionTestDeviceService', function (pageService,dashboardService,xcjDataService) {
    var ignltionTestDeviceService = ignltionTestDeviceService || {};
    ignltionTestDeviceService.Odata = ignltionTestDeviceService.Odata || {};
    ignltionTestDeviceService.Oint = ignltionTestDeviceService.Oint || {};
    ignltionTestDeviceService.Oout = ignltionTestDeviceService.Oout || {};

    pageService.Pdata = pageService.Pdata||{};
    ignltionTestDeviceService.Oout = {
        Out1Eng_SpPlugTest_Norm_x : '0'//点火测试仪输出
    };
    ignltionTestDeviceService.Odata = {
        ignltionTestDeviceStatus: false,//点火测试仪的显示状态
        ignltionTestDeviceTest:false,//点火测试仪是否在测试
        ignltion_hot:false,//是否在热区上
        ignltionTestDeviceHontspot: function () {
            $(".t8a-test").droppable({
                tolerance: "pointer",
                greedy: true,
                accept: ".ignltionTestDevice",
                over:function(){
                    ignltionTestDeviceService.Odata.ignltion_hot=true;
                },
                out:function(){
                    ignltionTestDeviceService.Odata.ignltion_hot=false;
                },
                drop: function (event, ui) {
                    ignltionTestDeviceService.Odata.test('t8a');
                    dashboardService.Dint.In1Eng_x_SpPlugTest_x_x = '1';
                    pageService.Pint.In1Sen_T8A_Coil_x_Install='2';
                    pageService.Pint.In1Sen_T8A_Coil_Body_Install = '2';
                    xcjDataService.setCondition('v04','1');
                }
            });
            $(".t8b-test").droppable({
                tolerance: "pointer",
                greedy: true,
                accept: ".ignltionTestDevice",
                over:function(){
                    ignltionTestDeviceService.Odata.ignltion_hot=true;
                },
                out:function(){
                    ignltionTestDeviceService.Odata.ignltion_hot=false;
                },
                drop: function (event, ui) {
                    ignltionTestDeviceService.Odata.test('t8b');
                    dashboardService.Dint.In1Eng_x_SpPlugTest_x_x = '2';
                    pageService.Pint.In1Sen_T8B_Coil_x_Install='2';
                    pageService.Pint.In1Sen_T8B_Coil_Body_Install = '2';
                    xcjDataService.setCondition('v04','2');
                }
            });
            $(".t8c-test").droppable({
                tolerance: "pointer",
                greedy: true,
                accept: ".ignltionTestDevice",
                over:function(){
                    ignltionTestDeviceService.Odata.ignltion_hot=true;
                },
                out:function(){
                    ignltionTestDeviceService.Odata.ignltion_hot=false;
                },
                drop: function (event, ui) {
                    ignltionTestDeviceService.Odata.test('t8c');
                    dashboardService.Dint.In1Eng_x_SpPlugTest_x_x = '3';
                    pageService.Pint.In1Sen_T8C_Coil_Conn_Install='2';
                    pageService.Pint.In1Sen_T8C_Coil_Body_Install = '2';
                    xcjDataService.setCondition('v04','3');
                }
            });
            $(".t8d-test").droppable({
                tolerance: "pointer",
                greedy: true,
                accept: ".ignltionTestDevice",
                over:function(){
                    ignltionTestDeviceService.Odata.ignltion_hot=true;
                },
                out:function(){
                    ignltionTestDeviceService.Odata.ignltion_hot=false;
                },
                drop: function (event, ui) {
                    ignltionTestDeviceService.Odata.test('t8d');
                    dashboardService.Dint.In1Eng_x_SpPlugTest_x_x = '4';//In1Eng_x_SpPlugTest_x_x
                    pageService.Pint.In1Sen_T8D_Coil_Conn_Install='2';
                    pageService.Pint.In1Sen_T8D_Coil_Body_Install = '2';
                    xcjDataService.setCondition('v04','4');
                }
            });
        },
    test:function (id) {
        ignltionTestDeviceService.Odata.ignltion_hot=false;
        ignltionTestDeviceService.Odata.ignltionTestDeviceTest=true;
        pageService.Pdata[id+"_test"]=true;
    }
  };








    return ignltionTestDeviceService;

});
