allsensorModule.service('pageService', function (xcjService) {
    var pageService = {};
    var actionId=new Array();//存储故障条件Id
    pageService.Pdata = pageService.Pdata || {};//页面中自己定义的状态
    pageService.Pint = pageService.Pint || {};//传输的参数
    pageService.Pout = pageService.Pout || {};//获取的参数
    pageService.Pdata = {
        gybwz:'0',//缸压表的安装位置
        fault:{//故障是否修改
            SBT_VER_ES_EC_001_FAULT:{change:'line_bjOn',gzcs:'In1Sen_Q12_Conn_Pin1_Open'},//Q12蒸发排放吹洗电磁阀1脚开路
            SBT_VER_ES_ES_001_FAULT:{change:'q38_bjOn',gzcs:'In1Sen_Q38_Conn_Pin5_Open'},//Q38节气门体传感器5脚开路
            SBT_VER_ES_ES_002_FAULT:{change:'b52a_bjOn',gzcs:'In1Sen_B52A_Body_x_Fault'},//B52A加热型氧传感器本体故障
            SBT_VER_ES_ES_003_FAULT:{change:'b23e_bjOn',gzcs:'In1Sen_B23E_Body_x_Fault'},//B23E排气凸轮轴位置传感器本体故障
            SBT_VER_ES_ES_004_FAULT:{change:'q6f_bjOn',gzcs:'In1Sen_Q6F_Body_x_Fault'},//Q6F进气凸轮轴位置执行器电磁阀本体故障
            SBT_VER_ES_ES_005_FAULT:{change:'b52b_bjOn',gzcs:'In1Sen_B52B_Body_x_Fault'},//B52B加热型氧传感器本体故障
            SBT_VER_ES_ES_006_FAULT:{change:'q6e_bjOn',gzcs:'In1Sen_Q6E_Conn_Pin1_Open'},//Q6E排气凸轮轴位置执行器电磁阀1脚开路
            SBT_VER_ES_ES_007_FAULT:{change:'b75c_bjOn',gzcs:'In1Sen_B75C_Conn_Pin5_Open'},//B75C多功能进气传感器5脚开路
            SBT_VER_ES_ES_008_FAULT:{change:'b23f_bjOn',gzcs:'In1Sen_B23F_Body_x_Fault'},//B23F进气凸轮轴位置传感器本体故障
            SBT_VER_ES_ES_009_FAULT:{change:'f31ua_bjOn',gzcs:'In1Sen_F31UA_Body_x_Fault'},//F31UA保险丝断路
            SBT_VER_ES_ES_010_FAULT:{change:'f20ua_bjOn',gzcs:'In1Sen_F20UA_Body_x_Fault'},//F20UA保险丝断路
            SBT_VER_ES_ES_011_FAULT:{change:'f12ua_bjOn',gzcs:'In1Sen_F12UA_Body_x_Fault'},//F12UA保险丝断路故障
            SBT_VER_ES_ES_012_FAULT:{change:'f13ua_bjOn',gzcs:'In1Sen_F13UA_Body_x_Fault'},//F13UA保险丝断路故障
            SBT_VER_ES_ES_013_FAULT:{change:'f14ua_bjOn',gzcs:'In1Sen_F14UA_Body_x_Fault'},//F14UA保险丝断路故障
            SBT_VER_ES_FU_001_FAULT:{change:'line_bjOn',gzcs:'In1Sen_Q17C_Conn_Pin2_Open'},//Q17C燃油喷射器2脚开路故障
            SBT_VER_ES_FU_002_FAULT:{change:'line_bjOn',gzcs:'In1Sen_B47B_Conn_Pin2_Open'},//B47B燃油导轨压力传感器2脚开路
            SBT_VER_ES_IG_001_FAULT:{change:'line_bjOn',gzcs:'In1Sen_T8B_Coil_Pin3_Open'},//T8B点火线圈3脚开路
            SBT_VER_ES_IG_002_FAULT:{change:'line_bjOn',gzcs:'In1Sen_T8C_Coil_Pin1_Open'},//T8C点火线圈1脚开路
            SBT_VER_ES_IT_001_FAULT:{change:'q22_bjOn',gzcs:'In1Sen_Q22_Body_x_Fault'},//Q22进气歧管电磁阀本体故障
            SBT_VER_ES_IT_002_FAULT:{change:'line_bjOn',gzcs:'In1Sen_B74_Conn_Pin2_Open'},//B74进气歧管压力传感器2脚开路

            //TODO:5月份32故障

            SBT_VER_ES_ES_014_FAULT:{change:'line_bjOn',gzcs:'In1Sen_Q38_Conn_Pin2_Open'},
            SBT_VER_ES_ES_015_FAULT:{change:'line_bjOn',gzcs:'In1Sen_B22_Conn_Pin5_Open'},
            SBT_VER_ES_ES_016_FAULT:{change:'line_bjOn',gzcs:'In1Sen_B107_Conn_Pin3_Open'},
            SBT_VER_ES_ES_017_FAULT:{change:'line_bjOn',gzcs:'In1Sen_B107_Conn_Pin1_Open'},
            SBT_VER_ES_ES_018_FAULT:{change:'line_bjOn',gzcs:'In1Sen_Q17B_Conn_Pin1_Open'},
            SBT_VER_ES_ES_019_FAULT:{change:'line_bjOn',gzcs:'In1Sen_B68_Conn_Pin1_Open'},
            SBT_VER_ES_ES_020_FAULT:{change:'line_bjOn',gzcs:'In1Sen_B26_Conn_Pin1_Open'},
            SBT_VER_ES_ES_021_FAULT:{change:'line_bjOn',gzcs:'In1Sen_E41_Conn_Pin1_Open'},
            SBT_VER_ES_ES_022_FAULT:{change:'line_bjOn',gzcs:'In1Sen_B34A_Conn_Pin1_S2GND'},
            SBT_VER_ES_ES_023_FAULT:{change:'line_bjOn',gzcs:'In1Sen_B34B_Conn_Pin1_Open'},
            SBT_VER_ES_ES_024_FAULT:{change:'line_bjOn',gzcs:'In1Sen_B75C_Conn_Pin8_Open'},
            SBT_VER_ES_ES_025_FAULT:{change:'line_bjOn',gzcs:'In1Sen_K111_Conn_Pin6_Open'},
            SBT_VER_ES_ES_026_FAULT:{change:'line_bjOn',gzcs:'In1Sen_K111_Conn_Pin2_Open'},
            SBT_VER_ES_ES_027_FAULT:{change:'line_bjOn',gzcs:'In1Sen_K111_Conn_Pin9_Open'},
            SBT_VER_ES_ES_028_FAULT:{change:'line_bjOn',gzcs:'In1Sen_B75C_Conn_Pin3_Open'},
            SBT_VER_ES_ES_029_FAULT:{change:'b23e_bjOn',gzcs:'In1Sen_F15UA_Body_x_Fault'},
            SBT_VER_ES_ES_030_FAULT:{change:'f36ua_bjOn',gzcs:'In1Sen_F36UA_Body_x_Fault'},
            SBT_VER_EL_LU_001_FAULT:{change:'line_bjOn',gzcs:'In1Sen_B37B_Conn_Pin2_Open'},
            SBT_VER_EL_BC_001_FAULT:{change:'b5lf_bjOn',gzcs:'In1Veh_B5LF_Body_x_Fault'},
            SBT_VER_EL_BC_002_FAULT:{change:'f57ua_bjOn',gzcs:'In1Veh_F57UA_Body_x_Fault'},
            SBT_VER_EL_BR_001_FAULT:{change:'absline_bjOn',gzcs:'In1Veh_B20_Conn_Pin1_Open'},
            SBT_VER_EL_LI_001_FAULT:{change:'kr48_bjOn',gzcs:'In1Veh_KR48_Body_x_Fault'},
            SBT_VER_EL_LI_002_FAULT:{change:'csline_bjOn',gzcs:'In1Veh_E13LA_Conn_Pin4_Open'},
            SBT_VER_EL_WW_001_FAULT:{change:'csline_bjOn',gzcs:'In1Veh_M79_Conn_Pin4_Open'},
            SBT_VER_EL_DL_001_FAULT:{change:'f14da_bjOn',gzcs:'In1Veh_F14DA_Body_x_Fault'},
            SBT_VER_EL_DL_002_FAULT:{change:'csline_bjOn',gzcs:'In1Veh_S79D_Conn_Pin5_Open'},
            SBT_VER_EL_DL_003_FAULT:{change:'csline_bjOn',gzcs:'In1Veh_A23RR_Conn_Pin9_Open'},
            SBT_VER_EL_HO_001_FAULT:{change:'f8ua_bjOn',gzcs:'In1Veh_F8UA_Body_x_Fault'},
            SBT_VER_EL_WS_001_FAULT:{change:'f8da_bjOn',gzcs:'In1Veh_F8DA_Body_x_Fault'},
            SBT_VER_ES_FU_003_FAULT:{change:'line_bjOn',gzcs:'In1Sen_Q18_Conn_Pin2_Open'},
            SBT_VER_ES_FU_004_FAULT:{change:'line_bjOn',gzcs:'In1Sen_B47B_Conn_Pin1_Open'},
            SBT_VER_ES_ST_001_FAULT:{change:'kr27_bjOn',gzcs:'In1Sen_KR27_Body_x_Fault'}

        },
        actionData:{
            "b5lf":{"cId":"ver850","bjcId":"ver932","bjoId":"ver931"},
            "b5rf":{"cId":"","bjcId":"","bjoId":""},
            "b23e":{"cId":"ver249","bjcId":"ver337","bjoId":"ver336"},
            "b23f":{"cId":"ver258","bjcId":"ver339","bjoId":"ver338"},
            "b20":{"cId":"ver849","bjcId":"ver934","bjoId":"ver933"},
            "b26":{"cId":"ver832","bjcId":"ver936","bjoId":"ver935"},
            "b34a":{"cId":"ver833","bjcId":"ver938","bjoId":"ver937"},
            "b34b":{"cId":"ver834","bjcId":"ver940","bjoId":"ver939"},
            "b37b":{"cId":"ver835","bjcId":"ver942","bjoId":"ver941"},
            "b47b":{"cId":"ver244","bjcId":"ver329","bjoId":"ver328"},
            "b52a":{"cId":"ver241","bjcId":"ver333","bjoId":"ver332"},
            "b52b":{"cId":"ver257","bjcId":"ver335","bjoId":"ver334"},
            "b68":{"cId":"ver836","bjcId":"ver944","bjoId":"ver943"},
            "b74":{"cId":"ver251","bjcId":"ver341","bjoId":"ver340"},
            "b75c":{"cId":"ver250","bjcId":"ver343","bjoId":"ver342"},
            "e13la":{"cId":"ver846","bjcId":"ver946","bjoId":"ver945"},
            "e13ra":{"cId":"","bjcId":"","bjoId":""},
            "e41":{"cId":"ver842","bjcId":"ver948","bjoId":"ver947"},
            "k17":{"cId":"","bjcId":"","bjoId":""},
            "k20":{"cId":"","bjcId":"ver373","bjoId":"ver372"},
            "m64":{"cId":"","bjcId":"","bjoId":""},
            "m79":{"cId":"ver844","bjcId":"ver950","bjoId":"ver949"},
            "p12a":{"cId":"","bjcId":"","bjoId":""},
            "p12b":{"cId":"","bjcId":"","bjoId":""},
            "q6e":{"cId":"ver259","bjcId":"ver345","bjoId":"ver344"},
            "q6f":{"cId":"ver252","bjcId":"ver347","bjoId":"ver346"},
            "q18":{"cId":"ver841","bjcId":"ver976","bjoId":"ver975"},
            "q22":{"cId":"ver242","bjcId":"ver351","bjoId":"ver350"},
            "q38":{"cId":"ver239","bjcId":"ver331","bjoId":"ver330"},
            "x160":{"cId":"","bjcId":"","bjoId":""},
            "a23lr":{"cId":"","bjcId":"","bjoId":""},
            "a23p":{"cId":"","bjcId":"","bjoId":""},
            "a23d":{"cId":"","bjcId":"","bjoId":""},
            "a23rr":{"cId":"ver847","bjcId":"ver952","bjoId":"ver951"},
            "m74d":{"cId":"","bjcId":"","bjoId":""},
            "s13d":{"cId":"","bjcId":"","bjoId":""},
            "s58b":{"cId":"","bjcId":"","bjoId":""},
            "s79d":{"cId":"ver843","bjcId":"ver954","bjoId":"ver953"},
            "b22":{"cId":"ver848","bjcId":"ver956","bjoId":"ver955"},
            "b107":{"cId":"ver837","bjcId":"ver958","bjoId":"ver957"},
            "k9":{"cId":"","bjcId":"","bjoId":""},
            "s30":{"cId":"","bjcId":"","bjoId":""},
            "s78":{"cId":"","bjcId":"","bjoId":""},
            "s82":{"cId":"","bjcId":"","bjoId":""},
            "b5lr":{"cId":"","bjcId":"","bjoId":""},
            "b5rr":{"cId":"","bjcId":"","bjoId":""},
            "k111":{"cId":"ver838","bjcId":"ver960","bjoId":"ver959"},
            "m40":{"cId":"ver930","bjcId":"ver978","bjoId":"ver977"},
            "q12":{"cId":"ver240","bjcId":"ver349","bjoId":"ver348"},
            "f12ua":{"cId":"ver255","bjcId":"ver323","bjoId":"ver322"},
            "f13ua":{"cId":"ver256","bjcId":"ver325","bjoId":"ver324"},
            "f14ua":{"cId":"ver260","bjcId":"ver327","bjoId":"ver326"},
            "f15ua":{"cId":"ver855","bjcId":"ver359","bjoId":"ver358"},
            "f36ua":{"cId":"ver857","bjcId":"ver962","bjoId":"ver961"},
            "f11da":{"cId":"ver856","bjcId":"ver964","bjoId":"ver963"},
            "f14da":{"cId":"ver854","bjcId":"ver966","bjoId":"ver965"},
            "f31ua":{"cId":"ver253","bjcId":"ver355","bjoId":"ver354"},
            "f20ua":{"cId":"ver254","bjcId":"ver361","bjoId":"ver360"},
            "f8da":{"cId":"ver852","bjcId":"ver968","bjoId":"ver967"},
            "f57ua":{"cId":"ver851","bjcId":"ver970","bjoId":"ver969"},
            "kr27":{"cId":"ver839","bjcId":"ver972","bjoId":"ver971"},
            "kr48":{"cId":"ver845","bjcId":"ver974","bjoId":"ver973"}
            //t8b:{"cId":"ver246","bjcId":"","bjoId":""},
            //t8c:{"cId":"ver247","bjcId":"","bjoId":""},
            //t8d:{"cId":"ver248","bjcId":"","bjoId":""}
        },

        repair:{},
/*        addAction:function(key){//添加动作数组
            pageService.Pdata.action.push(key);
        },*/

        uiPage:"",//跳转路由页面
        ljcCar:false,//零件车
        bjkCar:false,//备件库
        switchBox:false,//开关
        oliFoot:false,//机油尺插拔
        faultId:"",    //故障部件id
        fuse_out:false,//保险丝是否拆卸
        csFuse_out:false,//车身保险丝是否拆卸
        q38_tearDown:true,//节气门体是否拆卸
        b52b_tearDown:true,//后氧传感器是否拆卸
        b52a_tearDown:true,//前氧传感器是否拆卸
        q6e_tearDown:true,//排气凸轮轴位置执行器是否拆卸
        q6f_tearDown:true,//进气凸轮轴位置执行器是否拆卸
        b23e_tearDown:true,//排气凸轮轴位置传感器是否拆卸
        b23f_tearDown:true,//进气凸轮轴位置传感器是否拆卸
        b75c_tearDown:true,//空气流量计是否拆卸
        b74_tearDown:true,//进气歧管压力传感器是否拆卸
        b47b_tearDown:true,//燃油导轨压力传感器是否拆卸
        q22_tearDown:true,//进气歧管调节电磁阀是否拆卸
        q12_tearDown:true,//炭罐电磁阀是否拆卸
        k20_tearDown:true,//发动机电脑是否拆卸

        m74d_tearDown:true,//车窗电机驾驶员侧插头是否拆除
        s82_tearDown:true,//雨刷开关书否拆除
        m79_tearDown:true,//雨刷器电机是否拆除
        p12a_tearDown:true,//右高音喇叭是否拆除
        p12b_tearDown:true,//左高音喇叭是否拆除
        s58b_tearDown:true,//后备箱盖是否拆除
        s78_tearDown:true,//转向信号/多功能开关是否拆除
        s13d_tearDown:true,//车门锁至开关是否拆除
        ar23d_tearDown:true,//驾驶员车门锁闩总成是否拆除
        a23lr_tearDown:true,//左后车门锁闩总成是否拆除
        a23p_tearDown:true,//右前车门锁闩总成是否拆除
        a23rr_tearDown:true,//右后车门锁闩总成是否拆除
        k111_tearDown:true,//燃油泵驱动器控制模块是否拆除
        b26_tearDown:true,//曲轴位置传感器是否拆除
        e41_tearDown:true,//发动机冷却液节温器加热器是否拆除
        k17_tearDown:true,//电制制动控制模块是否拆除
        e13la_tearDown:true,//左前大灯总成是否拆除
        e13ra_tearDown:true,//右前大灯总成是否拆除
        b5lf_tearDown:true,//左前轮速传感器是否拆除
        b22_tearDown:true,//制动踏板传感器是否拆除
        s79d_tearDown:true,//左前门车窗开关是否拆除
        b107_tearDown:true,
        s30_tearDown:true,
        b34a_tearDown:true,
        b34b_tearDown:true,
        b20_tearDown:true,
        m40_tearDown:true,
        q18_tearDown:true,
        m64_tearDown:true,
        b37b_tearDown:true,
        b68_tearDown:true,
        b5rr_tearDown:true,
        b5lr_tearDown:true,
        k9_tearDown:true,
        b5rf_tearDown:true,
        k20_bjOn:false,//发动机电脑是否是备件安装状态
        q38_bjOn:false,//节气门体是否是备件安装状态
        b52b_bjOn:false,//后氧传感器是否是备件安装状态
        b52a_bjOn:false,//前氧传感器是否是备件安装状态
        q6e_bjOn:false,//排气凸轮轴位置执行器是否是备件安装状态
        q6f_bjOn:false,//进气凸轮轴位置执行器是否是备件安装状态
        b23e_bjOn:false,//排气凸轮轴位置传感器是否是备件安装状态
        b23f_bjOn:false,//进气凸轮轴位置传感器是否是备件安装状态
        b75c_bjOn:false,//空气流量计是否是备件安装状态
        b74_bjOn:false,//进气歧管压力传感器是否是备件安装状态
        b47b_bjOn:false,//燃油导轨压力传感器是否是备件安装状态
        q22_bjOn:false,//进气歧管调节电磁阀是否是备件安装状态
        q12_bjOn:false,//炭罐电磁阀是否是备件安装状态
        m74d_bjOn:false,//车窗电机驾驶员侧插头是否是备件安装状态
        s82_bjOn:false,//雨刷开关是备件安装状态
        m79_bjOn:false,//雨刷器电机是否是备件安装状态
        p12a_bjOn:false,//右高音喇叭是否是备件安装状态
        p12b_bjOn:false,//左高音喇叭是否是备件安装状态
        s58b_bjOn:false,//后备箱盖是否是备件安装状态
        s78_bjOn:false,//转向信号/多功能开关是否是备件安装状态
        s13d_bjOn:false,//车门锁至开关是否是备件安装状态
        ar23d_bjOn:false,//驾驶员车门锁闩总成是否是备件安装状态
        a23lr_bjOn:false,//左后车门锁闩总成是否是备件安装状态
        a23p_bjOn:false,//右前车门锁闩总成是否是备件安装状态
        a23rr_bjOn:false,//右后车门锁闩总成是否是备件安装状态
        k111_bjOn:false,//燃油泵驱动器控制模块是否是备件安装状态
        b26_bjOn:false,//曲轴位置传感器是否是备件安装状态
        e41_bjOn:false,//发动机冷却液节温器加热器是否是备件安装状态
        k17_bjOn:false,//电制制动控制模块是否是备件安装状态
        e13la_bjOn:false,//左前大灯总成是否是备件安装状态
        e13ra_bjOn:false,//右前大灯总成是否是备件安装状态
        b5lf_bjOn:false,//左前轮速传感器是否是备件安装状态
        b22_bjOn:false,//制动踏板传感器是否是备件安装状态
        s79d_bjOn:false,//左前门车窗开关是否是备件安装状态
        b107_bjOn:false,
        s30_bjOn:false,
        b34a_bjOn:false,
        k9_bjOn:false,
        b34b_bjOn:false,
        m40_bjOn:false,
        q18_bjOn:false,
        m64_bjOn:false,
        b37b_bjOn:false,
        b68_bjOn:false,
        b5rf_bjOn:false,
        b5lr_bjOn:false,
        b5rr_bjOn:false,
        f12ua_bjOn:false,//是否是备件安装状态
        f8ua_bjOn:false,//是否是备件安装状态
        f13ua_bjOn:false,//是否是备件安装状态
        f14ua_bjOn:false,//是否是备件安装状态
        f15ua_bjOn:false,//是否是备件安装状态
        f20ua_bjOn:false,//是否是备件安装状态
        f31ua_bjOn:false,//是否是备件安装状态

        f36ua_bjOn:false,//是否是备件安装状态
        f57ua_bjOn:false,//是否是备件安装状态
        f18ua_bjOn:false,//是否是备件安装状态
        f3ua_bjOn:false,//是否是备件安装状态
        f5da_bjOn:false,//是否是备件安装状态
        f11da_bjOn:false,//是否是备件安装状态
        f32da_bjOn:false,//是否是备件安装状态
        f31da_bjOn:false,//是否是备件安装状态
        f14da_bjOn:false,//是否是备件安装状态
        f8da_bjOn:false,//是否是备件安装状态
        kr27_bjOn:false,
        kr48_bjOn:false,
        kr42l_bjOn:false,
        kr42r_bjOn:false,
        b20_bjOn:false,
        line_bjOn:false,//是否是发动机线束备件安装状态
        ljName:{
            q38:"节气门体",
            b52b:"后氧传感器",
            b52a:"前氧传感器",
            q6e:"排气凸轮轴位置执行器",
            q6f:"进气凸轮轴位置执行器",
            b23e:"排气凸轮轴位置传感器",
            b23f:"进气凸轮轴位置传感器",
            b75c:"空气流量计",
            b74:"进气歧管压力传感器",
            b47b:"燃油导轨压力传感器",
            q22:"进气歧管调节电磁阀",
            q12:"蒸发排放吹洗电磁阀",
            k20:"发动机电脑",
            f20ua:"25A保险丝",
            f31ua:"7.5A保险丝",
            f8ua:"15A保险丝",
            f12ua:"15A保险丝",
            f13ua:"15A保险丝",
            f14ua:"15A保险丝",
            f15ua:"15A保险丝",
            f18ua:"30A保险丝",
            f5da:"30A保险丝",
            f11da:"30A保险丝",
            f8da:"7.5A保险丝",
            f31da:"20A保险丝",
            f32da:"20A保险丝",
            f14da:"10A保险丝",
            f57ua:"50A保险丝",
            f36ua:"7.5A保险丝",
            f3ua:"30A保险丝",
            kr42r:"右侧日间行车灯继电器",
            kr42l:"左侧日间行车灯继电器",
            kr48:"远光继电器",
            kr27:"启动继电器",
            s82:"雨刮器开关",
            m79:"雨刷器电机",
            p12a:"右高音喇叭",
            p12b:"左低音喇叭",
            s58b:"行李箱盖开闩开关",
            s78:"转向信号/多功能开关",
            s13d:"车门锁止开关",
            ar23d:"驾驶员车门锁闩总成",
            a23lr:"左后车门锁闩总成",
            a23p:"右前车门锁闩总成",
            a23rr:"右后车门锁闩总成",
            k111:"燃油泵驱动器控制模块",
            b26:"曲轴位置传感器",
            e41:"发动机冷却液节温器加热器",
            k17:"电制制动控制模块",
            e13la:"左前大灯总成",
            e13ra:"右前大灯总成",
            b5lf:"左前轮速传感器",
            b5rf:"右前轮速传感器",
            b5lr:"左后轮速传感器",
            b5rr:"右后轮速传感器",
            b22:"制动踏板传感器",
            s79d:"车窗开关",
            q18:"燃油压力调节器",
            b68:"爆震传感器",
            b37b:"机油压力传感器",
            b20:"制动液壶",
            b34a:"冷却液温度传感器1",
            b34b:"冷却液温度传感器2",
            m74d:"车窗电机",
            b107:"油门踏板",
            k9:"车身控制模块",
            s30:"大灯开关",
            m64:"起动机",
            m40:"行李箱锁闩"



        },
        onDrag:true,//拖动中的部件
        t8a:true,//点火线圈1（t8a）
        t8b:true,//点火线圈2（t8b）
        t8c:true,//点火线圈3（t8c）
        t8d:true,//点火线圈4（t8d）
        t8a_test:false,//点火线圈1（t8a)测试状态
        t8b_test:false,//点火线圈2（t8b)测试状态
        t8c_test:false,//点火线圈3（t8c)测试状态
        t8d_test:false,//点火线圈4（t8d)测试状态
        f8ua:true,//插头是否进入零件车
        f12ua:true,//插头是否进入零件车
        f13ua:true,//插头是否进入零件车
        f14ua:true,//插头是否进入零件车
        f15ua:true,//插头是否进入零件车
        f20ua:true,//插头是否进入零件车
        f31ua:true,//插头是否进入零件车
        f36ua:true,//插头是否进入零件车
        f57ua:true,//插头是否进入零件车
        f18ua:true,//插头是否进入零件车
        f3ua:true,//插头是否进入零件车
        f5da:true,//插头是否进入零件车
        f11da:true,//插头是否进入零件车
        f32da:true,//插头是否进入零件车
        f31da:true,//插头是否进入零件车
        f8da:true,//插头是否进入零件车
        f14da:true,//插头是否进入零件车
        kr42r:true,
        kr27:true,
        kr42l:true,
        kr48:true,
        f8ua_out:true,//插座是否为拔开状态（未放入零件车）
        f12ua_out:true,//插座是否为拔开状态（未放入零件车）
        f13ua_out:true,//插座是否为拔开状态（未放入零件车）
        f14ua_out:true,//插座是否为拔开状态（未放入零件车）
        f15ua_out:true,//插座是否为拔开状态（未放入零件车）
        f20ua_out:true,//插座是否为拔开状态（未放入零件车）
        f31ua_out:true,//插座是否为拔开状态（未放入零件车）
        f36ua_out:true,//插座是否为拔开状态（未放入零件车）
        f57ua_out:true,//插座是否为拔开状态（未放入零件车）
        f18ua_out:true,//插座是否为拔开状态（未放入零件车）
        f5da_out:true,//插座是否为拔开状态（未放入零件车）
        f11da_out:true,//插座是否为拔开状态（未放入零件车）
        f14da_out:true,//插座是否为拔开状态（未放入零件车）
        f32da_out:true,//插座是否为拔开状态（未放入零件车）
        f31da_out:true,//插座是否为拔开状态（未放入零件车）
        f8da_out:true,//插座是否为拔开状态（未放入零件车）
        f3ua_out:true,//插座是否为拔开状态（未放入零件车）
        kr42r_out:true,
        kr27_out:true,
        kr42l_out:true,
        kr48_out:true,
        faultType:"SBT_VER_001",
        toolBox:false,//维修工具
        t8a_body_zz:false,//点火线圈1（t8a）拔出时的遮挡
        t8b_body_zz:false,//点火线圈2（t8b）拔出时的遮挡
        t8c_body_zz:false,//点火线圈3（t8c）拔出时的遮挡
        t8d_body_zz:false,//点火线圈4（t8d）拔出时的遮挡
        t8a_body_ls:false,//点火线圈1（t8a）上的螺丝安装状态
        t8b_body_ls:false,//点火线圈1（t8a）上的螺丝安装状态
        t8c_body_ls:false,//点火线圈1（t8a）上的螺丝安装状态
        t8d_body_ls:false,//点火线圈1（t8a）上的螺丝安装状态
        t8a_hhs:true,//点火线圈1（t8a）上的火花塞
        t8b_hhs:true,//点火线圈2（t8b）上的火花塞
        t8c_hhs:true,//点火线圈3（t8c）上的火花塞
        t8d_hhs:true,//点火线圈4（t8d）上的火花塞
        t8a_num:'T8A点火线圈',//点火线圈1（t8a）的标记
        t8b_num:'T8B点火线圈',//点火线圈2（t8b）的标记
        t8c_num:'T8C点火线圈',//点火线圈3（t8c）的标记
        t8d_num:'T8D点火线圈',//点火线圈4（t8d）的标记
        t8aHhs_num:'T8A点火线圈火花塞',//点火线圈1（t8a）火花塞的标记
        t8bHhs_num:'T8B点火线圈火花塞',//点火线圈2（t8b）火花塞的标记
        t8cHhs_num:'T8B点火线圈火花塞',//点火线圈3（t8c）火花塞的标记
        t8dHhs_num:'T8B点火线圈火花塞',//点火线圈4（t8d）火花塞的标记
        t8a_imgId:'t8a',//点火线圈1（t8a）零件车生成零件的标记
        t8b_imgId:'t8b',//点火线圈2（t8b）零件车生成零件的标记
        t8c_imgId:'t8c',//点火线圈3（t8c）零件车生成零件的标记
        t8d_imgId:'t8d',//点火线圈4（t8d）零件车生成零件的标记
        t8aHhs_imgId:'t8a_hhs',//点火线圈1（t8a）火花塞零件车生成零件的标记
        t8bHhs_imgId:'t8b_hhs',//点火线圈2（t8b）火花塞零件车生成零件的标记
        t8cHhs_imgId:'t8c_hhs',//点火线圈3（t8c）火花塞零件车生成零件的标记
        t8dHhs_imgId:'t8d_hhs',//点火线圈4（t8d）火花塞零件车生成零件的标记
        ljc_bj:'备件',//零件车的备件
        bj_dhxq:'dhxq',//零件车的点火线圈备件
        bj_hhs:'hhs',//零件车中的点火花塞备件
        s13d: false,//车门锁开关是否可点击状态
        s30swt:false,//大灯开关
        s33:false,//喇叭开关
        s78swt:false,//转向远光灯开关
        s58b:false,//后备箱开关
        s79d:false,//车窗开关
        s82swt:false,//刮水器开关
        trunkStatus:"0",//后备箱开关状态
        trunk:"0",//后备箱开启大小状态
        changeActin:{//更换备件的id
            q38:"ver239",
            b52b:"ver257",
            b52a:"ver241",
            q6e:"ver259",
            q6f:"ver252",
            b23e:"ver249",
            b23f:"ver258",
            b75c:"ver250",
            b74:"ver251",
            b47b:"ver244",
            q12:"ver240",
            q22:"ver242",
            f20ua:"ver254",
            f31ua:"ver253",
            f12ua:"ver255",
            f13ua:"ver256",
            f14ua:"ver260",
            t8a:"ver245",
            t8b:"ver246",
            t8c:"ver247",
            t8d:"ver248"
        },

        bjdhxq_Install:'0',//点火线圈备件的安装位置
        bjhhs_Install:'0',//火花塞备件的安装位置
        f12ua_cx:'0',// f12ua座上的备件是否拆卸
        f13ua_cx:'0',// f12ua座上的备件是否拆卸
        f14ua_cx:'0',// f12ua座上的备件是否拆卸
        f15ua_cx:'0',// f12ua座上的备件是否拆卸
        f31ua_cx:'0',// f31ua座上的备件是否拆卸
        f20ua_cx:'0',// f20ua座上的备件是否拆卸
        k20_cx:'0'//k20发动机电脑备件是否拆卸


};
    pageService.Pint = {
        In1Sen_x_SupplyOilLine_x_x:"1",//油压表安装状态
        In1Sen_x_CylPressGauge_x_x:"1",//缸压信号
        In1Sen_BATT_Pos_x_Install:"1",//电池正极安装状态
        In1Sen_BATT_Neg_x_Install:"1",//电池负极安装状态
        In1Sen_K20_X1_x_Install:"1",//发动机控制模块K20X1安装状态
        In1Sen_K20_X2_x_Install:"1",//	发动机控制模块K20X2安装状态
        In1Sen_K20_X3_x_Install:"1",//	发动机控制模块K20X3安装状态
        In1Sen_F3UA_Body_x_Install:"1",//	F3UA保险安装状态
        In1Sen_F3UA_Body_x_Fault:"1",//	F3UA保险断路
        In1Sen_KR27_Conn_x_Install:"1",//	KR27起动机继电器安装状态
        In1Sen_KR27_Conn_Pin1_Open:"1",//	KR27继电器1脚开路
        In1Sen_KR27_Conn_Pin2_Open:"1",//	KR27继电器2脚开路
        In1Sen_KR27_Conn_Pin3_Open:"1",//	KR27继电器3脚开路
        In1Sen_KR27_Conn_Pin4_Open:"1",//	KR27继电器5脚开路
        In1Sen_KR27_Body_x_Fault:"1",//	KR27继电器本体故障
        In1Sen_M64_Conn_x_Install:"1",//	起动机插头安装状态
        In1Sen_M64_Conn_Pin1_Open:"1",//	起动机插头1脚开路
        In1Sen_M64_Conn_Pin2_Open:"1",//	起动机插头2脚开路
        In1Sen_M64_Conn_Pin3_Open:"1",//	起动机插头3脚开路
        In1Sen_Starter_Body_x_Fault	:"1",//起动机本体故障
        In1Sen_F31UA_Body_x_Install:"1",//	F31UA保险安装状态
        In1Sen_F31UA_Body_x_Fault:"1",//F31UA保险断路
        In1Sen_F20UA_Body_x_Install:"1",//	F20UA保险安装状态
        In1Sen_F20UA_Body_x_Fault:"1",//	F20UA保险断路
        In1Sen_F12UA_Body_x_Install:"1",//	F12UA保险安装状态
        In1Sen_F12UA_Body_x_Fault:"1",//	F12UA保险断路
        In1Sen_F13UA_Body_x_Install:"1",//	F13UA保险安装状态
        In1Sen_F13UA_Body_x_Fault:"1",//	F13UA保险断路
        In1Sen_T8A_Coil_x_Install:"1",//	T8A点火线圈1安装状态
        In1Sen_T8A_Coil_Pin1_Open:"1",//	T8A点火线圈1脚开路
        In1Sen_T8A_Coil_Pin2_Open:"1",//	T8A点火线圈2脚开路
        In1Sen_T8A_Coil_Pin3_Open:"1",//	T8A点火线圈3脚开路
        In1Sen_T8A_Coil_Pin4_Open:"1",//	T8A点火线圈4脚开路
        In1Sen_T8A_Coil_Body_Install:"1",//	T8A点火线圈本体安装状态
        In1Sen_T8A_Coil_Body_Fault:"1",//	T8A点火线圈本体故障
        In1Sen_T8A_SpPlug_Body_Install:"1",//	T8A火花塞安装
        In1Sen_T8A_SpPlug_Body_Fault:"1",//	T8A火花塞故障
        In1Sen_T8B_Coil_x_Install:"1",//	T8B点火线圈安装状态
        In1Sen_T8B_Coil_Pin1_Open:"1",//	T8B点火线圈1脚开路
        In1Sen_T8B_Coil_Pin2_Open:"1",//	T8B点火线圈2脚开路
        In1Sen_T8B_Coil_Pin3_Open:"1",//	T8B点火线圈3脚开路
        In1Sen_T8B_Coil_Pin4_Open:"1",//	T8B点火线圈4脚开路
        In1Sen_T8B_Coil_Body_Install:"1",//	T8B点火线圈本体安装状态
        In1Sen_T8B_Coil_Body_Fault:"1",//	T8B点火线圈本体故障
        In1Sen_T8B_SpPlug_Body_Install:"1",//	T8B火花塞安装
        In1Sen_T8B_SpPlug_Body_Fault:"1",//	T8B火花塞故障
        In1Sen_T8C_Coil_Conn_Install:"1",//	T8C点火线圈安装状态
        In1Sen_T8C_Coil_Pin1_Open:"1",//	T8C点火线圈1脚开路
        In1Sen_T8C_Coil_Pin2_Open:"1",//	T8C点火线圈2脚开路
        In1Sen_T8C_Coil_Pin3_Open:"1",//	T8C点火线圈3脚开路
        In1Sen_T8C_Coil_Pin4_Open:"1",//	T8C点火线圈4脚开路
        In1Sen_T8C_Coil_Body_Install:"1",//	T8C点火线圈本体安装状态
        In1Sen_T8C_Coil_Body_Fault:"1",//	T8C点火线圈本体故障
        In1Sen_T8C_SpPlug_Body_Install:"1",//	T8C火花塞安装
        In1Sen_T8C_SpPlug_Body_Fault:"1",//	T8C火花塞故障
        In1Sen_T8D_Coil_Conn_Install:"1",//	T8D点火线圈安装状态
        In1Sen_T8D_Coil_Pin1_Open:"1",//	T8D点火线圈1脚开路
        In1Sen_T8D_Coil_Pin2_Open:"1",//	T8D点火线圈2脚开路
        In1Sen_T8D_Coil_Pin3_Open:"1",//	T8D点火线圈3脚开路
        In1Sen_T8D_Coil_Pin4_Open:"1",//	T8D点火线圈4脚开路
        In1Sen_T8D_Coil_Body_Install:"1",//	T8D点火线圈本体安装状态
        In1Sen_T8D_Coil_Body_Fault:"1",//	T8D点火线圈本体故障
        In1Sen_T8D_SpPlug_Body_Install:"1",//	T8D火花塞安装
        In1Sen_T8D_SpPlug_Body_Fault:"1",//	T8D火花塞故障
        In1Sen_F14UA_Body_x_Install:"1",//	F14UA保险安装状态
        In1Sen_F14UA_Body_x_Fault:"1",//	F14UA保险断路
        In1Sen_B75C_Conn_x_Install:"1",//	B75C多功能进气传感器安装状态
        In1Sen_B75C_Conn_Pin1_Open:"1",//	B75C传感器1脚开路
        In1Sen_B75C_Conn_Pin2_Open:"1",//	B75C传感器2脚开路
        In1Sen_B75C_Conn_Pin3_Open:"1",//	B75C传感器3脚开路
        In1Sen_B75C_Conn_Pin4_Open:"1",//	B75C传感器4脚开路
        In1Sen_B75C_Conn_Pin5_Open:"1",//	B75C传感器5脚开路
        In1Sen_B75C_Conn_Pin6_Open:"1",//	B75C传感器6脚开路
        In1Sen_B75C_Conn_Pin7_Open:"1",//	B75C传感器7脚开路
        In1Sen_B75C_Conn_Pin8_Open:"1",//	B75C传感器8脚开路
        In1Sen_B75C_Body_x_Fault:"1",//	B75C传感器部件本体故障
        In1Sen_B34A_Conn_x_Install:"1",//	B34A发动机冷却液温度传感器安装状态
        In1Sen_B34A_Conn_Pin1_Open:"1",//	B34A冷却液温度传感器1脚开路
        In1Sen_B34A_Conn_Pin2_Open:"1",//	B34A冷却液温度传感器2脚开路
        In1Sen_B34A_Body_x_Fault:"1",//	B34A冷却液温度传感器本体故障
        In1Sen_B34B_Conn_x_Install:"1",//	B34B发动机冷却液温度传感器安装状态
        In1Sen_B34B_Conn_Pin1_Open:"1",//	B34B冷却液温度传感器1脚开路
        In1Sen_B34B_Conn_Pin2_Open:"1",//	B34B冷却液温度传感器2脚开路
        In1Sen_B34B_Body_x_Fault:"1",//	B34B冷却液温度传感器本体故障
        In1Sen_B52B_Conn_x_Install:"1",//	B52B加热型氧传感器1安装状态
        In1Sen_B52B_Conn_Pin1_Open:"1",//	B52B氧传感器1脚开路
        In1Sen_B52B_Conn_Pin2_Open:"1",//	B52B氧传感器2脚开路
        In1Sen_B52B_Conn_Pin3_Open:"1",//	B52B氧传感器3脚开路
        In1Sen_B52B_Conn_Pin4_Open:"1",//	B52B氧传感器4脚开路
        In1Sen_B52B_Body_x_Fault:"1",//	B52B氧传感器本体故障
        In1Sen_B74_Conn_x_Install:"1",//	B74进气歧管绝对压力传感器安装状态
        In1Sen_B74_Conn_Pin1_Open:"1",//	B74传感器1脚开路
        In1Sen_B74_Conn_Pin2_Open:"1",//	B74传感器2脚开路
        In1Sen_B74_Conn_Pin3_Open:"1",//	B74传感器3脚开路
        In1Sen_B74_Body_x_Fault:"1",//	B74传感器部件本体故障
        In1Sen_F15UA_Body_x_Install:"1",//	F15UA保险安装状态
        In1Sen_F15UA_Body_x_Fault:"1",//	F15UA保险断路
        In1Sen_E41_Conn_x_Install:"1",//	E41发动机冷却液节温器加热器安装状态
        In1Sen_E41_Conn_Pin1_Open:"1",//	E41冷却液节温器加热器1脚开路
        In1Sen_E41_Conn_Pin2_Open:"1",//	E41冷却液节温器加热器2脚开路
        In1Sen_E41_Body_x_Fault:"1",//	E41冷却液节温器加热器本体故障
        In1Sen_B52A_Conn_x_Install:"1",//	B52A加热型氧传感器1安装状态
        In1Sen_B52A_Conn_Pin1_Open:"1",//	B52A氧传感器1脚开路
        In1Sen_B52A_Conn_Pin2_Open:"1",//	B52A氧传感器2脚开路
        In1Sen_B52A_Conn_Pin3_Open:"1",//	B52A氧传感器3脚开路
        In1Sen_B52A_Conn_Pin4_Open:"1",//	B52A氧传感器4脚开路
        In1Sen_B52A_Body_x_Fault:"1",//	B52A氧传感器本体故障
        In1Sen_Q12_Conn_x_Install:"1",//	Q12蒸发排放吹洗电磁阀安装状态
        In1Sen_Q12_Conn_Pin1_Open:"1",//	Q12电磁阀1脚开路
        In1Sen_Q12_Conn_Pin2_Open:"1",//	Q12电磁阀2脚开路
        In1Sen_Q12_Body_x_Fault:"1",//	Q12电磁阀本体故障
        In1Sen_Q22_Conn_x_Install:"1",//	Q22进气歧管调节电磁阀安装状态
        In1Sen_Q22_Conn_Pin1_Open:"1",//	Q22电磁阀1脚开路
        In1Sen_Q22_Conn_Pin2_Open:"1",//	Q22电磁阀2脚开路
        In1Sen_Q22_Body_x_Fault:"1",//	Q22电磁阀本体故障
        In1Sen_F36UA_Body_x_Install:"1",//	F36UA保险安装状态
        In1Sen_F36UA_Body_x_Fault:"1",//	F36UA保险断路
        In1Sen_X55A_Body_x_Install:"1",//	X55AF保险丝安装状态
        In1Sen_X55A_Body_x_Fault:"1",//	X55AF保险丝断路
        In1Sen_K111_Conn_x_Install:"1",//	K111燃油泵驱动器控制模块安装状态
        In1Sen_K111_Body_x_Fault:"1",//	K111燃油泵驱动器控制模块本体故障
        In1Sen_A7_Conn_x_Install:"1",//	A7燃油泵和油位传感器总成安装状态
        In1Sen_A7_Conn_Pin1_Open:"1",//	A7燃油泵和油位传感器1脚开路
        In1Sen_A7_Conn_Pin2_Open:"1",//	A7燃油泵和油位传感器2脚开路
        In1Sen_A7_Body_x_Fault:"1",//	A7燃油泵和油位传感器本体故障
        In1Sen_B47_Conn_x_Install:"1",//	B47燃油压力传感器安装状态
        In1Sen_B47_Conn_Pin1_Open:"1",//	B47燃油传感器1脚开路
        In1Sen_B47_Conn_Pin2_Open:"1",//	B47燃油传感器2脚开路
        In1Sen_B47_Conn_Pin3_Open:"1",//	B47燃油传感器3脚开路
        In1Sen_B47_Body_x_Fault:"1",//	B47燃油传感器本体故障
        In1Sen_B107_Conn_x_Install:"1",//	B107加速踏板位置传感器安装状态
        In1Sen_B107_Conn_Pin1_Open:"1",//	B107传感器1脚开路
        In1Sen_B107_Conn_Pin2_Open:"1",//	B107传感器2脚开路
        In1Sen_B107_Conn_Pin3_Open:"1",//	B107传感器3脚开路
        In1Sen_B107_Conn_Pin4_Open:"1",//	B107传感器4脚开路
        In1Sen_B107_Conn_Pin5_Open:"1",//	B107传感器5脚开路
        In1Sen_B107_Conn_Pin6_Open:"1",//	B107传感器6脚开路
        In1Sen_B107_Body_x_Fault:"1",//	B107部件本体故障
        In1Sen_Q38_Conn_x_Install:"1",//	Q38节气门体安装状态
        In1Sen_Q38_Conn_Pin1_Open:"1",//	Q38传感器1脚开路
        In1Sen_Q38_Conn_Pin2_Open:"1",//	Q38传感器2脚开路
        In1Sen_Q38_Conn_Pin3_Open:"1",//	Q38传感器3脚开路
        In1Sen_Q38_Conn_Pin4_Open:"1",//	Q38传感器4脚开路
        In1Sen_Q38_Conn_Pin5_Open:"1",//	Q38传感器5脚开路
        In1Sen_Q38_Conn_Pin6_Open:"1",//	Q38传感器6脚开路
        In1Sen_Q38_Body_x_Fault:"1",//	Q38部件本体故障
        In1Sen_K9_Conn_x_Install:"1",//	K9车身控制模块安装状态
        In1Sen_K9_Body_x_Fault:"1",//	K9车身控制模块本体故障
        In1Sen_B22_Conn_x_Install:"1",//	B22制动踏板位置传感器安装状态
        In1Sen_B22_Conn_Pin1_Open:"1",//	B22传感器1脚开路
        In1Sen_B22_Conn_Pin2_Open:"1",//	B22传感器2脚开路
        In1Sen_B22_Conn_Pin3_Open:"1",//	B22传感器3脚开路
        In1Sen_B22_Conn_Pin4_Open:"1",//	B22传感器4脚开路
        In1Sen_B22_Conn_Pin5_Open:"1",//	B22传感器5脚开路
        In1Sen_B22_Conn_Pin6_Open:"1",//	B22传感器6脚开路
        In1Sen_B22_Body_x_Fault:"1",//	B22制动踏板位置传感器本体故障
        In1Sen_B23F_Conn_x_Install:"1",//	B23F进气凸轮轴位置传感器安装状态
        In1Sen_B23F_Conn_Pin1_Open:"1",//	B23F进气凸轮轴1脚开路
        In1Sen_B23F_Conn_Pin2_Open:"1",//	B23F进气凸轮轴2脚开路
        In1Sen_B23F_Conn_Pin3_Open:"1",//	B23F进气凸轮轴3脚开路
        In1Sen_B23F_Body_x_Fault:"1",//	B23F进气凸轮轴位置传感器本体故障
        In1Sen_B23E_Conn_x_Install:"1",//	B23E排气凸轮轴位置传感器安装状态
        In1Sen_B23E_Conn_Pin1_Open:"1",//	B23E排气凸轮轴1脚开路
        In1Sen_B23E_Conn_Pin2_Open:"1",//	B23E排气凸轮轴2脚开路
        In1Sen_B23E_Conn_Pin3_Open:"1",//	B23E排气凸轮轴3脚开路
        In1Sen_B23E_Body_x_Fault:"1",//	B23E排气凸轮轴位置传感器本体故障
        In1Sen_B26_Conn_x_Install:"1",//	B26曲轴位置传感器安装状态
        In1Sen_B26_Conn_Pin1_Open:"1",//	B26曲轴位置传感器1脚开路
        In1Sen_B26_Conn_Pin2_Open:"1",//	B26曲轴位置传感器2脚开路
        In1Sen_B26_Conn_Pin3_Open:"1",//	B26曲轴位置传感器3脚开路
        In1Sen_B26_Body_x_Fault:"1",//	B26曲轴位置传感器本体故障
        In1Sen_Q6F_Conn_x_Install:"1",//	Q6F进气凸轮轴位置执行器电磁阀安装状态
        In1Sen_Q6F_Conn_Pin1_Open:"1",//	Q6F进气凸轮轴位置电磁阀1脚开路
        In1Sen_Q6F_Conn_Pin2_Open:"1",//	Q6F进气凸轮轴位置电磁阀2脚开路
        In1Sen_Q6F_Body_x_Fault:"1",//	Q6F进气凸轮轴位置本体故障
        In1Sen_Q6E_Conn_x_Install:"1",//	Q6E排气凸轮轴位置执行器电磁阀安装状态
        In1Sen_Q6E_Conn_Pin1_Open:"1",//	Q6E排气凸轮轴位置电磁阀1脚开路
        In1Sen_Q6E_Conn_Pin2_Open:"1",//	Q6E排气凸轮轴位置电磁阀2脚开路
        In1Sen_Q6E_Body_x_Fault:"1",//	Q6E进气凸轮轴位置本体故障
        In1Sen_B68_Conn_x_Install:"1",//	B68爆震传感器安装状态
        In1Sen_B68_Conn_Pin1_Open:"1",//	B68爆震传感器1脚开路
        In1Sen_B68_Conn_Pin2_Open:"1",//	B68爆震传感器2脚开路
        In1Sen_B68_Body_x_Fault:"1",//	B68爆震传感器本体故障
        In1Sen_B47B_Conn_x_Install:"1",//	B47B燃油导轨压力传感器安装状态
        In1Sen_B47B_Conn_Pin1_Open:"1",//	B47B燃油导轨压力传感器1脚开路
        In1Sen_B47B_Conn_Pin2_Open:"1",//	B47B燃油导轨压力传感器2脚开路
        In1Sen_B47B_Conn_Pin3_Open:"1",//	B47B燃油导轨压力传感器3脚开路
        In1Sen_B47B_Body_x_Fault:"1",//	B47B燃油导轨压力传感器本体故障
        In1Sen_Q18_Conn_x_Install:"1",//	Q18燃油压力调节器安装状态
        In1Sen_Q18_Conn_Pin1_Open:"1",//	Q18燃油压力调节器1脚开路
        In1Sen_Q18_Conn_Pin2_Open:"1",//	Q18燃油压力调节器2脚开路
        In1Sen_Q18_Body_x_Fault	:"1",//Q18燃油压力调节器本体故障
        In1Sen_X160_Conn_x_Install:"1",//	X160燃油喷射器安装状态
        In1Sen_Q17A_Conn_Pin1_Open:"1",//	Q17A燃油喷射器1脚开路
        In1Sen_Q17A_Conn_Pin2_Open:"1",//	Q17A燃油喷射器2脚开路
        In1Sen_Q17A_Body_x_Fault:"1",//	Q17A燃油喷射器本体故障
        In1Sen_Q17B_Conn_Pin1_Open:"1",//	Q17B燃油喷射器1脚开路
        In1Sen_Q17B_Conn_Pin2_Open:"1",//	Q17B燃油喷射器2脚开路
        In1Sen_Q17B_Body_x_Fault:"1",//	Q17B燃油喷射器本体故障
        In1Sen_Q17C_Conn_Pin1_Open:"1",//	Q17C燃油喷射器1脚开路
        In1Sen_Q17C_Conn_Pin2_Open:"1",//	Q17C燃油喷射器2脚开路
        In1Sen_Q17C_Body_x_Fault:"1",//	Q17C燃油喷射器本体故障
        In1Sen_Q17D_Conn_Pin1_Open:"1",//	Q17D燃油喷射器1脚开路
        In1Sen_Q17D_Conn_Pin2_Open:"1",//	Q17D燃油喷射器2脚开路
        In1Sen_Q17D_Body_x_Fault:"1",//	Q17D燃油喷射器本体故障
        In1Sen_B37B_Conn_x_Install:"1",//	B37B发动机机油压力传感器
        In1Sen_B37B_Conn_Pin1_Open:"1",//	B37B机油压力传感器1脚开路
        In1Sen_B37B_Conn_Pin2_Open:"1",//	B37B机油压力传感器2脚开路
        In1Sen_B37B_Conn_Pin3_Open:"1",//	B37B机油压力传感器3脚开路
        In1Sen_B37B_Body_x_Fault:"1",//，	机油压力传感器本体故障
         In1Sen_B34A_Conn_Pin1_S2GND:"1",

        //5月份参数
        In1Veh_F18UA_Body_x_Install:"1",//	F18UA保险安装状态
        In1Veh_F18UA_Body_x_Fault:"1",
        //F18UA保险断路
        In1Veh_F57UA_Body_x_Install:"1",//	F57UA保险安装状态
        In1Veh_F57UA_Body_x_Fault:"1",
        //F57UA保险断路
        In1Veh_K9_X1_x_Install:"1",//	车身控制模块
        In1Veh_K9_X2_x_Install:"1",//
        In1Veh_K9_X3_x_Install:"1",//
        In1Veh_K9_X4_x_Install:"1",//
        In1Veh_K9_X5_x_Install:"1",//
        In1Veh_K9_X6_x_Install:"1",//
        In1Veh_K9_X7_x_Install:"1",//
        In1Veh_M79_Conn_x_Install:"1",//	M79档风玻璃刮水器电机模块插头安装
        In1Veh_M79_Conn_Pin1_Open:"1",
        //M79档风玻璃刮水器电机1脚开路
        In1Veh_M79_Conn_Pin2_Open:"1",
        //M79档风玻璃刮水器电机2脚开路
        In1Veh_M79_Conn_Pin3_Open:"1",
        //M79档风玻璃刮水器电机3脚开路
        In1Veh_M79_Conn_Pin4_Open:"1",
        //M79档风玻璃刮水器电机4脚开路
        In1Veh_M79_Body_x_Fault:"1",
        //M79档风玻璃刮水器电机本体故障
        In1Veh_S82_Conn_x_Install:"1",//	S82挡风玻班刮水器/洗涤器开关插头安装
        In1Veh_S82_Conn_Pin1_Open:"1",
        //S82挡风玻班刮水器/洗涤器开关1脚开路
        In1Veh_S82_Conn_Pin2_Open:"1",
        //S82挡风玻班刮水器/洗涤器开关2脚开路
        In1Veh_S82_Conn_Pin3_Open:"1",
        //S82挡风玻班刮水器/洗涤器开关3脚开路
        In1Veh_S82_Body_x_Fault:"1",
        //S82挡风玻班刮水器/洗涤器开关本体故障
        In1Veh_S30_Conn_x_Install:"1",//	S30大灯开关插头安装
        In1Veh_S30_Conn_Pin3_Open:"1",
        //S30大灯开关插头3脚开路
        In1Veh_S30_Conn_Pin4_Open:"1",
        //S30大灯开关插头4脚开路
        In1Veh_S30_Conn_Pin5_Open:"1",
        //S30大灯开关插头5脚开路
        In1Veh_S30_Conn_Pin6_Open:"1",
        //S30大灯开关插头6脚开路
        In1Veh_S30_Body_x_Fault:"1",
        //S30大灯开关部件故障
        In1Veh_S78_Conn_x_Install:"1",//	S78转向信号多功能开关(变光开关)插头安装
        In1Veh_S78_Conn_Pin3_Open:"1",
        //S78转向信号多功能开关3脚开路
        In1Veh_S78_Conn_Pin6_Open:"1",
        //S78转向信号多功能开关6脚开路
        In1Veh_S78_Conn_Pin7_Open:"1",
        //S78转向信号多功能开关7脚开路
        In1Veh_S78_Body_x_Fault:"1",
        //S78转向信号多功能开关部件故障
        In1Veh_E13LA_Conn_x_Install:"1",//	E13LA左前大灯插头安装状态
        In1Veh_E13LA_Conn_Pin1_Open:"1",
        //E13LA左前大灯插头1脚开路
        In1Veh_E13LA_Conn_Pin2_Open:"1",
        //E13LA左前大灯插头2脚开路
        In1Veh_E13LA_Conn_Pin3_Open:"1",
        //E13LA左前大灯插头3脚开路
        In1Veh_E13LA_Conn_Pin4_Open:"1",
        //E13LA左前大灯插头4脚开路
        In1Veh_E13LA_Conn_Pin9_Open:"1",
        //E13LA左前大灯插头9脚开路
        In1Veh_E13LA_Conn_Pin10_Open:"1",
        //E13LA左前大灯插头10脚开路
        In1Veh_E13LA_Body_x_Fault:"1",
        //E13LA左前大灯部件故障
        In1Veh_E13RA_Conn_x_Install:"1",//	E13RA右前大灯插头安装状态
        In1Veh_E13RA_Conn_Pin1_Open:"1",
        //E13RA右前大灯插头1脚开路
        In1Veh_E13RA_Conn_Pin2_Open:"1",
        //E13RA右前大灯插头2脚开路
        In1Veh_E13RA_Conn_Pin3_Open:"1",
        //E13RA右前大灯插头3脚开路
        In1Veh_E13RA_Conn_Pin4_Open:"1",
        //E13RA右前大灯插头4脚开路
        In1Veh_E13RA_Conn_Pin9_Open:"1",
        //E13RA右前大灯插头9脚开路
        In1Veh_E13RA_Conn_Pin10_Open:"1",
        //E13RA右前大灯插头10脚开路
        In1Veh_E13RA_Body_x_Fault:"1",
        //E13RA右前大灯部件故障
        In1Veh_F8UA_Body_x_Install:"1",//	F8UA保险安装
        In1Veh_F8UA_Body_x_Fault:"1",
        //F8UA保险断路
        In1Veh_S33_Conn_x_Install:"1",//	S33喇叭开关插头安装
        In1Veh_S33_Conn_Pin1_Open:"1",
        //S33喇叭开关插头1脚开路
        In1Veh_S33_Conn_Pin2_Open:"1",
        //S33喇叭开关插头2脚开路
        In1Veh_S33_Body_x_Fault:"1",
        //S33喇叭开关部件故障
        In1Veh_P12A_Conn_x_Install:"1",//	高音喇叭插头安装
        In1Veh_P12A_Conn_Pin1_Open:"1",
        //高音喇叭插头1脚开路
        In1Veh_P12A_Conn_Pin2_Open:"1",
        //高音喇叭插头2脚开路
        In1Veh_P12A_Body_x_Fault:"1",
        //高音喇叭部件故障
        In1Veh_P12B_Conn_x_Install:"1",//	低音喇叭插头安装
        In1Veh_P12B_Conn_Pin1_Open:"1",
        //低音喇叭插头1脚开路
        In1Veh_P12B_Conn_Pin2_Open:"1",
        //低音喇叭插头2脚开路
        In1Veh_P12B_Body_x_Fault:"1",
        //低音喇叭部件故障
        In1Veh_S58B_Conn_x_Install:"1",//	S58B行李箱盖开闩开关插头安装
        In1Veh_S58B_Conn_Pin1_Open:"1",
        //S58B行李箱盖开闩开关插头1脚开路
        In1Veh_S58B_Conn_Pin3_Open:"1",
        //S58B行李箱盖开闩开关插头3脚开路
        In1Veh_S58B_Body_x_Fault:"1",
        //S58B行李箱盖开闩开关部件故障
        In1Veh_M40_Conn_x_Install:"1",//	M40行李箱盖锁闩插头安装
        In1Veh_M40_Conn_Pin1_Open:"1",
        //M40行李箱盖锁闩插头1脚开路
        In1Veh_M40_Conn_Pin2_Open:"1",
        //M40行李箱盖锁闩插头2脚开路
        In1Veh_M40_Conn_Pin4_Open:"1",
        //M40行李箱盖锁闩插头4脚开路
        In1Veh_M40_Body_x_Fault:"1",
        //M40行李箱盖锁闩部件故障
        In1Veh_S79D_Conn_x_Install:"1",//	S79D驾驶员车窗开关安装
        In1Veh_S79D_Conn_Pin1_Open:"1",
        //S79D驾驶员车窗开关1脚开路
        In1Veh_S79D_Conn_Pin2_Open:"1",
        //S79D驾驶员车窗开关2脚开路
        In1Veh_S79D_Conn_Pin3_Open:"1",
        //S79D驾驶员车窗开关3脚开路
        In1Veh_S79D_Conn_Pin4_Open:"1",
        //S79D驾驶员车窗开关4脚开路
        In1Veh_S79D_Conn_Pin5_Open:"1",
        //S79D驾驶员车窗开关5脚开路
        In1Veh_S79D_Conn_Pin6_Open:"1",
        //S79D驾驶员车窗开关6脚开路
        In1Veh_S79D_Body_x_Fault:"1",
        //S79D驾驶员车窗开关部件故障
        In1Veh_M74D_Conn_x_Install:"1",//	M74D车窗电机插头安装
        In1Veh_M74D_Conn_Pin1_Open:"1",
        //M74D车窗电机插头1脚开路
        In1Veh_M74D_Conn_Pin2_Open:"1",
        //M74D车窗电机插头2脚开路
        In1Veh_M74D_Conn_Pin3_Open:"1",
        //M74D车窗电机插头3脚开路
        In1Veh_M74D_Conn_Pin4_Open:"1",
        //M74D车窗电机插头4脚开路
        In1Veh_M74D_Conn_Pin5_Open:"1",
        //M74D车窗电机插头5脚开路
        In1Veh_M74D_Conn_Pin7_Open:"1",
        //M74D车窗电机插头7脚开路
        In1Veh_M74D_Body_x_Fault:"1",
        //M74D车窗电机部件故障
        In1Veh_S13D_Conn_x_Install:"1",//	S13D车门锁止开关插头(驾驶员恻)安装
        In1Veh_S13D_Conn_Pin2_Open:"1",
        //S13D车门锁止开关插头2脚开路
        In1Veh_S13D_Conn_Pin3_Open:"1",
        //S13D车门锁止开关插头3脚开路
        In1Veh_S13D_Conn_Pin4_Open:"1",
        //S13D车门锁止开关插头4脚开路
        In1Veh_S13D_Body_x_Fault:"1",
        //S13D车门锁止开关部件故障
        In1Veh_A23D_Conn_x_Install:"1",//	A23D驾驶员车门锁闩总成插头安装
        In1Veh_A23D_Conn_Pin1_Open:"1",
        //A23D驾驶员车门锁闩总成插头1脚开路
        In1Veh_A23D_Conn_Pin3_Open:"1",
        //A23D驾驶员车门锁闩总成插头3脚开路
        In1Veh_A23D_Conn_Pin4_Open:"1",
        //A23D驾驶员车门锁闩总成插头4脚开路
        In1Veh_A23D_Conn_Pin5_Open:"1",
        //A23D驾驶员车门锁闩总成插头5脚开路
        In1Veh_A23D_Conn_Pin7_Open:"1",
        //A23D驾驶员车门锁闩总成插头7脚开路
        In1Veh_A23D_Conn_Pin8_Open:"1",
        //A23D驾驶员车门锁闩总成插头8脚开路
        In1Veh_A23D_Body_x_Fault:"1",
        //A23D驾驶员车门锁闩总成故障
        In1Sen_K111_Conn_Pin2_Open:"1",//K111燃油泵驱动器控制模块2脚开路
        In1Sen_K111_Conn_Pin9_Open:"1",//K111燃油泵驱动器控制模块9脚开路
        In1Sen_K111_Conn_Pin6_Open:'1',//K111燃油泵驱动器控制模块6脚开路
        In1Veh_A23LR_Conn_x_Install:"1",//	A23LR左后车门锁闩总成插头安装
        In1Veh_A23LR_Conn_Pin1_Open:"1", //A23LR左后车门锁闩总成插头1脚开路
        In1Veh_A23LR_Conn_Pin3_Open:"1", //A23LR左后车门锁闩总成插头3脚开路
        In1Veh_A23LR_Conn_Pin7_Open:"1", //A23LR左后车门锁闩总成插头7脚开路
        In1Veh_A23LR_Conn_Pin8_Open:"1", //A23LR左后车门锁闩总成插头8脚开路
        In1Veh_A23LR_Body_x_Fault:"1", //A23LR左后车门锁闩总成故障
        In1Veh_A23P_Conn_x_Install:"1",//	A23P乘客车门锁闩总成插头安装
        In1Veh_A23P_Conn_Pin3_Open:"1", //A23P乘客车门锁闩总成插头3脚开路
        In1Veh_A23P_Conn_Pin5_Open:"1", //A23P乘客车门锁闩总成插头5脚开路
        In1Veh_A23P_Conn_Pin8_Open:"1", //A23P乘客车门锁闩总成插头8脚开路
        In1Veh_A23P_Conn_Pin9_Open:"1", //A23P乘客车门锁闩总成插头9脚开路
        In1Veh_A23P_Body_x_Fault:"1", //A23P乘客车门锁闩总成故障
        In1Veh_A23RR_Conn_x_Install:"1",//	A23RR右后车门锁闩总成插头安装
        In1Veh_A23RR_Conn_Pin3_Open:"1", //	A23RR右后车门锁闩总成插头3脚开路
        In1Veh_A23RR_Conn_Pin5_Open:"1", //	A23RR右后车门锁闩总成插头5脚开路
        In1Veh_A23RR_Conn_Pin8_Open:"1", //	A23RR右后车门锁闩总成插头8脚开路
        In1Veh_A23RR_Conn_Pin9_S2GND:"1", //A23RR右后车门锁闩总成插头8脚短路
        In1Veh_A23RR_Conn_Pin9_Open:"1", //	A23RR右后车门锁闩总成插头9脚开路
        In1Veh_A23RR_Body_x_Fault:"1", //	A23RR右后车门锁闩总成故障
        In1Veh_F8DA_Body_x_Install:"1",//	F8DA保险安装状态
        In1Veh_F8DA_Body_x_Fault:"1", //F8DA保险断路
        In1Veh_F5DA_Body_x_Install:"1",//	F5DA保险安装状态
        In1Veh_F5DA_Body_x_Fault:"1", //F5DA保险断路
        In1Veh_F11DA_Body_x_Install:"1",//	F11DA保险安装状态
        In1Veh_F11DA_Body_x_Fault:"1", //F11DA保险断路
        In1Veh_F14DA_Body_x_Install:"1",//	F14DA保险安装状态
        In1Veh_F14DA_Body_x_Fault:"1", //F14DA保险断路
        In1Veh_F31DA_Body_x_Install:"1",//	F31DA保险安装状态
        In1Veh_F31DA_Body_x_Fault:"1", //F31DA保险断路
        In1Veh_F32DA_Body_x_Install:"1",//	F32DA保险安装状态
        In1Veh_F32DA_Body_x_Fault:"1", //F32DA保险断路
        In1Veh_B5LF_Conn_x_Install:"1",//	左前轮轮速传感器插头安装
        In1Veh_B5LF_Conn_Pin1_Open:"1", //左前轮轮速传感器插头1脚开路
        In1Veh_B5LF_Conn_Pin2_Open:"1", //左前轮轮速传感器插头2脚开路
        In1Veh_B5LF_Body_x_Fault:"1", //左前轮轮速传感器故障
        In1Veh_B5RF_Conn_x_Install:"1",//	右前轮速传感器插头安装
        In1Veh_B5RF_Conn_Pin1_Open:"1", //右前轮轮速传感器插头1脚开路
        In1Veh_B5RF_Conn_Pin2_Open:"1", //右前轮轮速传感器插头2脚开路
        In1Veh_B5RF_Body_x_Fault:"1", //右前轮轮速传感器故障
        In1Veh_B5LR_Conn_x_Install:"1",//	左后轮速传感器插头安装
        In1Veh_B5LR_Conn_Pin1_Open:"1", //左后轮轮速传感器插头1脚开路
        In1Veh_B5LR_Conn_Pin2_Open:"1", //左后轮轮速传感器插头2脚开路
        In1Veh_B5LR_Body_x_Fault:"1", //左后轮轮速传感器故障
        In1Veh_B5RR_Conn_x_Install:"1",//	右后轮速传感器插头安装
        In1Veh_B5RR_Conn_Pin1_Open:"1", //右后轮轮速传感器插头1脚开路
        In1Veh_B5RR_Conn_Pin2_Open:"1", //右后轮轮速传感器插头2脚开路
        In1Veh_B5RR_Body_x_Fault:"1", //右后轮轮速传感器故障
        In1Veh_KR48_Conn_x_Install:"1",//	远光继电器安装
        In1Veh_KR48_Conn_Pin1_Open:"1", //远光继电器1脚开路
        In1Veh_KR48_Conn_Pin2_Open:"1", //远光继电器2脚开路
        In1Veh_KR48_Conn_Pin3_Open:"1", //远光继电器3脚开路
        In1Veh_KR48_Conn_Pin4_Open:"1", //远光继电器4脚开路
        In1Veh_KR48_Body_x_Fault:"1", //远光继电器部件故障
        In1Veh_KR42L_Conn_x_Install:"1",//	左侧日间行车灯继电器安装
        In1Veh_KR42L_Conn_Pin1_Open:"1", //左侧日间行车灯继电器1脚开路
        In1Veh_KR42L_Conn_Pin2_Open:"1", //左侧日间行车灯继电器2脚开路
        In1Veh_KR42L_Conn_Pin3_Open:"1", //左侧日间行车灯继电器3脚开路
        In1Veh_KR42L_Conn_Pin4_Open:"1", //左侧日间行车灯继电器4脚开路
        In1Veh_KR42L_Conn_Pin5_Open:"1", //左侧日间行车灯继电器5脚开路
        In1Veh_KR42L_Body_x_Fault:"1", //左侧日间行车灯继电器部件故障
        In1Veh_KR42R_Conn_x_Install:"1",//	右侧日间行车灯继电器
        In1Veh_KR42R_Conn_Pin1_Open:"1", //右侧日间行车灯继电器1脚开路
        In1Veh_KR42R_Conn_Pin2_Open:"1", //右侧日间行车灯继电器2脚开路
        In1Veh_KR42R_Conn_Pin3_Open:"1", //右侧日间行车灯继电器3脚开路
        In1Veh_KR42R_Conn_Pin4_Open:"1", //右侧日间行车灯继电器4脚开路
        In1Veh_KR42R_Conn_Pin5_Open:"1", //右侧日间行车灯继电器5脚开路
        In1Veh_KR42R_Body_x_Fault:"1", //右侧日间行车灯继电器部件故障
        In1Veh_K17J71_Conn_x_Install:"1",//	K17电子制动控制模块插头
        In1Veh_B20_Conn_x_Install:"1",//	B20制动液位开关插头安装
        In1Veh_B20_Conn_Pin1_Open:"1", //B20制动液位开关插头1脚开路
        In1Veh_B20_Conn_Pin2_Open:"1", //B20制动液位开关插头2脚开路
        In1Veh_B20_Body_x_Fault:"1", //B20制动液位开关故障
        In1Veh_S30Swt_Close_x_x:"0",//大灯开关按钮
        In1Veh_S78Swt_LowBeam_x_x:"0",//转向开关近光
        In1Veh_S82Swt_HighSpeed_x_x:"0",//刮水器开关高速
        In1Veh_S83Swt_LowSpeed_x_x:"0",//刮水器开关低速
        In1Veh_S84Swt_Intermission_x_x:"0",//刮水器开关间歇
        In1Veh_S85Swt_OFF_x_x:"0",//刮水器开关off
        In1Veh_S86Swt_1x_x_x:"0",//刮水器开关1x
        In1Veh_S33_Switch_x_x:"0",//喇叭开关
        In1Veh_S58B_Switch_x_x:"0",//后备箱开关
        In1Veh_S13D_SwitchOpen_x_x:"0",//车门锁止开关开状态
        In1Veh_S13D_SwitchClose_x_x:"0",//车门锁止开关锁状态
        In1Veh_S79D_SwitchRise_x_x:"0",//车窗开关上升状态
        In1Veh_S79D_SwitchDescend_x_x:"0"//车窗开关下降状态
/*        Out1Eng_x_ScoreJud_x_x:"0",
        Out1Veh_x_ScoreJud_x_x:"0",*/
    };


    return pageService;
});