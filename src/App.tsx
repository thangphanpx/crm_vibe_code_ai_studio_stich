import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  HelpCircle,
  LogOut,
  Plus,
  Search,
  Filter,
  Bell,
  UserCircle,
  ChevronLeft,
  ChevronRight,
  X,
  Phone,
  MessageSquare,
  Mail,
  Save,
  ArrowRight,
  Lightbulb,
  TrendingUp,
  Settings,
  BarChart2,
  ChevronDown
} from 'lucide-react';

type Route = 'dashboard' | 'leads' | 'lead-detail' | 'add-lead';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<Route>('dashboard');

  return (
    <div className="flex h-screen bg-[#fcfbf8] font-sans text-[#2a2625] overflow-hidden selection:bg-[#f5e9e5] selection:text-[#9a4021]">
      <Sidebar currentRoute={currentRoute} onNavigate={setCurrentRoute} />
      <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto w-full">
          {currentRoute === 'dashboard' && <Dashboard onNavigate={setCurrentRoute} />}
          {currentRoute === 'leads' && <LeadsRegistry onNavigate={setCurrentRoute} />}
          {currentRoute === 'lead-detail' && <LeadDetail onNavigate={setCurrentRoute} />}
          {currentRoute === 'add-lead' && <AddLead onNavigate={setCurrentRoute} />}
        </main>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// Navigation & Layout Components
// ---------------------------------------------------------

function Sidebar({ currentRoute, onNavigate }: { currentRoute: Route; onNavigate: (v: Route) => void }) {
  return (
    <aside className="hidden md:flex w-64 bg-[#f5f4ed] border-r border-[#e8e6df] flex-col py-8 px-4 h-full shrink-0">
      <div className="px-4 mb-10">
        <h1 className="font-serif text-2xl italic tracking-tight font-bold text-[#9a4021]">The Archivist</h1>
        <p className="text-[10px] uppercase tracking-widest text-[#9a4021]/80 mt-1 font-semibold">CRM Edition</p>
      </div>

      <div className="px-2 mb-8">
        <button
          onClick={() => onNavigate('add-lead')}
          className="w-full bg-gradient-to-br from-[#9a4021] to-[#b95837] text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-sm group"
        >
          <Plus size={18} className="group-hover:scale-110 transition-transform" />
          <span className="text-sm font-semibold tracking-wide">NEW LEAD</span>
        </button>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        <NavItem
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
          active={currentRoute === 'dashboard'}
          onClick={() => onNavigate('dashboard')}
        />
        <NavItem
          icon={<Users size={18} />}
          label="Leads"
          active={currentRoute === 'leads' || currentRoute === 'lead-detail'}
          onClick={() => onNavigate('leads')}
        />
        <NavItem icon={<Calendar size={18} />} label="Calendar" />
        <NavItem icon={<BarChart2 size={18} />} label="Reports" />
      </nav>

      <div className="mt-auto flex flex-col gap-1 border-t border-[#e8e6df] pt-6">
        <NavItem icon={<HelpCircle size={18} />} label="Help" />
        <NavItem icon={<Settings size={18} />} label="Settings" />
        <NavItem icon={<LogOut size={18} />} label="Sign Out" />
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active = false, onClick = () => {} }: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all focus:outline-none ${
        active
          ? 'bg-[#e5e3dc] text-[#9a4021] font-bold shadow-sm'
          : 'text-[#6e6462] hover:bg-[#ebe9e2] hover:text-[#2a2625] font-medium'
      }`}
    >
      <div className={`${active ? 'text-[#9a4021]' : 'text-[#a89f9d]'}`}>{icon}</div>
      <span className="uppercase tracking-wider text-xs">{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#9a4021]" />}
    </button>
  );
}

function Header() {
  return (
    <header className="h-20 bg-[#fbf9f2]/90 backdrop-blur-md border-b border-[#e8e6df] flex items-center justify-between px-6 md:px-10 shrink-0 relative z-20 w-full transition-shadow">
      <div className="flex items-center flex-1">
        <div className="relative group flex items-center w-full max-w-md">
          <Search className="absolute left-0 text-[#a89f9d] group-focus-within:text-[#9a4021] transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search archives, leads, or dates..."
            className="bg-transparent border-0 border-b border-[#d8d5cc] focus:ring-0 focus:border-[#9a4021] pl-8 py-2 w-full text-sm outline-none text-[#2a2625] placeholder:text-[#a89f9d] transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-6 text-[#9a4021]">
          <button className="hover:opacity-70 transition-opacity p-2"><Filter size={20} /></button>
          <button className="hover:opacity-70 transition-opacity p-2"><Bell size={20} /></button>
        </div>
        <div className="w-9 h-9 rounded-full overflow-hidden border border-[#d8d5cc] cursor-pointer">
          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=100&h=100&q=80" alt="User" />
        </div>
      </div>
    </header>
  );
}

// ---------------------------------------------------------
// Dashboard Screen
// ---------------------------------------------------------

function Dashboard({ onNavigate }: { onNavigate: (v: Route) => void }) {
  return (
    <div className="p-8 md:p-12 lg:p-16 max-w-[1400px] mx-auto w-full flex flex-col gap-12 animate-in fade-in duration-500">
      <div>
        <h2 className="font-serif text-[3.5rem] leading-tight text-[#2a2625] font-semibold tracking-tight mb-2">Xin chào, Văn An.</h2>
        <p className="text-lg text-[#6e6462]">Chúc bạn một ngày làm việc hiệu quả.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="MỚI" value="124" />
        <StatCard label="ĐANG TƯ VẤN" value="48" icon="forum" />
        <StatCard label="ĐÃ MUA" value="312" icon="check" />
        <StatCard label="TỪ CHỐI" value="16" icon="cancel" />
      </div>

      <div className="bg-white rounded-[20px] ambient-shadow pb-4 overflow-hidden border border-[#f0eee9]">
        <div className="px-10 py-8 flex justify-between items-end border-b border-[#f0eee9]/50">
          <h3 className="font-serif text-[1.75rem] font-semibold text-[#2a2625]">5 leads mới hôm nay</h3>
          <button onClick={() => onNavigate('leads')} className="text-sm font-semibold text-[#9a4021] hover:text-[#b95837] transition-colors flex items-center gap-1.5 group">
            View Complete Ledger <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="w-full overflow-x-auto px-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-4 font-semibold text-xs uppercase tracking-widest text-[#a89f9d] w-[40%]">Lead Identity</th>
                <th className="py-4 font-semibold text-xs uppercase tracking-widest text-[#a89f9d] w-[20%]">Contact</th>
                <th className="py-4 font-semibold text-xs uppercase tracking-widest text-[#a89f9d] w-[20%]">Current Status</th>
                <th className="py-4 font-semibold text-xs uppercase tracking-widest text-[#a89f9d] text-right w-[20%]">Inception Date</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-[#f0eee9]">
              <DashboardRow 
                name="Nguyễn Văn An" 
                contact="0901 234 567" 
                status="Mới" 
                date="Today, 08:42 AM" 
                img="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=facearea&facepad=2&w=100&h=100&q=80" 
              />
              <DashboardRow 
                name="Trần Thị Bích" 
                contact="0912 345 678" 
                status="Đang tư vấn" 
                date="Today, 09:15 AM" 
                statusColor="bg-[#fcf3d9] text-[#b0800d]" 
                initials="TB" 
              />
              <DashboardRow 
                name="Lê Văn Cường" 
                contact="0987 654 321" 
                status="Đã mua" 
                date="Today, 10:30 AM" 
                statusColor="bg-[#f3e8fc] text-[#6d32a8]" 
                img="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=facearea&facepad=2&w=100&h=100&q=80" 
              />
              <DashboardRow 
                name="Phạm Thị D" 
                contact="0933 445 566" 
                status="Mới" 
                date="Today, 11:05 AM" 
                initials="PD" 
              />
              <DashboardRow 
                name="Hoàng Văn E" 
                contact="0922 118 899" 
                status="Từ chối" 
                date="Today, 01:20 PM" 
                statusColor="bg-[#fcebeb] text-[#c93636]" 
                img="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?fit=facearea&facepad=2&w=100&h=100&q=80" 
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon?: string }) {
  return (
    <div className="bg-white rounded-[20px] p-6 pt-8 pb-10 ambient-shadow flex flex-col justify-between border border-[#f0eee9]">
      <div className="flex items-center justify-between mb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#a89f9d]">{label}</span>
      </div>
      <div className="font-serif text-[3.5rem] font-medium text-[#2a2625] leading-none">{value}</div>
    </div>
  );
}

function DashboardRow({ name, contact, status, date, statusColor = "bg-[#f5f4ed] text-[#6e6462]", initials, img }: any) {
  return (
    <tr className="hover:bg-[#faf9f5] transition-colors group cursor-default">
      <td className="py-5">
        <div className="flex items-center gap-4">
          {img ? (
            <img src={img} className="w-10 h-10 rounded-full object-cover shrink-0" alt={name} />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#f5f4ed] flex items-center justify-center text-[#2a2625] font-semibold text-sm shrink-0 border border-[#e8e6df]">
              {initials || name.charAt(0)}
            </div>
          )}
          <span className="font-semibold text-[#2a2625]">{name}</span>
        </div>
      </td>
      <td className="py-5 text-[#6e6462]">{contact}</td>
      <td className="py-5">
        <span className={`px-2.5 py-1 rounded text-xs font-bold tracking-wide ${statusColor}`}>{status}</span>
      </td>
      <td className="py-5 text-right text-[#6e6462] tracking-wide">{date}</td>
    </tr>
  );
}


// ---------------------------------------------------------
// Leads Registry Screen
// ---------------------------------------------------------

function LeadsRegistry({ onNavigate }: { onNavigate: (v: Route) => void }) {
  return (
    <div className="p-8 md:p-12 max-w-[1400px] mx-auto w-full flex flex-col gap-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2">
        <div>
          <h1 className="font-serif text-[3.5rem] leading-none text-[#2a2625] tracking-tight font-semibold">Leads Registry</h1>
          <p className="text-[#6e6462] mt-4 text-lg">Managing active inquiries and historical conversions.</p>
        </div>
        <div className="flex gap-4 items-center">
          <button 
             onClick={() => onNavigate('add-lead')}
             className="bg-gradient-to-tr from-[#9a4021] to-[#b95837] text-white py-2.5 px-6 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-sm whitespace-nowrap"
          >
             <Plus size={18}/> Thêm Lead
          </button>
        </div>
      </div>

      {/* Advanced Filter Bar */}
      <div className="bg-white rounded-2xl p-2 ambient-shadow border border-[#f0eee9] flex flex-col xl:flex-row gap-2 xl:items-center">
        <div className="relative flex-1 flex items-center bg-[#fdfcf9] border border-[#e8e6df] rounded-xl px-4 py-2 focus-within:border-[#9a4021] focus-within:ring-1 focus-within:ring-[#9a4021] transition-all group">
          <Search size={18} className="text-[#a89f9d] group-focus-within:text-[#9a4021] transition-colors" />
          <input 
            type="text" 
            placeholder="Search leads by name, email, or phone..." 
            className="w-full bg-transparent border-none focus:outline-none focus:ring-0 pl-3 py-1.5 text-sm text-[#2a2625] placeholder:text-[#a89f9d]"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 xl:w-auto">
          <div className="relative">
            <select className="w-full appearance-none bg-[#f5f4ed] overflow-hidden border border-[#e8e6df] text-[#2a2625] text-sm font-semibold py-3 px-4 pr-10 rounded-xl focus:outline-none focus:border-[#9a4021] focus:ring-1 focus:ring-[#9a4021] cursor-pointer transition-colors">
              <option value="">Status: All</option>
              <option value="new">Status: Mới</option>
              <option value="consulting">Status: Đang tư vấn</option>
              <option value="closed">Status: Đã mua</option>
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6e6462] pointer-events-none" />
          </div>
          <div className="relative">
            <select className="w-full appearance-none bg-[#f5f4ed] overflow-hidden border border-[#e8e6df] text-[#2a2625] text-sm font-semibold py-3 px-4 pr-10 rounded-xl focus:outline-none focus:border-[#9a4021] focus:ring-1 focus:ring-[#9a4021] cursor-pointer transition-colors">
              <option value="">Source: All</option>
              <option value="facebook">Source: Facebook</option>
              <option value="website">Source: Website</option>
              <option value="referral">Source: Referral</option>
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6e6462] pointer-events-none" />
          </div>
          <div className="relative">
            <select className="w-full appearance-none bg-[#f5f4ed] overflow-hidden border border-[#e8e6df] text-[#2a2625] text-sm font-semibold py-3 px-4 pr-10 rounded-xl focus:outline-none focus:border-[#9a4021] focus:ring-1 focus:ring-[#9a4021] cursor-pointer transition-colors">
              <option value="">Date: Anytime</option>
              <option value="today">Date: Today</option>
              <option value="7days">Date: Last 7 Days</option>
              <option value="30days">Date: Last 30 Days</option>
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6e6462] pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[20px] ambient-shadow pb-4 overflow-hidden border border-[#f0eee9]">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#f0eee9]">
                <th className="py-5 px-8 font-semibold text-xs uppercase tracking-widest text-[#a89f9d]">Contact Identity</th>
                <th className="py-5 px-8 font-semibold text-xs uppercase tracking-widest text-[#a89f9d]">Contact Info</th>
                <th className="py-5 px-8 font-semibold text-xs uppercase tracking-widest text-[#a89f9d]">Current Status</th>
                <th className="py-5 px-8 font-semibold text-xs uppercase tracking-widest text-[#a89f9d]">Source</th>
                <th className="py-5 px-8 font-semibold text-xs uppercase tracking-widest text-[#a89f9d]">Date Acquired</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-[#f0eee9]">
              <LeadRow 
                onNavigate={onNavigate}
                name="Nguyễn Văn An" 
                role="Quản lý"
                contact="090 123 4567" 
                email="an.nguyen@email.com"
                status="Mới" 
                source="Facebook"
                date="20/05/2026" 
                img="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=facearea&facepad=2&w=100&h=100&q=80" 
              />
              <LeadRow 
                onNavigate={onNavigate}
                name="Trần Thị Bích" 
                role="Trưởng phòng"
                contact="091 234 5678" 
                email="bich.tran@email.com"
                status="Đang tư vấn" 
                source="Website"
                date="19/05/2026" 
                statusColor="bg-[#fcf3d9] text-[#b0800d]" 
                img="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=facearea&facepad=2&w=100&h=100&q=80" 
              />
              <LeadRow 
                onNavigate={onNavigate}
                name="Lê Văn Cường" 
                role="Giám đốc"
                contact="098 765 4321" 
                email="cuong.le@email.com"
                status="Đã mua" 
                source="Referral"
                date="18/05/2026" 
                statusColor="bg-[#f3e8fc] text-[#6d32a8]" 
                initials="LC" 
              />
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-8 py-5 border-t border-[#f0eee9] mt-2">
          <p className="text-sm text-[#6e6462]">Showing <span className="font-semibold text-[#2a2625]">1-10</span> of <span className="font-semibold text-[#2a2625]">25</span> results</p>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-md text-[#a89f9d] hover:bg-[#f5f4ed] hover:text-[#2a2625] transition-colors"><ChevronLeft size={16} /></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md bg-[#f5f4ed] text-[#2a2625] font-semibold text-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md text-[#6e6462] hover:bg-[#f5f4ed] hover:text-[#2a2625] font-semibold text-sm transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md text-[#6e6462] hover:bg-[#f5f4ed] hover:text-[#2a2625] font-semibold text-sm transition-colors">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md text-[#a89f9d] hover:bg-[#f5f4ed] hover:text-[#2a2625] transition-colors"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* Intelligence Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#262423] rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden text-white ambient-shadow">
          <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
          <div className="relative z-10 w-full max-w-lg">
            <div className="flex items-center gap-2 text-[#c96442] mb-6">
              <TrendingUp size={20} />
              <span className="font-semibold text-[10px] uppercase tracking-widest">Lead Conversion Intelligence</span>
            </div>
            <h3 className="font-serif text-[2.5rem] leading-tight mb-4 text-[#fdfcf9]">Conversion velocity is up 12%</h3>
            <p className="text-[#a89f9d] text-base leading-relaxed">Leads originating from direct referrals are closing <br/>4 days faster than the monthly average. Consider prioritizing outreach to this segment.</p>
          </div>
        </div>
        <div className="bg-[#e7e5df] rounded-2xl p-8 flex flex-col relative overflow-hidden ambient-shadow">
          <div className="flex items-center gap-2 text-[#6e6462] mb-6">
            <Lightbulb size={20} className="fill-[#6e6462] text-[#6e6462]"/>
            <span className="font-semibold text-[10px] uppercase tracking-widest text-[#6e6462]">Pro Tip</span>
          </div>
          <h4 className="font-serif text-[2rem] text-[#2a2625] leading-snug mb-4">The Follow-up Rule</h4>
          <p className="text-[#595251] text-[15px] leading-relaxed mb-8 flex-1">Data shows that contacting a 'New' lead within the first 5 minutes increases conversion odds by 9x. Keep your notifications active.</p>
          <button className="self-start text-[#2a2625] text-sm font-semibold border-b border-[#2a2625]/30 hover:border-[#2a2625] pb-1.5 transition-colors flex items-center gap-1.5 group">
            Read full brief <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
          </button>
        </div>
      </div>
    </div>
  );
}

function LeadRow({ name, role, contact, email, status, source, date, statusColor = "bg-[#f5f4ed] text-[#6e6462]", initials, img, onNavigate }: any) {
  return (
    <tr className="hover:bg-[#faf9f5] transition-colors cursor-pointer group" onClick={() => onNavigate('lead-detail')}>
      <td className="py-5 px-8">
        <div className="flex items-center gap-4">
          {img ? (
            <img src={img} className="w-12 h-12 rounded-full object-cover shrink-0" alt={name} />
          ) : (
            <div className="w-12 h-12 rounded-full bg-[#f5f4ed] flex items-center justify-center font-serif text-[#2a2625] text-xl shrink-0 border border-[#e8e6df]">
              {initials}
            </div>
          )}
          <div>
            <p className="font-bold text-[#2a2625] mb-0.5">{name}</p>
            <p className="text-xs text-[#6e6462]">{role}</p>
          </div>
        </div>
      </td>
      <td className="py-5 px-8">
        <p className="font-medium text-[#2a2625] mb-0.5">{contact}</p>
        <p className="text-xs text-[#a89f9d]">{email}</p>
      </td>
      <td className="py-5 px-8">
        <span className={`px-2.5 py-1 rounded text-xs font-bold tracking-wide ${statusColor}`}>{status}</span>
      </td>
      <td className="py-5 px-8 text-[#6e6462] font-medium">{source}</td>
      <td className="py-5 px-8 text-[#6e6462] tracking-wide">{date}</td>
    </tr>
  );
}

// ---------------------------------------------------------
// Lead Detail Screen
// ---------------------------------------------------------

function LeadDetail({ onNavigate }: { onNavigate: (v: Route) => void }) {
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto w-full relative animate-in fade-in duration-500">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button onClick={() => onNavigate('leads')} className="text-sm font-semibold text-[#6e6462] hover:text-[#9a4021] transition-colors flex items-center gap-2 group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Danh sách Leads
        </button>
        <div className="flex gap-3">
          <button className="px-5 py-2 text-sm font-semibold rounded-lg border border-[#e8e6df] bg-white text-[#2a2625] hover:bg-[#f5f4ed] transition-colors shadow-sm">Sửa</button>
          <button className="px-5 py-2 text-sm font-semibold rounded-lg border border-[#fcebeb] bg-white text-[#c93636] hover:bg-[#fcebeb] transition-colors shadow-sm">Xóa</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main profile */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-[24px] p-8 pb-10 ambient-shadow relative overflow-hidden border border-[#f0eee9]">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#f5e9e5] blur-3xl rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none opacity-40" />
            <div className="flex flex-col sm:flex-row items-start gap-8 relative z-10">
              <div className="w-28 h-28 rounded-full bg-[#f5f4ed] flex flex-shrink-0 items-center justify-center font-serif text-[2.5rem] text-[#9a4021] border border-[#e8e6df]">
                VA
              </div>
              <div className="flex-1 w-full mt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                  <h2 className="font-serif text-[2.5rem] font-bold text-[#2a2625] leading-none tracking-tight">Nguyễn Văn An</h2>
                  <div className="flex gap-2 shrink-0">
                    <span className="px-3 py-1 rounded bg-[#f5f4ed] text-[#6e6462] text-xs font-bold tracking-wide">Đang tư vấn</span>
                    <span className="px-3 py-1 rounded bg-[#f1edfb] text-[#714bc2] text-xs font-bold tracking-wide">Facebook</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-8 mt-10 pt-8 border-t border-[#f0eee9]">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] uppercase tracking-widest text-[#a89f9d] font-bold">SĐT</span>
                    <span className="text-[#2a2625] font-medium tracking-wide">090 123 4567</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] uppercase tracking-widest text-[#a89f9d] font-bold">EMAIL</span>
                    <span className="text-[#2a2625] font-medium tracking-wide">an.nguyen@example.com</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] uppercase tracking-widest text-[#a89f9d] font-bold">NGÀY TẠO</span>
                    <span className="text-[#2a2625] font-medium tracking-wide">12/10/2026</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] uppercase tracking-widest text-[#a89f9d] font-bold">ĐỊA ĐIỂM</span>
                    <span className="text-[#2a2625] font-medium tracking-wide">Hà Nội, Việt Nam</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ghi chú ban đầu */}
          <div className="bg-[#faf9f5] border border-[#e8e6df] rounded-[24px] p-8 relative overflow-hidden">
            <h3 className="font-semibold text-sm text-[#6e6462] mb-6">Ghi chú ban đầu</h3>
            <div className="absolute top-4 left-6 text-6xl text-[#e8e6df] font-serif leading-none selct-none pointer-events-none">"</div>
            <p className="font-serif italic text-[#2a2625] text-[1.375rem] leading-[1.6] max-w-2xl relative z-10 pl-4">
              Khách hàng quan tâm đến các giải pháp CRM cổ điển, ưu tiên tính bảo mật và phong cách tối giản.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[24px] p-8 ambient-shadow h-full border border-[#f0eee9]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif text-[1.5rem] font-semibold text-[#2a2625]">Lịch sử tương tác</h3>
              <button className="p-2 rounded-full hover:bg-[#f5f4ed] text-[#9a4021] transition-colors" onClick={() => setIsNoteOpen(true)} title="Thêm ghi chú">
                <Plus size={20} strokeWidth={2.5} />
              </button>
            </div>
            
            <div className="relative pl-3 mt-8">
              <div className="absolute top-2 bottom-0 left-3 w-[2px] bg-[#f0eee9]" />
              <div className="flex flex-col gap-8">
                {/* Timeline item */}
                <div className="relative pl-8">
                  <div className="absolute -left-[6px] top-1 w-[14px] h-[14px] rounded-full bg-[#9a4021] ring-4 ring-white" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-[#a89f9d] font-bold uppercase tracking-widest">10:30 AM</span>
                    <h4 className="font-semibold text-[#2a2625] mt-0.5">Gọi điện tư vấn lần 1</h4>
                    <p className="text-sm text-[#6e6462] mt-1 leading-relaxed">Đã thảo luận về nhu cầu cơ bản.</p>
                  </div>
                </div>
                <div className="relative pl-8">
                  <div className="absolute -left-[6px] top-1 w-[14px] h-[14px] rounded-full bg-[#e8e6df] ring-4 ring-white" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-[#a89f9d] font-bold uppercase tracking-widest">02:15 PM</span>
                    <h4 className="font-semibold text-[#2a2625] mt-0.5">Gửi báo giá sơ bộ</h4>
                    <p className="text-sm text-[#6e6462] mt-1 leading-relaxed">Đã gửi file PDF qua email.</p>
                  </div>
                </div>
                <div className="relative pl-8">
                  <div className="absolute -left-[6px] top-1 w-[14px] h-[14px] rounded-full bg-[#e8e6df] ring-4 ring-white" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-[#a89f9d] font-bold uppercase tracking-widest">04:45 PM</span>
                    <h4 className="font-semibold text-[#2a2625] mt-0.5">Phản hồi qua Zalo</h4>
                    <p className="text-sm text-[#6e6462] mt-1 leading-relaxed">Khách hàng hẹn xem demo vào thứ Hai.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isNoteOpen && <AddNoteModal onClose={() => setIsNoteOpen(false)} />}
    </div>
  );
}

// ---------------------------------------------------------
// Add Lead Screen
// ---------------------------------------------------------

function AddLead({ onNavigate }: { onNavigate: (v: Route) => void }) {
  return (
    <div className="p-8 md:p-12 lg:p-16 mb-12 flex justify-center w-full animate-in fade-in duration-500">
      <div className="w-full max-w-[640]">
        <button onClick={() => onNavigate('leads')} className="text-sm font-semibold text-[#6e6462] hover:text-[#9a4021] transition-colors flex items-center gap-2 mb-8 group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Leads / Thêm khách hàng mới
        </button>
        
        <div className="mb-12">
          <h2 className="font-serif text-[3rem] leading-none font-semibold text-[#2a2625] mb-4">Thêm khách hàng mới</h2>
          <p className="text-[#6e6462] text-xl font-serif italic max-w-lg">Nhập thông tin chi tiết để bắt đầu quản lý khách hàng tiềm năng này.</p>
        </div>

        <form className="flex flex-col gap-10 max-w-3xl">
          <div className="flex flex-col gap-3">
            <label className="text-[11px] uppercase tracking-[0.1em] text-[#a89f9d] font-bold">TÊN KHÁCH HÀNG <span className="text-[#9a4021]">*</span></label>
            <input type="text" placeholder="Nguyễn Văn A" className="w-full bg-transparent border-0 border-b border-[#d8d5cc] focus:border-[#9a4021] focus:ring-0 px-0 py-2.5 text-[1.125rem] text-[#2a2625] placeholder:text-[#d8d5cc] font-medium transition-colors" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="flex flex-col gap-3">
              <label className="text-[11px] uppercase tracking-[0.1em] text-[#a89f9d] font-bold">SỐ ĐIỆN THOẠI <span className="text-[#9a4021]">*</span></label>
              <input type="text" placeholder="09x xxxx xxx" className="w-full bg-transparent border-0 border-b border-[#d8d5cc] focus:border-[#9a4021] focus:ring-0 px-0 py-2.5 text-[1.125rem] text-[#2a2625] placeholder:text-[#d8d5cc] font-medium transition-colors" />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[11px] uppercase tracking-[0.1em] text-[#a89f9d] font-bold">EMAIL <span className="text-[#d8d5cc] normal-case tracking-normal font-medium">(Optional)</span></label>
              <input type="email" placeholder="example@gmail.com" className="w-full bg-transparent border-0 border-b border-[#d8d5cc] focus:border-[#9a4021] focus:ring-0 px-0 py-2.5 text-[1.125rem] text-[#2a2625] placeholder:text-[#d8d5cc] font-medium transition-colors" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="flex flex-col gap-3 relative">
              <label className="text-[11px] uppercase tracking-[0.1em] text-[#a89f9d] font-bold">NGUỒN KHÁCH HÀNG</label>
              <select className="w-full bg-transparent border-0 border-b border-[#d8d5cc] focus:border-[#9a4021] focus:ring-0 px-0 py-2.5 text-[1.125rem] text-[#2a2625] outline-none font-medium appearance-none transition-colors">
                <option>Facebook</option>
                <option>Website</option>
                <option>Referral</option>
              </select>
            </div>
            <div className="flex flex-col gap-3 relative">
              <label className="text-[11px] uppercase tracking-[0.1em] text-[#a89f9d] font-bold">TRẠNG THÁI</label>
              <select className="w-full bg-transparent border-0 border-b border-[#d8d5cc] focus:border-[#9a4021] focus:ring-0 px-0 py-2.5 text-[1.125rem] text-[#2a2625] outline-none font-medium appearance-none transition-colors">
                <option>Mới</option>
                <option>Đang tư vấn</option>
              </select>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 mt-2 relative">
            <label className="text-[11px] uppercase tracking-[0.1em] text-[#a89f9d] font-bold">GHI CHÚ</label>
            <div className="absolute top-9 left-4 text-3xl text-[#d8d5cc] font-serif pointer-events-none pr-2 hidden sm:block">"</div>
            <textarea rows={4} placeholder="Thêm ghi chú..." className="w-full bg-transparent border border-[#d8d5cc] focus:border-[#9a4021] focus:ring-1 focus:ring-[#9a4021] rounded-xl p-5 text-[1.125rem] text-[#2a2625] placeholder:text-[#d8d5cc] resize-none font-serif italic transition-all"></textarea>
          </div>

          <div className="flex items-center justify-end gap-5 mt-6 border-t border-[#e8e6df] pt-10">
            <button type="button" onClick={() => onNavigate('leads')} className="px-8 py-3.5 rounded-lg border border-[#d8d5cc] text-[#6e6462] hover:bg-[#f5f4ed] font-semibold text-sm transition-colors uppercase tracking-wider bg-white">Hủy</button>
            <button type="button" onClick={() => onNavigate('leads')} className="px-10 py-3.5 rounded-lg bg-[#cc6b4b] text-white hover:bg-[#9a4021] transition-colors font-semibold text-sm uppercase tracking-wider shadow-sm">Lưu khách hàng</button>
          </div>
        </form>
      </div>
    </div>
  );
}


// ---------------------------------------------------------
// Add Note Modal Component
// ---------------------------------------------------------

function AddNoteModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-[500px] rounded-[24px] ambient-shadow flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-7 border-b border-[#f0eee9]">
          <h2 className="font-serif text-[1.5rem] font-semibold text-[#2a2625]">Thêm Ghi Chú Tương Tác</h2>
          <button onClick={onClose} className="text-[#a89f9d] hover:text-[#9a4021] transition-colors p-1.5 rounded-full hover:bg-[#f5f4ed]"><X size={20} /></button>
        </div>

        <div className="p-7 overflow-y-auto flex-1 flex flex-col gap-8">
          <div>
            <label className="block text-[10px] font-bold text-[#a89f9d] uppercase tracking-[0.1em] mb-3 border-b border-[#f0eee9] pb-2">Loại Tương Tác</label>
            <div className="grid grid-cols-4 gap-3 mt-4">
              <button className="flex flex-col items-center justify-center py-4 bg-[#f5f4ed] rounded-xl border-2 border-[#9a4021] text-[#9a4021] transition-colors">
                <Phone size={22} className="mb-1.5" />
                <span className="text-xs font-bold tracking-wide">Call</span>
              </button>
              <button className="flex flex-col items-center justify-center py-4 bg-white rounded-xl border-2 border-[#e8e6df] text-[#6e6462] hover:bg-[#fcfbf8] hover:border-[#d8d5cc] transition-colors">
                <MessageSquare size={22} className="mb-1.5" />
                <span className="text-xs font-semibold tracking-wide">Chat</span>
              </button>
              <button className="flex flex-col items-center justify-center py-4 bg-white rounded-xl border-2 border-[#e8e6df] text-[#6e6462] hover:bg-[#fcfbf8] hover:border-[#d8d5cc] transition-colors">
                <Users size={22} className="mb-1.5" />
                <span className="text-xs font-semibold tracking-wide">Meeting</span>
              </button>
              <button className="flex flex-col items-center justify-center py-4 bg-white rounded-xl border-2 border-[#e8e6df] text-[#6e6462] hover:bg-[#fcfbf8] hover:border-[#d8d5cc] transition-colors">
                <Mail size={22} className="mb-1.5" />
                <span className="text-xs font-semibold tracking-wide">Email</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-[0.1em] text-[#a89f9d] font-bold">Tiêu đề</label>
            <input type="text" placeholder="Ví dụ: Cuộc gọi tư vấn lần 1" className="bg-transparent border-0 border-b border-[#d8d5cc] focus:border-[#9a4021] focus:ring-0 px-0 py-2.5 text-[#2a2625] placeholder:text-[#d8d5cc] font-medium text-base transition-colors" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-[0.1em] text-[#a89f9d] font-bold">Nội dung</label>
            <textarea rows={4} placeholder="Nhập chi tiết ghi chú..." className="w-full bg-[#faf9f5] border-0 rounded-xl focus:ring-1 focus:ring-[#9a4021] px-4 py-4 text-[#2a2625] placeholder:text-[#d8d5cc] resize-none text-base mt-1 transition-shadow"></textarea>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.1em] text-[#a89f9d] font-bold">Ngày thực hiện</label>
              <input type="date" className="bg-transparent border-0 border-b border-[#d8d5cc] focus:border-[#9a4021] focus:ring-0 px-0 py-2.5 text-[#2a2625] font-medium text-base transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.1em] text-[#a89f9d] font-bold">Thời lượng (phút)</label>
              <input type="number" placeholder="30" className="bg-transparent border-0 border-b border-[#d8d5cc] focus:border-[#9a4021] focus:ring-0 px-0 py-2.5 text-[#2a2625] placeholder:text-[#d8d5cc] font-medium text-base transition-colors" />
            </div>
          </div>
        </div>

        <div className="p-6 pt-4 pb-6 flex items-center justify-end gap-3 bg-[#fcfbf8] border-t border-[#f0eee9]">
          <button onClick={onClose} className="px-6 py-2.5 rounded-lg text-[#6e6462] font-semibold hover:bg-[#e8e6df] transition-colors text-sm border border-transparent">Hủy</button>
          <button onClick={onClose} className="px-7 py-2.5 rounded-lg text-white font-semibold flex items-center gap-2 text-sm shadow-sm transition-opacity hover:opacity-90 bg-gradient-to-br from-[#9a4021] to-[#b95837]">
            Lưu ghi chú
          </button>
        </div>
      </div>
    </div>
  );
}
