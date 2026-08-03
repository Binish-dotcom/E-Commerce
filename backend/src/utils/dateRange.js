// Shared date-range resolver for admin analytics filters:
// weekly | monthly | yearly | custom (?from=&to=)
export const resolveDateRange = (query = {}) => {
  const { range, from, to } = query;
  const now = new Date();
  let start;
  let end = now;

  if (range === "custom" && from) {
    start = new Date(from);
    end = to ? new Date(to) : now;
  } else if (range === "yearly") {
    start = new Date(now.getFullYear(), 0, 1);
  } else if (range === "monthly") {
    start = new Date(now.getFullYear(), now.getMonth(), 1);
  } else {
    // default: weekly (last 7 days)
    start = new Date(now);
    start.setDate(start.getDate() - 6);
    start.setHours(0, 0, 0, 0);
  }

  return { start, end };
};

export default resolveDateRange;
