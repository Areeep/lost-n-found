/**
 * @fileoverview Desktop Left Navigation Sidebar.
 * Matches Instagram-style web layout defined in design.md and mockup.
 */

import { Home, Search, Bell, MessageSquare, User, Plus } from "lucide-react";

const NAV_ITEMS = [
  { label: "Beranda", icon: Home, active: false },
  { label: "Cari", icon: Search, active: false },
  { label: "Notifikasi", icon: Bell, active: false },
  { label: "Pesan", icon: MessageSquare, active: false },
  { label: "Profil", icon: User, active: false },
];

/**
 * Persistent sidebar for desktop screen.
 * @param {Object} props
 * @param {() => void} [props.onCreatePostClick] - Trigger for post creation modal/view.
 */
export function SidebarNav({ onCreatePostClick }) {
  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col justify-between border-r border-gray-200 bg-white p-6">
      <div>
        {/* Brand Logo */}
        <div className="mb-8 flex items-center gap-1">
          <span className="font-heading text-[28px] font-extrabold tracking-tight text-gray-900">
            orbit
          </span>
          <span className="font-heading text-[28px] font-extrabold text-orange-700">
            .
          </span>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={`#${item.label.toLowerCase()}`}
                className="flex min-h-[44px] items-center gap-4 rounded-xl px-3 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
              >
                <Icon className="h-5 w-5 text-gray-900" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Primary CTA button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={onCreatePostClick}
            className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-900 text-sm font-bold text-white shadow-sm transition hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" />
            <span>Posting barang</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
