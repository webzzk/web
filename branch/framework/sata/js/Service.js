/**
 * @author 谢国亮
 */
sataModule.service('sataService', function (pageService) {
    var sataService = sataService || {};
    sataService.Odata = sataService.Odata || {};
    sataService.Oint = sataService.Oint || {};
    sataService.Oout = sataService.Oout || {};
    sataService.Odata = {
        menuStatus: false,//菜单的显示状态
        sata:false,//工具显示状态
        sata_hot:false,//工具是否在热区上
        sataType:"Etype",//世达工具类型
        sataSize:""//世达工具型号

    };

    sataService.Odata.smokehide0=function(){
        sataService.Odata.smokeStatus = false;
    };

    return sataService;

});
