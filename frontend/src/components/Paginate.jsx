import { Link } from "react-router-dom";

const Paginate = ({ page, pages, pageName, keyword='' }) => {

    let link;

    if(keyword !== ''){
        link = `/search/${keyword}/page/`
    }else if(pageName === 'productList'){
        link = '/admin/productlist/'
    }else if(pageName === 'homeScreen'){
        link = '/page/'
    }

  return (
    pages > 1 && (
      <div className="flex mt-10 items-center gap-4">
        <div className="flex justify-center items-center w-full gap-2">
          {[...Array(pages).keys()].map((x) => (
            <Link to={`${link}${x+1}`} 
                key={x + 1}
            >
              <button
                type="button"
                className={`h-10 max-h-[40px] w-10 max-w-[40px] rounded-lg
               bg-gray-500 text-center align-middle font-sans text-xs font-medium uppercase 
               text-white shadow-md
               ${x + 1 === page && "bg-gray-700 border"} `}
              >
                <span>{x + 1}</span>
              </button>
            </Link>
          ))}
        </div>
      </div>
    )
  );
};

export default Paginate;
