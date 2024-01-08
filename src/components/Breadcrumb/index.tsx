import { Link } from "react-router-dom";

interface IBreadcrumb {
  link?: string;
  nameLink?: string | undefined;
  name: string | undefined;
}

const Breadcrumb = ({ link, nameLink, name }: IBreadcrumb) => {
  return (
    <div className="flex justify-start items-center gap-x-2 font-sans text-sm py-3">
      <Link className="hover:text-alizarin-crimson" to="/">
        Trang chủ
      </Link>
      {nameLink && (
        <>
          /
          <Link className="hover:text-alizarin-crimson" to={link || ""}>
            {nameLink}
          </Link>
        </>
      )}
      /
      <p className="text-alizarin-crimson cursor-pointer">{name}</p>
    </div>
  );
};

export default Breadcrumb;
