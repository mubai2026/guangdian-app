export interface RoleCard {
  id: number;
  name: string;
  circle: string;
  description: string;
  isUnlocked: boolean;
  unlockCondition: string;
  rarity: 'common' | 'rare' | 'epic';
}

export interface CardCollection {
  id: string;
  name: string;
  circle: string;
  description: string;
  bonusPoints: number;
  bonusType: 'points' | 'cash' | 'coupon';
  bonusValue: string;
  isCompleted: boolean;
}

export const roleCards: RoleCard[] = [
  { id: 1, name: '运动健将', circle: '运动', description: '热爱运动，活力无限', isUnlocked: false, unlockCondition: '完成1次运动类订单', rarity: 'common' },
  { id: 2, name: '游泳达人', circle: '运动', description: '水中自由穿梭', isUnlocked: false, unlockCondition: '完成1次游泳订单', rarity: 'rare' },
  { id: 3, name: '跑步能手', circle: '运动', description: '奔跑吧，追风少年', isUnlocked: false, unlockCondition: '完成1次跑步订单', rarity: 'common' },
  
  { id: 4, name: '户外探险家', circle: '户外', description: '探索未知，征服自然', isUnlocked: false, unlockCondition: '完成1次户外类订单', rarity: 'epic' },
  { id: 5, name: '露营专家', circle: '户外', description: '星空下的梦想家', isUnlocked: false, unlockCondition: '完成1次露营订单', rarity: 'rare' },
  { id: 6, name: '登山爱好者', circle: '户外', description: '勇攀高峰，挑战自我', isUnlocked: false, unlockCondition: '完成1次登山订单', rarity: 'common' },
  
  { id: 7, name: '社交达人', circle: '社交', description: '左右逢源，人脉广泛', isUnlocked: false, unlockCondition: '完成1次社交类订单', rarity: 'rare' },
  { id: 8, name: 'K歌之王', circle: '娱乐', description: '麦霸登场，全场沸腾', isUnlocked: false, unlockCondition: '完成1次K歌订单', rarity: 'common' },
  { id: 9, name: '游戏高手', circle: '游戏', description: '电竞少年，实力超群', isUnlocked: false, unlockCondition: '完成1次游戏订单', rarity: 'rare' },
  { id: 10, name: '心灵导师', circle: '心灵', description: '倾听心声，温暖人心', isUnlocked: false, unlockCondition: '完成1次倾听订单', rarity: 'epic' },
];

export const cardCollections: CardCollection[] = [
  { id: 'sports', name: '运动合集', circle: '运动', description: '收集所有运动类角色卡片', bonusPoints: 500, bonusType: 'points', bonusValue: '500积分', isCompleted: false },
  { id: 'outdoor', name: '户外合集', circle: '户外', description: '收集所有户外类角色卡片', bonusPoints: 800, bonusType: 'cash', bonusValue: '20元返现', isCompleted: false },
  { id: 'social', name: '社交合集', circle: '社交', description: '收集所有社交类角色卡片', bonusPoints: 300, bonusType: 'points', bonusValue: '300积分', isCompleted: false },
  { id: 'entertainment', name: '娱乐合集', circle: '娱乐', description: '收集所有娱乐类角色卡片', bonusPoints: 400, bonusType: 'coupon', bonusValue: '10元代金券', isCompleted: false },
  { id: 'game', name: '游戏合集', circle: '游戏', description: '收集所有游戏类角色卡片', bonusPoints: 600, bonusType: 'points', bonusValue: '600积分', isCompleted: false },
  { id: 'spirit', name: '心灵合集', circle: '心灵', description: '收集所有心灵类角色卡片', bonusPoints: 1000, bonusType: 'cash', bonusValue: '30元返现', isCompleted: false },
];

export const getCircleColor = (circle: string): string => {
  const colors: Record<string, string> = {
    '运动': '#3B82F6',
    '户外': '#10B981',
    '社交': '#F59E0B',
    '兴趣': '#8B5CF6',
    '娱乐': '#EC4899',
    '技能': '#06B6D4',
    '生活': '#84CC16',
    '游戏': '#EF4444',
    '心灵': '#6366F1',
    '综合': '#6B7280',
  };
  return colors[circle] || '#6B7280';
};
