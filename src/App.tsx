import { Navigate, Route, Routes } from 'react-router-dom';
import Splash from './pages/c端/Splash';
import Login from './pages/c端/Login';
import Home from './pages/c端/Home';
import Discover from './pages/c端/Discover';
import Partner from './pages/c端/Partner';
import Booking from './pages/c端/Booking';
import Orders from './pages/c端/Orders';
import OrderDetail from './pages/c端/OrderDetail';
import Profile from './pages/c端/Profile';
import Messages from './pages/c端/Messages';
import Publish from './pages/c端/Publish';
import ContentDetail from './pages/c端/ContentDetail';
import MessageDetail from './pages/c端/MessageDetail';
import ChatPage from './pages/c端/ChatPage';
import MyFollows from './pages/c端/MyFollows';
import MyPoints from './pages/c端/MyPoints';
import MyCoupons from './pages/c端/MyCoupons';
import MyWallet from './pages/c端/MyWallet';
import MyReviews from './pages/c端/MyReviews';
import HelpFeedback from './pages/c端/HelpFeedback';
import HelpDetail from './pages/c端/HelpDetail';
import SettingsPage from './pages/c端/SettingsPage';
import SettingsNotifications from './pages/c端/SettingsNotifications';
import SettingsPrivacy from './pages/c端/SettingsPrivacy';
import SettingsSecurity from './pages/c端/SettingsSecurity';
import MapTrack from './pages/c端/MapTrack';
import BecomePartnerGuide from './pages/c端/BecomePartnerGuide';
import ApplyPartner from './pages/c端/ApplyPartner';
import PartnerReviewing from './pages/c端/PartnerReviewing';
import PartnerApproved from './pages/c端/PartnerApproved';
import PartnerRejected from './pages/c端/PartnerRejected';
import EditProfile from './pages/c端/EditProfile';
import CardCollection from './pages/c端/CardCollection';
import PointsShop from './pages/c端/PointsShop';
import InviteFriend from './pages/c端/InviteFriend';
import Payment from './pages/c端/Payment';
import Refund from './pages/c端/Refund';
import Address from './pages/c端/Address';
import ServiceDetail from './pages/c端/ServiceDetail';
import ReviewList from './pages/c端/ReviewList';
import OrderReview from './pages/c端/OrderReview';
import BReviews from './pages/b端/Reviews';
import BNotes from './pages/b端/Notes';
import BLogin from './pages/b端/Login';
import BDashboard from './pages/b端/Dashboard';
import BOrders from './pages/b端/Orders';
import BOrderDetail from './pages/b端/OrderDetail';
import BEarnings from './pages/b端/Earnings';
import BSchedule from './pages/b端/Schedule';
import BServices from './pages/b端/Services';
import BServiceEdit from './pages/b端/ServiceEdit';
import BProfileEdit from './pages/b端/ProfileEdit';
import CertificationRealname from './pages/b端/CertificationRealname';
import CertificationRealperson from './pages/b端/CertificationRealperson';
import CertificationSkills from './pages/b端/CertificationSkills';
import BSettings from './pages/b端/Settings';
import BSettingsNotifications from './pages/b端/SettingsNotifications';
import BSettingsSecurity from './pages/b端/SettingsSecurity';
import BServiceNotePublish from './pages/b端/ServiceNotePublish';
import BOrderGrabHall from './pages/b端/OrderGrabHall';
import BBlindBoxTasks from './pages/b端/BlindBoxTasks';
import BMessages from './pages/b端/Messages';
import BChatDetail from './pages/b端/ChatDetail';
import CertificationPro from './pages/b端/CertificationPro';
import CertificationCenter from './pages/b端/CertificationCenter';
import PublishNote from './pages/b端/PublishNote';
import SystemNotifications from './pages/b端/SystemNotifications';
import CDemandPublish from './pages/c端/DemandPublish';
import CBlindBox from './pages/c端/BlindBox';
import CVIPPage from './pages/c端/VIPPage';
import BProfile from './pages/b端/Profile';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminMentors from './pages/admin/Mentors';
import AdminOrders from './pages/admin/Orders';
import AdminUsers from './pages/admin/Users';
import AdminSettings from './pages/admin/Settings';
import AdminBlindBox from './pages/admin/BlindBox';
import AdminNotes from './pages/admin/Notes';
import AdminNoteDetail from './pages/admin/NoteDetail';
import AdminWallet from './pages/admin/Wallet';
import AdminOrderDetail from './pages/admin/OrderDetail';
import AdminAdmins from './pages/admin/Admins';
import AdminCertifications from './pages/admin/Certifications';
import AdminPartnerDetail from './pages/admin/PartnerDetail';
import AdminUserDetail from './pages/admin/UserDetail';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/c/login" element={<Login />} />
      <Route path="/c/home" element={<Home />} />
      <Route path="/c/discover" element={<Discover />} />
      <Route path="/c/partner/:id" element={<Partner />} />
      <Route path="/c/booking/:id" element={<Booking />} />
      <Route path="/c/orders" element={<Orders />} />
      <Route path="/c/orders/:id" element={<OrderDetail />} />
      <Route path="/c/payment" element={<Payment />} />
      <Route path="/c/refund/:id" element={<Refund />} />
      <Route path="/c/map-track" element={<MapTrack />} />
      <Route path="/c/profile" element={<Profile />} />
      <Route path="/c/messages" element={<Messages />} />
      <Route path="/c/messages/:type" element={<MessageDetail />} />
      <Route path="/c/messages/chat/:name" element={<ChatPage />} />
      <Route path="/c/publish" element={<Publish />} />
      <Route path="/c/content/:id" element={<ContentDetail />} />
      <Route path="/c/follows" element={<MyFollows />} />
      <Route path="/c/points" element={<MyPoints />} />
      <Route path="/c/coupons" element={<MyCoupons />} />
      <Route path="/c/wallet" element={<MyWallet />} />
      <Route path="/c/reviews" element={<MyReviews />} />
      <Route path="/c/help" element={<HelpFeedback />} />
      <Route path="/c/help/detail" element={<HelpDetail />} />
      <Route path="/c/settings" element={<SettingsPage />} />
      <Route path="/c/settings/notifications" element={<SettingsNotifications />} />
      <Route path="/c/settings/privacy" element={<SettingsPrivacy />} />
      <Route path="/c/settings/security" element={<SettingsSecurity />} />
      <Route path="/c/address" element={<Address />} />
      <Route path="/c/become-partner" element={<BecomePartnerGuide />} />
      <Route path="/c/apply-partner" element={<ApplyPartner />} />
      <Route path="/c/partner-reviewing" element={<PartnerReviewing />} />
      <Route path="/c/partner-approved" element={<PartnerApproved />} />
      <Route path="/c/partner-rejected" element={<PartnerRejected />} />
      <Route path="/c/profile/edit" element={<EditProfile />} />
      <Route path="/c/card-collection" element={<CardCollection />} />
      <Route path="/c/points-shop" element={<PointsShop />} />
      <Route path="/c/invite" element={<InviteFriend />} />
      <Route path="/c/service/:id" element={<ServiceDetail />} />
      <Route path="/c/reviews/:partnerId" element={<ReviewList />} />
      <Route path="/c/orders/:id/review" element={<OrderReview />} />
      <Route path="/b/login" element={<BLogin />} />
      <Route path="/b/dashboard" element={<BDashboard />} />
      <Route path="/b/orders" element={<BOrders />} />
      <Route path="/b/orders/:id" element={<BOrderDetail />} />
      <Route path="/b/earnings" element={<BEarnings />} />
      <Route path="/b/schedule" element={<BSchedule />} />
      <Route path="/b/services" element={<BServices />} />
      <Route path="/b/services/:id" element={<BServiceEdit />} />
      <Route path="/b/services/new" element={<BServiceEdit />} />
      <Route path="/b/profile" element={<BProfile />} />
      <Route path="/b/profile/edit" element={<BProfileEdit />} />
      <Route path="/b/certification/realname" element={<CertificationRealname />} />
      <Route path="/b/certification/realperson" element={<CertificationRealperson />} />
      <Route path="/b/certification/skills" element={<CertificationSkills />} />
      <Route path="/b/settings" element={<BSettings />} />
      <Route path="/b/settings/notifications" element={<BSettingsNotifications />} />
      <Route path="/b/settings/security" element={<BSettingsSecurity />} />
      <Route path="/b/settings/phone" element={<BSettingsSecurity />} />
      <Route path="/b/settings/area" element={<BSettingsNotifications />} />
      <Route path="/b/grab-hall" element={<BOrderGrabHall />} />
      <Route path="/b/blindbox-tasks" element={<BBlindBoxTasks />} />
      <Route path="/b/messages" element={<BMessages />} />
      <Route path="/b/messages/system" element={<SystemNotifications />} />
      <Route path="/b/chat/:id" element={<BChatDetail />} />
      <Route path="/b/certification/pro" element={<CertificationPro />} />
      <Route path="/b/certification/center" element={<CertificationCenter />} />
      <Route path="/b/publish-note" element={<PublishNote />} />
      <Route path="/b/reviews" element={<BReviews />} />
      <Route path="/b/notes" element={<BNotes />} />
      <Route path="/c/demand-publish" element={<CDemandPublish />} />
      <Route path="/c/blindbox" element={<CBlindBox />} />
      <Route path="/c/vip" element={<CVIPPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/mentors" element={<AdminMentors />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/users/:id" element={<AdminUserDetail />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
      <Route path="/admin/blindbox" element={<AdminBlindBox />} />
      <Route path="/admin/notes" element={<AdminNotes />} />
      <Route path="/admin/notes/:id" element={<AdminNoteDetail />} />
      <Route path="/admin/wallet" element={<AdminWallet />} />
      <Route path="/admin/orders/:id" element={<AdminOrderDetail />} />
      <Route path="/admin/certifications" element={<AdminCertifications />} />
      <Route path="/admin/admins" element={<AdminAdmins />} />
      <Route path="/admin/partners/:id" element={<AdminPartnerDetail />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
