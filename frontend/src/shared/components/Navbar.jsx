import { Link } from "react-router-dom";
import Button from "./Button";
import Card from "./Card";

const Navbar = ({ panel = "Dashboard", title, badge = "M", actions, onLogout }) => {
  return (
    <Card
      as="header"
      className="flex flex-col gap-4 p-5 backdrop-blur md:flex-row md:items-center md:justify-between"
    >
      <Link to="/" className="flex items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#178f95] text-xl font-black text-white">
          {badge}
        </span>
        <span>
          <span className="block text-sm font-semibold text-[#178f95]">{panel}</span>
          <span className="block text-2xl font-extrabold tracking-tight text-[#17233f]">
            {title}
          </span>
        </span>
      </Link>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {actions}

        {onLogout && (
          <Button variant="danger" onClick={onLogout}>
            Log Out
          </Button>
        )}
      </div>
    </Card>
  );
};

export default Navbar;
