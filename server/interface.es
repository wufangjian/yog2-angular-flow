/**
 * @file RD接口信息列表
 * @author wufangjian@baidu.com
 */

'use strict';

export var INTERFACE = {
    _listChannel: '/service/beco?method=listChannel&format=json&ie=utf-8',
    _addChannel: '/service/beco?method=addChannel&format=json&ie=utf-8',
    _changeChannelStatus: '/service/beco?method=batchChangeChannelStatus&format=json&ie=utf-8',
    _getChannelInfo: '/service/beco?method=getChannelBasicInfo&cid=1001&format=json&ie=utf-8',
    _getPlaceChannelInfo: '/service/beco?method=getChannelInfo&format=json&ie=utf-8',
    _getPlaceInfo: '/service/beco?method=getPlaceInfoByParams&format=json&ie=utf-8',
    _checkChannelName: '/service/beco?method=isNameDuplicated&format=json&ie=utf-8',
    _updateChannel: '/service/beco?method=updateChannel&format=json&ie=utf-8',
    _getTiebaDir: '/service/beco?method=getContentByProductId&format=json&ie=uft-8',
    _updatePlaceChannel: '/service/beco?method=saveChannelPlaceInfo&format=json&ie=utf-8',
    _checkChannelPurchaseMode: '/service/beco?method=canRtbToCpm&cid=1004&format=json&ie=utf8'
};