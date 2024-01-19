import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SearchBox = () => {
    const navigate = useNavigate();

    const {keyword: urlKeyword} = useParams()

    const [keyword, setKeyword] = useState(urlKeyword || '');

    const submitHandler = (e) => {
        e.preventDefault();

        if(keyword){
            navigate(`/search/${keyword.trim()}`);
            setKeyword('')
        }else{
            navigate('/')
        }
    }

  return (
    <>
      <form 
      onSubmit={submitHandler} 
      className="space-y-4">
        <div>
          <div className="flex align-center text-xs">
            <input
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}              
              type="text"
              required
              placeholder="Search Products..."
              className="block w-full rounded-l-md border p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <button
            type="submit"
            className="border p-2 border-gray-400 rounded-r-md
            hover:bg-gray-400 transition duration-150 ease-in-out"
            >Search</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SearchBox;
