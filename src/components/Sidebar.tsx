import { 
  Activity, FileText, LayoutDashboard, Receipt, Settings,
  ShieldCheck, Stethoscope, Users, LogOut, Beaker, Camera, Pill,
  Zap, Bed, Scissors, Siren, Baby, ClipboardList, DollarSign,
  ShoppingCart, Video, BarChart3, Smartphone, ShieldAlert, Lock,
  Search, Heart, Cog, X
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { cn } from "../lib/utils";

const menu = [
  {
    group: "PATIENT MANAGEMENT",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/" },
      { label: "Patients", icon: Users, href: "/search" },
      { label: "New Registration", icon: Users, href: "/registration" },
      { label: "Population Health", icon: Heart, href: "/population" },
    ],
  },
  {
    group: "CLINICAL & RECORDS",
    items: [
      { label: "Consultations", icon: Stethoscope, href: "/ehr" },
      { label: "Nursing", icon: ClipboardList, href: "/nursing" },
      { label: "Documents (DMS)", icon: FileText, href: "/documents" },
    ],
  },
  {
    group: "ACUITY & IPD",
    items: [
      { label: "Emergency", icon: Siren, href: "/emergency" },
      { label: "Inpatient", icon: Bed, href: "/inpatient" },
      { label: "Surgery", icon: Scissors, href: "/surgery" },
      { label: "Maternity", icon: Baby, href: "/maternity" },
      { label: "Telemedicine", icon: Video, href: "/telemed" },
    ],
  },
  {
    group: "PATIENT ENGAGEMENT",
    items: [{ label: "Patient Portal", icon: Smartphone, href: "/portal" }],
  },
  {
    group: "DIAGNOSTICS & PHARMACY",
    items: [
      { label: "Laboratory", icon: Beaker, href: "/lab" },
      { label: "Radiology", icon: Camera, href: "/radiology" },
      { label: "Pharmacy", icon: Pill, href: "/pharmacy" },
    ],
  },
  {
    group: "FINANCE & ADMIN",
    items: [
      { label: "Billing", icon: Receipt, href: "/billing" },
      { label: "Medical Plans", icon: ShieldCheck, href: "/insurance" },
      { label: "Accounting", icon: DollarSign, href: "/accounting" },
      { label: "Procurement", icon: ShoppingCart, href: "/procurement" },
      { label: "Human Resources", icon: Users, href: "/hr" },
    ],
  },
  {
    group: "GOVERNANCE & BI",
    items: [
      { label: "Quality & Compliance", icon: ShieldAlert, href: "/quality" },
      { label: "Analytics & BI", icon: BarChart3, href: "/analytics" },
      { label: "Security & Audit", icon: Lock, href: "/security" },
    ],
  },
  {
    group: "SYSTEM MANAGEMENT",
    items: [
      { label: "Administration", icon: Settings, href: "/admin" },
      { label: "Mobile Ecosystem", icon: Smartphone, href: "/mobile" },
      { label: "Interoperability", icon: Zap, href: "/interop" },
      { label: "System Settings", icon: Cog, href: "/settings" },
    ],
  },
];

function getInitials(user: any): string {
  if (user?.displayName) {
    const parts = user.displayName.trim().split(' ');
    return parts.length >= 2
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  }
  if (user?.email) return user.email.slice(0, 2).toUpperCase();
  return 'US';
}

function getDisplayName(user: any): string {
  if (user?.displayName) return user.displayName;
  if (user?.email) return user.email.split('@')[0];
  return 'System User';
}

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const initials = getInitials(user);
  const displayName = getDisplayName(user);

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-slate-200 w-[280px] shrink-0">
      {/* LOGO */}
      <div className="flex h-24 items-center justify-between border-b border-slate-800/50 px-6 bg-slate-900/20">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#3B82F6] text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            <Activity className="h-6 w-6 relative z-10" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white italic uppercase">
              Synex<span className="text-[#3B82F6]">420</span>
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Secure Core</span>
            </div>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-all">
            <X size={18} />
          </button>
        )}
      </div>

      {/* MENU */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-8">
          {menu.map((group) => (
            <div key={group.group}>
              <p className="mb-3 px-3 text-[11px] font-bold tracking-[0.12em] text-slate-500 uppercase">{group.group}</p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex h-11 items-center gap-3 rounded-xl px-4 text-sm font-medium transition-all",
                        active
                          ? "border-l-4 border-[#3B82F6] bg-[#3B82F6]/15 text-white"
                          : "text-slate-300 hover:bg-[#1E293B] hover:text-white"
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* USER PROFILE */}
      <div className="border-t border-slate-800 p-4">
        <div className="rounded-xl bg-[#1E293B] p-4 group cursor-pointer hover:bg-slate-800 transition-colors">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3B82F6] font-semibold text-white shadow-lg text-xs shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-white truncate text-sm">{displayName}</h4>
              <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-400 truncate">
                <ShieldCheck className="h-3 w-3 text-emerald-500 shrink-0" />
                <span className="truncate">{user?.email || 'Authenticated User'}</span>
              </div>
            </div>
            <button
              onClick={logout}
              className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
              title="Sign Out"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
