import React, { ChangeEvent } from 'react';

/**
 * Search - Component - Input Search 
 * @param {Function} props.setWordSearch - Function to set word search.
 * @param {string} props.colorPrimary - Primary color for styling.
 * @returns {JSX.Element} - Input search component JSX element.
 * 
 * @author Nosfairal
 * 
 */

interface SearchProps {
    setWordSearch: (word: string) => void;
    colorPrimary: string;
}

const Search = ({ setWordSearch, colorPrimary }: SearchProps) => {
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setWordSearch(e.target.value);
    };

    return (
        <div style={{ height: "21px", display: 'flex', alignItems: "center", margin: "none" }}>
            <input
                aria-label='search'
                type="search"
                style={{
                    height: "100%",
                    padding: "0 10px 0",
                    border: "none",
                    borderRadius: "5px",
                    background: colorPrimary,
                    color: "white",
                    outline: "none",
                    margin: "none"
                }}
                onChange={handleSearchChange}
                placeholder=" Search here"
            />
        </div>
    );
};

export default Search;