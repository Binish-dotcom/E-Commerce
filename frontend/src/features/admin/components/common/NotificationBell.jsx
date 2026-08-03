import { useState } from "react";
import {
  useGetNotificationsQuery,
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
} from "../../adminApi";

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const { data } = useGetNotificationsQuery({ page: 1, limit: 10 }, { pollingInterval: 60000 });
  const [markRead] = useMarkNotificationReadMutation();
  const [markAllRead] = useMarkAllNotificationsReadMutation();

  const unreadCount = data?.unreadCount || 0;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="relative flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-lg dark:border-slate-700 dark:bg-slate-800"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 max-h-96 w-80 overflow-y-auto rounded-2xl border border-slate-200/70 bg-white p-3 shadow-lg dark:border-slate-700/60 dark:bg-slate-800">
          <div className="flex items-center justify-between px-1 pb-2">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Notifications</p>
            {unreadCount > 0 && (
              <button onClick={() => markAllRead()} className="text-xs font-bold text-[#178f95]">
                Mark all read
              </button>
            )}
          </div>

          {(!data?.notifications || data.notifications.length === 0) && (
            <p className="px-2 py-4 text-center text-xs text-slate-400">You're all caught up.</p>
          )}

          {data?.notifications?.map((n) => (
            <button
              key={n._id}
              onClick={() => markRead(n._id)}
              className={`block w-full rounded-xl px-2 py-2 text-left text-sm hover:bg-[#f6fbfb] dark:hover:bg-slate-700/50 ${
                n.isRead ? "text-slate-400" : "font-semibold text-[#17233f] dark:text-slate-100"
              }`}
            >
              <p>{n.title}</p>
              <p className="text-xs font-normal text-slate-400">{n.message}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
