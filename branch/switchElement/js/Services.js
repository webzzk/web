
switchModule.service('switchService', function (pageService) {
    var switchService = switchService || {};
    switchService.Odata = switchService.Odata || {};
    switchService.Oint = switchService.Oint || {};
    switchService.Oout = switchService.Oout || {};
    switchService.Odata = {
        s13dStatus: false,//������������ʾ״̬
        s30swtStatus:false,//��ƿ���
        s33Status:false,//���ȿ���
        s78swtStatus:false,//ת��Զ��ƿ���
        s58bStatus:false,//���俪��
        s79dStatus:false,//��������
        s82swtStatus:false,//��ˮ������
        sceneSimulationStatus:false,//��������״̬
        doorStatus:false,//���ſ���״̬
        up1:false,//�������ƿ�������״̬
        down1:false,
        up2:false,
        down2:false,
        up3:false,
        down3:false,
        up4:false,
        down4:false,
        windowTop:'37',//��������״̬
        wiper1:true,//��ˢ����ʾ״̬
        wiper2:false,
        wiper3:false,
        wiper4:false,
        wiper5:false,
        wiper6:false,
        wiper:false,//��ˢ���Ƿ���
        s13d: false,//������������ʾ״̬
        s30swt:false,//��ƿ���
        s33:false,//���ȿ���
        s78swt:false,//ת��Զ��ƿ���
        s58b:false,//���俪��
        s79d:false,//��������
        s82swt:false//��ˮ������
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
