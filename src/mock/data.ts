export const avatars = [
  'avatars/avatar1.png',
  'avatars/avatar2.png',
  'avatars/avatar3.png',
  'avatars/avatar4.png',
  'avatars/avatar5.png',
  'avatars/avatar6.png',
  'avatars/avatar7.png',
  'avatars/avatar8.png',
];

export const categories = [
  { name: '运动', image: 'categories/运动.png', subs: ['跑步', '篮球', '羽毛球', '网球', '游泳', '健身', '足球', '瑜伽'] },
  { name: '户外', image: 'categories/户外.png', subs: ['徒步', '露营', '登山', '骑行', '野餐', '钓鱼', '滑雪', '攀岩'] },
  { name: '社交', image: 'categories/社交.png', subs: ['聚会', '桌游', '剧本杀', 'K歌', '交友', '下午茶', '探店', '咖啡'] },
  { name: '兴趣', image: 'categories/兴趣.png', subs: ['摄影', '绘画', '手工', '插花', '茶道', '读书', '博物馆', '陶艺'] },
  { name: '娱乐', image: 'categories/娱乐.png', subs: ['电影', '演出', '密室', '音乐', '游戏', '看展', '漫展', '派对'] },
  { name: '技能', image: 'categories/技能.png', subs: ['语言', '编程', '考试', '技能交换', '讲座', '写作', '书法', '乐器'] },
  { name: '生活', image: 'categories/生活.png', subs: ['美食', '探店', '咖啡', '旅行', '摄影', '骑行', '冥想', '阅读'] },
  { name: '心灵', image: 'categories/心灵.png', subs: ['冥想', '正念', '心理咨询', '复盘', '睡眠改善', '塔罗', '备考监督', '计划制定'] },
];

export const cards = [
  { id: '1', title: '周末山野徒步', place: '上海 · 3.2km', name: '小野', price: 50, avatar: avatars[0], image: 'scenes/scene1.png', desc: '周末一起去山野徒步，享受大自然的美好时光', category: '户外' },
  { id: '2', title: '城市骑行搭子', place: '上海 · 2.7km', name: '慢半拍', price: 40, avatar: avatars[1], image: 'scenes/scene2.png', desc: '周末城市骑行，探索隐藏的小巷和美食', category: '户外' },
  { id: '3', title: '咖啡探店同行', place: '上海 · 1.4km', name: '星星', price: 60, avatar: avatars[2], image: 'scenes/scene3.png', desc: '一起探访城市中隐藏的好咖啡店', category: '生活' },
  { id: '4', title: '美食寻味向导', place: '静安 · 2.1km', name: '晨光', price: 90, avatar: avatars[3], image: 'scenes/scene4.png', desc: '带你寻找城市中的地道美食', category: '生活' },
  { id: '5', title: '羽毛球轻局', place: '徐汇 · 1.8km', name: '运动达人', price: 70, avatar: avatars[4], image: 'activities/activity2.png', desc: '周末羽毛球轻局，场地已订', category: '运动' },
  { id: '6', title: '画展导览', place: '西岸 · 4.0km', name: '艺术爱好者', price: 80, avatar: avatars[5], image: 'activities/activity1.png', desc: '当代艺术展览，一起欣赏并交流', category: '兴趣' },
  { id: '7', title: '瑜伽冥想课', place: '浦东 · 2.5km', name: '静心', price: 68, avatar: avatars[6], image: 'activities/activity2.png', desc: '放松身心，体验瑜伽冥想的宁静', category: '心灵' },
  { id: '8', title: '编程学习小组', place: '张江 · 3.8km', name: '码农小李', price: 120, avatar: avatars[7], image: 'activities/activity3.png', desc: '每周编程学习小组，一起进步', category: '技能' },
  { id: '9', title: '剧本杀组局', place: '虹口 · 1.2km', name: '推理迷', price: 88, avatar: avatars[0], image: 'activities/activity4.png', desc: '周末剧本杀组局，有好本推荐', category: '社交' },
  { id: '10', title: '摄影采风', place: '外滩 · 2.0km', name: '快门手', price: 150, avatar: avatars[1], image: 'activities/activity5.png', desc: '专业摄影师带队，捕捉城市最美瞬间', category: '兴趣' },
  { id: '11', title: '露营体验', place: '青浦 · 15km', name: '户外玩家', price: 198, avatar: avatars[2], image: 'scenes/scene5.png', desc: '周末露营体验，装备齐全', category: '户外' },
  { id: '12', title: '英语口语角', place: '静安 · 1.6km', name: '外教Amy', price: 98, avatar: avatars[3], image: 'activities/activity3.png', desc: '每周英语口语角，提高口语能力', category: '技能' },
  { id: '13', title: '跑步晨练', place: '世纪公园 · 3.0km', name: '晨跑达人', price: 30, avatar: avatars[4], image: 'categories/运动.png', desc: '每周一三五晨跑，一起坚持', category: '运动' },
  { id: '14', title: '读书会', place: '徐汇 · 2.2km', name: '书虫', price: 50, avatar: avatars[5], image: 'categories/技能.png', desc: '每周读书会，分享阅读心得', category: '兴趣' },
  { id: '15', title: '桌游之夜', place: '长宁 · 1.9km', name: '桌游控', price: 68, avatar: avatars[6], image: 'activities/activity4.png', desc: '周五桌游之夜，多种桌游任你选', category: '社交' },
  { id: '16', title: '健身私教', place: '浦东 · 2.8km', name: '教练阿杰', price: 200, avatar: avatars[7], image: 'personas/persona3.png', desc: '专业健身私教，定制训练计划', category: '运动' },
  { id: '17', title: '城市漫步', place: '黄浦 · 1.5km', name: '城市探索者', price: 45, avatar: avatars[0], image: 'scenes/scene2.png', desc: '漫步城市老街，了解历史故事', category: '生活' },
  { id: '18', title: '手工陶艺', place: '普陀 · 2.3km', name: '陶艺师', price: 128, avatar: avatars[1], image: 'categories/兴趣.png', desc: '体验手工陶艺的乐趣', category: '兴趣' },
  { id: '19', title: '电影之夜', place: '静安 · 1.0km', name: '影迷', price: 55, avatar: avatars[2], image: 'categories/娱乐.png', desc: '一起看最新上映的电影', category: '娱乐' },
  { id: '20', title: '现场演出', place: '黄浦 · 2.5km', name: '乐迷', price: 180, avatar: avatars[3], image: 'categories/娱乐.png', desc: '周末Live House现场演出', category: '娱乐' },
];

export const discoverCards = [
  { id: 1, name: '林夏', age: 25, job: '策展助理', level: 5, tags: ['看展','咖啡','艺术'], city: '上海', dist: 1.2, price: 158, rating: 4.9, orders: 128, avatar: 'personas/persona1.jpg', cover: 'scenes/scene1.png', verified: true, services: ['看展同行','咖啡探店','艺术导览'] },
  { id: 2, name: '阿澈', age: 27, job: '骑行达人', level: 3, tags: ['骑行','摄影','户外'], city: '杭州', dist: 2.5, price: 98, rating: 4.7, orders: 56, avatar: 'personas/persona2.jpg', cover: 'scenes/scene2.png', verified: false, services: ['城市骑行','摄影跟拍'] },
  { id: 3, name: '南希', age: 24, job: '健身教练', level: 9, tags: ['运动','健身','瑜伽'], city: '上海', dist: 0.8, price: 188, rating: 5.0, orders: 256, avatar: 'personas/persona3.png', cover: 'activities/activity2.png', verified: true, services: ['健身指导','跑步陪练','瑜伽课程'] },
  { id: 4, name: '予安', age: 29, job: '户外领队', level: 7, tags: ['徒步','露营','登山'], city: '成都', dist: 3.1, price: 228, rating: 4.8, orders: 189, avatar: 'personas/persona4.png', cover: 'scenes/scene5.png', verified: true, services: ['户外徒步','露营体验','登山向导'] },
  { id: 5, name: '小鹿', age: 22, job: '咖啡师', level: 4, tags: ['咖啡','美食','探店'], city: '上海', dist: 1.5, price: 88, rating: 4.6, orders: 78, avatar: 'personas/persona5.png', cover: 'scenes/scene3.png', verified: true, services: ['咖啡探店','美食寻味'] },
  { id: 6, name: '橙子', age: 26, job: '摄影师', level: 6, tags: ['摄影','旅行','艺术'], city: '深圳', dist: 2.2, price: 258, rating: 4.9, orders: 167, avatar: 'personas/persona6.png', cover: 'activities/activity5.png', verified: true, services: ['摄影跟拍','旅行摄影'] },
  { id: 7, name: '晴天', age: 28, job: '英语口语老师', level: 8, tags: ['英语','学习','交流'], city: '上海', dist: 1.8, price: 128, rating: 4.8, orders: 234, avatar: 'personas/persona7.png', cover: 'activities/activity3.png', verified: true, services: ['英语口语','雅思辅导'] },
  { id: 8, name: '柚子', age: 23, job: '舞蹈老师', level: 4, tags: ['舞蹈','健身','演出'], city: '北京', dist: 3.5, price: 168, rating: 4.7, orders: 98, avatar: avatars[5], cover: 'categories/运动.png', verified: true, services: ['舞蹈课程','舞蹈演出'] },
  { id: 9, name: '晚风', age: 30, job: '心理咨询师', level: 9, tags: ['心理','冥想','疗愈'], city: '上海', dist: 0.5, price: 388, rating: 5.0, orders: 145, avatar: avatars[6], cover: 'activities/activity2.png', verified: true, services: ['心理咨询','冥想疗愈'] },
  { id: 10, name: '阿Ken', age: 25, job: '程序员', level: 5, tags: ['编程','学习','技术'], city: '上海', dist: 4.0, price: 198, rating: 4.6, orders: 67, avatar: avatars[7], cover: 'activities/activity3.png', verified: false, services: ['编程辅导','技术咨询'] },
  { id: 11, name: '麦子', age: 27, job: '烘焙师', level: 6, tags: ['烘焙','美食','手工'], city: '广州', dist: 2.8, price: 158, rating: 4.8, orders: 134, avatar: avatars[0], cover: 'categories/生活.png', verified: true, services: ['烘焙课程','甜品制作'] },
  { id: 12, name: '小鱼', age: 24, job: '花艺师', level: 4, tags: ['花艺','手工','美学'], city: '上海', dist: 1.1, price: 128, rating: 4.7, orders: 89, avatar: avatars[1], cover: 'categories/兴趣.png', verified: true, services: ['花艺课程','鲜花定制'] },
  { id: 13, name: '阿May', age: 26, job: '瑜伽教练', level: 7, tags: ['瑜伽','健身','冥想'], city: '上海', dist: 2.0, price: 148, rating: 4.9, orders: 178, avatar: avatars[2], cover: 'activities/activity2.png', verified: true, services: ['瑜伽课程','冥想指导'] },
  { id: 14, name: '浩然', age: 29, job: '户外运动教练', level: 8, tags: ['户外','登山','滑雪'], city: '成都', dist: 5.0, price: 268, rating: 4.8, orders: 156, avatar: avatars[3], cover: 'scenes/scene5.png', verified: true, services: ['登山向导','滑雪教学'] },
  { id: 15, name: '小雪', age: 23, job: '美妆师', level: 3, tags: ['美妆','时尚','造型'], city: '上海', dist: 0.9, price: 98, rating: 4.5, orders: 56, avatar: avatars[4], cover: 'categories/生活.png', verified: true, services: ['美妆教学','造型设计'] },
  { id: 16, name: '阿杰', age: 28, job: '健身私教', level: 6, tags: ['健身','运动','减脂'], city: '上海', dist: 2.3, price: 228, rating: 4.9, orders: 212, avatar: avatars[5], cover: 'personas/persona3.png', verified: true, services: ['私教课程','减脂计划'] },
  { id: 17, name: '糖果', age: 24, job: '插画师', level: 5, tags: ['绘画','插画','手工'], city: '上海', dist: 1.6, price: 138, rating: 4.7, orders: 78, avatar: avatars[6], cover: 'categories/兴趣.png', verified: true, services: ['插画课程','手绘定制'] },
  { id: 18, name: '大伟', age: 31, job: '吉他老师', level: 7, tags: ['音乐','吉他','演出'], city: '北京', dist: 3.2, price: 188, rating: 4.8, orders: 145, avatar: avatars[7], cover: 'categories/娱乐.png', verified: true, services: ['吉他教学','弹唱指导'] },
  { id: 19, name: '安琪', age: 25, job: '甜品师', level: 4, tags: ['甜品','烘焙','美食'], city: '杭州', dist: 2.1, price: 118, rating: 4.6, orders: 67, avatar: avatars[0], cover: 'categories/生活.png', verified: false, services: ['甜品制作','下午茶'] },
  { id: 20, name: '小P', age: 26, job: '调酒师', level: 5, tags: ['调酒','派对','夜生活'], city: '上海', dist: 1.3, price: 168, rating: 4.7, orders: 89, avatar: avatars[1], cover: 'categories/娱乐.png', verified: true, services: ['调酒课程','派对策划'] },
  { id: 21, name: '阿文', age: 28, job: '围棋老师', level: 8, tags: ['围棋','策略','益智'], city: '上海', dist: 2.5, price: 198, rating: 4.9, orders: 134, avatar: avatars[2], cover: 'categories/技能.png', verified: true, services: ['围棋教学','棋艺交流'] },
  { id: 22, name: 'Luna', age: 24, job: '拉丁舞老师', level: 6, tags: ['舞蹈','拉丁舞','健身'], city: '深圳', dist: 3.0, price: 158, rating: 4.8, orders: 112, avatar: avatars[3], cover: 'categories/运动.png', verified: true, services: ['拉丁舞课程','舞蹈编排'] },
  { id: 23, name: '阿豪', age: 27, job: '篮球教练', level: 5, tags: ['篮球','运动','教学'], city: '上海', dist: 1.8, price: 148, rating: 4.7, orders: 98, avatar: avatars[4], cover: 'categories/运动.png', verified: true, services: ['篮球教学','赛事组织'] },
  { id: 24, name: '小Q', age: 25, job: '茶艺师', level: 7, tags: ['茶道','文化','冥想'], city: '杭州', dist: 2.4, price: 168, rating: 4.8, orders: 87, avatar: avatars[5], cover: 'categories/生活.png', verified: true, services: ['茶道体验','茶艺教学'] },
  { id: 25, name: '木木', age: 23, job: '宠物美容师', level: 4, tags: ['宠物','美容','护理'], city: '上海', dist: 0.7, price: 88, rating: 4.5, orders: 67, avatar: avatars[6], cover: 'categories/生活.png', verified: false, services: ['宠物美容','宠物护理'] },
  { id: 26, name: 'Ray', age: 29, job: '营养师', level: 8, tags: ['营养','健康','美食'], city: '上海', dist: 2.2, price: 188, rating: 4.9, orders: 145, avatar: avatars[7], cover: 'categories/生活.png', verified: true, services: ['营养咨询','健康食谱'] },
  { id: 27, name: '小诗', age: 24, job: '古筝老师', level: 6, tags: ['古筝','音乐','传统文化'], city: '上海', dist: 1.4, price: 158, rating: 4.8, orders: 89, avatar: avatars[0], cover: 'categories/兴趣.png', verified: true, services: ['古筝教学','古典音乐'] },
  { id: 28, name: '阿轩', age: 26, job: '攀岩教练', level: 5, tags: ['攀岩','户外','极限'], city: '成都', dist: 3.8, price: 198, rating: 4.7, orders: 78, avatar: avatars[1], cover: 'scenes/scene5.png', verified: true, services: ['攀岩教学','户外拓展'] },
  { id: 29, name: '小慧', age: 25, job: '营养师', level: 4, tags: ['营养','健康','减脂'], city: '广州', dist: 2.6, price: 148, rating: 4.6, orders: 67, avatar: avatars[2], cover: 'categories/生活.png', verified: true, services: ['营养咨询','减脂指导'] },
  { id: 30, name: '阿飞', age: 28, job: '无人机飞手', level: 7, tags: ['摄影','无人机','航拍'], city: '上海', dist: 2.0, price: 258, rating: 4.8, orders: 98, avatar: avatars[3], cover: 'activities/activity5.png', verified: true, services: ['航拍服务','无人机教学'] },
];

export const cityOptions = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '南京', '重庆', '香港', '澳门', '台北'];
export const distanceOptions = ['1km', '3km', '5km', '10km', '20km'];
export const priceOptions = ['50以下', '50-100', '100-200', '200-300', '300以上'];
export const scheduleOptions = ['全天', '上午', '下午', '晚上', '周末'];

export const banners = [
  { id: 1, title: '邀请有礼', img: 'scenes/scene1.png', desc: '邀请得20积分，好友得10积分' },
  { id: 2, title: '夏日限定', img: 'scenes/scene2.png', desc: '夏日户外活动专场' },
  { id: 3, title: '技能交换', img: 'scenes/scene3.png', desc: '用技能换技能，结识新朋友' },
];

export const blindBoxPrizes = [
  { id: 1, name: '积分x10', icon: 'categories/运动.png', type: 'points', value: 10 },
  { id: 2, name: '积分x20', icon: 'categories/户外.png', type: 'points', value: 20 },
  { id: 3, name: '积分x50', icon: 'categories/社交.png', type: 'points', value: 50 },
  { id: 4, name: '优惠券x10', icon: 'categories/兴趣.png', type: 'coupon', value: 10 },
  { id: 5, name: '优惠券x20', icon: 'categories/生活.png', type: 'coupon', value: 20 },
  { id: 6, name: '优惠券x50', icon: 'categories/技能.png', type: 'coupon', value: 50 },
  { id: 7, name: 'VIP体验卡', icon: 'categories/娱乐.png', type: 'vip', value: 1 },
  { id: 8, name: '神秘大奖', icon: 'categories/心灵.png', type: 'mystery', value: 1 },
];

export const activities = [
  { id: '1', title: '周末山野徒步', image: 'scenes/scene1.png', location: '上海', distance: '3.2km', price: 50, category: '户外', participants: 12 },
  { id: '2', title: '城市骑行', image: 'scenes/scene2.png', location: '上海', distance: '2.7km', price: 40, category: '户外', participants: 8 },
  { id: '3', title: '咖啡探店', image: 'scenes/scene3.png', location: '上海', distance: '1.4km', price: 60, category: '生活', participants: 6 },
  { id: '4', title: '剧本杀组局', image: 'activities/activity4.png', location: '静安', distance: '1.2km', price: 88, category: '社交', participants: 4 },
  { id: '5', title: '摄影采风', image: 'activities/activity5.png', location: '外滩', distance: '2.0km', price: 150, category: '兴趣', participants: 10 },
];

export const serviceCategories = [
  { name: '运动健身', icon: 'categories/运动.png', services: ['羽毛球', '篮球', '健身', '瑜伽', '跑步', '游泳', '网球', '足球'] },
  { name: '户外活动', icon: 'categories/户外.png', services: ['徒步', '露营', '登山', '骑行', '野餐', '钓鱼', '滑雪', '攀岩'] },
  { name: '社交聚会', icon: 'categories/社交.png', services: ['剧本杀', '桌游', 'K歌', '聚会', '交友', '狼人杀', '麻将', '派对'] },
  { name: '兴趣爱好', icon: 'categories/兴趣.png', services: ['摄影', '绘画', '手工', '插花', '茶道', '花艺', '烘焙', '陶艺'] },
  { name: '学习技能', icon: 'categories/技能.png', services: ['语言', '编程', '考试', '技能交换', '讲座', '考研', '考证', '公开课'] },
  { name: '生活服务', icon: 'categories/生活.png', services: ['美食', '探店', '咖啡', '旅行', '购物', '冥想', '阅读', '美容'] },
];

export const skills = [
  { name: '摄影', category: '兴趣爱好' },
  { name: '绘画', category: '兴趣爱好' },
  { name: '手工', category: '兴趣爱好' },
  { name: '烘焙', category: '兴趣爱好' },
  { name: '瑜伽', category: '运动健身' },
  { name: '健身', category: '运动健身' },
  { name: '舞蹈', category: '运动健身' },
  { name: '语言', category: '学习技能' },
  { name: '编程', category: '学习技能' },
  { name: '音乐', category: '兴趣爱好' },
  { name: '户外', category: '户外活动' },
  { name: '社交', category: '社交聚会' },
];

export const peers = discoverCards;

export const chats = [
  { id: 1, name: '林夏', avatar: 'personas/persona1.jpg', text: '周末有空一起看展吗？', lastMsg: '周末有空一起看展吗？', time: '刚刚', unread: 2 },
  { id: 2, name: '南希', avatar: 'personas/persona3.png', text: '瑜伽课已经安排好了', lastMsg: '瑜伽课已经安排好了', time: '10分钟前', unread: 0 },
  { id: 3, name: '系统通知', avatar: avatars[2], text: '订单即将结束提醒', lastMsg: '订单即将结束提醒', time: '1小时前', unread: 1 },
  { id: 4, name: '订单通知', avatar: avatars[3], text: '新订单已确认', lastMsg: '新订单已确认', time: '2小时前', unread: 1 },
  { id: 5, name: '予安', avatar: 'personas/persona4.png', text: '下周徒步计划', lastMsg: '下周徒步计划', time: '昨天', unread: 0 },
  { id: 6, name: '晴天', avatar: 'personas/persona7.png', text: '口语练习安排', lastMsg: '口语练习安排', time: '2天前', unread: 0 },
];

export const chatConversations = [
  { id: 1, sender: '林夏', content: '周末有空一起看展吗？', time: '10:30', avatar: 'personas/persona1.jpg' },
  { id: 2, sender: '我', content: '周末什么时候？', time: '10:32', avatar: avatars[0] },
  { id: 3, sender: '林夏', content: '周六下午怎么样？有个新展不错', time: '10:35', avatar: 'personas/persona1.jpg' },
  { id: 4, sender: '林夏', content: '在西岸艺术中心', time: '10:35', avatar: 'personas/persona1.jpg' },
  { id: 5, sender: '我', content: '可以啊，几点？', time: '10:40', avatar: avatars[0] },
  { id: 6, sender: '林夏', content: '下午2点怎么样？我带你逛', time: '10:42', avatar: 'personas/persona1.jpg' },
];

export const orders = [
  { id: 'ORD001', title: '咖啡探店同行', service: '咖啡探店同行', partnerName: '林夏', avatar: 'personas/persona1.jpg', date: '2024-07-15', time: '14:00', location: '静安寺', place: '静安寺', status: '待预约', price: 158, duration: 120 },
  { id: 'ORD002', title: '瑜伽冥想课', service: '瑜伽冥想课', partnerName: '南希', avatar: 'personas/persona3.png', date: '2024-07-14', time: '10:00', location: '浦东', place: '浦东', status: '进行中', price: 188, duration: 120 },
  { id: 'ORD003', title: '户外徒步', service: '户外徒步', partnerName: '予安', avatar: 'personas/persona4.png', date: '2024-07-13', time: '09:00', location: '青浦', place: '青浦', status: '已完成', price: 228, duration: 240 },
  { id: 'ORD004', title: '英语口语练习', service: '英语口语练习', partnerName: '晴天', avatar: 'personas/persona7.png', date: '2024-07-12', time: '19:00', location: '线上', place: '线上', status: '已完成', price: 128, duration: 120 },
];

export const myCoupons = [
  { id: 1, name: '新人专享', title: '新人专享', discount: 20, condition: '满100可用', expire: '2024-08-31', used: false, status: 'available', amount: 20, desc: '首单立减' },
  { id: 2, name: '周末特惠', title: '周末特惠', discount: 10, condition: '满80可用', expire: '2024-07-31', used: false, status: 'available', amount: 10, desc: '周末专享' },
  { id: 3, name: '邀请有礼', title: '邀请有礼', discount: 30, condition: '满150可用', expire: '2024-09-30', used: true, status: 'used', amount: 30, desc: '邀请好友得' },
];
