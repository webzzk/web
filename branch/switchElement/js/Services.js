
switchModule.service('switchService', function (pageService) {
    var switchService = switchService || {};
    switchService.Odata = switchService.Odata || {};
    switchService.Oint = switchService.Oint || {};
    switchService.Oout = switchService.Oout || {};
    switchService.Odata = {
        s13dStatus: false,//车门锁开关显示状态
        s30swtStatus:false,//大灯开关
        s33Status:false,//喇叭开关
        s78swtStatus:false,//转向远光灯开关
        s58bStatus:false,//后备箱开关
        s79dStatus:false,//车窗开关
        s82swtStatus:false,//刮水器开关
        sceneSimulationStatus:false,//场景动画状态
        doorStatus:false,//车门开关状态
        up1:false,//车窗控制开关升降状态
        down1:false,
        up2:false,
        down2:false,
        up3:false,
        down3:false,
        up4:false,
        down4:false,
        windowTop:'37',//车窗升降状态
        wiper1:true,//雨刷器显示状态
        wiper2:false,
        wiper3:false,
        wiper4:false,
        wiper5:false,
        wiper6:false,
        wiper:false,//雨刷器是否动作
        s13d: false,//车门锁开关显示状态
        s30swt:false,//大灯开关
        s33:false,//喇叭开关
        s78swt:false,//转向远光灯开关
        s58b:false,//后备箱开关
        s79d:false,//车窗开关
        s82swt:false//刮水器开关
        };
    switchService.Oout={
        Out1Veh_x_S79D_Normal_x:'1',
        Out1Veh_x_A23D_Normal_x:'1',
        Out1Veh_x_S58B_Normal_x:'1',
        Out1Veh_x_A23P_Normal_x:'1',
        Out1Veh_x_A23RR_Normal_x:'1',
        Out1Veh_x_A23LR_Normal_x:'1',
        Out1Veh_x_S82_Normal_x:'1',
        Out1Veh_x_S78_HighBeam_x:'1',
        Out1Veh_x_S78_LowBeam_x:'1',
        Out1Veh_x_S78_LeftBeam_x:'1',
        Out1Veh_x_S78_RightBeam_x:'1'
    };




    return switchService;

});
