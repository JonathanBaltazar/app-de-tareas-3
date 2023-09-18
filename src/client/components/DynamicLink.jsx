import { Link } from "react-router-dom";

function DynamicLink({ to, name }) {
    return (
        <Link
            className="hover:underline inline-block text-neutral-700 dark:text-neutral-300"
            to={to}
        >
            {name}
        </Link>
    );
}

export default DynamicLink;
