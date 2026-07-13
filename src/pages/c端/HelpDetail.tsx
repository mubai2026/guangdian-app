import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import GlassCard from '../../components/GlassCard';

const helpTopics = [
  { title: '如何预约伙伴？', content: '在首页或发现页选择心仪的伙伴，点击预约按钮，选择服务时间并支付即可。' },
  { title: '如何取消订单？', content: '在"我的订单"中找到对应订单，点击"取消订单"按钮。请注意，出发前2小时内取消可能产生违约金。' },
  { title: '如何申请退款？', content: '进入订单详情页，点击"申请退款"，选择退款原因并提交。客服将在24小时内处理。' },
  { title: '伙伴未按时到达怎么办？', content: '请联系伙伴确认情况。如超过15分钟未到，可申请全额退款。' },
  { title: '如何成为伙伴？', content: '在"我的"页面点击"成为伙伴"，提交申请资料并通过审核即可。' },
  { title: '如何修改个人资料？', content: '进入"我的"页面，点击"编辑"按钮即可修改头像、昵称、个人简介等信息。' },
  { title: '积分如何获得和使用？', content: '完成订单、每日签到、邀请好友均可获得积分。积分可用于抵扣订单金额或兑换优惠券。' },
  { title: '如何保障安全？', content: '平台所有伙伴均经过实名认证。行程中可分享实时位置给好友，遇到紧急情况可一键报警。' },
];

export default function CHelpDetail() {
  const navigate = useNavigate();

  return (
    <main className="mobile-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/c/help')}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="page-title">帮助中心</h1>
      </div>

      <section className="help-section">
        {helpTopics.map((topic, idx) => (
          <GlassCard key={idx} className="help-topic-card">
            <h3 className="help-topic-title">{topic.title}</h3>
            <p className="help-topic-content">{topic.content}</p>
          </GlassCard>
        ))}
      </section>
    </main>
  );
}
