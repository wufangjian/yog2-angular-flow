/*
 * @des: 静态数据，用于匹配数据 [key value] 
 *       服务器端接口可能只返回编码，没有对应的描述，需要在node端做数据适配
 */

export var constantData = {
	// 渠道状态
	statusList: [
		{'status': '0', 'des': '全部'},
		{'status': '1', 'des': '启用中'},
		{'status': '2', 'des': '已停用'},
		{'status': '3', 'des': '保证金用完'}
	],

	// 渠道类型 mock
	channelTypeList: [
		{'ctype': '1', 'des': '内部渠道'},
		{'ctype': '2', 'des': '外部渠道'},
	],

	// 采购方式
	purchaseModeList: [
		{'purchase_mode': '1', 'des': 'RTB'},
		{'purchase_mode': '2', 'des': 'CPM'},
	]
};