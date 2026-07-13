import { avatars } from './data';

const firstNames = ['张', '李', '王', '刘', '陈', '杨', '黄', '赵', '周', '吴', '徐', '孙', '马', '朱', '胡', '郭', '何', '高', '林', '罗', '郑', '梁', '谢', '宋', '唐', '许', '韩', '冯', '邓', '曹'];
const lastNames = ['伟', '芳', '娜', '秀英', '敏', '静', '丽', '强', '磊', '军', '洋', '勇', '艳', '杰', '娟', '涛', '明', '超', '秀兰', '霞', '平', '刚', '桂英', '文', '华', '玲', '辉', '鑫', '斌', '波'];
const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都', '南京', '武汉', '西安', '重庆', '苏州', '天津', '长沙', '青岛', '郑州', '大连', '厦门', '济南', '合肥', '福州'];
const serviceTypes = ['情感倾听', '逛街陪购', '运动健身', '美食探店', '看展同行', '咖啡探店', '城市徒步', '摄影跟拍', '学习陪伴', '桌游组局', '户外徒步', '健身指导'];

function seededRandom(seed: number) {
  let s = seed;
  return function() {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function generatePhone(index: number): string {
  const prefixes = ['130', '131', '132', '133', '134', '135', '136', '137', '138', '139', '150', '151', '152', '153', '155', '156', '157', '158', '159', '180', '181', '182', '183', '184', '185', '186', '187', '188', '189'];
  const prefix = prefixes[index % prefixes.length];
  const suffix = String(10000000 + index).slice(-8);
  return prefix + suffix;
}

function generateName(index: number, random: () => number): string {
  const firstName = firstNames[Math.floor(random() * firstNames.length)];
  const lastNameLen = random() > 0.5 ? 1 : 2;
  let lastName = lastNames[Math.floor(random() * lastNames.length)];
  if (lastNameLen === 2) {
    lastName += lastNames[Math.floor(random() * lastNames.length)];
  }
  return firstName + lastName;
}

export interface MockUser {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  city: string;
  registerTime: string;
  status: '正常' | '冻结' | '待审核';
  userType: '普通用户' | '伙伴' | 'VIP用户';
  level: number;
  totalOrders: number;
  totalSpent: number;
  isPartner: boolean;
}

export interface MockOrder {
  id: string;
  userId: string;
  userName: string;
  partnerId: string;
  partnerName: string;
  service: string;
  amount: number;
  status: '进行中' | '已完成' | '已取消' | '待接单';
  createTime: string;
  finishTime?: string;
  duration: number;
  rating?: number;
  comment?: string;
}

export interface MockInteraction {
  id: string;
  userId: string;
  targetId: string;
  type: '关注' | '收藏' | '点赞' | '评论' | '聊天';
  content?: string;
  createTime: string;
}

let cachedUsers: MockUser[] | null = null;
let cachedOrders: MockOrder[] | null = null;
let cachedInteractions: MockInteraction[] | null = null;

export function generateMockData(userCount: number = 20000) {
  if (cachedUsers && cachedOrders && cachedInteractions) {
    return { users: cachedUsers, orders: cachedOrders, interactions: cachedInteractions };
  }

  const random = seededRandom(42);
  const users: MockUser[] = [];
  const orders: MockOrder[] = [];
  const interactions: MockInteraction[] = [];

  for (let i = 0; i < userCount; i++) {
    const isPartner = random() > 0.9;
    const userType = isPartner ? '伙伴' : (random() > 0.95 ? 'VIP用户' : '普通用户');
    const totalOrders = Math.floor(random() * 50);
    const totalSpent = Math.floor(totalOrders * (50 + random() * 200));
    
    const registerDate = new Date(2025, 0, 1);
    registerDate.setDate(registerDate.getDate() + Math.floor(random() * 540));
    
    let status: MockUser['status'] = '正常';
    if (random() > 0.97) status = '冻结';
    else if (random() > 0.95) status = '待审核';

    users.push({
      id: `U${String(i + 1).padStart(6, '0')}`,
      name: generateName(i, random),
      phone: generatePhone(i),
      avatar: avatars[i % avatars.length],
      city: cities[Math.floor(random() * cities.length)],
      registerTime: registerDate.toISOString().split('T')[0],
      status,
      userType,
      level: Math.floor(random() * 10) + 1,
      totalOrders,
      totalSpent,
      isPartner,
    });
  }

  const partners = users.filter(u => u.isPartner);
  let orderId = 1;
  let interactionId = 1;

  for (let i = 0; i < userCount; i++) {
    const user = users[i];
    const orderCount = Math.floor(random() * 30);
    
    for (let j = 0; j < orderCount; j++) {
      const partner = partners[Math.floor(random() * partners.length)];
      const service = serviceTypes[Math.floor(random() * serviceTypes.length)];
      const amount = Math.floor(50 + random() * 300);
      const duration = Math.floor(30 + random() * 180);
      
      const orderDate = new Date(2026, 0, 1);
      orderDate.setDate(orderDate.getDate() + Math.floor(random() * 190));
      orderDate.setHours(Math.floor(random() * 24), Math.floor(random() * 60));
      
      let status: MockOrder['status'] = '已完成';
      const statusRand = random();
      if (statusRand > 0.95) status = '进行中';
      else if (statusRand > 0.9) status = '已取消';
      else if (statusRand > 0.85) status = '待接单';
      
      let finishTime: string | undefined;
      if (status === '已完成') {
        const ft = new Date(orderDate);
        ft.setMinutes(ft.getMinutes() + duration);
        finishTime = ft.toISOString();
      }
      
      let rating: number | undefined;
      let comment: string | undefined;
      if (status === '已完成' && random() > 0.3) {
        rating = Math.floor(3 + random() * 3);
        if (random() > 0.5) {
          const comments = ['服务非常好，很专业', '人很nice，聊得很开心', '下次还会再来', '推荐给大家', '体验很棒'];
          comment = comments[Math.floor(random() * comments.length)];
        }
      }

      orders.push({
        id: `GD${String(orderId++).padStart(6, '0')}`,
        userId: user.id,
        userName: user.name,
        partnerId: partner.id,
        partnerName: partner.name,
        service,
        amount,
        status,
        createTime: orderDate.toISOString(),
        finishTime,
        duration,
        rating,
        comment,
      });
    }

    const interactionCount = Math.floor(random() * 50);
    for (let j = 0; j < interactionCount; j++) {
      const target = users[Math.floor(random() * users.length)];
      const types: MockInteraction['type'][] = ['关注', '收藏', '点赞', '评论', '聊天'];
      const type = types[Math.floor(random() * types.length)];
      
      const interDate = new Date(2026, 0, 1);
      interDate.setDate(interDate.getDate() + Math.floor(random() * 190));
      
      let content: string | undefined;
      if (type === '评论') {
        const contents = ['不错哦', '支持一下', '期待下次', '已关注', '很有意思'];
        content = contents[Math.floor(random() * contents.length)];
      } else if (type === '聊天') {
        const contents = ['你好', '在吗？', '可以预约吗', '请问什么时候有空', '详细聊一下'];
        content = contents[Math.floor(random() * contents.length)];
      }

      interactions.push({
        id: `I${String(interactionId++).padStart(8, '0')}`,
        userId: user.id,
        targetId: target.id,
        type,
        content,
        createTime: interDate.toISOString(),
      });
    }
  }

  cachedUsers = users;
  cachedOrders = orders;
  cachedInteractions = interactions;

  return { users, orders, interactions };
}

export function getDashboardStats() {
  const { users, orders, interactions } = generateMockData(20000);
  
  const totalRevenue = orders
    .filter(o => o.status === '已完成')
    .reduce((sum, o) => sum + o.amount, 0);
  
  const activeUsers = users.filter(u => u.totalOrders > 0).length;
  const partnerCount = users.filter(u => u.isPartner).length;
  const approvalRate = Math.floor((users.filter(u => u.status === '正常').length / users.length) * 100);
  
  const today = new Date('2026-07-09');
  const todayOrders = orders.filter(o => {
    const d = new Date(o.createTime);
    return d.toDateString() === today.toDateString();
  }).length;
  
  const todayRevenue = orders
    .filter(o => {
      const d = new Date(o.createTime);
      return d.toDateString() === today.toDateString() && o.status === '已完成';
    })
    .reduce((sum, o) => sum + o.amount, 0);

  const last7Days: { date: string; orders: number; revenue: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayOrders = orders.filter(o => o.createTime.startsWith(dateStr));
    const dayRevenue = dayOrders.filter(o => o.status === '已完成').reduce((sum, o) => sum + o.amount, 0);
    last7Days.push({ date: dateStr.slice(5), orders: dayOrders.length, revenue: dayRevenue });
  }

  const serviceStats = serviceTypes.map(service => {
    const serviceOrders = orders.filter(o => o.service === service);
    return {
      name: service,
      count: serviceOrders.length,
      revenue: serviceOrders.filter(o => o.status === '已完成').reduce((sum, o) => sum + o.amount, 0),
    };
  }).sort((a, b) => b.count - a.count);

  const cityStats = cities.map(city => {
    const cityUsers = users.filter(u => u.city === city);
    return {
      name: city,
      users: cityUsers.length,
      orders: orders.filter(o => users.find(u => u.id === o.userId)?.city === city).length,
    };
  }).sort((a, b) => b.users - a.users).slice(0, 10);

  const avgRating = orders
    .filter(o => o.rating)
    .reduce((sum, o) => sum + (o.rating || 0), 0) / 
    (orders.filter(o => o.rating).length || 1);

  const completedRate = Math.floor(
    (orders.filter(o => o.status === '已完成').length / orders.length) * 100
  );

  return {
    totalUsers: users.length,
    totalOrders: orders.length,
    totalRevenue,
    activeUsers,
    partnerCount,
    approvalRate,
    todayOrders,
    todayRevenue,
    last7Days,
    serviceStats,
    cityStats,
    avgRating: avgRating.toFixed(1),
    completedRate,
    totalInteractions: interactions.length,
    pendingReviews: users.filter(u => u.status === '待审核').length,
    abnormalOrders: orders.filter(o => o.status === '进行中').length,
    complaints: Math.floor(orders.length * 0.002),
  };
}

export function getUsersPage(page: number = 1, pageSize: number = 20, search?: string, statusFilter?: string) {
  let { users } = generateMockData(20000);
  
  if (search) {
    users = users.filter(u => 
      u.name.includes(search) || 
      u.phone.includes(search) || 
      u.id.includes(search)
    );
  }
  
  if (statusFilter && statusFilter !== '全部') {
    users = users.filter(u => u.status === statusFilter);
  }
  
  const start = (page - 1) * pageSize;
  const paginatedUsers = users.slice(start, start + pageSize);
  
  return {
    users: paginatedUsers,
    total: users.length,
    page,
    pageSize,
    totalPages: Math.ceil(users.length / pageSize),
  };
}

export function getOrdersPage(page: number = 1, pageSize: number = 20, statusFilter?: string, serviceFilter?: string) {
  let { orders } = generateMockData(20000);
  
  if (statusFilter && statusFilter !== '全部') {
    orders = orders.filter(o => o.status === statusFilter);
  }
  
  if (serviceFilter && serviceFilter !== '全部') {
    orders = orders.filter(o => o.service === serviceFilter);
  }
  
  const start = (page - 1) * pageSize;
  const paginatedOrders = orders.slice(start, start + pageSize);
  
  return {
    orders: paginatedOrders,
    total: orders.length,
    page,
    pageSize,
    totalPages: Math.ceil(orders.length / pageSize),
  };
}
