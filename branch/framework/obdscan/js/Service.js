/**
 * @author 谢国亮
 */
obdscanModule.service('obdscanService', function ($http, $rootScope, $timeout) {
    var obdscanService = obdscanService || {};
    obdscanService.Zdata = obdscanService.Zdata || {};
    obdscanService.Mint = obdscanService.Mint || {};
    obdscanService.Mout = obdscanService.Mout || {};
    obdscanService.Zdata = {
        clearGZM:false,//故障修复前是否清楚故障吗
        url:'',
        obdscanStatus: false,
        tabBox1:true,
        tabBox2:false,
        tabBox3:false,
        obdscanOpen: false,
        memory:[], //存模板  方面返回时用
        dongJieZheng:false,//冻结帧数据流是否显示
        layerType:"lay1",//动作测试类型弹出层
        actionType:"jqqg",//发动机控制模块部件动作测试选项
        Out1Eng_x_EngSpeed_x_x:'0',//发动机转速
        Out1Eng_x_CoolTempSensor_x_x:'0',//发动机冷却液温度传感器
        Out1Eng_x_InAirTempSen_x_x:'0',//进气温度传感器
        Out1Eng_x_MAFSensor_x_x:'0',//质量空气流量传感器
        Out1Eng_x_EngLoad_x_x:'0',//发动机负荷
        Out1Eng_x_MfAbsPreSensor_x_x:'0',//歧管绝对压力传感器
        Out1Eng_x_AmbPre_x_x:'0',//大气压力
        Out1Eng_x_FuelCtrlLoopSta1_x_x:'0',//燃油控制回路状态
        Out1Eng_x_ShortFT_x_x:'0',//短期燃油修正
        Out1Eng_x_LongFT_x_x:'0',//长期燃油修正
        Out1Eng_x_FuelPreSensorVlt_x_x:'0',//燃油压力传感器
        Out1Eng_x_FRailPreSensor_x_x:'0',//燃油导轨压力传感器
        Out1Eng_x_IgnTiming_x_x:'0',//点火正时
        Out1Eng_x_EvapEmiPSVInd_x_x:'0',//蒸发排放吹洗电磁阀指令
        Out1Eng_x_Determine_x_x:'确定',
        Out1Eng_x_NotRun_x_x:'未运行',
        Out1Eng_x_Close_x_x:'关闭',
        Out1Eng_x_Inactive_x_x:'不活动',



        obdscanData:{
            jqqg:{
                title:'进气歧管调谐控制阀',
                neiRong:{
                    1:['进气歧管调谐控制阀控制电路指令','Out1Eng_x_Close_x_x',''],
                    2:['进气歧管调谐控制阀控制电路电压过高测试状态','Out1Eng_x_NotRun_x_x',''],
                    3:['进气歧管调谐控制阀控制电路开路测试状态','Out1Eng_x_Determine_x_x',''],
                    4:['进气歧管调谐控制阀控制电路电压过低测试状态','Out1Eng_x_Determine_x_x','']
                }
            },
            cxdcf:{
                title:'蒸发排放吹洗电磁阀指令',
                neiRong:{
                    1:['蒸发排放吹洗电磁阀指令','10',''],
                    2:['蒸发排放吹洗电磁阀控制电路电压过低测试状态','Out1Eng_x_Determine_x_x',''],
                    3:['蒸发排放吹洗电磁阀控制电路开路测试状态','Out1Eng_x_Determine_x_x',''],
                    4:['蒸发排放吹洗电磁阀控制电路电压过高测试状态','Out1Eng_x_Determine_x_x','']
                }
            },
            lqyhwjrq:{
                title:'发动冷却液恒温器加热器',
                neiRong:{
                    1:['发动冷却液节温器加热器指令','Out1Eng_x_CoolTempSensor_x_x','%'],
                    2:['发动冷却液节温器加热器控制电路电压过低测试状态','Out1Eng_x_Determine_x_x',''],
                    3:['发动冷却液节温器加热器控制电路电压过高测试状态','Out1Eng_x_Determine_x_x','']
                }
            },
            jqtlzxq:{
                title:'进气凸轮轴位置执行器',
                neiRong:{
                    1:['发动机转速','Out1Eng_x_EngSpeed_x_x','分钟转速'],
                    2:['进气凸轮轴位置指令','32','%'],
                    3:['进气凸轮轴位置偏差','0','°']
                }
            },
            pqtlzxq:{
                title:'排气凸轮轴位置执行器',
                neiRong:{
                    1:['发动机转速','Out1Eng_x_EngSpeed_x_x','分钟转速'],
                    2:['排气凸轮轴位置指令','32','%'],
                    3:['排气凸轮轴位置偏差','0','°']
                }
            },
            moban:{
                title:'',
                neiRong:{
                    1:['','',''],
                    2:['','',''],
                    3:['','',''],
                    4:['','','']
                }
            },
            rybqy:{
                title:'燃油泵启用',
                neiRong:{
                    1:['燃油泵启用指令','点亮',''],
                    2:['燃油压力传感器','429','千帕']
                }
            },
            ycgqjrq1:{
                title:'加热型氧传感器加热器1',
                neiRong:{
                    1:['加热型氧传感器1加热器指令','Out1Eng_x_Close_x_x',''],
                    2:['加热型氧传感器1加热器指令','0','%'],
                    3:['加热型氧传感器1加热器控制电路电压过低测试状态','Out1Eng_x_Determine_x_x',''],
                    4:['加热型氧传感器1加热器控制电路开路测试状态','Out1Eng_x_Determine_x_x','']
                }
            },
            ycgqjrq2:{
                title:'加热型氧传感器加热器2',
                neiRong:{
                    1:['加热型氧传感器2加热器指令','Out1Eng_x_Close_x_x',''],
                    2:['加热型氧传感器2加热器指令','0','%'],
                    3:['加热型氧传感器2加热器控制电路电压过低测试状态','Out1Eng_x_Determine_x_x',''],
                    4:['加热型氧传感器2加热器控制电路开路测试状态','Out1Eng_x_Determine_x_x','']
                }
            },
            fdjzs:{
                title:'发动机转速',
                neiRong:{
                    1:['发动机转速','Out1Eng_x_EngSpeed_x_x','分钟转速'],
                    2:['总质量空气流量','Out1Eng_x_MAFSensor_x_x','克/秒'],
                    3:['节气门位置传感器1','','伏'],
                    4:['节气门位置传感器2','','伏'],
                    5:['节气门位置传感器1位置','','%'],
                    6:['节气门位置传感器2位置','','%']
                }
            },
            jqmwz:{
                title:'节气门位置',
                neiRong:{
                    1:['节气门位置','In1OBD_ActTest_TPSPos_x_x','%'],
                    2:['所需的节气门位置','Out1Eng_x_EngSpeed_x_x','%'],
                    3:['节气门位置传感器1','','伏'],
                    4:['节气门位置传感器2','','伏'],
                    5:['节气门位置传感器1位置','','%'],
                    6:['节气门位置传感器2位置','','%']
                }
            }

        },
        obdscanCS:{
            yqdd:{
                title:'右侧前大灯近光',
                neiRong:{
                    1:['右侧前大灯近光指令','0','%']
                }
            },
            zqdd:{
                title:'左侧前大灯近光',
                neiRong:{
                    1:['左侧前大灯近光指令','0','%']
                }
            },
            lbjdq:{
                title:'喇叭继电器',
                neiRong:{
                    1:['喇叭继电器指令','Out1Eng_x_Inactive_x_x','']
                }
            },
            yuanguang:{
                title:'远光',
                neiRong:{
                    1:['远光指令','Out1Eng_x_Inactive_x_x','']
                }
            },
            chemensuo:{
                title:'所有车门锁定/解锁',
                neiRong:{
                    1:['所有车门锁止指令','Out1Eng_x_Inactive_x_x',''],
                    2:['驾驶员车门解锁指令','Out1Eng_x_Inactive_x_x',''],
                    3:['乘客车门解锁指令','Out1Eng_x_Inactive_x_x','']
                }
            },
            xlxg:{
                title:'行李箱盖解锁',
                neiRong:{
                    1:['后封闭微开启开关','Out1Eng_x_Inactive_x_x','']
                }
            }
        }

};

    obdscanService.Mint = {
        In1OBD_x_ClearCode_x_x: '0',//	清除故障码动作
        In1OBD_ActTest_Q22_x_x:'0',//Q22主动测试输入
        In1OBD_ActTest_Q12_x_x:'0'//Q12主动测试输入


    };
    obdscanService.Mout = {
        Out1Eng_x_FaultCode_P129D_x:'0',//P129D 燃油泵驱动器控制模块点火打开/起动开关电路电压过低
        Out1Eng_x_FaultCode_P1682_x:'0',//P1682 点火开关电路2
        Out1Eng_x_FaultCode_P0689_x:'0',//P0689 发动机控制点火继电器反馈电路电压过低
        Out1Eng_x_FaultCode_P0615_x:'0',//P0615 起动机继电器控制电路
        Out1Eng_x_FaultCode_P0616_x:'0',//P0616 起动机继电器控制电路电压过低
        Out1Eng_x_FaultCode_P135A_x:'0',//P135A 点火线圈电源电压电路 - 缸组1
        Out1Eng_x_FaultCode_P0597_x:'0',//P0597 发动机冷却液节温器加热器控制电路故障
        Out1Eng_x_FaultCode_P0598_x:'0',//P0598 发动机冷却液节温器加热器控制电路电压过低
        Out1Eng_x_FaultCode_P06DA_x:'0',//P06DA 发动机机油压力控制电磁阀控制电路
        Out1Eng_x_FaultCode_P06DB_x:'0',//P06DB 发动机机油压力控制电磁阀控制电路电压过低
        Out1Eng_x_FaultCode_P0443_x:'0',//P0443 蒸发排放吹洗电磁阀控制电路
        Out1Eng_x_FaultCode_P0458_x:'0',//P0458 蒸发排放（EVAP）清污电磁阀控制电路电压过低
        Out1Eng_x_FaultCode_P0030_x:'0',//P0030 加热型氧传感器加热器控制电路 - 传感器1
        Out1Eng_x_FaultCode_P0031_x:'0',//P0031 加热型氧传感器加热器控制电路电压过低 - 传感器1
        Out1Eng_x_FaultCode_P0036_x:'0',//P0036 加热型氧传感器加热器控制电路 - 传感器2
        Out1Eng_x_FaultCode_P0037_x:'0',//P0037 加热型氧传感器加热器控制电路电压过低 - 传感器2
        Out1Eng_x_FaultCode_P0135_x:'0',//P0135 加热型氧传感器加热器性能 - 传感器1
        Out1Eng_x_FaultCode_P0141_x:'0',//P0141 加热型氧传感器加热器性能 - 传感器2
        Out1Eng_x_FaultCode_P0660_x:'0',//P0660 进气歧管调节控制阀控制电路
        Out1Eng_x_FaultCode_P0661_x:'0',//P0661 进气歧管调节控制阀控制电路电压过低
        Out1Eng_x_FaultCode_P0351_x:'0',//P0351 点火线圈1控制电路
        Out1Eng_x_FaultCode_P0352_x:'0',//P0352 点火线圈2控制电路
        Out1Eng_x_FaultCode_P0353_x:'0',//P0353 点火线圈3控制电路
        Out1Eng_x_FaultCode_P0354_x:'0',//P0354 点火线圈4控制电路
        Out1Eng_x_FaultCode_P2311_x:'0',//P0300 检测到发动机缺火
        Out1Eng_x_FaultCode_P0192_x:'0',//P0192 燃油导轨压力传感器电路电压过低
        Out1Eng_x_FaultCode_P16A1_x:'0',//P16A1 传感器通信电路电压过高
        Out1Eng_x_FaultCode_P00F4_x:'0',//P00F4 进气湿度传感器电路电压过低
        Out1Eng_x_FaultCode_P0097_x:'0',//P0097 进气温度（IAT）传感器2电路电压过低
        Out1Eng_x_FaultCode_P0113_x:'0',//P0113 进气温度（IAT）传感器1电路电压过高
        Out1Eng_x_FaultCode_P2227_x:'0',//P2227 大气压力（BARO）传感器性能
        Out1Eng_x_FaultCode_P2229_x:'0',//P2229 大气压力（BARO）传感器电路高电压
        Out1Eng_x_FaultCode_P121A_x:'0',//P121A 质量空气流量（MAF）传感器电源电压控制电路
        Out1Eng_x_FaultCode_P121B_x:'0',//P121B 质量空气流量（MAF）传感器电源电压控制电路电压过低
        Out1Eng_x_FaultCode_P00C7_x:'0',//P00C7 进气压力测量系统 - 多个传感器不合理
        Out1Eng_x_FaultCode_P0102_x:'0',//P0102 质量空气流量（MAF）传感器电路频率过低
        Out1Eng_x_FaultCode_P0106_x:'0',//P0106 歧管绝对压力（MAP）传感器性能
        Out1Eng_x_FaultCode_P0108_x:'0',//P0108 歧管绝对压力（MAP）传感器电路电压过高
        Out1Eng_x_FaultCode_P0340_x:'0',//P0340 进气凸轮轴位置传感器电路
        Out1Eng_x_FaultCode_P0365_x:'0',//P0365 排气凸轮轴位置传感器电路
        Out1Eng_x_FaultCode_P0010_x:'0',//P0010 进气凸轮轴位置执行器电磁阀控制电路
        Out1Eng_x_FaultCode_P0013_x:'0',//P0013 排气凸轮轴位置执行器电磁阀控制电路
        Out1Eng_x_FaultCode_P2089_x:'0',//P2089 进气凸轮轴位置执行器电磁阀控制电路电压过高
        Out1Eng_x_FaultCode_P2091_x:'0',//P2091 排气凸轮轴位置执行器电磁阀控制电路电压过高
        Out1Eng_x_FaultCode_P0131_x:'0',//P0131 加热型氧传感器电路电压过低 - 传感器1
        Out1Eng_x_FaultCode_P0132_x:'0',//P0132 加热型氧传感器电路电压过高 - 传感器1
        Out1Eng_x_FaultCode_P0137_x:'0',//P0137 加热型氧传感器电路电压过低 - 传感器2
        Out1Eng_x_FaultCode_P018C_x:'0',//P018C 燃油压力传感器电路电压过低
        Out1Eng_x_FaultCode_P018D_x:'0',//P018D 燃油压力传感器电路电压过高
        Out1Eng_x_FaultCode_P0463_x:'0',//P0463 燃油油位传感器电路电压过高
        Out1Eng_x_FaultCode_P0533_x:'0',//P0533 空调（A/C）制冷剂压力传感器电路电压过高
        Out1Eng_x_FaultCode_P0558_x:'0',//P0558 制动助力器压力传感器电路电压过高
        Out1Eng_x_FaultCode_P171A_x:'0',//P171A 变速器油压力蓄能器电磁阀控制电路
        Out1Eng_x_FaultCode_P171B_x:'0',//P171B 变速器油压力蓄能器电磁阀控制电路电压过低
        Out1Eng_x_FaultCode_U01B0_x:'0',//U01B0 与蓄电池监测模块失去通信
        Out1Eng_x_FaultCode_P0089_x:'0',//P0089 燃油压力调节器性能
        Out1Eng_x_FaultCode_P228D_x:'0',//P228D 燃油压力调节器控制性能 - 压力过高
        Out1Eng_x_FaultCode_P0522_x:'0',//P0522 发动机机油压力传感器电路电压过低
        Out1Eng_x_FaultCode_P0090_x:'0',//P0090 燃油压力调节器控制电路
        Out1Eng_x_FaultCode_P00C8_x:'0',//P00C8 燃油压力调节器高电平控制电路
        Out1Eng_x_FaultCode_P0325_x:'0',//P0325 爆震传感器电路
        Out1Eng_x_FaultCode_P0118_x:'0',//P0118 发动机冷却液温度（ECT）传感器电路电压过高
        Out1Eng_x_FaultCode_P00B4_x:'0',//P00B4 散热器冷却液温度（RCT）传感器电路电压过高
        Out1Eng_x_FaultCode_U18A2_x:'0',//U18A2 与燃油泵驱动器控制模块失去通信
        Out1Eng_x_FaultCode_P0627_x:'0',//P0627 燃油泵启用电路
        Out1Eng_x_FaultCode_P0629_x:'0',//P0629 燃油泵启用电路电压过高
        Out1Eng_x_FaultCode_U0422_x:'0',//U0422 接收到来自车身控制模块的无效数据
        Out1Eng_x_FaultCode_C027706_x:'0',//C0277 06 制动踏板位置传感器电路电压过低/开路
        Out1Eng_x_FaultCode_P057C_x:'0',//P057C 制动踏板位置传感器电路电压过低
        Out1Eng_x_FaultCode_P2122_x:'0',//P2122 加速踏板位置（APP）传感器1电路电压过低
        Out1Eng_x_FaultCode_P2127_x:'0',//P2127 加速踏板位置（APP）传感器2电路电压过低
        Out1Eng_x_FaultCode_C0110_x:'0',//C0110 泵电机电路故障
        Out1Eng_x_FaultCode_P16A0_x:'0',//P16A0 传感器通信电路电压过低
        Out1Eng_x_FaultCode_P0073_x:'0',//P0073 环境空气温度传感器电路电压过高
        Out1Eng_x_FaultCode_P0203_x:'0',//P0203 气缸3喷射器控制电路
        Out1Eng_x_FaultCode_P062B_x:'0',//P062B 控制模块燃油喷射器控制性能

        /*5月*/
        Out1Veh_x_FaultCode_U1515_x:'0',//	U1515 K9车身控制模块与M75挡风玻璃刮水器电机 / M75L挡风玻璃左侧刮水器电机模块在LIN总线上失去通信
        Out1Veh_x_FaultCode_U1538_x:'0',//	U1538 K9车身控制模块与S79D驾驶员车窗开关在LIN总线上失去通信
        Out1Veh_x_FaultCode_U1534_x:'0',//	U1534 K9车身控制模块与M74D驾驶员车窗电机在LIN总线上失去通信
        Out1Veh_x_FaultCode_U153A_x:'0',//	U153A K9车身控制模块与S79P乘客车窗开关在LIN总线上失去通信
        Out1Veh_x_FaultCode_U151B_x:'0',//	U151B K9车身控制模块与K61天窗控制模块在LIN总线上失去通信      K40座椅位置记忆控制模块与S79P乘客车窗开关在LIN总线上失去通信
        Out1Veh_x_FaultCode_U152D_x:'0',//	U152D K9车身控制模块与P2变速器换档杆位置指示灯在LIN总线上失去通信
        Out1Veh_x_FaultCode_B257B03_x:'0',//	B257B 03 照明控制开关信号电压过低
        Out1Veh_x_FaultCode_B257B07_x:'0',//	B257B 07 照明控制开关信号电压过高
        Out1Veh_x_FaultCode_B260B01_x:'0',//	B260B 01  右侧日间行车灯继电器控制电路对蓄电池短路
        Out1Veh_x_FaultCode_B260B02_x:'0',//	B260B 02 左侧日间行车灯继电器控制电路对搭铁短路
        Out1Veh_x_FaultCode_B260B04_x:'0',//	B260B 04 左侧日间行车灯继电器控制电路开路
        Out1Veh_x_FaultCode_B260C01_x:'0',//	B260C 01  右侧日间行车灯继电器控制电路对蓄电池短路
        Out1Veh_x_FaultCode_B260C02_x:'0',//	B260C 02 右侧日间行车灯继电器控制电路对搭铁短路
        Out1Veh_x_FaultCode_B260C04_x:'0',//	B260C 04 右侧日间行车灯继电器控制电路开路
        Out1Veh_x_FaultCode_B259A01_x:'0',//	B259A 01 左侧转向照明灯继电器控制电路对蓄电池短路
        Out1Veh_x_FaultCode_B259A02_x:'0',//	B259A 02 左侧转向灯继电器控制电路对搭铁短路
        Out1Veh_x_FaultCode_B259A04_x:'0',//	B259A 04 左转向指示灯继电器控制电路开路
        Out1Veh_x_FaultCode_B259B01_x:'0',//	B259B 01 右侧转向照明灯继电器控制电路对蓄电池短路
        Out1Veh_x_FaultCode_B259B02_x:'0',//	B259B 02 右侧转向灯继电器控制电路对搭铁短路
        Out1Veh_x_FaultCode_B259B04_x:'0',//	B259B 04 右转向指示灯继电器控制电路开路
        Out1Veh_x_FaultCode_B258001_x:'0',//	B2580 01 远光控制电路对蓄电池短路
        Out1Veh_x_FaultCode_B258002_x:'0',//	B2580 02 远光控制电路对搭铁短路
        Out1Veh_x_FaultCode_B258004_x:'0',//	B2580 04 远光控制电路开路
        Out1Veh_x_FaultCode_B2750_x:'0',//	B2750 喇叭继电器辅助电路
        Out1Veh_x_FaultCode_B3978_x:'0',//	B3978 从充气式约束系统传感和诊断模块接收到错误的环境识别符
        Out1Veh_x_FaultCode_B3979_x:'0',//	B3979 从HVAC控制模块接收到错误的环境识别符
        Out1Veh_x_FaultCode_B3980_x:'0',//	B3980 从组合仪表接收到错误的环境识别符
        Out1Veh_x_FaultCode_B3981_x:'0',//	B3981 从电子制动控制模块接收到错误的环境识别符
        Out1Veh_x_FaultCode_B3982_x:'0',//	B3982 从远程通信接口控制模块接收到错误的环境识别符
        Out1Veh_x_FaultCode_B3101_x:'0',//	B3101 无钥匙进入数据链路电路
        Out1Veh_x_FaultCode_U0298_x:'0',//	U0298 00 在总线B上，与直流/直流转换器控制模块失去通讯
        Out1Veh_x_FaultCode_B300601_x:'0',//	B3006 01 发动机舱盖微启电路,对蓄电池短路
        Out1Veh_x_FaultCode_B300604_x:'0',//	B3006 04 发动机舱盖微启电路,开路
        Out1Veh_x_FaultCode_U0121_x:'0',//	U0121 与电子制动控制模块失去通信
        Out1Veh_x_FaultCode_U0131_x:'0',//	U0131 与动力转向控制模块失去通信
        Out1Veh_x_FaultCode_U0100_x:'0',//	U0100 与发动机控制模块失去通信
        Out1Veh_x_FaultCode_U0101_x:'0',//	U0101 与变速器控制模块失去通信
        Out1Veh_x_FaultCode_C0035_x:'0',//	C0035 左前轮转速传感器电路
        Out1Veh_x_FaultCode_C0036_x:'0',//	C0036 左前轮转速传感器范围性能
        Out1Veh_x_FaultCode_C003A_x:'0',//	C003A 前轮转速传感器电路
        Out1Veh_x_FaultCode_C0040_x:'0',//	C0040 右前轮转速传感器电路
        Out1Veh_x_FaultCode_C0041_x:'0',//	C0041 右前轮转速传感器范围性能
        Out1Veh_x_FaultCode_C0045_x:'0',//	C0045 左后轮转速传感器电路
        Out1Veh_x_FaultCode_C0046_x:'0',//	C0046 左后轮转速传感器范围性能
        Out1Veh_x_FaultCode_C0050_x:'0',//	C0050 右后轮转速传感器电路
        Out1Veh_x_FaultCode_C0051_x:'0',//	C0051 右后轮转速传感器范围性能
        Out1Veh_x_FaultCode_C0267_x:'0',//	C0267 00 指示制动液液位过低
        Out1Veh_x_FaultCode_C0126_x:'0',//	C0126 制动液液位传感器电路
        Out1Veh_x_FaultCode_C0110_x:'0',//	C0110 泵电机电路故障
        Out1Veh_x_FaultCode_U0422_x:'0',//	U0422 接收到来自车身控制模块的无效数据





    Out1Sen_Cyl_PressGauge_x_x:"0",//	缸压信号
        Out1Eng_x_AFRatio_x_x:"0",//	空气/燃油当量比指令
        Out1Eng_x_AmbAirTemp_x_x:"0",//	环境空气温度
        Out1Eng_x_APPNO1Volt_x_x:"0",//	加速踏板位置传感器1
        Out1Eng_x_APPNO1_x_x:"0",//	加速踏板位置传感器1位置
        Out1Eng_x_APPNO2Volt_x_x:"0",//	加速踏板位置传感器2
        Out1Eng_x_APPNO2_x_x:"0",//	加速踏板位置传感器2位置
        Out1Eng_x_AmbPre_x_x:"0",//	大气压力
        Out1Eng_x_BrakeVltSig_x_x:"0",//	制动踏板位置电路信号
        Out1Eng_x_BrakeSenSig_x_x:"0",//	制动踏板位置传感器信号
        Out1Eng_x_BrakeSwitch_x_x:"0",//	制动踏板开关
        Out1Eng_x_CtrlModuVltSig_x_x:"0",//	控制模块电压信号
        Out1Eng_x_StaterReqSig_x_x:"0",//	起动请求信号
        Out1Eng_x_CoolTempSensor_x_x:"0",//	发动机冷却液温度传感器
        Out1Eng_x_CtrlIgnReInd_x_x:"0",//	发动机控制点火继电器指令
        Out1Eng_x_CtrlIgnReFeSig_x_x:"0",//	发动机控制点火继电器反馈信号
        Out1Eng_x_EngLoad_x_x:"0",//	发动机负荷
        Out1Eng_x_EngOilPre_x_x:"0",//	发动机机油压力
        Out1Eng_x_EngSpeed_x_x:"1000",//	发动机转速
        Out1Eng_x_EvapEmiPSVInd_x_x:"0",//	蒸发排放吹洗电磁阀指令
        Out1Eng_x_FuelCtrlLoopSta1_x_x:"0",//	燃油控制回路状态
        Out1Eng_x_FuelPreSensor_x_x:"0",//	燃油压力传感器
        Out1Eng_x_FuelPumpEnaIns_x_x:"0",//	燃油泵启用指令
        Out1Eng_x_HeatTypOxSen1_x_x:"0",//	加热型氧传感器1
        Out1Eng_x_HeatTypOxSen2_x_x:"0",//	加热型氧传感器2
        Out1Eng_x_InAirTempSen_x_x:"0",//	进气温度传感器
        Out1Eng_x_InAirTempSen2Hz_x_x:"0",//	进气温度传感器2
        Out1Eng_x_InAirTempSen2_x_x:"0",//	进气温度传感器2
        Out1Eng_x_IgnitionSig1_x_x:"0",//	点火1信号
        Out1Eng_x_IgnAccessorySig_x_x:"0",//	点火附件信号
        Out1Eng_x_IgnTiming_x_x:"0",//	点火正时
        Out1Eng_x_FuelInjDutyRatio_x_x:"0",//	喷油器占空比
        Out1Eng_x_InAirHumiSensor1_x_x:"0",//	进气湿度传感器
        Out1Eng_x_LongFT_x_x:"0",//	长期燃油修正
        Out1Eng_x_MAFSensor_x_x:"0",//	质量空气流量传感器
        Out1Eng_x_MfAbsPreSensor_x_x:"0",//	歧管绝对压力传感器
        Out1Eng_x_ShortFT_x_x:"0",//	短期燃油修正
        Out1Eng_x_StarterRelay_x_x:"0",//	起动机继电器
        Out1Eng_x_SystemVolt_x_x:"0",//	系统电压
        Out1Eng_x_TPSSensor1Volt_x_x:"0",//	节气门位置传感器1
        Out1Eng_x_TPSSensor1Pos_x_x:"0",//	节气门位置传感器1位置
        Out1Eng_x_TPSSensor2Volt_x_x:"0",//	节气门位置传感器2
        Out1Eng_x_TPSSensor2Pos_x_x:"0",//	节气门位置传感器2位置
        Out1Eng_x_VehSensor_x_x:"0",//	车速传感器
        Out1Eng_x_TPS1_5VRefer_x:"0",//	5伏参考电压1
        Out1Eng_x_TPS1_5VReferStatus_x:"0",//	5伏参考电压1电路状态
        Out1Eng_x_TPS2_5VRefer_x:"0",//	5伏参考电压2
        Out1Eng_x_TPS2_5VReferStatus_x:"0",//	5伏参考电压2电路状态
        Out1Eng_x_TPS3_5VRefer_x:"0",//	5伏参考电压3
        Out1Eng_x_TPS3_5VReferStatus_x:"0",//	5伏参考电压3电路状态
        Out1Eng_x_TPS4_5VRefer_x:"0",//	5伏参考电压4
        Out1Eng_x_TPS4_5VReferStatus_x:"0",//	5伏参考电压4电路状态
        Out1Eng_x_APP_x_x:"0",//	加速踏板位置
        Out1Eng_x_APPNO1or2_x_x:"0",//	加速踏板位置传感器1和2
        Out1Eng_x_APPSen_x_x:"0",//	加速踏板位置传感器
        Out1Eng_x_BrakeSen_x_x:"0",//	制动踏板位置传感器
        Out1Eng_x_CalcMAF_x_x:"0",//	计算的空气流量
        Out1Eng_x_CtrlIgnVlt2High_x_x:"0",//	发动机控制点火继电器控制电路电压过高测试状态
        Out1Eng_x_CtrlIgnVlt2Low_x_x:"0",//	发动机控制点火继电器控制电路电压过低测试状态
        Out1Eng_x_CtrlIgnOpenTest_x_x:"0",//	发动机控制点火继电器控制电路开路测试状态
        Out1Eng_x_CtrlIgnFed_x_x:"0",//	发动机控制点火继电器反馈信号
        Out1Eng_x_TPSMotorInd_x_x:"0",//	节气门执行器控制电机指令
        Out1Eng_x_TPSPos_x_x:"0",//	节气门位置
        Out1Eng_x_TPS1or2_x_x:"0",//	节气门位置传感器1和2
        Out1Eng_x_Cyl1MisfireCout_x_x:"0",//	气缸1当前缺火计数器
        Out1Eng_x_Cyl1InjCtrlSta_x_x:"0",//	气缸1喷油器控制电路状态
        Out1Eng_x_Cyl1InjStop_x_x:"0",//	气缸1喷油器停用 - 检测到缺火
        Out1Eng_x_Cyl2MisfireCout_x_x:"0",//	气缸2当前缺火计数器
        Out1Eng_x_Cyl2InjCtrlSta_x_x:"0",//	气缸2喷油器控制电路状态
        Out1Eng_x_Cyl2InjStop_x_x:"0",//	气缸2喷油器停用 - 检测到缺火
        Out1Eng_x_Cyl3MisfireCout_x_x:"0",//	气缸3当前缺火计数器
        Out1Eng_x_Cyl3InjCtrlSta_x_x:"0",//	气缸3喷油器控制电路状态
        Out1Eng_x_Cyl3InjStop_x_x:"0",//	气缸3喷油器停用 - 检测到缺火
        Out1Eng_x_Cyl4MisfireCout_x_x:"0",//	气缸4当前缺火计数器
        Out1Eng_x_Cyl4InjCtrlSta_x_x:"0",//	气缸4喷油器控制电路状态
        Out1Eng_x_Cyl4InjStop_x_x:"0",//	气缸4喷油器停用 - 检测到缺火
        Out1Eng_x_Coil1VltTooHi_x_x:"0",//	点火线圈1控制电路电压过高测试状态
        Out1Eng_x_Coil1VltTooLo_x_x:"0",//	点火线圈1控制电路电压过低测试状态
        Out1Eng_x_Coil1VltOpen_x_x:"0",//	点火线圈1控制电路开路测试状态
        Out1Eng_x_Coil2VltTooHi_x_x:"0",//	点火线圈2控制电路电压过高测试状态
        Out1Eng_x_Coil2VltTooLo_x_x:"0",//	点火线圈2控制电路电压过低测试状态
        Out1Eng_x_Coil2VltOpen_x_x:"0",//	点火线圈2控制电路开路测试状态
        Out1Eng_x_Coil3VltTooHi_x_x:"0",//	点火线圈3控制电路电压过高测试状态
        Out1Eng_x_Coil3VltTooLo_x_x:"0",//	点火线圈3控制电路电压过低测试状态
        Out1Eng_x_Coil3VltOpen_x_x:"0",//	点火线圈3控制电路开路测试状态
        Out1Eng_x_Coil4VltTooHi_x_x:"0",//	点火线圈4控制电路电压过高测试状态
        Out1Eng_x_Coil4VltTooLo_x_x:"0",//	点火线圈4控制电路电压过低测试状态
        Out1Eng_x_Coil4VltOpen_x_x:"0",//	点火线圈4控制电路开路测试状态
        Out1Eng_x_CrankOutVltHi_x_x:"0",//	曲轴位置信号输出电路电压过高测试状态
        Out1Eng_x_CrankOutVltLo_x_x:"0",//	曲轴位置信号输出电路电压过低测试状态
        Out1Eng_x_CrankOutVltOpen_x_x:"0",//	曲轴位置信号输出电路开路测试状态
        Out1Eng_x_OilPreSen_x_x:"0",//	发动机机油压力传感器
        Out1Eng_x_AmbPreSen_x_x:"0",//	大气压力传感器
        Out1Eng_x_InManiPress_x_x:"0",//	进气歧管压力
        Out1Eng_x_CtrlValVltInd_x_x:"0",//	进气歧管调谐控制阀控制电路指令
        Out1Eng_x_CtrlValVltHi_x_x:"0",//	进气歧管调谐控制阀控制电路电压过高测试状态
        Out1Eng_x_CtrlValVltLo_x_x:"0",//	进气歧管调谐控制阀控制电路电压过低测试状态
        Out1Eng_x_CtrlValVltOpen_x_x:"0",//	进气歧管调谐控制阀控制电路开路测试状态
        Out1Eng_x_CtrlValFeed_x_x:"0",//	进气歧管调谐控制阀反馈信号
        Out1Eng_x_MAFSupVltInd_x_x:"0",//	质量空气流量传感器供电电压指令
        Out1Eng_x_MAFSupVltHi_x_x:"0",//	质量空气流量传感器供电电压控制电路电压过高测试状态
        Out1Eng_x_MAFSupVltLo_x_x:"0",//	质量空气流量传感器供电电压控制电路电压过低测试状态
        Out1Eng_x_MAFSupVltOpen_x_x:"0",//	质量空气流量传感器供电电压控制电路开路测试状态
        Out1Eng_x_MfAbsPreSensorVlt_x_x:"0",//	歧管绝对压力传感器
        Out1Eng_x_TPSPosPerf_x_x:"0",//	节气门位置性能测试
        Out1Eng_x_CrankActCount_x_x:"0",//	曲轴位置激活计数器
        Out1Eng_x_CrankPosSen_x_x:"0",//	曲轴位置传感器
        Out1Eng_x_ExCAMActCount_x_x:"0",//	排气凸轮轴位置活动计数器
        Out1Eng_x_CoilSupVlt_x_x:"0",//	点火线圈供电电压
        Out1Eng_x_InCAMActCount_x_x:"0",//	进气凸轮轴位置活动计数器
        Out1Eng_x_Oxgen1Heat_x_x:"0",//	加热型氧传感器1加热器
        Out1Eng_x_Oxgen1HeatInd_x_x:"0",//	加热型氧传感器1加热器指令
        Out1Eng_x_Oxgen1HeatIndPer_x_x:"0",//	加热型氧传感器1加热器指令
        Out1Eng_x_Oxgen1HeatVltHi_x_x:"0",//	加热型氧传感器1加热器控制电路电压过高测试状态
        Out1Eng_x_Oxgen1HeatVltLo_x_x:"0",//	加热型氧传感器1加热器控制电路电压过低测试状态
        Out1Eng_x_Oxgen1HeatVltOpen_x_x:"0",//	加热型氧传感器1加热器控制电路开路测试状态
        Out1Eng_x_Oxgen2Heat_x_x:"0",//	加热型氧传感器2加热器
        Out1Eng_x_Oxgen2HeatInd_x_x:"0",//	加热型氧传感器2加热器指令
        Out1Eng_x_Oxgen2HeatIndPer_x_x:"0",//	加热型氧传感器2加热器指令
        Out1Eng_x_Oxgen2HeatVltHi_x_x:"0",//	加热型氧传感器2加热器控制电路电压过高测试状态
        Out1Eng_x_Oxgen2HeatVltLo_x_x:"0",//	加热型氧传感器2加热器控制电路电压过低测试状态
        Out1Eng_x_Oxgen2HeatVltOpen_x_x:"0",//	加热型氧传感器2加热器控制电路开路测试状态
        Out1Eng_x_NeedFulePre_x_x:"0",//	所需的燃油压力
        Out1Eng_x_NeedFuleRailPre_x_x:"0",//	所需的燃油导轨压力
        Out1Eng_x_FDriveSupVlt_x_x:"0",//	燃油喷射器驱动器供电电压
        Out1Eng_x_FPreRegVltInd_x_x:"0",//	燃油压力调节器控制电路指令
        Out1Eng_x_FPreRegVltHi_x_x:"0",//	燃油压力调节器控制电路电压过高测试状态
        Out1Eng_x_FPreRegVltLo_x_x:"0",//	燃油压力调节器控制电路电压过低测试状态
        Out1Eng_x_FPreRegVltOpen_x_x:"0",//	燃油压力调节器控制电路开路测试状态
        Out1Eng_x_HFPreRegVltInd_x_x:"0",//	燃油压力调节器高电平控制电路指令
        Out1Eng_x_HFPreRegVltHi_x_x:"0",//	燃油压力调节器高电平控制电路电压过高测试状态
        Out1Eng_x_HFPreRegVltLo_x_x:"0",//	燃油压力调节器高电平控制电路电压过低测试状态
        Out1Eng_x_HFPreRegVltOpen_x_x:"0",//	燃油压力调节器高电平控制电路开路测试状态
        Out1Eng_x_FuelPreSensorVlt_x_x:"0",//	燃油压力传感器
        Out1Eng_x_FPumpStCiVltHi_x_x:"0",//	燃油泵启用电路电压过高测试状态
        Out1Eng_x_FPumpStCiVltLo_x_x:"0",//	燃油泵启用电路电压过低测试状态
        Out1Eng_x_FPumpStCiVltOpen_x_x:"0",//	燃油泵启用电路开路测试状态
        Out1Eng_x_FRailPreRegInd_x_x:"0",//	燃油导轨压力调节器指令
        Out1Eng_x_FRailPreSensor_x_x:"0", //	燃油导轨压力传感器
        Out1Eng_x_EvapEmiPVSVltHi_x_x:"0",//	蒸发排放吹洗电磁阀控制电路电压过高测试状态
        Out1Eng_x_EvapEmiPVSVltLo_x_x:"0",//	蒸发排放吹洗电磁阀控制电路电压过低测试状态
        Out1Eng_x_EvapEmiPVSVltOpen_x_x:"0",//	蒸发排放吹洗电磁阀控制电路开路测试状态
        Out1Eng_x_StReVltHi_x_x:"0",//	起动机继电器控制电路电压过高测试状态
        Out1Eng_x_StReVltLo_x_x:"0",//	起动机继电器控制电路电压过低测试状态
        Out1Eng_x_StReVltOpen_x_x:"0",//	起动机继电器控制电路开路测试状态
        Out1Eng_x_ThermalHeatInd_x_x:"0",//	发动机冷却液节温器加热器指令
        Out1Eng_x_TherHeatVltHi_x_x:"0",//	发动机冷却液节温器加热器控制电路电压过高测试状态
        Out1Eng_x_TherHeatVltLo_x_x:"0",//	发动机冷却液节温器加热器控制电路电压过低测试状态
        Out1Eng_x_TherHeatVltOpen_x_x:"0",//	发动机冷却液节温器加热器控制电路开路测试状态
        Out1Eng_x_RadiatorTemp_x_x:"0",//	散热器冷却液温度传感器
        Out1Eng_x_ExCAMCount_x_x:"0",//	排气凸轮轴位置活动计数器
        Out1Eng_x_ExCAMVltHi_x_x:"0",//	排气凸轮轴位置执行器电磁阀控制电路电压过高测试状态
        Out1Eng_x_ExCAMVltLo_x_x:"0",//	排气凸轮轴位置执行器电磁阀控制电路电压过低测试状态
        Out1Eng_x_ExCAMVltOpen_x_x:"0",//	排气凸轮轴位置执行器电磁阀控制电路开路测试状态
        Out1Eng_x_ExCAMPosInd_x_x:"0",//	排气凸轮轴位置指令
        Out1Eng_x_ExCAMPosChange_x_x:"0",//	排气凸轮轴位置变化
        Out1Eng_x_InCAMCount_x_x:"0",//	进气凸轮轴位置活动计数器
        Out1Eng_x_InCAMVltHi_x_x:"0",//	进气凸轮轴位置执行器电磁阀控制电路电压过高测试状态
        Out1Eng_x_InCAMVltHiCyl1_x_x:"0",//	进气凸轮轴位置执行器电磁阀控制电路电压过高测试状态，缸列1
        Out1Eng_x_InCAMVltLo_x_x:"0",//	进气凸轮轴位置执行器电磁阀控制电路电压过低测试状态
        Out1Eng_x_InCAMVltLoCyl1_x_x:"0",//	进气凸轮轴位置执行器电磁阀控制电路电压过低测试状态，缸列1
        Out1Eng_x_InCAMVltOpen_x_x:"0",//	进气凸轮轴位置执行器电磁阀控制电路开路测试状态
        Out1Eng_x_InCAMVltOpenCyl1_x_x:"0",//	进气凸轮轴位置执行器电磁阀控制电路开路测试状态，缸列1
        Out1Eng_x_InCAMPosInd_x_x:"0",//	进气凸轮轴位置指令
        Out1Eng_x_InCAMPosChange_x_x:"0",//	进气凸轮轴位置偏差


        /*5月*/

        Out1Veh_x_LRWCtrlFallSwt_x_x:"0", //	左后窗主控制下降开关
        Out1Veh_x_LRWCtrlFastSwt_x_x:"0", //	左后窗主控制快速开关
        Out1Veh_x_LRWCtrlRiseSwt_x_x:"0", //	左后窗主控制上升开关
        Out1Veh_x_LRWRiseSwt_x_x:"0", //	左后窗上升开关（位于车门）
        Out1Veh_x_PassWindowRead_x_x:"0", //	乘客车窗读入
    Out1Veh_x_PWMotorRevState_x_x:"0", //	乘客车窗电机倒转状态
    Out1Veh_x_PWMIndSysFauSta_x_x:"0", //	乘客车窗电机感应系统故障状态
    Out1Veh_x_PWMHeatSafeSta_x_x:"0", //	乘客车窗电机热保护状态
    Out1Veh_x_PWMUndvoltSta_x_x:"0", //	乘客车窗电机欠压状态
    Out1Veh_x_PassDrWindowSwt_x_x:"0", //	乘客车门上的车窗开关
    Out1Veh_x_RRWCtrlFallSwt_x_x:"0", //	右后窗主控制下降开关
    Out1Veh_x_RRWCtrlFastSwt_x_x:"0", //	右后窗主控制快速开关
    Out1Veh_x_RRWCtrlRiseSwt_x_x:"0", //	右后窗主控制上升开关
    Out1Veh_x_RRDrWindowSwt_x_x:"0", //	右后车门上的车窗开关
    Out1Veh_x_WindowLockSwt_x_x:"0", //	车窗锁止开关
    Out1Veh_x_SafeLockSwt_x_x:"0", //	儿童安全锁/车窗锁止开关
    Out1Veh_x_DriverWindowRead_x_x:"0", //	驾驶员车窗已读入
    Out1Veh_x_DWinCrtlFallSwt_x_x:"0", //	驾驶员车窗主控制下降开关
    Out1Veh_x_DWinCrtlFastSwt_x_x:"0", //	驾驶员车窗主控制快速开关
    Out1Veh_x_DWinCrtlRiseSwt_x_x:"0", //	驾驶员车窗主控制上升开关
    Out1Veh_x_DWinMotorRevSta_x_x:"0", //	驾驶员车窗电机倒转状态
    Out1Veh_x_DWMIndFauSta_x_x:"0", //	驾驶员车窗电机感应系统故障状态
    Out1Veh_x_DWMHeatSafeSta_x_x:"0", //	驾驶员车窗电机热保护状态
    Out1Veh_x_DWMUndvoltSta_x_x:"0", //	驾驶员车窗电机欠压状态
    Out1Veh_x_FPWCrtlFallSwt_x_x:"0", //	前部乘客车窗主控制下降开关
    Out1Veh_x_FPWCrtlFastSwt_x_x:"0", //	前部乘客车窗主控制快速开关
    Out1Veh_x_FPWCrtlRiseSwt_x_x:"0", //	前部乘客车窗主控制上升开关
    Out1Veh_x_ParkingBrakeSta_x_x:"0", //	驻车制动状态
    Out1Veh_x_SafeIndLed_x_x:"0", //	安全指示灯指令
    Out1Veh_x_UltrIntrSen_x_x:"0", //	超声波侵入传感器
    Out1Veh_x_ValetSwitch_x_x:"0", //	代客泊车开关
    Out1Veh_x_ReConBatDete_x_x:"0", //	检测到重新连接蓄电池
    Out1Veh_x_BrPedalStepped_x_x:"0", //	制动踏板已踩下
    Out1Veh_x_BrGeInlockSoAcIn_x_x:"0", //	制动变速器换档互锁电磁线圈执行器指令
    Out1Veh_x_SteeringLockSet_x_x:"0", //	转向集锁定状态
    Out1Veh_x_AnTheftSysAlert_x_x:"0", //	车内物品防盗系统警报状态
    Out1Veh_x_LiftAntiTheftSys_x_x:"0", //	车内物品防盗系统解除直到车辆关闭
    Out1Veh_x_AnTheftSysEnHis1_x_x:"0", //	车内物品防盗系统触发器历史1
    Out1Veh_x_AnTheftSysEnHis2_x_x:"0", //	车内物品防盗系统触发器历史2
    Out1Veh_x_AnTheftSysEnHis3_x_x:"0", //	车内物品防盗系统触发器历史3
    Out1Veh_x_AnTheftSysEn_x_x:"0", //	当前车内物品防盗系统触发
    Out1Veh_x_BrokenGlass_x_x:"0", //	玻璃破裂
    Out1Veh_x_EngHatchPosition_x_x:"0", //	发动机舱盖位置
    Out1Veh_x_HornRelayInd_x_x:"0", //	喇叭继电器指令
    Out1Veh_x_HornSwitch_x_x:"0", //	喇叭开关
    Out1Veh_x_LRSafeLockSwt_x_x:"0", //	左后儿童安全锁开关
    Out1Veh_x_LRDoorMicroSwt_x_x:"0", //	左后车门微启开关
    Out1Veh_x_PDoorMicroSwt_x_x:"0", //	乘客车门微启开关
    Out1Veh_x_PDoorLockSwt_x_x:"0", //	乘客车门锁定开关
    Out1Veh_x_PDoorUnLockInd_x_x:"0", //	乘客车门解锁指令
    Out1Veh_x_RCloseMicroSwt_x_x:"0", //	后封闭微启开关
    Out1Veh_x_RRChildSafeLock_x_x:"0", //	右后儿童安全锁开关
    Out1Veh_x_RRDoorMicroSwt_x_x:"0", //	右后车门微启开关
    Out1Veh_x_TrLidUnLockSwt_x_x:"0", //	行李箱盖/举升门车窗外部解锁开关
    Out1Veh_x_TrLidUnLockInd_x_x:"0", //	行李箱盖/举升门车窗解锁指令
    Out1Veh_x_AllDorLockInd_x_x:"0", //	所有车门锁止指令
    Out1Veh_x_ChSafeLockInd_x_x:"0", //	儿童安全锁指示灯指令
    Out1Veh_x_ChSaLoMotorInd_x_x:"0", //	儿童安全锁电机指令
    Out1Veh_x_DDoorMicroSwt_x_x:"0", //	驾驶员车门微启开关
    Out1Veh_x_DDoorUnLockSwt_x_x:"0", //	驾驶员车门钥匙解锁开关
    Out1Veh_x_DDoorLockSwt_x_x:"0", //	驾驶员车门锁开关
    Out1Veh_x_DDoorUnLockInd_x_x:"0", //	驾驶员车门解锁指令
    Out1Veh_x_InTrLidUnLockSwt_x_x:"0", //	内部行李箱盖/举升门车窗解锁开关
    Out1Veh_x_LastDoorLock_x_x:"0", //	最近一次车门锁止功能
    Out1Veh_x_BrBoEleVacPumpk_x_x:"0", //	制动助力器电动真空泵
    Out1Veh_x_BrBoEleVacSenVlt_x_x:"0", //	制动助力器真空传感器电源
    Out1Veh_x_BrFlLevelSensor_x_x:"0", //	制动液液位传感器
    Out1Veh_x_VehStabiSysState_x_x:"0", //	车辆稳定性系统状态
    Out1Veh_x_BrPedalSensor_x_x:"0", //	制动踏板位置传感器
    Out1Veh_x_TractionCtrlSys_x_x:"0", //	牵引力控制系统状态
    Out1Veh_x_ABSPumpMotorVlt_x_x:"0", //	ABS泵电机电压
    Out1Veh_x_BrPressSensor_x_x:"0", //	制动压力传感器
    Out1Veh_x_BrPressSensor80_x_x:"0", //	制动压力达到80巴
    Out1Veh_x_B5LRSpeedSensor_x_x:"0", //	左后车轮转速传感器
    Out1Veh_x_B5RRSpeedSensor_x_x:"0", //	右后车轮转速传感器
    Out1Veh_x_B5RFSpeedSensor_x_x:"0", //	右前车轮转速传感器
    Out1Veh_x_B5LFSpeedSensor_x_x:"0", //	左前车轮转速传感器
    Out1Veh_x_BrBoEleSenor_x_x:"0", //	制动助力器真空传感器
    Out1Veh_x_VehStabilitySys_x_x:"0", //	车辆稳定性系统
    Out1Veh_x_EmeBrPowerState_x_x:"0", //	紧急制动助力状态
    Out1Veh_x_TirePreMonSys_x_x:"0", //	胎压监测系统状态
    Out1Veh_x_EngTraCtrlState_x_x:"0", //	发动机牵拉控制状态
    Out1Veh_x_DynBrProState_x_x:"0", //	动态后制动比例状态
    Out1Veh_x_TraCtrlSys_x_x:"0", //	牵引力控制系统
    Out1Veh_x_AntiLockBraSys_x_x:"0", //	防抱死制动系统
    Out1Veh_x_SteeringWheAng_x_x:"0", //	方向盘转角
    Out1Veh_x_TransferTorque_x_x:"0", //	传送扭矩
    Out1Veh_x_RequestTorque_x_x:"0", //	请求的转矩
    Out1Veh_x_SystemVolt_x_x:"0", //	系统电压
    Out1Veh_x_PuMoRelayFeed_x_x:"0", //	泵电机继电器反馈
    Out1Veh_x_IsoElcValFeed_x_x:"0", //	主隔离电磁阀反馈
    Out1Veh_x_FiElecValFeed_x_x:"0", //	原始加注电磁阀反馈
    Out1Veh_x_AuIsoElecValFeed_x_x:"0", //	辅助隔离电磁阀反馈
    Out1Veh_x_VeStSysReFeed_x_x:"0", //	车辆稳定性系统继电器反馈
    Out1Veh_x_AuFiElecValFeed_x_x:"0", //	辅助加注电磁阀反馈
    Out1Veh_x_RRInEleValFeed_x_x:"0", //	右后进气电磁阀反馈
    Out1Veh_x_RFExEleValFeed_x_x:"0", //	右前排气电磁阀反馈
    Out1Veh_x_RFInEleValFeed_x_x:"0", //	右前进气电磁阀反馈
    Out1Veh_x_LRInEleValFeed_x_x:"0", //	左后进气电磁阀反馈
    Out1Veh_x_LFExEleValFeed_x_x:"0", //	左前排气电磁阀反馈
    Out1Veh_x_LRExEleValFeed_x_x:"0", //	左后排气电磁阀反馈
    Out1Veh_x_RRExEleValFeed_x_x:"0", //	右后排气电磁阀反馈
    Out1Veh_x_LFInEleValFeed_x_x:"0", //	左前进气电磁阀反馈
    Out1Veh_x_LRTurnSigLed_x_x:"0", //	左后转向信号灯/制动灯指令
    Out1Veh_x_LeftTurnSigSwt_x_x:"0", //	左转向信号开关
    Out1Veh_x_LicPlaLampInd_x_x:"0", //	牌照灯指令
    Out1Veh_x_ParkingLampSwt_x_x:"0", //	驻车灯开关
    Out1Veh_x_RFTurnSigLed_x_x:"0", //	右前转向信号灯/危险指示灯指令
    Out1Veh_x_RRTurnSigLed_x_x:"0", //	右后转向信号灯/制动灯指令
    Out1Veh_x_RightTurnSigSwt_x_x:"0", //	右转向信号开关
    Out1Veh_x_AutoHeadStopSwt_x_x:"0", //	自动前大灯停用开关
    Out1Veh_x_ReverRelayInd_x_x:"0", //	倒车灯继电器指令
    Out1Veh_x_CenBrakeLampInd_x_x:"0", //	中央制动灯指令
    Out1Veh_x_FFogLampRelayInd_x_x:"0", //	前雾灯继电器指令
    Out1Veh_x_FFogLampSwt_x_x:"0", //	前雾灯开关
    Out1Veh_x_RiskIndLampSwt_x_x:"0", //	危险指示灯开关
    Out1Veh_x_HeadFlashSwt_x_x:"0", //	前大灯闪光开关
    Out1Veh_x_HeadlightSwt_x_x:"0", //	前大灯开启开关
    Out1Veh_x_DisLightInd_x_x:"0", //	远光指令
    Out1Veh_x_DisLightSeleSwt_x_x:"0", //	远光选择开关
    Out1Veh_x_LFTurnSigLed_x_x:"0", //	左前转向信号灯/危险指示灯指令
    Out1Veh_x_LFHeadLowbeamInd_x_x:"0", //	左侧前大灯近光指令
    Out1Veh_x_LFLowbeam_x_x:"0", //	左侧近光/日间行车灯指令
    Out1Veh_x_LRParkingLampInd_x_x:"0", //	左后驻车灯指令
    Out1Veh_x_ParkingLampReInd_x_x:"0", //	驻车灯继电器指令
    Out1Veh_x_RFHeadLowbeamInd_x_x:"0", //	右侧前大灯近光指令
    Out1Veh_x_RightLowbeam_x_x:"0", //	右侧近光/日间行车灯指令
    Out1Veh_x_RParkingInd_x_x:"0", //	右驻车灯指令
    Out1Veh_x_RRParkingInd1_x_x:"0", //	右后驻车灯指令
    Out1Veh_x_RRParkingInd2_x_x:"0", //	右后驻车灯指令
    Out1Veh_x_RainSensor_x_x:"0", //	雨量传感器
    Out1Veh_x_WindWashReInd_x_x:"0", //	挡风玻璃洗涤器继电器指令
    Out1Veh_x_WindWashSwt_x_x:"0", //	挡风玻璃洗涤器开关
    Out1Veh_x_WWHiSpeedReInd_x_x:"0", //	挡风玻璃刮水器高速继电器指令
    Out1Veh_x_WWHiSpeedSwt_x_x:"0", //	挡风玻璃刮水器高速开关
    Out1Veh_x_WWMotorReInd_x_x:"0", //	挡风玻璃刮水器电机继电器指令
    Out1Veh_x_WWParkingSwt_x_x:"0", //	挡风玻璃刮水器驻车开关
    Out1Veh_x_WWwipingStop_x_x:"0", //	挡风玻璃刮水器在刮扫过程中停止
    Out1Veh_x_WWStopParking_x_x:"0", //	挡风玻璃刮水器停在驻车位置
    Out1Veh_x_WindWiperSwt_x_x:"0", //	挡风玻璃刮水器开关
    Out1Veh_x_HeadWashReInd_x_x:"0", //	前大灯洗涤器继电器指令
    Out1Veh_x_TractionCtrlSwt_x_x:"0", //	牵引力控制开关
    Out1Veh_x_AuTrMaShiftSwt_x_x:"0", //	自动变速器手动换挡开关
    Out1Veh_x_BrPedTr2IniPos_x_x:"0", //	已达到制动踏板最初行程位置
    Out1Veh_x_BrPedSenHiVlt_x_x:"0", //	读入过程中，制动踏板位置传感器电压过高
    Out1Veh_x_BrPedSenRead_x_x:"0", //	制动踏板位置传感器读入
    Out1Veh_x_BrPedSenReadRel_x_x:"0", //	制动踏板位置传感器读入的释放位置
    Out1Veh_x_BrPedSenReadRel1_x_x:"0", //	制动踏板位置传感器读入的释放位置
    Out1Veh_x_BrPedSenReadRel2_x_x:"0", //	制动踏板位置传感器读入的释放位置
    Out1Veh_x_BrPedSenLoVlt_x_x:"0", //	读入过程中，制动踏板位置传感器电压过低
    Out1Veh_x_BrPedSenMove_x_x:"0", //	读入过程中，制动踏板位置传感器移动
    Out1Veh_x_BrPedRefVlt_x_x:"0", //	制动踏板位置传感器参考电压
    Out1Veh_x_BrPedRelease_x_x:"0", //	制动踏板从释放位置踩下
    Out1Veh_x_CalBrPedPosPer_x_x:"0", //	计算的制动踏板位置
    Out1Veh_x_CalBrPedPosVlt_x_x:"0"//	计算的制动踏板位置



};
    return obdscanService;

});
