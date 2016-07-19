/**
 * @author 谢国亮
 */
dashboardModule.service('dashboardService', function($http, $rootScope, $timeout,pageService) {
    var dashboardService =  {};
    dashboardService.Ddata = dashboardService.Ddata || {};
    dashboardService.Dint = dashboardService.Dint || {};
    dashboardService.Dout = dashboardService.Dout || {};
    dashboardService.Ddata = {
        dashboardStatus: false,
        dashboarSmaill: true,
        dashboarstalls: '1',
        dashboardLockAcc:true,
        onRun:false,
        isPower:false
    };
    dashboardService.Dint = {
        In1IgnKey_x_LOCK_x_x: '1',//	点火钥匙LOCK档位
        In1IgnKey_x_ACC_x_x: '0',//	点火钥匙ACC档位
        In1IgnKey_x_ON_x_x: '0',//	点火钥匙ON档位
        In1IgnKey_x_START_x_x: '0',//	点火钥匙START档位
        In1Dash_x_Brake_Signal_x: '0',//	制动踏板信号
        In1Dash_x_APP_Signal_x: '0',//	油门踏板信号
        In1Dash_x_GearSig_x_x: '0',//	档位位置信号
        In1Dash_x_Brake_Signal_x:"0",
        In1Dash_x_x_SafeBelt_Install: '0',//	安全带安装状态
        In1Eng_x_SpPlugTest_x_x:'0'//点火测试仪安装

    };
    dashboardService.Dout = {
        Out1Dash_x_LED_ABS_Jud:"0",//	ABS灯输出
        Out1Dash_x_LED_Brake_Jud:"0",//	制动灯输出
        Out1Dash_x_LED_SafeBag_Jud:"0",//	安全气囊灯输出
        Out1Dash_x_LED_MIL_Jud:"0",//	发动机故障灯输出
        Out1Dash_x_LED_OilPre_Jud:"0",//	油压灯输出
        Out1Dash_x_LED_BATTFault_Jud:"0",//	蓄电池灯输出
        Out1Eng_x_EngSpeed_x_x:"0",//发动机转速
        Out1Eng_x_OilVolume_x_x:"0",//油箱油量
        Out1Eng_x_CoolTempSensor_x_x:"0",//发动机冷却液温度传感器
        Out1Dash_x_LED_SafeBelt_Jud	:"0",//安全带灯输出
        Out1Eng_x_VehSensor_x_x:"0",//车速传感器
        Out1Eng_x_CheckVeh_x_x:'0',//请速检修车辆
        Out1Eng_x_ForceDes_x_x:'0',//发动机动力降低
        Out1Eng_x_ESC_x_x:'0',//检修电子稳定控制
        Out1Eng_x_PowDes_x_x:'0'//发动机功率降低
    };
    return dashboardService;

});
