import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Monument from "./Monument";

const SearchMonument = () => {
    const [search, setSearch] = useState("");
    const { data } = useQuery("monuments", getMonuments);
    
    const handleChange = (e) => {
        setSearch(e.target.value);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch("");
    };
    
    return (
        <div>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleChange}
            />
            <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
            </button>
        </form>
        <div>
            {data?.map((monument) => (
            <Link to={`/monument?id=${monument._id}`}>
                <Monument monument={monument} />
            </Link>
            ))}
        </div>
        </div>
    );
    }

export default SearchMonument;