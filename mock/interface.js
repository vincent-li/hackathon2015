/**************************************************\
                用户页接口
\**************************************************/

//Signup.json?phone=123&psw=123&msgCode=123
//后台逻辑：验证msgCode.查询user表，判断phone是否存在,存在则把loginInfo与user对象关联
{
	data:{
		userId: "123",
		name:   "张三",
		phone:  "13911111111",
		avatar: "",
		subscribedList : [
			{
				orgId: "0001",
				name: "七彩人生",
				logo: "",
				tags: ["心灵","修行"],
				address: ""
			},
			{
				orgId: "0002",
				name: "希蕊东方舞",
				logo: "",
				tags: ["舞蹈","肚皮舞"],
				address: ""
			}
		]
	},
	success: true,
	errorCode: "" ,
	errorMsg:  "" ,
}



//Login.json?phone=123&psw=123
{
	data:{
		userId: "123",
		name:   "张三"，
		phone:  "13911111111",
		avatar: "http://img.xxx.com/asset/img.jpg",
		subscribedList : [
			{
				orgId: "0001",
				name: "七彩人生",
				logo: "",
				tags: ["心灵","修行"],
				address: ""
			},
			{
				orgId: "0002",
				name: "希蕊东方舞",
				logo: "",
				tags: ["舞蹈","肚皮舞"],
				address: ""
			}
		]
	},
	success: true,
	errorCode: "" ,
	errorMsg:  "" ,
}
//updateUserInfo.json?userId=123&name=张三&location=杭州&career=设计师
{
	data:{
		userId: "123",
		name:   "张三",
		avatar: "img.jpg",
		gender: "male",
		birthday: "1988-08-13",
		desc: "简介",
		career: "设计师",
		address:"杭州"
	},
	success: true,
	errorCode: "" ,
	errorMsg:  "" ,
}
//changePsw.json?userId=123&psw=123&msgCode=123
	data : {
		success : true
	},
	success: true,
	errorCode: "" ,
	errorMsg:  "" ,
}



//updateImage.json  上传图片
{
	data : {
		imgUrl :""
	},
	success: true,
	errorCode: "" ,
	errorMsg:  "" ,
}



//getOrgDetail.json?orgId=123
//获取企业及门店信息
{
	data:{
		orgId: "123",
		name:   "希蕊东方舞"，
		logo: "http://img.xxx.com/asset/img.jpg",
		shops: [
			{
				shopId: "123",
				name: "门店一"
			}
		]
	},
	success: true,
	errorCode: "" ,
	errorMsg:  "" ,
}

//getShopCourseList.json?orgId=123&shopId=123&date=20150810
//获取门店课程列表
{
	data:{
		orgId: "123",
		shopId: "00001",
		name:   "门店一",
		courseList: [            //sorted by time
			{
				courseId: "123",
				name: "瑜伽课",
				reservationNum: 2,
				startTime: 1439192345578,
				endTime: 1439192345578,
				couldReservate: false  //已结束课程不让预约
			}
		]
	},
	success: true,
	errorCode: "" ,
	errorMsg:  "" ,
}

//getMyWeekCourse.json?orgId=123&shopId=123&startDate=20150810
//获取我的课程列表，数量标注在日历上，courseId用于标记课程列表上的是否预约标记
{
	data:{
		orgId: "123",
		shopId: "00001",
		schedule: [            //周天到周六的日程
			{
				count:2,
				courseIdList:["123","234"]
			},
			{
				count:0,
				courseIdList: []
			},
			{
				count:0,
				courseIdList: []
			},
			{
				count:0,
				courseIdList: []
			},
			{
				count:0,
				courseIdList: []
			},
			{
				count:0,
				courseIdList: []
			}
		]
	},
	success: true,
	errorCode: "" ,
	errorMsg:  "" ,
}

//getCourseDetail.json?couseId=123
{
	data:{
		orgId: "123",
		shopId: "00001",
		courseId:   "123",
		orgName:"希蕊东方舞",
		shopName:"文一店",
		name: "瑜伽课",
		tags: ["瑜伽"],
		teacher: {
			name: "王老师",
			userId: "123"
		},
		tip: "提醒",
		desc: "课程简介",
		startTime: 1439192345578,
		endTime: 1439192345578,
		maxNum: 30,
		minNum: 3,
		tel: "0571-888888888",
		address: "杭州 西湖区 文一路",
		reservationList:[
			{
				name:"张三",
				avatar:"img.jpg",
				userId: "123"
			}
		]
	},
	success: true,
	errorCode: "" ,
	errorMsg:  "" 
}

//reservateCourse.json?userId=123&courseId=123
//后台调用预约规则，判断是否调用成功
{
	data:{
		success:false,
		warnning: "课程已满"
	},
	success: true,
	errorCode: "" ,
	errorMsg:  "" ,
}

//cancelReservation.json?userId=123&courseId=123
//后台调用取消预约规则，判断是否调用成功
{
	data:{
		success:true,
		warnning: ""
	},
	success: true,
	errorCode: "" ,
	errorMsg:  "" ,
}


//getMyReservationList.json?userId=123
//我预约的课程列表，签到信息        默认列表和历史列表的区别？？？？
{
	data:{
		reservationList:[
			{
				orgId: "123",
				orgName:"希蕊东方舞",
				shopId: "001",
				shopName: "文一店",
				courseList:[
					{
						courseId: "123",
						courseName: "流瑜伽",
						startTime: 1439192345578,
						endTime: 1439192345578,
						checkIn: true //签到
					},
					{
						courseId: "2314",
						courseName: "阴瑜伽",
						startTime: 1439192345578,
						endTime: 1439192345578,
						checkIn: false //签到
					}
				]
			},
			{
				orgId: "1234",
				orgName:"七彩人生",
				shopId: "001",
				shopName: "城西",
				courseList:[
					{
						courseId: "123",
						courseName: "色彩人生",
						startTime: 1439192345578,
						endTime: 1439192345578,
						checkIn: true //签到
					}
				]
			}
		]
	},
	success: true,
	errorCode: "" ,
	errorMsg:  "" 
}

/**************************************************\
                管理页接口
\**************************************************/


//switchToAdmin.json?userId=123
//有管理员身份的直接切换成功，未成功的到申请页面
//企业服务商字段
{
	data:{
		success: true,   //false 就弹出申请页面
		orgId:"123",
		shopId:"001",
		adminType: "owner", //owner , admin 
		phone: "13999999999",
		serviceName: "舞蹈培训",
		orgType: "company", // company ,individual
		orgName: "希蕊东方舞",
		address: "",
		logo: "",
		tags: ["舞蹈","培训"],
		orgCret: "img.jpg",
		taxCret: "img.jpg",
		ownerName:"法人姓名",
		onwerPhone:"",
		alipay: "",
		shops:[
			{
				shopId:"123",
				name:"文一店",
				tel: "0571-88888888",
				address:""
			}
		]
	},
	success: true,
	errorCode: "" ,
	errorMsg:  "" 
}
//个人服务商字段

{
	data:{
		success: true,   //false 就弹出申请页面
		orgId:"123",
		shopId:"001",
		adminType: "owner", //owner , admin 
		name: "张老师",
		phone: "13999999999",
		orgType: "individual", // company ,individual
		address: "",
		logo: "",
		tags: ["舞蹈","培训"],
		professionalCrets: ["img.jpg","img.jpg"],
		alipay: "",
		shops:[
			{
				shopId:"123",
				name:"文一店",
				tel: "0571-88888888",
				address:""
			}
		]
	},
	success: true,
	errorCode: "" ,
	errorMsg:  "" 
}

//apply.json  申请成为服务商 返回结果同上
个人服务商参数：
userId:""
phone: ""
logo: ""
name: ""
orgType:"individual"
address:""
tags: []
alipay:""
professionalCrets:[]
企业服务商：
userId:""
phone: ""
logo: ""
serviceName: ""
orgName: ""
orgType: "company"
address:""
tags: []
orgCret: ""
taxCret: ""
ownerName:""
ownerPhone: ""
alipay:""

//updateOrg.json 
参数：
orgId: ""
orgType:""
需要更改的参数  返回结果同上

//getManagedReservation.json?userId=123  //通过权限列表查询当前管理的店铺
//根据权限查找自己管理的店铺已经该店铺下的课程预约
{
	data:{
		courseList:[
			{
				courseId:"123",
				name:"瑜伽",
				startTime:1439192345578,
				endTime: 1439192345578,
				maxNum: 30,  //最大人数
				status: 1,  //状态值
				// customList:[
				// 	{
				// 		userId:"123",
				// 		name:"张三",
				// 		checkIn: false
				// 	},
				// 	{
				// 		userId:"333",
				// 		name:"李四",
				// 		checkIn:true
				// 	}
				// ]
			}
		]
	},
	success: true,
	errorCode: "" ,
	errorMsg:  "" 
}
//getCourseReservationList.json?courseId=123&userId=123
//查询该课程下的预约情况及签到情况
{
	data:{
			customList:[
				{
					userId:"123",
					name:"张三",
					checkIn: false
				},
				{
					userId:"333",
					name:"李四",
					checkIn:true
				}
			]
	},
	success: true,
	errorCode: "" ,
	errorMsg:  "" 
}


//checkinCourse.json?courseId=123&userId=123
//签到
{
	data:{
		success:false,
		warnning:"未预约过该课程"
	},
	success: true,
	errorCode: "" ,
	errorMsg:  "" 
}

//forceCheckinCourse.json?courseId=123&userId=123
//绿色通道-----即强制签到
{
	data:{
		success:true
	},
	success: true,
	errorCode: "" ,
	errorMsg:  "" 
}
//addCustomToReservationList.json?courseId=123&userId=123&custom=123
//管理员帮用户预约，跳过预约逻辑
{
	data:{
		// success:true
		courseList:[
			{
				courseId:"123",
				name:"瑜伽",
				startTime:1439192345578,
				endTime: 1439192345578,
				customList:[
					{
						userId:"123",
						name:"张三",
						checkIn: false
					},
					{
						userId:"333",
						name:"李四",
						checkIn:true
					}
				]
			}
		]
	},
	success: true,
	errorCode: "" ,
	errorMsg:  ""
}
//removeCustomFromReservationList.json?courseId=123&userId=123&custom=123
//管理员帮用户取消预约，跳过取消预约逻辑
{
	data:{
		success:true
		courseList:[
			{
				courseId:"123",
				name:"瑜伽",
				startTime:1439192345578,
				endTime: 1439192345578,
				customList:[
					{
						userId:"123",
						name:"张三",
						checkIn: false
					},
					{
						userId:"333",
						name:"李四",
						checkIn:true
					}
				]
			}
		]
	},
	success: true,
	errorCode: "" ,
	errorMsg:  ""
}
//getAllCustom.json?orgId=123     sorted 
//获取按首字母排序的客户列表
{
	data:{
		alphabet:["b","g","y"],
		custom:[
			{
				key : "b",
				customList: [
					{
						userId:"123",
						phone:"13999999999",
						name:"",
						address:"",
						tags:[],
						avatar:"",
						gender:"",
						career:"",
						birthday:"",
						address: "",
						desc: ""
					}
				]
			},
			{
				key : "g",
				customList: [
					{
						userId:"123",
						phone:"13999999999",
						name:"",
						address:"",
						tags:[],
						avatar:"",
						gender:"",
						career:"",
						birthday:"",
						address: "",
						desc: ""
					}
				]
			}

		]

	},
	success: true,
	errorCode: "" ,
	errorMsg:  ""
}
//locateCustom.json?orgId=123&phone=123
//快速定位客户在列表中的index
{
	data:{
		success:false,
		index: -1,
		warnning:"顾客不存在"
	},
	success: true,
	errorCode: "" ,
	errorMsg:  ""
}
//importCustom.json?orgId=123&name=张三&phone=13999999999&&gender=male&avatar=img.jpg
//添加客户，如客户不是会员，后台新建一个user对象，客户注册后关联登陆信息
{
	data:{
		success:true,
		customList:[
			{
				userId:"123",
				phone:"13999999999",
				name:"",
				address:"",
				tags:[],
				avatar:"",
				gender:"",
				career:"",
				birthday:"",
				address: "",
				desc: ""
			}
		]
	},
	success: true,
	errorCode: "" ,
	errorMsg:  ""
}
//modifyCustomInfo.json?customId=123&name=张三&phone=13999999999&&gender=male&avatar=img.jpg
//更改客户信息
{
	data:{
		success:true,
		customList:[
			{
				userId:"123",
				phone:"13999999999",
				name:"",
				address:"",
				tags:[],
				avatar:"",
				gender:"",
				career:"",
				birthday:"",
				address: "",
				desc: ""
			}
		]
	},
	success: true,
	errorCode: "" ,
	errorMsg:  ""
}
//getManagedCourse.json?userId=123  //通过权限列表查询当前管理的店铺
//获取管理的课程列表
{
	data:{
		courseList:[
			{
				orgId: "123",
				shopId: "00001",
				courseId:   "123",
				orgName:"希蕊东方舞",
				shopName:"文一店",
				name: "瑜伽课",
				tags: ["瑜伽"],
				teacher: {
					name: "王老师",
					userId: "123"
				},
				tip: "提醒",
				desc: "课程简介",
				startTime: 1439192345578,
				endTime: 1439192345578,
				maxNum: 30,
				minNum: 3,
				tel: "0571-888888888",
				address: "杭州 西湖区 文一路",
				reservationList:[
					{
						name:"张三",
						avatar:"img.jpg",
						userId: "123"
					}
				]
			}
		]
	},
	success: true,
	errorCode: "" ,
	errorMsg:  "" 
}
//getCourseConfig.json?courseId=123
//获取课程详情
{	
	data:{
		orgId: "123",
		shopId: "00001",
		courseId:   "123",
		orgName:"希蕊东方舞",
		shopName:"文一店",
		name: "瑜伽课",
		tags: ["瑜伽"],
		teacher: {
			name: "王老师",
			userId: "123"
		},
		tip: "提醒",
		desc: "课程简介",
		startTime: 1439192345578,
		endTime: 1439192345578,
		hasMaxNum: true,
		maxNum: 30,
		hasMaxNum:true,
		minNum: 3,
		hasConstantStudent:true,
		constantStudent:[
			{
				userId:"123",
				name:"张三"
			}
		],
		isCancelCourseBelowMinNum:true,
		isReservationCanBeCancel: true,
		cancelDeadline: 1439192345578,
		reservationDeadline:1439192345578
	},
	success: true,
	errorCode: "" ,
	errorMsg:  "" 
}
//updateCourseConfig.json?courseId=123......
{	
	data:{
		orgId: "123",
		shopId: "00001",
		courseId:   "123",
		orgName:"希蕊东方舞",
		shopName:"文一店",
		name: "瑜伽课",
		tags: ["瑜伽"],
		teacher: {
			name: "王老师",
			userId: "123"
		},
		tip: "提醒",
		desc: "课程简介",
		startTime: 1439192345578,
		endTime: 1439192345578,
		hasMaxNum: true,
		maxNum: 30,
		hasMaxNum:true,
		minNum: 3,
		hasConstantStudent:true,
		constantStudent:[
			{
				userId:"123",
				name:"张三"
			}
		],
		isCancelCourseBelowMinNum:true,
		isReservationCanBeCancel: true,
		cancelDeadline: 1439192345578,
		reservationDeadline:1439192345578
	},
	success: true,
	errorCode: "" ,
	errorMsg:  "" 
}
//createCourseConfig.json?......
//创建课程
{	
	data:{
		orgId: "123",
		shopId: "00001",
		courseId:   "123",
		orgName:"希蕊东方舞",
		shopName:"文一店",
		name: "瑜伽课",
		tags: ["瑜伽"],
		teacher: {
			name: "王老师",
			userId: "123"
		},
		tip: "提醒",
		desc: "课程简介",
		startTime: 1439192345578,
		endTime: 1439192345578,
		hasMaxNum: true,
		maxNum: 30,
		hasMaxNum:true,
		minNum: 3,
		hasConstantStudent:true,
		constantStudent:[
			{
				userId:"123",
				name:"张三"
			}
		],
		isCancelCourseBelowMinNum:true,
		isReservationCanBeCancel: true,
		cancelDeadline: 1439192345578,
		reservationDeadline:1439192345578
	},
	success: true,
	errorCode: "" ,
	errorMsg:  "" 
}
//deleteCourse.json?courseId=123
{
	data:{
		success:true,
		warnning:""
	},
	success: true,
	errorCode: "" ,
	errorMsg:  "" 
}
//getAllShopOfOrg.json?orgId=123
//获取店铺列表
{
	data:{
		orgId:"123",
		orgName:"希蕊东方舞",
		shopList:[
			{
				orgId:"123",
				shopId:"",
				shopName:""
			}
		]
	},
	success: true,
	errorCode: "" ,
	errorMsg:  "" 
}
//getAdminList.json?orgId=123
//获取管理员列表
{
	data:{
		owner:{
			name: "法人",
			userId:"123",
			phone:"123"
		},
		admins:[
			{
				userId:"123",
				phone:"123",
				name:"店长",
				shopId:"123",
				shopName:"文一店"
			}
		],
		teacher:[
			{
				userId:"",
				name:"",
				phone:""
			}
		]
	},
	success: true,
	errorCode: "" ,
	errorMsg:  "" 
}
//addAdmin.json?orgId=123&shopId=123&adminType=admin/teacher&name=张三&phone=123
{
	data:{
		success:true,
		warnning:"",
		owner:{
			name: "法人",
			userId:"123",
			phone:"123"
		},
		admins:[
			{
				adminId:"123",
				userId:"123",
				phone:"123",
				name:"店长",
				shopId:"123",
				shopName:"文一店"
			}
		],
		teacher:[
			{
				adminId:"123",
				userId:"",
				name:"",
				phone:""
			}
		]
	},
	success: true,
	errorCode: "" ,
	errorMsg:  ""
}
//updateAdminInfo.json?adminId=123&shopId=123&adminType=admin/teacher&name=张三&phone=123
{
	data:{
		success:true,
		warnning:"",
		owner:{
			name: "法人",
			userId:"123",
			phone:"123"
		},
		admins:[
			{
				adminId:"123",
				userId:"123",
				phone:"123",
				name:"店长",
				shopId:"123",
				shopName:"文一店"
			}
		],
		teacher:[
			{
				adminId:"123",
				userId:"",
				name:"",
				phone:""
			}
		]
	},
	success: true,
	errorCode: "" ,
	errorMsg:  ""
}
//deleteAdmin.json?adminId=123
{
	data:{
		success:true,
		warnning:""
	},
	success: true,
	errorCode: "" ,
	errorMsg:  "" 
}
//getTeacherList.json?orgId=123
{
	data:{
		teacherList:[
			{
				userId:"",
				avatar:"",
				name:"",
				gender:"",
				phone:""
			}
		]
	},
	success: true,
	errorCode: "" ,
	errorMsg:  "" 
}
//locateTeacher.json?orgId=123&phone=123
{
	data:{
		success:false,
		index: -1,
		warnning:"老师不存在"
	},
	success: true,
	errorCode: "" ,
	errorMsg:  "" 
}
























