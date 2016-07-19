/**
 * @createDate   2015-08-13 下午05:28:38
 * @author       hao liqiang
 * @email       lq.hao@xiaochejiang.com
 * @version      2.0
 */
allsensorModule.controller('dataCtrl', function ($scope,$rootScope, pageService,dashboardService,multimeterService,cylpressguageService,obdscanService,ignltionTestDeviceService,oscilloscopeService,diodelampService) {
    var sbtInt = {};
    var sbtobject = {};
    var sbtCase = {
        In1Sen_BATT_Pos_x_Install:'1',//电池正极安装状态
        In1Sen_BATT_Neg_x_Install:'1',//电池负极安装状态
        In1Sen_K20_X1_x_Install:'1',//发动机控制模块K20X1安装状态
        In1Sen_K20_X2_x_Install:'1',//发动机控制模块K20X2安装状态
        In1Sen_K20_X3_x_Install:'1',//发动机控制模块K20X3安装状态
        In1Sen_KR27_Conn_x_Install:'1',//KR27起动机继电器安装状态
        In1Sen_KR27_Conn_Pin1_Open:'1',//KR27继电器1脚开路
        In1Sen_KR27_Conn_Pin2_Open:'1',//KR27继电器2脚开路
        In1Sen_KR27_Conn_Pin3_Open:'1',//KR27继电器3脚开路
        In1Sen_KR27_Conn_Pin4_Open:'1',//KR27继电器5脚开路
        In1Sen_KR27_Body_x_Fault:'1',//KR27继电器本体故障
        In1Sen_M64_Conn_x_Install:'1',//起动机插头安装状态
        In1Sen_M64_Conn_Pin1_Open:'1',//起动机插头1脚开路
        In1Sen_M64_Conn_Pin2_Open:'1',//起动机插头2脚开路
        In1Sen_M64_Conn_Pin3_Open:'1',//起动机插头3脚开路
        In1Sen_Starter_Body_x_Fault:'1',//起动机本体故障
        In1Sen_F3UA_Body_x_Install:'1',//F3UA保险安装状态
        In1Sen_F3UA_Body_x_Fault:'1',//F3UA保险断路
        In1Sen_F31UA_Body_x_Install:'1',//F31UA保险安装状态
        In1Sen_F31UA_Body_x_Fault:'1',//F31UA保险断路
        In1Sen_F20UA_Body_x_Install:'1',//F20UA保险安装状态
        In1Sen_F20UA_Body_x_Fault:'1',//F20UA保险断路
        In1Sen_F12UA_Body_x_Install:'1',//F12UA保险安装状态
        In1Sen_F12UA_Body_x_Fault:'1',//F12UA保险断路
        In1Sen_F13UA_Body_x_Install:'1',//F13UA保险安装状态
        In1Sen_F13UA_Body_x_Fault:'1',//F13UA保险断路
        In1Sen_F14UA_Body_x_Install:'1',//F14UA保险安装状态
        In1Sen_F14UA_Body_x_Fault:'1',//F14UA保险断路
        In1Sen_F15UA_Body_x_Install:'1',//F15UA保险安装状态
        In1Sen_F15UA_Body_x_Fault:'1',//F15UA保险断路
        In1Sen_F36UA_Body_x_Install:'1',//F36UA保险安装状态
        In1Sen_F36UA_Body_x_Fault:'1',//F36UA保险断路
        In1Sen_X55A_Body_x_Install:'1',//X55AF保险丝安装状态
        In1Sen_X55A_Body_x_Fault:'1',//X55AF保险丝断路
        In1Sen_T8A_Coil_x_Install:'1',//T8A点火线圈1安装状态
        In1Sen_T8A_Coil_Pin1_Open:'1',//T8A点火线圈1脚开路
        In1Sen_T8A_Coil_Pin2_Open:'1',//T8A点火线圈2脚开路
        In1Sen_T8A_Coil_Pin3_Open:'1',//T8A点火线圈3脚开路
        In1Sen_T8A_Coil_Pin4_Open:'1',//T8A点火线圈4脚开路
        In1Sen_T8A_Coil_Body_Install:'1',//T8A点火线圈本体安装状态
        In1Sen_T8A_Coil_Body_Fault:'1',//T8A点火线圈本体故障
        In1Sen_T8A_SpPlug_Body_Install:'1',//T8A火花塞安装
        In1Sen_T8A_SpPlug_Body_Fault:'1',//T8A火花塞故障
        In1Sen_T8B_Coil_x_Install:'1',//T8B点火线圈安装状态
        In1Sen_T8B_Coil_Pin1_Open:'1',//T8B点火线圈1脚开路
        In1Sen_T8B_Coil_Pin2_Open:'1',//T8B点火线圈2脚开路
        In1Sen_T8B_Coil_Pin3_Open:'1',//T8B点火线圈3脚开路
        In1Sen_T8B_Coil_Pin4_Open:'1',//T8B点火线圈4脚开路
        In1Sen_T8B_Coil_Body_Install:'1',//T8B点火线圈本体安装状态
        In1Sen_T8B_Coil_Body_Fault:'1',//T8B点火线圈本体故障
        In1Sen_T8B_SpPlug_Body_Install:'1',//T8B火花塞安装
        In1Sen_T8B_SpPlug_Body_Fault:'1',//T8B火花塞故障
        In1Sen_T8C_Coil_Conn_Install:'1',//T8C点火线圈安装状态
        In1Sen_T8C_Coil_Pin1_Open:'1',//T8C点火线圈1脚开路
        In1Sen_T8C_Coil_Pin2_Open:'1',//T8C点火线圈2脚开路
        In1Sen_T8C_Coil_Pin3_Open:'1',//T8C点火线圈3脚开路
        In1Sen_T8C_Coil_Pin4_Open:'1',//T8C点火线圈4脚开路
        In1Sen_T8C_Coil_Body_Install:'1',//T8C点火线圈本体安装状态
        In1Sen_T8C_Coil_Body_Fault:'1',//T8C点火线圈本体故障
        In1Sen_T8C_SpPlug_Body_Install:'1',//T8C火花塞安装
        In1Sen_T8C_SpPlug_Body_Fault:'1',//T8C火花塞故障
        In1Sen_T8D_Coil_Conn_Install:'1',//T8D点火线圈安装状态
        In1Sen_T8D_Coil_Pin1_Open:'1',//T8D点火线圈1脚开路
        In1Sen_T8D_Coil_Pin2_Open:'1',//T8D点火线圈2脚开路
        In1Sen_T8D_Coil_Pin3_Open:'1',//T8D点火线圈3脚开路
        In1Sen_T8D_Coil_Pin4_Open:'1',//T8D点火线圈4脚开路
        In1Sen_T8D_Coil_Body_Install:'1',//T8D点火线圈本体安装状态
        In1Sen_T8D_Coil_Body_Fault:'1',//T8D点火线圈本体故障
        In1Sen_T8D_SpPlug_Body_Install:'1',//T8D火花塞安装
        In1Sen_T8D_SpPlug_Body_Fault:'1',//T8D火花塞故障
        In1Sen_B75C_Conn_x_Install:'1',//B75C多功能进气传感器安装状态
        In1Sen_B75C_Conn_Pin1_Open:'1',//B75C传感器1脚开路
        In1Sen_B75C_Conn_Pin2_Open:'1',//B75C传感器2脚开路
        In1Sen_B75C_Conn_Pin3_Open:'1',//B75C传感器3脚开路
        In1Sen_B75C_Conn_Pin4_Open:'1',//B75C传感器4脚开路
        In1Sen_B75C_Conn_Pin5_Open:'1',//B75C传感器5脚开路
        In1Sen_B75C_Conn_Pin6_Open:'1',//B75C传感器6脚开路
        In1Sen_B75C_Conn_Pin7_Open:'1',//B75C传感器7脚开路
        In1Sen_B75C_Conn_Pin8_Open:'1',//B75C传感器8脚开路
        In1Sen_B75C_Body_x_Fault:'1',//B75C传感器部件本体故障
        In1Sen_B34A_Conn_x_Install:'1',//B34A发动机冷却液温度传感器安装状态
        In1Sen_B34A_Conn_Pin1_Open:'1',//B34A冷却液温度传感器1脚开路
        In1Sen_B34A_Conn_Pin2_Open:'1',//B34A冷却液温度传感器2脚开路
        In1Sen_B34A_Body_x_Fault:'1',//B34A冷却液温度传感器本体故障
        In1Sen_B34A_Conn_Pin1_S2GND:'1',//B34A冷却液温度传感器1脚对地短路
        In1Sen_B34B_Conn_x_Install:'1',//B34B发动机冷却液温度传感器安装状态
        In1Sen_B34B_Conn_Pin1_Open:'1',//B34B冷却液温度传感器1脚开路
        In1Sen_B34B_Conn_Pin2_Open:'1',//B34B冷却液温度传感器2脚开路
        In1Sen_B34B_Body_x_Fault:'1',//B34B冷却液温度传感器本体故障
        In1Sen_B52B_Conn_x_Install:'1',//B52B加热型氧传感器1安装状态
        In1Sen_B52B_Conn_Pin1_Open:'1',//B52B氧传感器1脚开路
        In1Sen_B52B_Conn_Pin2_Open:'1',//B52B氧传感器2脚开路
        In1Sen_B52B_Conn_Pin3_Open:'1',//B52B氧传感器3脚开路
        In1Sen_B52B_Conn_Pin4_Open:'1',//B52B氧传感器4脚开路
        In1Sen_B52B_Body_x_Fault:'1',//B52B氧传感器本体故障
        In1Sen_B74_Conn_x_Install:'1',//B74进气歧管绝对压力传感器安装状态
        In1Sen_B74_Conn_Pin1_Open:'1',//B74传感器1脚开路
        In1Sen_B74_Conn_Pin2_Open:'1',//B74传感器2脚开路
        In1Sen_B74_Conn_Pin3_Open:'1',//B74传感器3脚开路
        In1Sen_B74_Body_x_Fault:'1',//B74传感器部件本体故障
        In1Sen_E41_Conn_x_Install:'1',//E41发动机冷却液节温器加热器安装状态
        In1Sen_E41_Conn_Pin1_Open:'1',//E41冷却液节温器加热器1脚开路
        In1Sen_E41_Conn_Pin2_Open:'1',//E41冷却液节温器加热器2脚开路
        In1Sen_E41_Body_x_Fault:'1',//E41冷却液节温器加热器本体故障
        In1Sen_B52A_Conn_x_Install:'1',//B52A加热型氧传感器1安装状态
        In1Sen_B52A_Conn_Pin1_Open:'1',//B52A氧传感器1脚开路
        In1Sen_B52A_Conn_Pin2_Open:'1',//B52A氧传感器2脚开路
        In1Sen_B52A_Conn_Pin3_Open:'1',//B52A氧传感器3脚开路
        In1Sen_B52A_Conn_Pin4_Open:'1',//B52A氧传感器4脚开路
        In1Sen_B52A_Body_x_Fault:'1',//B52A氧传感器本体故障
        In1Sen_Q12_Conn_x_Install:'1',//Q12蒸发排放吹洗电磁阀安装状态
        In1Sen_Q12_Conn_Pin1_Open:'1',//Q12电磁阀1脚开路
        In1Sen_Q12_Conn_Pin2_Open:'1',//Q12电磁阀2脚开路
        In1Sen_Q12_Body_x_Fault:'1',//Q12电磁阀本体故障
        In1Sen_Q22_Conn_x_Install:'1',//Q22进气歧管调节电磁阀安装状态
        In1Sen_Q22_Conn_Pin1_Open:'1',//Q22电磁阀1脚开路
        In1Sen_Q22_Conn_Pin2_Open:'1',//Q22电磁阀2脚开路
        In1Sen_Q22_Body_x_Fault:'1',//Q22电磁阀本体故障
        In1Sen_K111_Conn_x_Install:'1',//K111燃油泵驱动器控制模块安装状态
        In1Sen_K111_Body_x_Fault:'1',//K111燃油泵驱动器控制模块本体故障
        In1Sen_K111_Conn_Pin2_Open:'1',//K111燃油泵驱动器控制模块2脚开路
        In1Sen_K111_Conn_Pin9_Open:'1',//K111燃油泵驱动器控制模块9脚开路
        In1Sen_K111_Conn_Pin6_Open:'1',//K111燃油泵驱动器控制模块6脚开路
        In1Sen_A7_Conn_x_Install:'1',//A7燃油泵和油位传感器总成安装状态
        In1Sen_A7_Conn_Pin1_Open:'1',//A7燃油泵和油位传感器1脚开路
        In1Sen_A7_Conn_Pin2_Open:'1',//A7燃油泵和油位传感器2脚开路
        In1Sen_A7_Body_x_Fault:'1',//A7燃油泵和油位传感器本体故障
        In1Sen_B47_Conn_x_Install:'1',//B47燃油压力传感器安装状态
        In1Sen_B47_Conn_Pin1_Open:'1',//B47燃油传感器1脚开路
        In1Sen_B47_Conn_Pin2_Open:'1',//B47燃油传感器2脚开路
        In1Sen_B47_Conn_Pin3_Open:'1',//B47燃油传感器3脚开路
        In1Sen_B47_Body_x_Fault:'1',//B47燃油传感器本体故障
        In1Sen_B107_Conn_x_Install:'1',//B107加速踏板位置传感器安装状态
        In1Sen_B107_Conn_Pin1_Open:'1',//B107传感器1脚开路
        In1Sen_B107_Conn_Pin2_Open:'1',//B107传感器2脚开路
        In1Sen_B107_Conn_Pin3_Open:'1',//B107传感器3脚开路
        In1Sen_B107_Conn_Pin4_Open:'1',//B107传感器4脚开路
        In1Sen_B107_Conn_Pin5_Open:'1',//B107传感器5脚开路
        In1Sen_B107_Conn_Pin6_Open:'1',//B107传感器6脚开路
        In1Sen_B107_Body_x_Fault:'1',//B107部件本体故障
        In1Sen_Q38_Conn_x_Install:'1',//Q38节气门体安装状态
        In1Sen_Q38_Conn_Pin1_Open:'1',//Q38传感器1脚开路
        In1Sen_Q38_Conn_Pin2_Open:'1',//Q38传感器2脚开路
        In1Sen_Q38_Conn_Pin3_Open:'1',//Q38传感器3脚开路
        In1Sen_Q38_Conn_Pin4_Open:'1',//Q38传感器4脚开路
        In1Sen_Q38_Conn_Pin5_Open:'1',//Q38传感器5脚开路
        In1Sen_Q38_Conn_Pin6_Open:'1',//Q38传感器6脚开路
        In1Sen_Q38_Body_x_Fault:'1',//Q38部件本体故障
        In1Sen_K9_Conn_x_Install:'1',//K9车身控制模块安装状态
        In1Sen_K9_Body_x_Fault:'1',//K9车身控制模块本体故障
        In1Sen_B22_Conn_x_Install:'1',//B22制动踏板位置传感器安装状态
        In1Sen_B22_Conn_Pin1_Open:'1',//B22传感器1脚开路
        In1Sen_B22_Conn_Pin2_Open:'1',//B22传感器2脚开路
        In1Sen_B22_Conn_Pin3_Open:'1',//B22传感器3脚开路
        In1Sen_B22_Conn_Pin4_Open:'1',//B22传感器4脚开路
        In1Sen_B22_Conn_Pin5_Open:'1',//B22传感器5脚开路
        In1Sen_B22_Conn_Pin6_Open:'1',//B22传感器6脚开路
        In1Sen_B22_Body_x_Fault:'1',//B22制动踏板位置传感器本体故障
        In1Sen_B23F_Conn_x_Install:'1',//B23F进气凸轮轴位置传感器安装状态
        In1Sen_B23F_Conn_Pin1_Open:'1',//B23F进气凸轮轴1脚开路
        In1Sen_B23F_Conn_Pin2_Open:'1',//B23F进气凸轮轴2脚开路
        In1Sen_B23F_Conn_Pin3_Open:'1',//B23F进气凸轮轴3脚开路
        In1Sen_B23F_Body_x_Fault:'1',//B23F进气凸轮轴位置传感器本体故障
        In1Sen_B23E_Conn_x_Install:'1',//B23E排气凸轮轴位置传感器安装状态
        In1Sen_B23E_Conn_Pin1_Open:'1',//B23E排气凸轮轴1脚开路
        In1Sen_B23E_Conn_Pin2_Open:'1',//B23E排气凸轮轴2脚开路
        In1Sen_B23E_Conn_Pin3_Open:'1',//B23E排气凸轮轴3脚开路
        In1Sen_B23E_Body_x_Fault:'1',//B23E排气凸轮轴位置传感器本体故障
        In1Sen_B26_Conn_x_Install:'1',//B26曲轴位置传感器安装状态
        In1Sen_B26_Conn_Pin1_Open:'1',//B26曲轴位置传感器1脚开路
        In1Sen_B26_Conn_Pin2_Open:'1',//B26曲轴位置传感器2脚开路
        In1Sen_B26_Conn_Pin3_Open:'1',//B26曲轴位置传感器3脚开路
        In1Sen_B26_Body_x_Fault:'1',//B26曲轴位置传感器本体故障
        In1Sen_Q6F_Conn_x_Install:'1',//Q6F进气凸轮轴位置执行器电磁阀安装状态
        In1Sen_Q6F_Conn_Pin1_Open:'1',//Q6F进气凸轮轴位置电磁阀1脚开路
        In1Sen_Q6F_Conn_Pin2_Open:'1',//Q6F进气凸轮轴位置电磁阀2脚开路
        In1Sen_Q6F_Body_x_Fault:'1',//Q6F进气凸轮轴位置本体故障
        In1Sen_Q6E_Conn_x_Install:'1',//Q6E排气凸轮轴位置执行器电磁阀安装状态
        In1Sen_Q6E_Conn_Pin1_Open:'1',//Q6E排气凸轮轴位置电磁阀1脚开路
        In1Sen_Q6E_Conn_Pin2_Open:'1',//Q6E排气凸轮轴位置电磁阀2脚开路
        In1Sen_Q6E_Body_x_Fault:'1',//Q6E进气凸轮轴位置本体故障
        In1Sen_B68_Conn_x_Install:'1',//B68爆震传感器安装状态
        In1Sen_B68_Conn_Pin1_Open:'1',//B68爆震传感器1脚开路
        In1Sen_B68_Conn_Pin2_Open:'1',//B68爆震传感器2脚开路
        In1Sen_B68_Body_x_Fault:'1',//B68爆震传感器本体故障
        In1Sen_B47B_Conn_x_Install:'1',//B47B燃油导轨压力传感器安装状态
        In1Sen_B47B_Conn_Pin1_Open:'1',//B47B燃油导轨压力传感器1脚开路
        In1Sen_B47B_Conn_Pin2_Open:'1',//B47B燃油导轨压力传感器2脚开路
        In1Sen_B47B_Conn_Pin3_Open:'1',//B47B燃油导轨压力传感器3脚开路
        In1Sen_B47B_Body_x_Fault:'1',//B47B燃油导轨压力传感器本体故障
        In1Sen_Q18_Conn_x_Install:'1',//Q18燃油压力调节器安装状态
        In1Sen_Q18_Conn_Pin1_Open:'1',//Q18燃油压力调节器1脚开路
        In1Sen_Q18_Conn_Pin2_Open:'1',//Q18燃油压力调节器2脚开路
        In1Sen_Q18_Body_x_Fault:'1',//Q18燃油压力调节器本体故障
        In1Sen_X160_Conn_x_Install:'1',//X160燃油喷射器安装状态
        In1Sen_Q17B_Conn_Pin1_Open:'1',//Q17B燃油喷射器1脚开路
        In1Sen_Q17B_Conn_Pin2_Open:'1',//Q17B燃油喷射器2脚开路
        In1Sen_Q17B_Body_x_Fault:'1',//Q17B燃油喷射器本体故障
        In1Sen_Q17C_Conn_Pin1_Open:'1',//Q17C燃油喷射器1脚开路
        In1Sen_Q17C_Conn_Pin2_Open:'1',//Q17C燃油喷射器2脚开路
        In1Sen_Q17C_Body_x_Fault:'1',//Q17C燃油喷射器本体故障
        In1Sen_Q17D_Conn_Pin1_Open:'1',//Q17D燃油喷射器1脚开路
        In1Sen_Q17D_Conn_Pin2_Open:'1',//Q17D燃油喷射器2脚开路
        In1Sen_Q17D_Body_x_Fault:'1',//Q17D燃油喷射器本体故障
        In1Sen_B37B_Conn_x_Install:'1',//B37B发动机机油压力传感器
        In1Sen_B37B_Conn_Pin1_Open:'1',//B37B机油压力传感器1脚开路
        In1Sen_B37B_Conn_Pin2_Open:'1',//B37B机油压力传感器2脚开路
        In1Sen_B37B_Conn_Pin3_Open:'1',//B37B机油压力传感器3脚开路
        In1Sen_B37B_Body_x_Fault:'1',//机油压力传感器本体故障
        In1Sen_Q17A_Conn_Pin1_Open:'1',//Q17A燃油喷射器1脚开路
        In1Sen_Q17A_Conn_Pin2_Open:'1'//Q17A燃油喷射器2脚开路

    };
    //设置pageServicePint相关参数
    for(var props in sbtCase){
        //console.log(pageService.Pint[props]==sbtCase[props]);
        if(pageService.Pint[props]==sbtCase[props]){
            pageService.Pint[props]=sbtCase[props];
        }

    }

    function plugin0() {
        return document.getElementById('plugin0');
    }
    plugin = plugin0;

    function addEvent(obj, name, func) {
        if (obj.attachEvent) {
            obj.attachEvent("on" + name, func);
        } else {
            obj.addEventListener(name, func, false);
        }
    }

    function load() {
        addEvent(plugin(), 'test', function () {
            alert("Received a test event from the plugin.")
        });
    }

    function pluginLoaded() {
        alert("Plugin loaded!");
    }

    function addTestEvent() {
        addEvent(plugin(), 'echo', function (txt, count) {
            alert(txt + count);
        });
    }

    function testEvent() {
        plugin().testEvent();
    };

    //sbtInt.oilpressguage = oilpressguageService.Oint;
    sbtInt.dashboard = dashboardService.Dint;
    sbtInt.multimeter = multimeterService.Mint;
    sbtInt.obdscanr = obdscanService.Mint;
    sbtInt.cylpressguage = cylpressguageService.Oint;
    sbtInt.allsensor = pageService.Pint;





    function count(src) {

    };
    function pluginValidStart() {
        //  plugin().echo();
        // setInterval("pluginValid()",100);
    }

//输入----
    function outParam() {
        //console.log(sbtInt.oilpressguage.In1Sen_x_SupplyOilLine_x_x);
        // console.log(sbtInt.allsensor.In1Sen_PVSV_x_Pi2Intake_PiCla);
        //console.log("In1Sen_Catalytic_Body_x_Fault---"+sbtInt.allsensor.In1Sen_Catalytic_Body_x_Fault)
        var paramObj = JSON.stringify(sbtInt);
        // plugin().echoInputValues("'"+paramObj+"'");
        try {
            //  console.log(paramObj);
            plugin().WebInputValues(paramObj);
            if(plugin().VersionGet(pageService.SysVersion)=="no"){
                alert("插件版本较老，请更新插件");
            }


        } catch (e) {
            //alert(plugin().VersionGet(pageService.SysVersion))

        }

    }

    function exit() {
        plugin().ModelStop();
    }
    $scope.isPlugin=true;
    $rootScope.exit=function() {
        if($scope.isPlugin){
            plugin().ModelStop();
            $scope.isPlugin=false;
        }
    };

    $(function () {
        var fefef = "";
        var wewewe = "";
        for (var i in sbtCase) {
            fefef = fefef + sbtCase[i];

        }
        //console.log(fefef);
        for (var i = 1; i < 54; i++) {
            wewewe = wewewe + parseInt(fefef.substring(4 * i - 4, 4 * i), 2).toString(16);
            // console.log(fefef.substring(4*i-4,4*i));
        }
        //console.log(wewewe);
        /*        var fefe2 = "000";
         var wewew2 = "";
         for (var i in fdjqh) {
         fefe2 = fefe2 + fdjqh[i];

         }
         //e.log(fefef);
         for (var i = 1; i < 15; i++) {
         wewew2 = wewew2 + parseInt(fefe2.substring(4 * i - 4, 4 * i), 2).toString(16);
         // console.log(fefef.substring(4*i-4,4*i));
         }*/
        // console.log(wewew2);
        sbtobject.In1_x_Fault_x_Control = wewewe;//号
        /*  sbtobject.In1_x_switch_x_Judge = wewew2;//机公共输入*/
        sbtobject.In1_x_Init_x_Control = '1'; //0
        sbtobject.In1_x_Multi_x_State = '1';//否使用
        sbtobject.In1_x_ObdsSan_x_state = '1';//否使用
        sbtobject.In1_x_dashboard_x_state = '1';//使用

        var q = JSON.stringify(sbtobject);
        /*        if(plugin().ModelControler(q)==undefined){
         $("#errorPop , #noPlug").show();
         }*/
        plugin().ModelControler(q);
        setInterval(function () {
            outParam();
        }, 40);
        setInterval(function () {
            pluginValid();
        }, 40);
    });
    var sbtOut;
    function pluginValid() {
        sbtOut = eval("(" + plugin().OutToWebValues() + ")");
        cylpressguageService.Oout.Out1Sen_Cyl_PressGauge_x_x = sbtOut.Out1Sen_Cyl_PressGauge_x_x;
        multimeterService.Mout.Out1MultiLogic_x_ToScreen_x_x = formatFloat(sbtOut.Out1MultiLogic_x_ToScreen_x_x);
        // oilpressguageService.Oout.Out1Sen_OP_PressGauge_x_x = sbtOut.Out1Sen_OP_PressGauge_x_x;

        dashboardService.Dout.Out1Dash_x_LED_ABS_Jud = sbtOut.Out1Dash_x_LED_ABS_Jud;//	ABS灯输出
        dashboardService.Dout.Out1Dash_x_LED_Brake_Jud =sbtOut.Out1Dash_x_LED_Brake_Jud;//	制动灯输出
        dashboardService.Dout.Out1Dash_x_LED_SafeBag_Jud =sbtOut.Out1Dash_x_LED_SafeBag_Jud;//	安全气囊灯输出
        dashboardService.Dout.Out1Dash_x_LED_MIL_Jud =sbtOut.Out1Dash_x_LED_MIL_Jud;//	发动机故障灯输出
        dashboardService.Dout.Out1Dash_x_LED_OilPre_Jud =sbtOut.Out1Dash_x_LED_OilPre_Jud;//	油压灯输出
        dashboardService.Dout.Out1Dash_x_LED_BATTFault_Jud =sbtOut.Out1Dash_x_LED_BATTFault_Jud;//	蓄电池灯输出
        dashboardService.Dout.Out1Dash_x_LED_SafeBelt_Jud =sbtOut.Out1Dash_x_LED_SafeBelt_Jud;//	安全带灯输出
        dashboardService.Dout.Out1Eng_x_EngSpeed_x_x =sbtOut.Out1Eng_x_EngSpeed_x_x;//	安全带灯输出
        dashboardService.Dout.Out1Eng_x_CoolTempSensor_x_x= sbtOut.Out1Eng_x_CoolTempSensor_x_x; //发动机冷却液温度传感器
        dashboardService.Dout.Out1Eng_x_VehSensor_x_x= sbtOut.Out1Eng_x_VehSensor_x_x; //车速传感器
        dashboardService.Dout.Out1Eng_x_OilVolume_x_x= sbtOut.Out1Eng_x_OilVolume_x_x;//油箱油量
        dashboardService.Dout.Out1Eng_x_CheckVeh_x_x= sbtOut.Out1Eng_x_CheckVeh_x_x;//请速检修车辆
        dashboardService.Dout.Out1Eng_x_ForceDes_x_x= sbtOut.Out1Eng_x_ForceDes_x_x;//发动机动力降低
        dashboardService.Dout.Out1Eng_x_ESC_x_x= sbtOut.Out1Eng_x_ESC_x_x;//检修电子稳定控制
        dashboardService.Dout.Out1Eng_x_PowDes_x_x= sbtOut.Out1Eng_x_PowDes_x_x;//发动机功率降低

        obdscanService.Mout.Out1Eng_x_FaultCode_P129D_x = sbtOut.Out1Eng_x_FaultCode_P129D_x;//P129D 燃油泵驱动器控制模块点火打开/起动开关电路电压过低
        obdscanService.Mout.Out1Eng_x_FaultCode_P1682_x = sbtOut.Out1Eng_x_FaultCode_P1682_x;//P1682 点火开关电路2
        obdscanService.Mout.Out1Eng_x_FaultCode_P0689_x = sbtOut.Out1Eng_x_FaultCode_P0689_x;//P0689 发动机控制点火继电器反馈电路电压过低
        obdscanService.Mout.Out1Eng_x_FaultCode_P0615_x = sbtOut.Out1Eng_x_FaultCode_P0615_x;//P0615 起动机继电器控制电路
        obdscanService.Mout.Out1Eng_x_FaultCode_P0616_x = sbtOut.Out1Eng_x_FaultCode_P0616_x;//P0616 起动机继电器控制电路电压过低
        obdscanService.Mout.Out1Eng_x_FaultCode_P135A_x = sbtOut.Out1Eng_x_FaultCode_P135A_x;//P135A 点火线圈电源电压电路 - 缸组1
        obdscanService.Mout.Out1Eng_x_FaultCode_P0597_x = sbtOut.Out1Eng_x_FaultCode_P0597_x;//P0597 发动机冷却液节温器加热器控制电路故障
        obdscanService.Mout.Out1Eng_x_FaultCode_P0598_x = sbtOut.Out1Eng_x_FaultCode_P0598_x;//P0598 发动机冷却液节温器加热器控制电路电压过低
        obdscanService.Mout.Out1Eng_x_FaultCode_P06DA_x = sbtOut.Out1Eng_x_FaultCode_P06DA_x;//P06DA 发动机机油压力控制电磁阀控制电路
        obdscanService.Mout.Out1Eng_x_FaultCode_P06DB_x = sbtOut.Out1Eng_x_FaultCode_P06DB_x;//P06DB 发动机机油压力控制电磁阀控制电路电压过低
        obdscanService.Mout.Out1Eng_x_FaultCode_P0443_x = sbtOut.Out1Eng_x_FaultCode_P0443_x;//P0443 蒸发排放吹洗电磁阀控制电路
        obdscanService.Mout.Out1Eng_x_FaultCode_P0458_x = sbtOut.Out1Eng_x_FaultCode_P0458_x;//P0458 蒸发排放（EVAP）清污电磁阀控制电路电压过低
        obdscanService.Mout.Out1Eng_x_FaultCode_P0030_x = sbtOut.Out1Eng_x_FaultCode_P0030_x;//P0030 加热型氧传感器加热器控制电路 - 传感器1
        obdscanService.Mout.Out1Eng_x_FaultCode_P0031_x = sbtOut.Out1Eng_x_FaultCode_P0031_x;//P0031 加热型氧传感器加热器控制电路电压过低 - 传感器1
        obdscanService.Mout.Out1Eng_x_FaultCode_P0036_x = sbtOut.Out1Eng_x_FaultCode_P0036_x;//P0036 加热型氧传感器加热器控制电路 - 传感器2
        obdscanService.Mout.Out1Eng_x_FaultCode_P0037_x = sbtOut.Out1Eng_x_FaultCode_P0037_x;//P0037 加热型氧传感器加热器控制电路电压过低 - 传感器2
        obdscanService.Mout.Out1Eng_x_FaultCode_P0135_x = sbtOut.Out1Eng_x_FaultCode_P0135_x;//P0135 加热型氧传感器加热器性能 - 传感器1
        obdscanService.Mout.Out1Eng_x_FaultCode_P0141_x = sbtOut.Out1Eng_x_FaultCode_P0141_x;//P0141 加热型氧传感器加热器性能 - 传感器2
        obdscanService.Mout.Out1Eng_x_FaultCode_P0660_x = sbtOut.Out1Eng_x_FaultCode_P0660_x;//P0660 进气歧管调节控制阀控制电路
        obdscanService.Mout.Out1Eng_x_FaultCode_P0661_x = sbtOut.Out1Eng_x_FaultCode_P0661_x;//P0661 进气歧管调节控制阀控制电路电压过低
        obdscanService.Mout.Out1Eng_x_FaultCode_P0351_x = sbtOut.Out1Eng_x_FaultCode_P0351_x;//P0351 点火线圈1控制电路
        obdscanService.Mout.Out1Eng_x_FaultCode_P0352_x = sbtOut.Out1Eng_x_FaultCode_P0352_x;//P0352 点火线圈2控制电路
        obdscanService.Mout.Out1Eng_x_FaultCode_P0353_x = sbtOut.Out1Eng_x_FaultCode_P0353_x;//P0353 点火线圈3控制电路
        obdscanService.Mout.Out1Eng_x_FaultCode_P0354_x = sbtOut.Out1Eng_x_FaultCode_P0354_x;//P0354 点火线圈4控制电路
        obdscanService.Mout.Out1Eng_x_FaultCode_P2311_x = sbtOut.Out1Eng_x_FaultCode_P2311_x;//P0300 检测到发动机缺火
        obdscanService.Mout.Out1Eng_x_FaultCode_P0192_x = sbtOut.Out1Eng_x_FaultCode_P0192_x;//P0192 燃油导轨压力传感器电路电压过低
        obdscanService.Mout.Out1Eng_x_FaultCode_P16A1_x = sbtOut.Out1Eng_x_FaultCode_P16A1_x;// P16A1 传感器通信电路电压过高
        obdscanService.Mout.Out1Eng_x_FaultCode_P00F4_x = sbtOut.Out1Eng_x_FaultCode_P00F4_x;// P00F4 进气湿度传感器电路电压过低
        obdscanService.Mout.Out1Eng_x_FaultCode_P0097_x = sbtOut.Out1Eng_x_FaultCode_P0097_x;//P0097 进气温度（IAT）传感器2电路电压过低
        obdscanService.Mout.Out1Eng_x_FaultCode_P0113_x = sbtOut.Out1Eng_x_FaultCode_P0113_x;//P0113 进气温度（IAT）传感器1电路电压过高
        obdscanService.Mout.Out1Eng_x_FaultCode_P2227_x = sbtOut.Out1Eng_x_FaultCode_P2227_x;//P2227 大气压力（BARO）传感器性能
        obdscanService.Mout.Out1Eng_x_FaultCode_P2229_x = sbtOut.Out1Eng_x_FaultCode_P2229_x;//P2229 大气压力（BARO）传感器电路高电压
        obdscanService.Mout.Out1Eng_x_FaultCode_P121A_x = sbtOut.Out1Eng_x_FaultCode_P121A_x;// P121A 质量空气流量（MAF）传感器电源电压控制电路
        obdscanService.Mout.Out1Eng_x_FaultCode_P121B_x = sbtOut.Out1Eng_x_FaultCode_P121B_x;// P121B 质量空气流量（MAF）传感器电源电压控制电路电压过低
        obdscanService.Mout.Out1Eng_x_FaultCode_P00C7_x = sbtOut.Out1Eng_x_FaultCode_P00C7_x;// P00C7 进气压力测量系统 - 多个传感器不合理
        obdscanService.Mout.Out1Eng_x_FaultCode_P0102_x = sbtOut.Out1Eng_x_FaultCode_P0102_x;//P0102 质量空气流量（MAF）传感器电路频率过低
        obdscanService.Mout.Out1Eng_x_FaultCode_P0106_x = sbtOut.Out1Eng_x_FaultCode_P0106_x;//P0106 歧管绝对压力（MAP）传感器性能
        obdscanService.Mout.Out1Eng_x_FaultCode_P0108_x = sbtOut.Out1Eng_x_FaultCode_P0108_x;//P0108 歧管绝对压力（MAP）传感器电路电压过高
        obdscanService.Mout.Out1Eng_x_FaultCode_P0340_x = sbtOut.Out1Eng_x_FaultCode_P0340_x;//P0340 进气凸轮轴位置传感器电路
        obdscanService.Mout.Out1Eng_x_FaultCode_P0365_x = sbtOut.Out1Eng_x_FaultCode_P0365_x;//P0365 排气凸轮轴位置传感器电路
        obdscanService.Mout.Out1Eng_x_FaultCode_P0010_x = sbtOut.Out1Eng_x_FaultCode_P0010_x;//P0010 进气凸轮轴位置执行器电磁阀控制电路
        obdscanService.Mout.Out1Eng_x_FaultCode_P0013_x = sbtOut.Out1Eng_x_FaultCode_P0013_x;//P0013 排气凸轮轴位置执行器电磁阀控制电路
        obdscanService.Mout.Out1Eng_x_FaultCode_P2089_x = sbtOut.Out1Eng_x_FaultCode_P2089_x;//P2089 进气凸轮轴位置执行器电磁阀控制电路电压过高
        obdscanService.Mout.Out1Eng_x_FaultCode_P2091_x = sbtOut.Out1Eng_x_FaultCode_P2091_x;//P2091 排气凸轮轴位置执行器电磁阀控制电路电压过高
        obdscanService.Mout.Out1Eng_x_FaultCode_P0131_x = sbtOut.Out1Eng_x_FaultCode_P0131_x;//P0131 加热型氧传感器电路电压过低 - 传感器1
        obdscanService.Mout.Out1Eng_x_FaultCode_P0132_x = sbtOut.Out1Eng_x_FaultCode_P0132_x;//P0132 加热型氧传感器电路电压过高 - 传感器1
        obdscanService.Mout.Out1Eng_x_FaultCode_P0137_x = sbtOut.Out1Eng_x_FaultCode_P0137_x;//P0137 加热型氧传感器电路电压过低 - 传感器2
        obdscanService.Mout.Out1Eng_x_FaultCode_P018C_x = sbtOut.Out1Eng_x_FaultCode_P018C_x;// P018C 燃油压力传感器电路电压过低
        obdscanService.Mout.Out1Eng_x_FaultCode_P018D_x = sbtOut.Out1Eng_x_FaultCode_P018D_x;// P018D 燃油压力传感器电路电压过高
        obdscanService.Mout.Out1Eng_x_FaultCode_P0463_x = sbtOut.Out1Eng_x_FaultCode_P0463_x;//P0463 燃油油位传感器电路电压过高
        obdscanService.Mout.Out1Eng_x_FaultCode_P0533_x = sbtOut.Out1Eng_x_FaultCode_P0533_x;//P0533 空调（A/C）制冷剂压力传感器电路电压过高
        obdscanService.Mout.Out1Eng_x_FaultCode_P0558_x = sbtOut.Out1Eng_x_FaultCode_P0558_x;//P0558 制动助力器压力传感器电路电压过高
        obdscanService.Mout.Out1Eng_x_FaultCode_P171A_x = sbtOut.Out1Eng_x_FaultCode_P171A_x;// P171A 变速器油压力蓄能器电磁阀控制电路
        obdscanService.Mout.Out1Eng_x_FaultCode_P171B_x = sbtOut.Out1Eng_x_FaultCode_P171B_x;// P171B 变速器油压力蓄能器电磁阀控制电路电压过低
        obdscanService.Mout.Out1Eng_x_FaultCode_U01B0_x = sbtOut.Out1Eng_x_FaultCode_U01B0_x;// U01B0 与蓄电池监测模块失去通信
        obdscanService.Mout.Out1Eng_x_FaultCode_P0089_x = sbtOut.Out1Eng_x_FaultCode_P0089_x;//P0089 燃油压力调节器性能
        obdscanService.Mout.Out1Eng_x_FaultCode_P228D_x = sbtOut.Out1Eng_x_FaultCode_P228D_x;// P228D 燃油压力调节器控制性能 - 压力过高
        obdscanService.Mout.Out1Eng_x_FaultCode_P0522_x = sbtOut.Out1Eng_x_FaultCode_P0522_x;//P0522 发动机机油压力传感器电路电压过低
        obdscanService.Mout.Out1Eng_x_FaultCode_P0090_x = sbtOut.Out1Eng_x_FaultCode_P0090_x;//P0090 燃油压力调节器控制电路
        obdscanService.Mout.Out1Eng_x_FaultCode_P00C8_x = sbtOut.Out1Eng_x_FaultCode_P00C8_x;// P00C8 燃油压力调节器高电平控制电路
        obdscanService.Mout.Out1Eng_x_FaultCode_P0325_x = sbtOut.Out1Eng_x_FaultCode_P0325_x;//P0325 爆震传感器电路
        obdscanService.Mout.Out1Eng_x_FaultCode_P0118_x = sbtOut.Out1Eng_x_FaultCode_P0118_x;//P0118 发动机冷却液温度（ECT）传感器电路电压过高
        obdscanService.Mout.Out1Eng_x_FaultCode_P00B4_x = sbtOut.Out1Eng_x_FaultCode_P00B4_x;// P00B4 散热器冷却液温度（RCT）传感器电路电压过高
        obdscanService.Mout.Out1Eng_x_FaultCode_U18A2_x = sbtOut.Out1Eng_x_FaultCode_U18A2_x;// U18A2 与燃油泵驱动器控制模块失去通信
        obdscanService.Mout.Out1Eng_x_FaultCode_P0627_x = sbtOut.Out1Eng_x_FaultCode_P0627_x;//P0627 燃油泵启用电路
        obdscanService.Mout.Out1Eng_x_FaultCode_P0629_x = sbtOut.Out1Eng_x_FaultCode_P0629_x;//P0629 燃油泵启用电路电压过高
        obdscanService.Mout.Out1Eng_x_FaultCode_U0422_x = sbtOut.Out1Eng_x_FaultCode_U0422_x;//U0422 接收到来自车身控制模块的无效数据
        obdscanService.Mout.Out1Eng_x_FaultCode_C027706_x= sbtOut.Out1Eng_x_FaultCode_C027706_x;//C0277 06 制动踏板位置传感器电路电压过低/开路
        obdscanService.Mout.Out1Eng_x_FaultCode_P057C_x = sbtOut.Out1Eng_x_FaultCode_P057C_x;//P057C 制动踏板位置传感器电路电压过低
        obdscanService.Mout.Out1Eng_x_FaultCode_P2122_x = sbtOut.Out1Eng_x_FaultCode_P2122_x;//P2122 加速踏板位置（APP）传感器1电路电压过低
        obdscanService.Mout.Out1Eng_x_FaultCode_P2127_x = sbtOut.Out1Eng_x_FaultCode_P2127_x;//P2127 加速踏板位置（APP）传感器2电路电压过低
        obdscanService.Mout.Out1Eng_x_FaultCode_C0110_x = sbtOut.Out1Eng_x_FaultCode_C0110_x;//C0110 泵电机电路故障
        obdscanService.Mout.Out1Eng_x_FaultCode_P16A0_x = sbtOut.Out1Eng_x_FaultCode_P16A0_x;//P16A0 传感器通信电路电压过低
        obdscanService.Mout.Out1Eng_x_FaultCode_P0135_x = sbtOut.Out1Eng_x_FaultCode_P0135_x;//P0135 加热型氧传感器加热器性能传感器1
        obdscanService.Mout.Out1Eng_x_FaultCode_P0073_x = sbtOut.Out1Eng_x_FaultCode_P0073_x;//P0073 环境空气温度传感器电路电压过高
        obdscanService.Mout.Out1Eng_x_FaultCode_P0203_x = sbtOut.Out1Eng_x_FaultCode_P0203_x;//P0203 气缸3喷射器控制电路
        obdscanService.Mout.Out1Eng_x_FaultCode_P062B_x = sbtOut.Out1Eng_x_FaultCode_P062B_x;//P062B 控制模块燃油喷射器控制性能
        /*5月*/
        obdscanService.Mout.Out1Veh_x_FaultCode_U1515_x = sbtOut.Out1Veh_x_FaultCode_U1515_x;//	U1515 K9车身控制模块与M75挡风玻璃刮水器电机 / M75L挡风玻璃左侧刮水器电机模块在LIN总线上失去通信
        obdscanService.Mout.Out1Veh_x_FaultCode_U1538_x = sbtOut.Out1Veh_x_FaultCode_U1538_x;//	U1538 K9车身控制模块与S79D驾驶员车窗开关在LIN总线上失去通信
        obdscanService.Mout.Out1Veh_x_FaultCode_U1534_x = sbtOut.Out1Veh_x_FaultCode_U1534_x;//	U1534 K9车身控制模块与M74D驾驶员车窗电机在LIN总线上失去通信
        obdscanService.Mout.Out1Veh_x_FaultCode_U153A_x = sbtOut.Out1Veh_x_FaultCode_U153A_x;//	U153A K9车身控制模块与S79P乘客车窗开关在LIN总线上失去通信
        obdscanService.Mout.Out1Veh_x_FaultCode_U151B_x = sbtOut.Out1Veh_x_FaultCode_U151B_x;//	U151B K9车身控制模块与K61天窗控制模块在LIN总线上失去通信      K40座椅位置记忆控制模块与S79P乘客车窗开关在LIN总线上失去通信
        obdscanService.Mout.Out1Veh_x_FaultCode_U152D_x = sbtOut.Out1Veh_x_FaultCode_U152D_x;//	U152D K9车身控制模块与P2变速器换档杆位置指示灯在LIN总线上失去通信
        obdscanService.Mout.Out1Veh_x_FaultCode_B257B03_x = sbtOut.Out1Veh_x_FaultCode_B257B03_x;//	B257B 03 照明控制开关信号电压过低
        obdscanService.Mout.Out1Veh_x_FaultCode_B257B07_x = sbtOut.Out1Veh_x_FaultCode_B257B07_x;//	B257B 07 照明控制开关信号电压过高
        obdscanService.Mout.Out1Veh_x_FaultCode_B260B01_x = sbtOut.Out1Veh_x_FaultCode_B260B01_x;//	B260B 01  右侧日间行车灯继电器控制电路对蓄电池短路
        obdscanService.Mout.Out1Veh_x_FaultCode_B260B02_x = sbtOut.Out1Veh_x_FaultCode_B260B02_x;//	B260B 02 左侧日间行车灯继电器控制电路对搭铁短路
        obdscanService.Mout.Out1Veh_x_FaultCode_B260B04_x = sbtOut.Out1Veh_x_FaultCode_B260B04_x;//	B260B 04 左侧日间行车灯继电器控制电路开路
        obdscanService.Mout.Out1Veh_x_FaultCode_B260C01_x = sbtOut.Out1Veh_x_FaultCode_B260C01_x;//	B260C 01  右侧日间行车灯继电器控制电路对蓄电池短路
        obdscanService.Mout.Out1Veh_x_FaultCode_B260C02_x = sbtOut.Out1Veh_x_FaultCode_B260C02_x;//	B260C 02 右侧日间行车灯继电器控制电路对搭铁短路
        obdscanService.Mout.Out1Veh_x_FaultCode_B260C04_x = sbtOut.Out1Veh_x_FaultCode_B260C04_x;//	B260C 04 右侧日间行车灯继电器控制电路开路
        obdscanService.Mout.Out1Veh_x_FaultCode_B259A01_x = sbtOut.Out1Veh_x_FaultCode_B259A01_x;//	B259A 01 左侧转向照明灯继电器控制电路对蓄电池短路
        obdscanService.Mout.Out1Veh_x_FaultCode_B259A02_x = sbtOut.Out1Veh_x_FaultCode_B259A02_x;//	B259A 02 左侧转向灯继电器控制电路对搭铁短路
        obdscanService.Mout.Out1Veh_x_FaultCode_B259A04_x = sbtOut.Out1Veh_x_FaultCode_B259A04_x;//	B259A 04 左转向指示灯继电器控制电路开路
        obdscanService.Mout.Out1Veh_x_FaultCode_B259B01_x = sbtOut.Out1Veh_x_FaultCode_B259B01_x;//	B259B 01 右侧转向照明灯继电器控制电路对蓄电池短路
        obdscanService.Mout.Out1Veh_x_FaultCode_B259B02_x = sbtOut.Out1Veh_x_FaultCode_B259B02_x;//	B259B 02 右侧转向灯继电器控制电路对搭铁短路
        obdscanService.Mout.Out1Veh_x_FaultCode_B259B04_x = sbtOut.Out1Veh_x_FaultCode_B259B04_x;//	B259B 04 右转向指示灯继电器控制电路开路
        obdscanService.Mout.Out1Veh_x_FaultCode_B258001_x = sbtOut.Out1Veh_x_FaultCode_B258001_x;//	B2580 01 远光控制电路对蓄电池短路
        obdscanService.Mout.Out1Veh_x_FaultCode_B258002_x = sbtOut.Out1Veh_x_FaultCode_B258002_x;//	B2580 02 远光控制电路对搭铁短路
        obdscanService.Mout.Out1Veh_x_FaultCode_B258004_x = sbtOut.Out1Veh_x_FaultCode_B258004_x;//	B2580 04 远光控制电路开路
        obdscanService.Mout.Out1Veh_x_FaultCode_B2750_x = sbtOut.Out1Veh_x_FaultCode_B2750_x;//	B2750 喇叭继电器辅助电路
        obdscanService.Mout.Out1Veh_x_FaultCode_B3978_x = sbtOut.Out1Veh_x_FaultCode_B3978_x;//	B3978 从充气式约束系统传感和诊断模块接收到错误的环境识别符
        obdscanService.Mout.Out1Veh_x_FaultCode_B3979_x = sbtOut.Out1Veh_x_FaultCode_B3979_x;//	B3979 从HVAC控制模块接收到错误的环境识别符
        obdscanService.Mout.Out1Veh_x_FaultCode_B3980_x = sbtOut.Out1Veh_x_FaultCode_B3980_x;//	B3980 从组合仪表接收到错误的环境识别符
        obdscanService.Mout.Out1Veh_x_FaultCode_B3981_x = sbtOut.Out1Veh_x_FaultCode_B3981_x;//	B3981 从电子制动控制模块接收到错误的环境识别符
        obdscanService.Mout.Out1Veh_x_FaultCode_B3982_x = sbtOut.Out1Veh_x_FaultCode_B3982_x;//	B3982 从远程通信接口控制模块接收到错误的环境识别符
        obdscanService.Mout.Out1Veh_x_FaultCode_B3101_x = sbtOut.Out1Veh_x_FaultCode_B3101_x;//	B3101 无钥匙进入数据链路电路
        obdscanService.Mout.Out1Veh_x_FaultCode_U0298_x = sbtOut.Out1Veh_x_FaultCode_U0298_x;//	U0298 00 在总线B上，与直流/直流转换器控制模块失去通讯
        obdscanService.Mout.Out1Veh_x_FaultCode_B300601_x = sbtOut.Out1Veh_x_FaultCode_B300601_x;//	B3006 01 发动机舱盖微启电路,对蓄电池短路
        obdscanService.Mout.Out1Veh_x_FaultCode_B300604_x = sbtOut.Out1Veh_x_FaultCode_B300604_x;//	B3006 04 发动机舱盖微启电路,开路
        obdscanService.Mout.Out1Veh_x_FaultCode_U0121_x = sbtOut.Out1Veh_x_FaultCode_U0121_x;//	U0121 与电子制动控制模块失去通信
        obdscanService.Mout.Out1Veh_x_FaultCode_U0131_x = sbtOut.Out1Veh_x_FaultCode_U0131_x;//	U0131 与动力转向控制模块失去通信
        obdscanService.Mout.Out1Veh_x_FaultCode_U0100_x = sbtOut.Out1Veh_x_FaultCode_U0100_x;//	U0100 与发动机控制模块失去通信
        obdscanService.Mout.Out1Veh_x_FaultCode_U0101_x = sbtOut.Out1Veh_x_FaultCode_U0101_x;//	U0101 与变速器控制模块失去通信
        obdscanService.Mout.Out1Veh_x_FaultCode_C0035_x = sbtOut.Out1Veh_x_FaultCode_C0035_x;//	C0035 左前轮转速传感器电路
        obdscanService.Mout.Out1Veh_x_FaultCode_C0036_x = sbtOut.Out1Veh_x_FaultCode_C0036_x;//	C0036 左前轮转速传感器范围性能
        obdscanService.Mout.Out1Veh_x_FaultCode_C003A_x = sbtOut.Out1Veh_x_FaultCode_C003A_x;//	C003A 前轮转速传感器电路
        obdscanService.Mout.Out1Veh_x_FaultCode_C0040_x = sbtOut.Out1Veh_x_FaultCode_C0040_x;//	C0040 右前轮转速传感器电路
        obdscanService.Mout.Out1Veh_x_FaultCode_C0041_x = sbtOut.Out1Veh_x_FaultCode_C0041_x;//	C0041 右前轮转速传感器范围性能
        obdscanService.Mout.Out1Veh_x_FaultCode_C0045_x = sbtOut.Out1Veh_x_FaultCode_C0045_x;//	C0045 左后轮转速传感器电路
        obdscanService.Mout.Out1Veh_x_FaultCode_C0046_x = sbtOut.Out1Veh_x_FaultCode_C0046_x;//	C0046 左后轮转速传感器范围性能
        obdscanService.Mout.Out1Veh_x_FaultCode_C0050_x = sbtOut.Out1Veh_x_FaultCode_C0050_x;//	C0050 右后轮转速传感器电路
        obdscanService.Mout.Out1Veh_x_FaultCode_C0051_x = sbtOut.Out1Veh_x_FaultCode_C0051_x;//	C0051 右后轮转速传感器范围性能
        obdscanService.Mout.Out1Veh_x_FaultCode_C0267_x = sbtOut.Out1Veh_x_FaultCode_C0267_x;//	C0267 00 指示制动液液位过低
        obdscanService.Mout.Out1Veh_x_FaultCode_C0126_x = sbtOut.Out1Veh_x_FaultCode_C0126_x;//	C0126 制动液液位传感器电路
        obdscanService.Mout.Out1Veh_x_FaultCode_C0110_x = sbtOut.Out1Veh_x_FaultCode_C0110_x;//	C0110 泵电机电路故障
        obdscanService.Mout.Out1Veh_x_FaultCode_U0422_x = sbtOut.Out1Veh_x_FaultCode_U0422_x;//	U0422 接收到来自车身控制模块的无效数据




        obdscanService.Mout.Out1Sen_Cyl_PressGauge_x_x= sbtOut.Out1Sen_Cyl_PressGauge_x_x; //缸压信号
        obdscanService.Mout.Out1Eng_x_AFRatio_x_x= sbtOut.Out1Eng_x_AFRatio_x_x; //空气/燃油当量比指令
        obdscanService.Mout.Out1Eng_x_AmbAirTemp_x_x= sbtOut.Out1Eng_x_AmbAirTemp_x_x; //环境空气温度
        obdscanService.Mout.Out1Eng_x_APPNO1Volt_x_x= sbtOut.Out1Eng_x_APPNO1Volt_x_x; //加速踏板位置传感器1
        obdscanService.Mout.Out1Eng_x_APPNO1_x_x= sbtOut.Out1Eng_x_APPNO1_x_x; //加速踏板位置传感器1位置
        obdscanService.Mout.Out1Eng_x_APPNO2Volt_x_x= sbtOut.Out1Eng_x_APPNO2Volt_x_x; //加速踏板位置传感器2
        obdscanService.Mout.Out1Eng_x_APPNO2_x_x= sbtOut.Out1Eng_x_APPNO2_x_x; //加速踏板位置传感器2位置
        obdscanService.Mout.Out1Eng_x_AmbPre_x_x= sbtOut.Out1Eng_x_AmbPre_x_x; //大气压力
        obdscanService.Mout.Out1Eng_x_BrakeVltSig_x_x= sbtOut.Out1Eng_x_BrakeVltSig_x_x; //制动踏板位置电路信号
        obdscanService.Mout.Out1Eng_x_BrakeSenSig_x_x= sbtOut.Out1Eng_x_BrakeSenSig_x_x; //制动踏板位置传感器信号
        obdscanService.Mout.Out1Eng_x_BrakeSwitch_x_x= sbtOut.Out1Eng_x_BrakeSwitch_x_x; //制动踏板开关
        obdscanService.Mout.Out1Eng_x_CtrlModuVltSig_x_x= sbtOut.Out1Eng_x_CtrlModuVltSig_x_x; //控制模块电压信号
        obdscanService.Mout.Out1Eng_x_StaterReqSig_x_x= sbtOut.Out1Eng_x_StaterReqSig_x_x; //起动请求信号
        obdscanService.Mout.Out1Eng_x_CoolTempSensor_x_x= sbtOut.Out1Eng_x_CoolTempSensor_x_x; //发动机冷却液温度传感器
        obdscanService.Mout.Out1Eng_x_CtrlIgnReInd_x_x= sbtOut.Out1Eng_x_CtrlIgnReInd_x_x; //发动机控制点火继电器指令
        obdscanService.Mout.Out1Eng_x_CtrlIgnReFeSig_x_x= sbtOut.Out1Eng_x_CtrlIgnReFeSig_x_x; //发动机控制点火继电器反馈信号
        obdscanService.Mout.Out1Eng_x_EngLoad_x_x= sbtOut.Out1Eng_x_EngLoad_x_x; //发动机负荷
        obdscanService.Mout.Out1Eng_x_EngOilPre_x_x= sbtOut.Out1Eng_x_EngOilPre_x_x; //发动机机油压力
        obdscanService.Mout.Out1Eng_x_EngSpeed_x_x= sbtOut.Out1Eng_x_EngSpeed_x_x; //发动机转速
        obdscanService.Mout.Out1Eng_x_EvapEmiPSVInd_x_x= sbtOut.Out1Eng_x_EvapEmiPSVInd_x_x; //蒸发排放吹洗电磁阀指令
        obdscanService.Mout.Out1Eng_x_FuelCtrlLoopSta1_x_x= sbtOut.Out1Eng_x_FuelCtrlLoopSta1_x_x; //燃油控制回路状态
        obdscanService.Mout.Out1Eng_x_FuelPreSensor_x_x= sbtOut.Out1Eng_x_FuelPreSensor_x_x; //燃油压力传感器
        obdscanService.Mout.Out1Eng_x_FuelPumpEnaIns_x_x= sbtOut.Out1Eng_x_FuelPumpEnaIns_x_x; //燃油泵启用指令
        obdscanService.Mout.Out1Eng_x_HeatTypOxSen1_x_x= sbtOut.Out1Eng_x_HeatTypOxSen1_x_x; //加热型氧传感器1
        obdscanService.Mout.Out1Eng_x_HeatTypOxSen2_x_x= sbtOut.Out1Eng_x_HeatTypOxSen2_x_x; //加热型氧传感器2
        obdscanService.Mout.Out1Eng_x_InAirTempSen_x_x= sbtOut.Out1Eng_x_InAirTempSen_x_x; //进气温度传感器
        obdscanService.Mout.Out1Eng_x_InAirTempSen2Hz_x_x= sbtOut.Out1Eng_x_InAirTempSen2Hz_x_x; //进气温度传感器2
        obdscanService.Mout.Out1Eng_x_InAirTempSen2_x_x= sbtOut.Out1Eng_x_InAirTempSen2_x_x; //进气温度传感器2
        obdscanService.Mout.Out1Eng_x_IgnitionSig1_x_x= sbtOut.Out1Eng_x_IgnitionSig1_x_x; //点火1信号
        obdscanService.Mout.Out1Eng_x_IgnAccessorySig_x_x= sbtOut.Out1Eng_x_IgnAccessorySig_x_x; //点火附件信号
        obdscanService.Mout.Out1Eng_x_IgnTiming_x_x= sbtOut.Out1Eng_x_IgnTiming_x_x; //点火正时
        obdscanService.Mout.Out1Eng_x_FuelInjDutyRatio_x_x= sbtOut.Out1Eng_x_FuelInjDutyRatio_x_x; //喷油器占空比
        obdscanService.Mout.Out1Eng_x_InAirHumiSensor1_x_x= sbtOut.Out1Eng_x_InAirHumiSensor1_x_x; //进气湿度传感器
        obdscanService.Mout.Out1Eng_x_LongFT_x_x= sbtOut.Out1Eng_x_LongFT_x_x; //长期燃油修正
        obdscanService.Mout.Out1Eng_x_MAFSensor_x_x= sbtOut.Out1Eng_x_MAFSensor_x_x; //质量空气流量传感器
        obdscanService.Mout.Out1Eng_x_MfAbsPreSensor_x_x= sbtOut.Out1Eng_x_MfAbsPreSensor_x_x; //歧管绝对压力传感器
        obdscanService.Mout.Out1Eng_x_ShortFT_x_x= sbtOut.Out1Eng_x_ShortFT_x_x; //短期燃油修正
        obdscanService.Mout.Out1Eng_x_StarterRelay_x_x= sbtOut.Out1Eng_x_StarterRelay_x_x; //起动机继电器
        obdscanService.Mout.Out1Eng_x_SystemVolt_x_x= sbtOut.Out1Eng_x_SystemVolt_x_x; //系统电压
        obdscanService.Mout.Out1Eng_x_TPSSensor1Volt_x_x= sbtOut.Out1Eng_x_TPSSensor1Volt_x_x; //节气门位置传感器1
        obdscanService.Mout.Out1Eng_x_TPSSensor1Pos_x_x= sbtOut.Out1Eng_x_TPSSensor1Pos_x_x; //节气门位置传感器1位置
        obdscanService.Mout.Out1Eng_x_TPSSensor2Volt_x_x= sbtOut.Out1Eng_x_TPSSensor2Volt_x_x; //节气门位置传感器2
        obdscanService.Mout.Out1Eng_x_TPSSensor2Pos_x_x= sbtOut.Out1Eng_x_TPSSensor2Pos_x_x; //节气门位置传感器2位置
        obdscanService.Mout.Out1Eng_x_VehSensor_x_x= sbtOut.Out1Eng_x_VehSensor_x_x; //车速传感器
        obdscanService.Mout.Out1Eng_x_TPS1_5VRefer_x= sbtOut.Out1Eng_x_TPS1_5VRefer_x; //5伏参考电压1
        obdscanService.Mout.Out1Eng_x_TPS1_5VReferStatus_x= sbtOut.Out1Eng_x_TPS1_5VReferStatus_x; //5伏参考电压1电路状态
        obdscanService.Mout.Out1Eng_x_TPS2_5VRefer_x= sbtOut.Out1Eng_x_TPS2_5VRefer_x; //5伏参考电压2
        obdscanService.Mout.Out1Eng_x_TPS2_5VReferStatus_x= sbtOut.Out1Eng_x_TPS2_5VReferStatus_x; //5伏参考电压2电路状态
        obdscanService.Mout.Out1Eng_x_TPS3_5VRefer_x= sbtOut.Out1Eng_x_TPS3_5VRefer_x; //5伏参考电压3
        obdscanService.Mout.Out1Eng_x_TPS3_5VReferStatus_x= sbtOut.Out1Eng_x_TPS3_5VReferStatus_x; //5伏参考电压3电路状态
        obdscanService.Mout.Out1Eng_x_TPS4_5VRefer_x= sbtOut.Out1Eng_x_TPS4_5VRefer_x; //5伏参考电压4
        obdscanService.Mout.Out1Eng_x_TPS4_5VReferStatus_x= sbtOut.Out1Eng_x_TPS4_5VReferStatus_x; //5伏参考电压4电路状态
        obdscanService.Mout.Out1Eng_x_APP_x_x= sbtOut.Out1Eng_x_APP_x_x; //加速踏板位置
        obdscanService.Mout.Out1Eng_x_APPNO1or2_x_x= sbtOut.Out1Eng_x_APPNO1or2_x_x; //加速踏板位置传感器1和2
        obdscanService.Mout.Out1Eng_x_APPSen_x_x= sbtOut.Out1Eng_x_APPSen_x_x; //加速踏板位置传感器
        obdscanService.Mout.Out1Eng_x_BrakeSen_x_x= sbtOut.Out1Eng_x_BrakeSen_x_x; //制动踏板位置传感器
        obdscanService.Mout.Out1Eng_x_CalcMAF_x_x= sbtOut.Out1Eng_x_CalcMAF_x_x; //计算的空气流量
        obdscanService.Mout.Out1Eng_x_CtrlIgnVlt2High_x_x= sbtOut.Out1Eng_x_CtrlIgnVlt2High_x_x; //发动机控制点火继电器控制电路电压过高测试状态
        obdscanService.Mout.Out1Eng_x_CtrlIgnVlt2Low_x_x= sbtOut.Out1Eng_x_CtrlIgnVlt2Low_x_x; //发动机控制点火继电器控制电路电压过低测试状态
        obdscanService.Mout.Out1Eng_x_CtrlIgnOpenTest_x_x= sbtOut.Out1Eng_x_CtrlIgnOpenTest_x_x; //发动机控制点火继电器控制电路开路测试状态
        obdscanService.Mout.Out1Eng_x_CtrlIgnFed_x_x= sbtOut.Out1Eng_x_CtrlIgnFed_x_x; //发动机控制点火继电器反馈信号
        obdscanService.Mout.Out1Eng_x_TPSMotorInd_x_x= sbtOut.Out1Eng_x_TPSMotorInd_x_x; //节气门执行器控制电机指令
        obdscanService.Mout.Out1Eng_x_TPSPos_x_x= sbtOut.Out1Eng_x_TPSPos_x_x; //节气门位置
        obdscanService.Mout.Out1Eng_x_TPS1or2_x_x= sbtOut.Out1Eng_x_TPS1or2_x_x; //节气门位置传感器1和2
        obdscanService.Mout.Out1Eng_x_Cyl1MisfireCout_x_x= sbtOut.Out1Eng_x_Cyl1MisfireCout_x_x; //气缸1当前缺火计数器
        obdscanService.Mout.Out1Eng_x_Cyl1InjCtrlSta_x_x= sbtOut.Out1Eng_x_Cyl1InjCtrlSta_x_x; //气缸1喷油器控制电路状态
        obdscanService.Mout.Out1Eng_x_Cyl1InjStop_x_x= sbtOut.Out1Eng_x_Cyl1InjStop_x_x; //气缸1喷油器停用 - 检测到缺火
        obdscanService.Mout.Out1Eng_x_Cyl2MisfireCout_x_x= sbtOut.Out1Eng_x_Cyl2MisfireCout_x_x; //气缸2当前缺火计数器
        obdscanService.Mout.Out1Eng_x_Cyl2InjCtrlSta_x_x= sbtOut.Out1Eng_x_Cyl2InjCtrlSta_x_x; //气缸2喷油器控制电路状态
        obdscanService.Mout.Out1Eng_x_Cyl2InjStop_x_x= sbtOut.Out1Eng_x_Cyl2InjStop_x_x; //气缸2喷油器停用 - 检测到缺火
        obdscanService.Mout.Out1Eng_x_Cyl3MisfireCout_x_x= sbtOut.Out1Eng_x_Cyl3MisfireCout_x_x; //气缸3当前缺火计数器
        obdscanService.Mout.Out1Eng_x_Cyl3InjCtrlSta_x_x= sbtOut.Out1Eng_x_Cyl3InjCtrlSta_x_x; //气缸3喷油器控制电路状态
        obdscanService.Mout.Out1Eng_x_Cyl3InjStop_x_x= sbtOut.Out1Eng_x_Cyl3InjStop_x_x; //气缸3喷油器停用 - 检测到缺火
        obdscanService.Mout.Out1Eng_x_Cyl4MisfireCout_x_x= sbtOut.Out1Eng_x_Cyl4MisfireCout_x_x; //气缸4当前缺火计数器
        obdscanService.Mout.Out1Eng_x_Cyl4InjCtrlSta_x_x= sbtOut.Out1Eng_x_Cyl4InjCtrlSta_x_x; //气缸4喷油器控制电路状态
        obdscanService.Mout.Out1Eng_x_Cyl4InjStop_x_x= sbtOut.Out1Eng_x_Cyl4InjStop_x_x; //气缸4喷油器停用 - 检测到缺火
        obdscanService.Mout.Out1Eng_x_Coil1VltTooHi_x_x= sbtOut.Out1Eng_x_Coil1VltTooHi_x_x; //点火线圈1控制电路电压过高测试状态
        obdscanService.Mout.Out1Eng_x_Coil1VltTooLo_x_x= sbtOut.Out1Eng_x_Coil1VltTooLo_x_x; //点火线圈1控制电路电压过低测试状态
        obdscanService.Mout.Out1Eng_x_Coil1VltOpen_x_x= sbtOut.Out1Eng_x_Coil1VltOpen_x_x; //点火线圈1控制电路开路测试状态
        obdscanService.Mout.Out1Eng_x_Coil2VltTooHi_x_x= sbtOut.Out1Eng_x_Coil2VltTooHi_x_x; //点火线圈2控制电路电压过高测试状态
        obdscanService.Mout.Out1Eng_x_Coil2VltTooLo_x_x= sbtOut.Out1Eng_x_Coil2VltTooLo_x_x; //点火线圈2控制电路电压过低测试状态
        obdscanService.Mout.Out1Eng_x_Coil2VltOpen_x_x= sbtOut.Out1Eng_x_Coil2VltOpen_x_x; //点火线圈2控制电路开路测试状态
        obdscanService.Mout.Out1Eng_x_Coil3VltTooHi_x_x= sbtOut.Out1Eng_x_Coil3VltTooHi_x_x; //点火线圈3控制电路电压过高测试状态
        obdscanService.Mout.Out1Eng_x_Coil3VltTooLo_x_x= sbtOut.Out1Eng_x_Coil3VltTooLo_x_x; //点火线圈3控制电路电压过低测试状态
        obdscanService.Mout.Out1Eng_x_Coil3VltOpen_x_x= sbtOut.Out1Eng_x_Coil3VltOpen_x_x; //点火线圈3控制电路开路测试状态
        obdscanService.Mout.Out1Eng_x_Coil4VltTooHi_x_x= sbtOut.Out1Eng_x_Coil4VltTooHi_x_x; //点火线圈4控制电路电压过高测试状态
        obdscanService.Mout.Out1Eng_x_Coil4VltTooLo_x_x= sbtOut.Out1Eng_x_Coil4VltTooLo_x_x; //点火线圈4控制电路电压过低测试状态
        obdscanService.Mout.Out1Eng_x_Coil4VltOpen_x_x= sbtOut.Out1Eng_x_Coil4VltOpen_x_x; //点火线圈4控制电路开路测试状态
        obdscanService.Mout.Out1Eng_x_CrankOutVltHi_x_x= sbtOut.Out1Eng_x_CrankOutVltHi_x_x; //曲轴位置信号输出电路电压过高测试状态
        obdscanService.Mout.Out1Eng_x_CrankOutVltLo_x_x= sbtOut.Out1Eng_x_CrankOutVltLo_x_x; //曲轴位置信号输出电路电压过低测试状态
        obdscanService.Mout.Out1Eng_x_CrankOutVltOpen_x_x= sbtOut.Out1Eng_x_CrankOutVltOpen_x_x; //曲轴位置信号输出电路开路测试状态
        obdscanService.Mout.Out1Eng_x_OilPreSen_x_x= sbtOut.Out1Eng_x_OilPreSen_x_x; //发动机机油压力传感器
        obdscanService.Mout.Out1Eng_x_AmbPreSen_x_x= sbtOut.Out1Eng_x_AmbPreSen_x_x; //大气压力传感器
        obdscanService.Mout.Out1Eng_x_InManiPress_x_x= sbtOut.Out1Eng_x_InManiPress_x_x; //进气歧管压力
        obdscanService.Mout.Out1Eng_x_CtrlValVltInd_x_x= sbtOut.Out1Eng_x_CtrlValVltInd_x_x; //进气歧管调谐控制阀控制电路指令
        obdscanService.Mout.Out1Eng_x_CtrlValVltHi_x_x= sbtOut.Out1Eng_x_CtrlValVltHi_x_x; //进气歧管调谐控制阀控制电路电压过高测试状态
        obdscanService.Mout.Out1Eng_x_CtrlValVltLo_x_x= sbtOut.Out1Eng_x_CtrlValVltLo_x_x; //进气歧管调谐控制阀控制电路电压过低测试状态
        obdscanService.Mout.Out1Eng_x_CtrlValVltOpen_x_x= sbtOut.Out1Eng_x_CtrlValVltOpen_x_x; //进气歧管调谐控制阀控制电路开路测试状态
        obdscanService.Mout.Out1Eng_x_CtrlValFeed_x_x= sbtOut.Out1Eng_x_CtrlValFeed_x_x; //进气歧管调谐控制阀反馈信号
        obdscanService.Mout.Out1Eng_x_MAFSupVltInd_x_x= sbtOut.Out1Eng_x_MAFSupVltInd_x_x; //质量空气流量传感器供电电压指令
        obdscanService.Mout.Out1Eng_x_MAFSupVltHi_x_x= sbtOut.Out1Eng_x_MAFSupVltHi_x_x; //质量空气流量传感器供电电压控制电路电压过高测试状态
        obdscanService.Mout.Out1Eng_x_MAFSupVltLo_x_x= sbtOut.Out1Eng_x_MAFSupVltLo_x_x; //质量空气流量传感器供电电压控制电路电压过低测试状态
        obdscanService.Mout.Out1Eng_x_MAFSupVltOpen_x_x= sbtOut.Out1Eng_x_MAFSupVltOpen_x_x; //质量空气流量传感器供电电压控制电路开路测试状态
        obdscanService.Mout.Out1Eng_x_MfAbsPreSensorVlt_x_x= sbtOut.Out1Eng_x_MfAbsPreSensorVlt_x_x; //歧管绝对压力传感器
        obdscanService.Mout.Out1Eng_x_TPSPosPerf_x_x= sbtOut.Out1Eng_x_TPSPosPerf_x_x; //节气门位置性能测试
        obdscanService.Mout.Out1Eng_x_CrankActCount_x_x= sbtOut.Out1Eng_x_CrankActCount_x_x; //曲轴位置激活计数器
        obdscanService.Mout.Out1Eng_x_CrankPosSen_x_x= sbtOut.Out1Eng_x_CrankPosSen_x_x; //曲轴位置传感器
        obdscanService.Mout.Out1Eng_x_ExCAMActCount_x_x= sbtOut.Out1Eng_x_ExCAMActCount_x_x; //排气凸轮轴位置活动计数器
        obdscanService.Mout.Out1Eng_x_CoilSupVlt_x_x= sbtOut.Out1Eng_x_CoilSupVlt_x_x; //点火线圈供电电压
        obdscanService.Mout.Out1Eng_x_InCAMActCount_x_x= sbtOut.Out1Eng_x_InCAMActCount_x_x; //进气凸轮轴位置活动计数器
        obdscanService.Mout.Out1Eng_x_Oxgen1Heat_x_x= sbtOut.Out1Eng_x_Oxgen1Heat_x_x; //加热型氧传感器1加热器
        obdscanService.Mout.Out1Eng_x_Oxgen1HeatInd_x_x= sbtOut.Out1Eng_x_Oxgen1HeatInd_x_x; //加热型氧传感器1加热器指令
        obdscanService.Mout.Out1Eng_x_Oxgen1HeatIndPer_x_x= sbtOut.Out1Eng_x_Oxgen1HeatIndPer_x_x; //加热型氧传感器1加热器指令
        obdscanService.Mout.Out1Eng_x_Oxgen1HeatVltHi_x_x= sbtOut.Out1Eng_x_Oxgen1HeatVltHi_x_x; //加热型氧传感器1加热器控制电路电压过高测试状态
        obdscanService.Mout.Out1Eng_x_Oxgen1HeatVltLo_x_x= sbtOut.Out1Eng_x_Oxgen1HeatVltLo_x_x; //加热型氧传感器1加热器控制电路电压过低测试状态
        obdscanService.Mout.Out1Eng_x_Oxgen1HeatVltOpen_x_x= sbtOut.Out1Eng_x_Oxgen1HeatVltOpen_x_x; //加热型氧传感器1加热器控制电路开路测试状态
        obdscanService.Mout.Out1Eng_x_Oxgen2Heat_x_x= sbtOut.Out1Eng_x_Oxgen2Heat_x_x; //加热型氧传感器2加热器
        obdscanService.Mout.Out1Eng_x_Oxgen2HeatInd_x_x= sbtOut.Out1Eng_x_Oxgen2HeatInd_x_x; //加热型氧传感器2加热器指令
        obdscanService.Mout.Out1Eng_x_Oxgen2HeatIndPer_x_x= sbtOut.Out1Eng_x_Oxgen2HeatIndPer_x_x; //加热型氧传感器2加热器指令
        obdscanService.Mout.Out1Eng_x_Oxgen2HeatVltHi_x_x= sbtOut.Out1Eng_x_Oxgen2HeatVltHi_x_x; //加热型氧传感器2加热器控制电路电压过高测试状态
        obdscanService.Mout.Out1Eng_x_Oxgen2HeatVltLo_x_x= sbtOut.Out1Eng_x_Oxgen2HeatVltLo_x_x; //加热型氧传感器2加热器控制电路电压过低测试状态
        obdscanService.Mout.Out1Eng_x_Oxgen2HeatVltOpen_x_x= sbtOut.Out1Eng_x_Oxgen2HeatVltOpen_x_x; //加热型氧传感器2加热器控制电路开路测试状态
        obdscanService.Mout.Out1Eng_x_NeedFulePre_x_x= sbtOut.Out1Eng_x_NeedFulePre_x_x; //所需的燃油压力
        obdscanService.Mout.Out1Eng_x_NeedFuleRailPre_x_x= sbtOut.Out1Eng_x_NeedFuleRailPre_x_x; //所需的燃油导轨压力
        obdscanService.Mout.Out1Eng_x_FDriveSupVlt_x_x= sbtOut.Out1Eng_x_FDriveSupVlt_x_x; //燃油喷射器驱动器供电电压
        obdscanService.Mout.Out1Eng_x_FPreRegVltInd_x_x= sbtOut.Out1Eng_x_FPreRegVltInd_x_x; //燃油压力调节器控制电路指令
        obdscanService.Mout.Out1Eng_x_FPreRegVltHi_x_x= sbtOut.Out1Eng_x_FPreRegVltHi_x_x; //燃油压力调节器控制电路电压过高测试状态
        obdscanService.Mout.Out1Eng_x_FPreRegVltLo_x_x= sbtOut.Out1Eng_x_FPreRegVltLo_x_x; //燃油压力调节器控制电路电压过低测试状态
        obdscanService.Mout.Out1Eng_x_FPreRegVltOpen_x_x= sbtOut.Out1Eng_x_FPreRegVltOpen_x_x; //燃油压力调节器控制电路开路测试状态
        obdscanService.Mout.Out1Eng_x_HFPreRegVltInd_x_x= sbtOut.Out1Eng_x_HFPreRegVltInd_x_x; //燃油压力调节器高电平控制电路指令
        obdscanService.Mout.Out1Eng_x_HFPreRegVltHi_x_x= sbtOut.Out1Eng_x_HFPreRegVltHi_x_x; //燃油压力调节器高电平控制电路电压过高测试状态
        obdscanService.Mout.Out1Eng_x_HFPreRegVltLo_x_x= sbtOut.Out1Eng_x_HFPreRegVltLo_x_x; //燃油压力调节器高电平控制电路电压过低测试状态
        obdscanService.Mout.Out1Eng_x_HFPreRegVltOpen_x_x= sbtOut.Out1Eng_x_HFPreRegVltOpen_x_x; //燃油压力调节器高电平控制电路开路测试状态
        obdscanService.Mout.Out1Eng_x_FuelPreSensorVlt_x_x= sbtOut.Out1Eng_x_FuelPreSensorVlt_x_x; //燃油压力传感器
        obdscanService.Mout.Out1Eng_x_FPumpStCiVltHi_x_x= sbtOut.Out1Eng_x_FPumpStCiVltHi_x_x; //燃油泵启用电路电压过高测试状态
        obdscanService.Mout.Out1Eng_x_FPumpStCiVltLo_x_x= sbtOut.Out1Eng_x_FPumpStCiVltLo_x_x; //燃油泵启用电路电压过低测试状态
        obdscanService.Mout.Out1Eng_x_FPumpStCiVltOpen_x_x= sbtOut.Out1Eng_x_FPumpStCiVltOpen_x_x; //燃油泵启用电路开路测试状态
        obdscanService.Mout.Out1Eng_x_FRailPreRegInd_x_x= sbtOut.Out1Eng_x_FRailPreRegInd_x_x; //燃油导轨压力调节器指令
        obdscanService.Mout.Out1Eng_x_FRailPreSensor_x_x= sbtOut.Out1Eng_x_FRailPreSensor_x_x; //燃油导轨压力传感器
        obdscanService.Mout.Out1Eng_x_EvapEmiPVSVltHi_x_x= sbtOut.Out1Eng_x_EvapEmiPVSVltHi_x_x; //蒸发排放吹洗电磁阀控制电路电压过高测试状态
        obdscanService.Mout.Out1Eng_x_EvapEmiPVSVltLo_x_x= sbtOut.Out1Eng_x_EvapEmiPVSVltLo_x_x; //蒸发排放吹洗电磁阀控制电路电压过低测试状态
        obdscanService.Mout.Out1Eng_x_EvapEmiPVSVltOpen_x_x= sbtOut.Out1Eng_x_EvapEmiPVSVltOpen_x_x; //蒸发排放吹洗电磁阀控制电路开路测试状态
        obdscanService.Mout.Out1Eng_x_StReVltHi_x_x= sbtOut.Out1Eng_x_StReVltHi_x_x; //起动机继电器控制电路电压过高测试状态
        obdscanService.Mout.Out1Eng_x_StReVltLo_x_x= sbtOut.Out1Eng_x_StReVltLo_x_x; //起动机继电器控制电路电压过低测试状态
        obdscanService.Mout.Out1Eng_x_StReVltOpen_x_x= sbtOut.Out1Eng_x_StReVltOpen_x_x; //起动机继电器控制电路开路测试状态
        obdscanService.Mout.Out1Eng_x_ThermalHeatInd_x_x= sbtOut.Out1Eng_x_ThermalHeatInd_x_x; //发动机冷却液节温器加热器指令
        obdscanService.Mout.Out1Eng_x_TherHeatVltHi_x_x= sbtOut.Out1Eng_x_TherHeatVltHi_x_x; //发动机冷却液节温器加热器控制电路电压过高测试状态
        obdscanService.Mout.Out1Eng_x_TherHeatVltLo_x_x= sbtOut.Out1Eng_x_TherHeatVltLo_x_x; //发动机冷却液节温器加热器控制电路电压过低测试状态
        obdscanService.Mout.Out1Eng_x_TherHeatVltOpen_x_x= sbtOut.Out1Eng_x_TherHeatVltOpen_x_x; //发动机冷却液节温器加热器控制电路开路测试状态
        obdscanService.Mout.Out1Eng_x_RadiatorTemp_x_x= sbtOut.Out1Eng_x_RadiatorTemp_x_x; //散热器冷却液温度传感器
        obdscanService.Mout.Out1Eng_x_ExCAMCount_x_x= sbtOut.Out1Eng_x_ExCAMCount_x_x; //排气凸轮轴位置活动计数器
        obdscanService.Mout.Out1Eng_x_ExCAMVltHi_x_x= sbtOut.Out1Eng_x_ExCAMVltHi_x_x; //排气凸轮轴位置执行器电磁阀控制电路电压过高测试状态
        obdscanService.Mout.Out1Eng_x_ExCAMVltLo_x_x= sbtOut.Out1Eng_x_ExCAMVltLo_x_x; //排气凸轮轴位置执行器电磁阀控制电路电压过低测试状态
        obdscanService.Mout.Out1Eng_x_ExCAMVltOpen_x_x= sbtOut.Out1Eng_x_ExCAMVltOpen_x_x; //排气凸轮轴位置执行器电磁阀控制电路开路测试状态
        obdscanService.Mout.Out1Eng_x_ExCAMPosInd_x_x= sbtOut.Out1Eng_x_ExCAMPosInd_x_x; //排气凸轮轴位置指令
        obdscanService.Mout.Out1Eng_x_ExCAMPosChange_x_x= sbtOut.Out1Eng_x_ExCAMPosChange_x_x; //排气凸轮轴位置变化
        obdscanService.Mout.Out1Eng_x_InCAMCount_x_x= sbtOut.Out1Eng_x_InCAMCount_x_x; //进气凸轮轴位置活动计数器
        obdscanService.Mout.Out1Eng_x_InCAMVltHi_x_x= sbtOut.Out1Eng_x_InCAMVltHi_x_x; //进气凸轮轴位置执行器电磁阀控制电路电压过高测试状态
        obdscanService.Mout.Out1Eng_x_InCAMVltHiCyl1_x_x= sbtOut.Out1Eng_x_InCAMVltHiCyl1_x_x; //进气凸轮轴位置执行器电磁阀控制电路电压过高测试状态，缸列1
        obdscanService.Mout.Out1Eng_x_InCAMVltLo_x_x= sbtOut.Out1Eng_x_InCAMVltLo_x_x; //进气凸轮轴位置执行器电磁阀控制电路电压过低测试状态
        obdscanService.Mout.Out1Eng_x_InCAMVltLoCyl1_x_x= sbtOut.Out1Eng_x_InCAMVltLoCyl1_x_x; //进气凸轮轴位置执行器电磁阀控制电路电压过低测试状态，缸列1
        obdscanService.Mout.Out1Eng_x_InCAMVltOpen_x_x= sbtOut.Out1Eng_x_InCAMVltOpen_x_x; //进气凸轮轴位置执行器电磁阀控制电路开路测试状态
        obdscanService.Mout.Out1Eng_x_InCAMVltOpenCyl1_x_x= sbtOut.Out1Eng_x_InCAMVltOpenCyl1_x_x; //进气凸轮轴位置执行器电磁阀控制电路开路测试状态，缸列1
        obdscanService.Mout.Out1Eng_x_InCAMPosInd_x_x= sbtOut.Out1Eng_x_InCAMPosInd_x_x; //进气凸轮轴位置指令
        obdscanService.Mout.Out1Eng_x_InCAMPosChange_x_x = sbtOut.Out1Eng_x_InCAMPosChange_x_x; //进气凸轮轴位置偏差


/*5月*/
        obdscanService.Mout.Out1Veh_x_LRWCtrlFallSwt_x_x = sbtOut.Out1Veh_x_LRWCtrlFallSwt_x_x;//	左后窗主控制下降开关
        obdscanService.Mout.Out1Veh_x_LRWCtrlFastSwt_x_x = sbtOut.Out1Veh_x_LRWCtrlFastSwt_x_x;//	左后窗主控制快速开关
        obdscanService.Mout.Out1Veh_x_LRWCtrlRiseSwt_x_x = sbtOut.Out1Veh_x_LRWCtrlRiseSwt_x_x;//	左后窗主控制上升开关
        obdscanService.Mout.Out1Veh_x_LRWRiseSwt_x_x = sbtOut.Out1Veh_x_LRWRiseSwt_x_x;//	左后窗上升开关（位于车门）
        obdscanService.Mout.Out1Veh_x_PassWindowRead_x_x = sbtOut.Out1Veh_x_PassWindowRead_x_x;//	乘客车窗读入
        obdscanService.Mout.Out1Veh_x_PWMotorRevState_x_x = sbtOut.Out1Veh_x_PWMotorRevState_x_x;//	乘客车窗电机倒转状态
        obdscanService.Mout.Out1Veh_x_PWMIndSysFauSta_x_x = sbtOut.Out1Veh_x_PWMIndSysFauSta_x_x;//	乘客车窗电机感应系统故障状态
        obdscanService.Mout.Out1Veh_x_PWMHeatSafeSta_x_x = sbtOut.Out1Veh_x_PWMHeatSafeSta_x_x;//	乘客车窗电机热保护状态
        obdscanService.Mout.Out1Veh_x_PWMUndvoltSta_x_x = sbtOut.Out1Veh_x_PWMUndvoltSta_x_x;//	乘客车窗电机欠压状态
        obdscanService.Mout.Out1Veh_x_PassDrWindowSwt_x_x = sbtOut.Out1Veh_x_PassDrWindowSwt_x_x;//	乘客车门上的车窗开关
        obdscanService.Mout.Out1Veh_x_RRWCtrlFallSwt_x_x = sbtOut.Out1Veh_x_RRWCtrlFallSwt_x_x;//	右后窗主控制下降开关
        obdscanService.Mout.Out1Veh_x_RRWCtrlFastSwt_x_x = sbtOut.Out1Veh_x_RRWCtrlFastSwt_x_x;//	右后窗主控制快速开关
        obdscanService.Mout.Out1Veh_x_RRWCtrlRiseSwt_x_x = sbtOut.Out1Veh_x_RRWCtrlRiseSwt_x_x;//	右后窗主控制上升开关
        obdscanService.Mout.Out1Veh_x_RRDrWindowSwt_x_x = sbtOut.Out1Veh_x_RRDrWindowSwt_x_x;//	右后车门上的车窗开关
        obdscanService.Mout.Out1Veh_x_WindowLockSwt_x_x = sbtOut.Out1Veh_x_WindowLockSwt_x_x;//	车窗锁止开关
        obdscanService.Mout.Out1Veh_x_SafeLockSwt_x_x = sbtOut.Out1Veh_x_SafeLockSwt_x_x;//	儿童安全锁/车窗锁止开关
        obdscanService.Mout.Out1Veh_x_DriverWindowRead_x_x = sbtOut.Out1Veh_x_DriverWindowRead_x_x;//	驾驶员车窗已读入
        obdscanService.Mout.Out1Veh_x_DWinCrtlFallSwt_x_x = sbtOut.Out1Veh_x_DWinCrtlFallSwt_x_x;//	驾驶员车窗主控制下降开关
        obdscanService.Mout.Out1Veh_x_DWinCrtlFastSwt_x_x = sbtOut.Out1Veh_x_DWinCrtlFastSwt_x_x;//	驾驶员车窗主控制快速开关
        obdscanService.Mout.Out1Veh_x_DWinCrtlRiseSwt_x_x = sbtOut.Out1Veh_x_DWinCrtlRiseSwt_x_x;//	驾驶员车窗主控制上升开关
        obdscanService.Mout.Out1Veh_x_DWinMotorRevSta_x_x = sbtOut.Out1Veh_x_DWinMotorRevSta_x_x;//	驾驶员车窗电机倒转状态
        obdscanService.Mout.Out1Veh_x_DWMIndFauSta_x_x = sbtOut.Out1Veh_x_DWMIndFauSta_x_x;//	驾驶员车窗电机感应系统故障状态
        obdscanService.Mout.Out1Veh_x_DWMHeatSafeSta_x_x = sbtOut.Out1Veh_x_DWMHeatSafeSta_x_x;//	驾驶员车窗电机热保护状态
        obdscanService.Mout.Out1Veh_x_DWMUndvoltSta_x_x = sbtOut.Out1Veh_x_DWMUndvoltSta_x_x;//	驾驶员车窗电机欠压状态
        obdscanService.Mout.Out1Veh_x_FPWCrtlFallSwt_x_x = sbtOut.Out1Veh_x_FPWCrtlFallSwt_x_x;//	前部乘客车窗主控制下降开关
        obdscanService.Mout.Out1Veh_x_FPWCrtlFastSwt_x_x = sbtOut.Out1Veh_x_FPWCrtlFastSwt_x_x;//	前部乘客车窗主控制快速开关
        obdscanService.Mout.Out1Veh_x_FPWCrtlRiseSwt_x_x = sbtOut.Out1Veh_x_FPWCrtlRiseSwt_x_x;//	前部乘客车窗主控制上升开关
        obdscanService.Mout.Out1Veh_x_ParkingBrakeSta_x_x = sbtOut.Out1Veh_x_ParkingBrakeSta_x_x; //	驻车制动状态
        obdscanService.Mout.Out1Veh_x_SafeIndLed_x_x = sbtOut.Out1Veh_x_SafeIndLed_x_x;//	安全指示灯指令
        obdscanService.Mout.Out1Veh_x_UltrIntrSen_x_x = sbtOut.Out1Veh_x_UltrIntrSen_x_x; //	超声波侵入传感器
        obdscanService.Mout.Out1Veh_x_ValetSwitch_x_x = sbtOut.Out1Veh_x_ValetSwitch_x_x;//	代客泊车开关
        obdscanService.Mout.Out1Veh_x_ReConBatDete_x_x = sbtOut.Out1Veh_x_ReConBatDete_x_x;//	检测到重新连接蓄电池
        obdscanService.Mout.Out1Veh_x_BrPedalStepped_x_x = sbtOut.Out1Veh_x_BrPedalStepped_x_x;//	制动踏板已踩下
        obdscanService.Mout.Out1Veh_x_BrGeInlockSoAcIn_x_x = sbtOut.Out1Veh_x_BrGeInlockSoAcIn_x_x;//	制动变速器换档互锁电磁线圈执行器指令
        obdscanService.Mout.Out1Veh_x_SteeringLockSet_x_x = sbtOut.Out1Veh_x_SteeringLockSet_x_x;//	转向集锁定状态
        obdscanService.Mout.Out1Veh_x_AnTheftSysAlert_x_x = sbtOut.Out1Veh_x_AnTheftSysAlert_x_x;//	车内物品防盗系统警报状态
        obdscanService.Mout.Out1Veh_x_LiftAntiTheftSys_x_x = sbtOut.Out1Veh_x_LiftAntiTheftSys_x_x;//	车内物品防盗系统解除直到车辆关闭
        obdscanService.Mout.Out1Veh_x_AnTheftSysEnHis1_x_x = sbtOut.Out1Veh_x_AnTheftSysEnHis1_x_x;//	车内物品防盗系统触发器历史1
        obdscanService.Mout.Out1Veh_x_AnTheftSysEnHis2_x_x = sbtOut.Out1Veh_x_AnTheftSysEnHis2_x_x;//	车内物品防盗系统触发器历史2
        obdscanService.Mout.Out1Veh_x_AnTheftSysEnHis3_x_x = sbtOut.Out1Veh_x_AnTheftSysEnHis3_x_x;//	车内物品防盗系统触发器历史3
        obdscanService.Mout.Out1Veh_x_AnTheftSysEn_x_x = sbtOut.Out1Veh_x_AnTheftSysEn_x_x;//	当前车内物品防盗系统触发
        obdscanService.Mout.Out1Veh_x_BrokenGlass_x_x = sbtOut.Out1Veh_x_BrokenGlass_x_x;//	玻璃破裂
        obdscanService.Mout.Out1Veh_x_EngHatchPosition_x_x = sbtOut.Out1Veh_x_EngHatchPosition_x_x;//	发动机舱盖位置
        obdscanService.Mout.Out1Veh_x_HornRelayInd_x_x = sbtOut.Out1Veh_x_HornRelayInd_x_x;//	喇叭继电器指令
        obdscanService.Mout.Out1Veh_x_HornSwitch_x_x = sbtOut.Out1Veh_x_HornSwitch_x_x;//	喇叭开关
        obdscanService.Mout.Out1Veh_x_LRSafeLockSwt_x_x = sbtOut.Out1Veh_x_LRSafeLockSwt_x_x;//	左后儿童安全锁开关
        obdscanService.Mout.Out1Veh_x_LRDoorMicroSwt_x_x = sbtOut.Out1Veh_x_LRDoorMicroSwt_x_x; //	左后车门微启开关
        obdscanService.Mout.Out1Veh_x_PDoorMicroSwt_x_x = sbtOut.Out1Veh_x_PDoorMicroSwt_x_x;//	乘客车门微启开关
        obdscanService.Mout.Out1Veh_x_PDoorLockSwt_x_x = sbtOut.Out1Veh_x_PDoorLockSwt_x_x;//	乘客车门锁定开关
        obdscanService.Mout.Out1Veh_x_PDoorUnLockInd_x_x = sbtOut.Out1Veh_x_PDoorUnLockInd_x_x;//	乘客车门解锁指令
        obdscanService.Mout.Out1Veh_x_RCloseMicroSwt_x_x = sbtOut.Out1Veh_x_RCloseMicroSwt_x_x;//	后封闭微启开关
        obdscanService.Mout.Out1Veh_x_RRChildSafeLock_x_x = sbtOut.Out1Veh_x_RRChildSafeLock_x_x;//	右后儿童安全锁开关
        obdscanService.Mout.Out1Veh_x_RRDoorMicroSwt_x_x = sbtOut.Out1Veh_x_RRDoorMicroSwt_x_x;//	右后车门微启开关
        obdscanService.Mout.Out1Veh_x_TrLidUnLockSwt_x_x = sbtOut.Out1Veh_x_TrLidUnLockSwt_x_x;//	行李箱盖/举升门车窗外部解锁开关
        obdscanService.Mout.Out1Veh_x_TrLidUnLockInd_x_x = sbtOut.Out1Veh_x_TrLidUnLockInd_x_x;//	行李箱盖/举升门车窗解锁指令
        obdscanService.Mout.Out1Veh_x_AllDorLockInd_x_x = sbtOut.Out1Veh_x_AllDorLockInd_x_x;//	所有车门锁止指令
        obdscanService.Mout.Out1Veh_x_ChSafeLockInd_x_x = sbtOut.Out1Veh_x_ChSafeLockInd_x_x;//	儿童安全锁指示灯指令
        obdscanService.Mout.Out1Veh_x_ChSaLoMotorInd_x_x = sbtOut.Out1Veh_x_ChSaLoMotorInd_x_x;//	儿童安全锁电机指令
        obdscanService.Mout.Out1Veh_x_DDoorMicroSwt_x_x = sbtOut.Out1Veh_x_DDoorMicroSwt_x_x;//	驾驶员车门微启开关
        obdscanService.Mout.Out1Veh_x_DDoorUnLockSwt_x_x = sbtOut.Out1Veh_x_DDoorUnLockSwt_x_x;//	驾驶员车门钥匙解锁开关
        obdscanService.Mout.Out1Veh_x_DDoorLockSwt_x_x = sbtOut.Out1Veh_x_DDoorLockSwt_x_x;//	驾驶员车门锁开关
        obdscanService.Mout.Out1Veh_x_DDoorUnLockInd_x_x = sbtOut.Out1Veh_x_DDoorUnLockInd_x_x;//	驾驶员车门解锁指令
        obdscanService.Mout.Out1Veh_x_InTrLidUnLockSwt_x_x = sbtOut.Out1Veh_x_InTrLidUnLockSwt_x_x;//	内部行李箱盖/举升门车窗解锁开关
        obdscanService.Mout.Out1Veh_x_LastDoorLock_x_x = sbtOut.Out1Veh_x_LastDoorLock_x_x;//	最近一次车门锁止功能
        obdscanService.Mout.Out1Veh_x_BrBoEleVacPumpk_x_x = sbtOut.Out1Veh_x_BrBoEleVacPumpk_x_x;//	制动助力器电动真空泵
        obdscanService.Mout.Out1Veh_x_BrBoEleVacSenVlt_x_x = sbtOut.Out1Veh_x_BrBoEleVacSenVlt_x_x;//	制动助力器真空传感器电源
        obdscanService.Mout.Out1Veh_x_BrFlLevelSensor_x_x = sbtOut.Out1Veh_x_BrFlLevelSensor_x_x;//	制动液液位传感器
        obdscanService.Mout.Out1Veh_x_VehStabiSysState_x_x = sbtOut.Out1Veh_x_VehStabiSysState_x_x;//	车辆稳定性系统状态
        obdscanService.Mout.Out1Veh_x_BrPedalSensor_x_x = sbtOut.Out1Veh_x_BrPedalSensor_x_x;//	制动踏板位置传感器
        obdscanService.Mout.Out1Veh_x_TractionCtrlSys_x_x = sbtOut.Out1Veh_x_TractionCtrlSys_x_x;//	牵引力控制系统状态
        obdscanService.Mout.Out1Veh_x_ABSPumpMotorVlt_x_x = sbtOut.Out1Veh_x_ABSPumpMotorVlt_x_x;//	ABS泵电机电压
        obdscanService.Mout.Out1Veh_x_BrPressSensor_x_x = sbtOut.Out1Veh_x_BrPressSensor_x_x;//	制动压力传感器
        obdscanService.Mout.Out1Veh_x_BrPressSensor80_x_x = sbtOut.Out1Veh_x_BrPressSensor80_x_x;//	制动压力达到80巴
        obdscanService.Mout.Out1Veh_x_B5LRSpeedSensor_x_x = sbtOut.Out1Veh_x_B5LRSpeedSensor_x_x;//	左后车轮转速传感器
        obdscanService.Mout.Out1Veh_x_B5RRSpeedSensor_x_x = sbtOut.Out1Veh_x_B5RRSpeedSensor_x_x;//	右后车轮转速传感器
        obdscanService.Mout.Out1Veh_x_B5RFSpeedSensor_x_x = sbtOut.Out1Veh_x_B5RFSpeedSensor_x_x;//	右前车轮转速传感器
        obdscanService.Mout.Out1Veh_x_B5LFSpeedSensor_x_x = sbtOut.Out1Veh_x_B5LFSpeedSensor_x_x;//	左前车轮转速传感器
        obdscanService.Mout.Out1Veh_x_BrBoEleSenor_x_x = sbtOut.Out1Veh_x_BrBoEleSenor_x_x;//	制动助力器真空传感器
        obdscanService.Mout.Out1Veh_x_VehStabilitySys_x_x = sbtOut.Out1Veh_x_VehStabilitySys_x_x;//	车辆稳定性系统
        obdscanService.Mout.Out1Veh_x_EmeBrPowerState_x_x = sbtOut.Out1Veh_x_EmeBrPowerState_x_x;//	紧急制动助力状态
        obdscanService.Mout.Out1Veh_x_TirePreMonSys_x_x = sbtOut.Out1Veh_x_TirePreMonSys_x_x;//	胎压监测系统状态
        obdscanService.Mout.Out1Veh_x_EngTraCtrlState_x_x = sbtOut.Out1Veh_x_EngTraCtrlState_x_x;//	发动机牵拉控制状态
        obdscanService.Mout.Out1Veh_x_DynBrProState_x_x = sbtOut.Out1Veh_x_DynBrProState_x_x;//	动态后制动比例状态
        obdscanService.Mout.Out1Veh_x_TraCtrlSys_x_x = sbtOut.Out1Veh_x_TraCtrlSys_x_x;//	牵引力控制系统
        obdscanService.Mout.Out1Veh_x_AntiLockBraSys_x_x = sbtOut.Out1Veh_x_AntiLockBraSys_x_x;//	防抱死制动系统
        obdscanService.Mout.Out1Veh_x_SteeringWheAng_x_x = sbtOut.Out1Veh_x_SteeringWheAng_x_x;//	方向盘转角
        obdscanService.Mout.Out1Veh_x_TransferTorque_x_x = sbtOut.Out1Veh_x_TransferTorque_x_x;//	传送扭矩
        obdscanService.Mout.Out1Veh_x_RequestTorque_x_x = sbtOut.Out1Veh_x_RequestTorque_x_x;//	请求的转矩
        obdscanService.Mout.Out1Veh_x_SystemVolt_x_x = sbtOut.Out1Veh_x_SystemVolt_x_x;//	系统电压
        obdscanService.Mout.Out1Veh_x_PuMoRelayFeed_x_x = sbtOut.Out1Veh_x_PuMoRelayFeed_x_x;//	泵电机继电器反馈
        obdscanService.Mout.Out1Veh_x_IsoElcValFeed_x_x = sbtOut.Out1Veh_x_IsoElcValFeed_x_x;//	主隔离电磁阀反馈
        obdscanService.Mout.Out1Veh_x_FiElecValFeed_x_x = sbtOut.Out1Veh_x_FiElecValFeed_x_x;//	原始加注电磁阀反馈
        obdscanService.Mout.Out1Veh_x_AuIsoElecValFeed_x_x = sbtOut.Out1Veh_x_AuIsoElecValFeed_x_x;//	辅助隔离电磁阀反馈
        obdscanService.Mout.Out1Veh_x_VeStSysReFeed_x_x = sbtOut.Out1Veh_x_VeStSysReFeed_x_x;//	车辆稳定性系统继电器反馈
        obdscanService.Mout.Out1Veh_x_AuFiElecValFeed_x_x = sbtOut.Out1Veh_x_AuFiElecValFeed_x_x;//	辅助加注电磁阀反馈
        obdscanService.Mout.Out1Veh_x_RRInEleValFeed_x_x = sbtOut.Out1Veh_x_RRInEleValFeed_x_x;//	右后进气电磁阀反馈
        obdscanService.Mout.Out1Veh_x_RFExEleValFeed_x_x = sbtOut.Out1Veh_x_RFExEleValFeed_x_x;//	右前排气电磁阀反馈
        obdscanService.Mout.Out1Veh_x_RFInEleValFeed_x_x = sbtOut.Out1Veh_x_RFInEleValFeed_x_x;//	右前进气电磁阀反馈
        obdscanService.Mout.Out1Veh_x_LRInEleValFeed_x_x = sbtOut.Out1Veh_x_LRInEleValFeed_x_x;//	左后进气电磁阀反馈
        obdscanService.Mout.Out1Veh_x_LFExEleValFeed_x_x = sbtOut.Out1Veh_x_LFExEleValFeed_x_x;//	左前排气电磁阀反馈
        obdscanService.Mout.Out1Veh_x_LRExEleValFeed_x_x = sbtOut.Out1Veh_x_LRExEleValFeed_x_x;//	左后排气电磁阀反馈
        obdscanService.Mout.Out1Veh_x_RRExEleValFeed_x_x = sbtOut.Out1Veh_x_RRExEleValFeed_x_x;//	右后排气电磁阀反馈
        obdscanService.Mout.Out1Veh_x_LFInEleValFeed_x_x = sbtOut.Out1Veh_x_LFInEleValFeed_x_x;//	左前进气电磁阀反馈
        obdscanService.Mout.Out1Veh_x_LRTurnSigLed_x_x = sbtOut.Out1Veh_x_LRTurnSigLed_x_x;//	左后转向信号灯/制动灯指令
        obdscanService.Mout.Out1Veh_x_LeftTurnSigSwt_x_x = sbtOut.Out1Veh_x_LeftTurnSigSwt_x_x;//	左转向信号开关
        obdscanService.Mout.Out1Veh_x_LicPlaLampInd_x_x = sbtOut.Out1Veh_x_LicPlaLampInd_x_x;//	牌照灯指令
        obdscanService.Mout.Out1Veh_x_ParkingLampSwt_x_x = sbtOut.Out1Veh_x_ParkingLampSwt_x_x;//	驻车灯开关
        obdscanService.Mout.Out1Veh_x_RFTurnSigLed_x_x = sbtOut.Out1Veh_x_RFTurnSigLed_x_x;//	右前转向信号灯/危险指示灯指令
        obdscanService.Mout.Out1Veh_x_RRTurnSigLed_x_x = sbtOut.Out1Veh_x_RRTurnSigLed_x_x;//	右后转向信号灯/制动灯指令
        obdscanService.Mout.Out1Veh_x_RightTurnSigSwt_x_x = sbtOut.Out1Veh_x_RightTurnSigSwt_x_x;//	右转向信号开关
        obdscanService.Mout.Out1Veh_x_AutoHeadStopSwt_x_x = sbtOut.Out1Veh_x_AutoHeadStopSwt_x_x;//	自动前大灯停用开关
        obdscanService.Mout.Out1Veh_x_ReverRelayInd_x_x = sbtOut.Out1Veh_x_ReverRelayInd_x_x;//	倒车灯继电器指令
        obdscanService.Mout.Out1Veh_x_CenBrakeLampInd_x_x = sbtOut.Out1Veh_x_CenBrakeLampInd_x_x;//	中央制动灯指令
        obdscanService.Mout.Out1Veh_x_FFogLampRelayInd_x_x = sbtOut.Out1Veh_x_FFogLampRelayInd_x_x; //	前雾灯继电器指令
        obdscanService.Mout.Out1Veh_x_FFogLampSwt_x_x = sbtOut.Out1Veh_x_FFogLampSwt_x_x;//	前雾灯开关
        obdscanService.Mout.Out1Veh_x_RiskIndLampSwt_x_x = sbtOut.Out1Veh_x_RiskIndLampSwt_x_x;//	危险指示灯开关
        obdscanService.Mout.Out1Veh_x_HeadFlashSwt_x_x = sbtOut.Out1Veh_x_HeadFlashSwt_x_x;//	前大灯闪光开关
        obdscanService.Mout.Out1Veh_x_HeadlightSwt_x_x = sbtOut.Out1Veh_x_HeadlightSwt_x_x;//	前大灯开启开关
        obdscanService.Mout.Out1Veh_x_DisLightInd_x_x = sbtOut.Out1Veh_x_DisLightInd_x_x;//	远光指令
        obdscanService.Mout.Out1Veh_x_DisLightSeleSwt_x_x = sbtOut.Out1Veh_x_DisLightSeleSwt_x_x;//	远光选择开关
        obdscanService.Mout.Out1Veh_x_LFTurnSigLed_x_x = sbtOut.Out1Veh_x_LFTurnSigLed_x_x;//	左前转向信号灯/危险指示灯指令
        obdscanService.Mout.Out1Veh_x_LFHeadLowbeamInd_x_x = sbtOut.Out1Veh_x_LFHeadLowbeamInd_x_x;//	左侧前大灯近光指令
        obdscanService.Mout.Out1Veh_x_LFLowbeam_x_x = sbtOut.Out1Veh_x_LFLowbeam_x_x;//	左侧近光/日间行车灯指令
        obdscanService.Mout.Out1Veh_x_LRParkingLampInd_x_x = sbtOut.Out1Veh_x_LRParkingLampInd_x_x;//	左后驻车灯指令
        obdscanService.Mout.Out1Veh_x_ParkingLampReInd_x_x = sbtOut.Out1Veh_x_ParkingLampReInd_x_x;//	驻车灯继电器指令
        obdscanService.Mout.Out1Veh_x_RFHeadLowbeamInd_x_x = sbtOut.Out1Veh_x_RFHeadLowbeamInd_x_x;//	右侧前大灯近光指令
        obdscanService.Mout.Out1Veh_x_RightLowbeam_x_x = sbtOut.Out1Veh_x_RightLowbeam_x_x; //	右侧近光/日间行车灯指令
        obdscanService.Mout.Out1Veh_x_RParkingInd_x_x = sbtOut.Out1Veh_x_RParkingInd_x_x;//	右驻车灯指令
        obdscanService.Mout.Out1Veh_x_RRParkingInd1_x_x = sbtOut.Out1Veh_x_RRParkingInd1_x_x;//	右后驻车灯指令
        obdscanService.Mout.Out1Veh_x_RRParkingInd2_x_x = sbtOut.Out1Veh_x_RRParkingInd2_x_x;//	右后驻车灯指令
        obdscanService.Mout.Out1Veh_x_RainSensor_x_x = sbtOut.Out1Veh_x_RainSensor_x_x;//	雨量传感器
        obdscanService.Mout.Out1Veh_x_WindWashReInd_x_x = sbtOut.Out1Veh_x_WindWashReInd_x_x;//	挡风玻璃洗涤器继电器指令
        obdscanService.Mout.Out1Veh_x_WindWashSwt_x_x = sbtOut.Out1Veh_x_WindWashSwt_x_x;//	挡风玻璃洗涤器开关
        obdscanService.Mout.Out1Veh_x_WWHiSpeedReInd_x_x = sbtOut.Out1Veh_x_WWHiSpeedReInd_x_x;//	挡风玻璃刮水器高速继电器指令
        obdscanService.Mout.Out1Veh_x_WWHiSpeedSwt_x_x = sbtOut.Out1Veh_x_WWHiSpeedSwt_x_x;//	挡风玻璃刮水器高速开关
        obdscanService.Mout.Out1Veh_x_WWMotorReInd_x_x = sbtOut.Out1Veh_x_WWMotorReInd_x_x;//	挡风玻璃刮水器电机继电器指令
        obdscanService.Mout.Out1Veh_x_WWParkingSwt_x_x = sbtOut.Out1Veh_x_WWParkingSwt_x_x;//	挡风玻璃刮水器驻车开关
        obdscanService.Mout.Out1Veh_x_WWwipingStop_x_x = sbtOut.Out1Veh_x_WWwipingStop_x_x;//	挡风玻璃刮水器在刮扫过程中停止
        obdscanService.Mout.Out1Veh_x_WWStopParking_x_x = sbtOut.Out1Veh_x_WWStopParking_x_x; //	挡风玻璃刮水器停在驻车位置
        obdscanService.Mout.Out1Veh_x_WindWiperSwt_x_x = sbtOut.Out1Veh_x_WindWiperSwt_x_x;//	挡风玻璃刮水器开关
        obdscanService.Mout.Out1Veh_x_HeadWashReInd_x_x = sbtOut.Out1Veh_x_HeadWashReInd_x_x; //	前大灯洗涤器继电器指令
        obdscanService.Mout.Out1Veh_x_TractionCtrlSwt_x_x = sbtOut.Out1Veh_x_TractionCtrlSwt_x_x; //	牵引力控制开关
        obdscanService.Mout.Out1Veh_x_AuTrMaShiftSwt_x_x = sbtOut.Out1Veh_x_AuTrMaShiftSwt_x_x;//	自动变速器手动换挡开关
        obdscanService.Mout.Out1Veh_x_BrPedTr2IniPos_x_x = sbtOut.Out1Veh_x_BrPedTr2IniPos_x_x;//	已达到制动踏板最初行程位置
        obdscanService.Mout.Out1Veh_x_BrPedSenHiVlt_x_x = sbtOut.Out1Veh_x_BrPedSenHiVlt_x_x;//	读入过程中，制动踏板位置传感器电压过高
        obdscanService.Mout.Out1Veh_x_BrPedSenRead_x_x = sbtOut.Out1Veh_x_BrPedSenRead_x_x; //	制动踏板位置传感器读入
        obdscanService.Mout.Out1Veh_x_BrPedSenReadRel_x_x = sbtOut.Out1Veh_x_BrPedSenReadRel_x_x;//	制动踏板位置传感器读入的释放位置
        obdscanService.Mout.Out1Veh_x_BrPedSenReadRel1_x_x = sbtOut.Out1Veh_x_BrPedSenReadRel1_x_x; //	制动踏板位置传感器读入的释放位置
        obdscanService.Mout.Out1Veh_x_BrPedSenReadRel2_x_x = sbtOut.Out1Veh_x_BrPedSenReadRel2_x_x; //	制动踏板位置传感器读入的释放位置
        obdscanService.Mout.Out1Veh_x_BrPedSenLoVlt_x_x = sbtOut.Out1Veh_x_BrPedSenLoVlt_x_x; //	读入过程中，制动踏板位置传感器电压过低
        obdscanService.Mout.Out1Veh_x_BrPedSenMove_x_x = sbtOut.Out1Veh_x_BrPedSenMove_x_x;//	读入过程中，制动踏板位置传感器移动
        obdscanService.Mout.Out1Veh_x_BrPedRefVlt_x_x = sbtOut.Out1Veh_x_BrPedRefVlt_x_x;//	制动踏板位置传感器参考电压
        obdscanService.Mout.Out1Veh_x_BrPedRelease_x_x = sbtOut.Out1Veh_x_BrPedRelease_x_x; //	制动踏板从释放位置踩下
        obdscanService.Mout.Out1Veh_x_CalBrPedPosPer_x_x = sbtOut.Out1Veh_x_CalBrPedPosPer_x_x;//	计算的制动踏板位置
        obdscanService.Mout.Out1Veh_x_CalBrPedPosVlt_x_x = sbtOut.Out1Veh_x_CalBrPedPosVlt_x_x;//	计算的制动踏板位置
        obdscanService.Mout.Out1Veh_x_ParkingSwtState_x_x = sbtOut.Out1Veh_x_ParkingSwtState_x_x;





        ignltionTestDeviceService.Oout.Out1Eng_SpPlugTest_Norm_x= sbtOut.Out1Eng_SpPlugTest_Norm_x;//点火测试仪输出
        oscilloscopeService.Mout.Out1TestPS_x_Scope_x_x = sbtOut.Out1TestPS_x_Scope_x_x;//示波器输出
        oscilloscopeService.Mout.Out1TestPS_x_Max_x_x = sbtOut.Out1TestPS_x_Max_x_x;//示波器最大值
        oscilloscopeService.Mout.Out1TestPS_x_Min_x_x = sbtOut.Out1TestPS_x_Min_x_x;//示波器最小值
        oscilloscopeService.Mout.Out1TestPS_x_XAxis_x_x= sbtOut.Out1TestPS_x_XAxis_x_x;//示波器X轴
        oscilloscopeService.Mout.Out1TestPS_x_YAxis_x_x= sbtOut.Out1TestPS_x_YAxis_x_x;//示波器Y轴
        diodelampService.Oout.Out1TestPS_x_Brightness_x_x= sbtOut.Out1TestPS_x_Brightness_x_x;//试电笔亮度状态
        diodelampService.Oout.Out1TestPS_x_Flashing_x_x= sbtOut.Out1TestPS_x_Flashing_x_x;//试点笔闪烁0不闪1闪烁
        /*        pageService.Pint.Out1Eng_x_ScoreJud_x_x=sbtOut.Out1Eng_x_ScoreJud_x_x;
         pageService.Pint.Out1Veh_x_ScoreJud_x_x=sbtOut.Out1Veh_x_ScoreJud_x_x;*/
        if(pageService.Pdata.faultType=="SBT_FCO_ES_ES_007_false") {
            if (pageService.Pint.In1Sen_IG2_NO2Fuse_x_Fault == "1" && pageService.Pdata.bjk_dyb) {
                pageService.Pout.Out1Sen_IG2NO2Fuse_Body_x_Jud = sbtOut.Out1Sen_IG2NO2Fuse_Body_x_Jud;
            } else {
                pageService.Pout.Out1Sen_IG2NO2Fuse_Body_x_Jud = "1";
            }
        }
        //console.log(sbtOut.Out1Sen_IG2NO2Fuse_Body_x_Jud);
        obdscanService.Mout.Out1Sen_CAM_BtimAdv_x_x = sbtOut.Out1Sen_CAM_BtimAdv_x_x;

    };
    function formatFloat(src) {

        if (multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x == "1" && sbtOut.Out1MultiLogic_x_ToScreen_x_x == "1") {


            multimeterService.Mdata.multimeterScreenUnit="";

            return "1.";
        } else {

            if ( multimeterService.Mint.In1MultiLogic_x_DCmVlt_x_x=="1") {
                if (src == 0) {
                    multimeterService.Mdata.multimeterScreenUnit="mV";
                    return "0.000";
                } else {
                    multimeterService.Mdata.multimeterScreenUnit="";
                    return "1.";
                }

            } else {
                if ( multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x=="1") {
                    multimeterService.Mdata.multimeterScreenUnit="Ω";
                }
                var reg = /.*\..*/

                if (src >= 0) {
                    if (reg.test(src)) {
                        if (src.toString().split(".")[0].length >= 5) {
                            var num = src / 1000;
                            if ( multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x=="1") {
                                multimeterService.Mdata.multimeterScreenUnit="kΩ";
                            }
                            ;
                            return num.toPrecision(4);
                        } else {
                            if (src.toString().split(".")[0] == 0) {
                                var num = new Number(src);
                                return num.toFixed(3);
                            } else {
                                var num = new Number(src);
                                return num.toPrecision(4);
                            }

                        }


                    } else {
                        if ( multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x=="1") {
                            multimeterService.Mdata.multimeterScreenUnit="Ω";
                        }
                        if (src.toString().length >= 5) {
                            var num = src / 1000;
                            if ( multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x=="1") {
                                multimeterService.Mdata.multimeterScreenUnit="kΩ";
                            }
                            return num.toPrecision(4);
                        } else {

                            var num = new Number(src);
                            return num.toPrecision(4);
                        }

                    }
                } else {

                    if (reg.test(src)) {
                        if (src.toString().split(".")[0].length >= 4) {
                            var num = src / 1000;
                            if ( multimeterService.Mint.In1MultiLogic_x_Pass2Ohm_x_x=="1") {
                                multimeterService.Mdata.multimeterScreenUnit="kΩ";
                            }
                            return num.toPrecision(1);
                        } else {
                            if (src.toString().split(".")[0] == 0) {
                                var num = new Number(src);
                                return num.toFixed(2);
                            } else {
                                var num = new Number(src);
                                return num.toPrecision(3);
                            }
                        }

                    } else {
                        if (src.toString().length >= 4) {
                            var num = src / 1000;

                            return num.toPrecision(3);
                        } else {
                            var num = new Number(src);
                            return num.toPrecision(3);
                        }

                    }
                }

            }

        }

        return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
    }
    //取整函数
    function formatInt(src) {
        return parseInt(src);
    }
    //保留一位小数
    function formatFloatOne(src){
        var aVal=src.toString().split('.');
        var aFloat=[''];
        if(aVal[1]){
            aFloat=aVal[1].split('');
        }
        if(aFloat[0]){
            //如果原来就有一位或一位以上小数点
            return aVal[0]+'.'+aFloat[0]
        }else{
            //如果原来就是整数
            return aVal[0]+'.0'
        }
    }
    //保留两位小数
    function formatFloatTwo(src){
        var aVal=src.toString().split('.');
        var aFloat=[''];
        if(aVal[1]){
            aFloat=aVal[1].split('');
        }
        if(aFloat[1]){
            //如果原来就有两位或两位以上小数点
            return aVal[0]+'.'+aFloat[0]+aFloat[1];
        }else if(aFloat[0]){
            //如果原来就有一位或一位以上小数点
            return aVal[0]+'.'+aFloat[0]+'0';
        }else{
            //如果原来就是整数
            return aVal[0]+'.00'
        }
    }
    //保留三维小数
    function formatFloatt(src) {
        if (src.toString().split(".")[0] == 0) {
            var num = new Number(src);
            return num.toFixed(3);
        } else {
            var num = new Number(src);
            return num.toPrecision(4);
        }
    }

    function formatFloatt(src) {
        if (src.toString().split(".")[0] == 0) {
            var num = new Number(src);
            return num.toFixed(3);
        } else {
            var num = new Number(src);
            return num.toPrecision(4);
        }

    }
    //如同救世主一般的代码（插件加载）
    $("#plugin0").removeClass("hideImportant");
});




