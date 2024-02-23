import React, { useEffect, useState, ChangeEvent } from 'react';

/**
 * PagintationItem- Component - Navigation table with input
 * 
 * @component
 * @param {number} props.currentPage - Current active page.
 * @param {Function} props.setCurrentPage - Function to set the current page.
 * @param {number} props.pagesLength - Maximum items per page.
 * @param {Function} props.setErrorMsg - Function to set the error messages.
 * @param {string} props.colorPrimary - Primary color for styling.
 * @returns {JSX.Element} - PaginationItem component JSX element.
 * 
 * @author nosfairal
 * 
 */

interface PaginationItemProps {
    currentPage: number;
    setCurrentPage: (pageNumber: number) => void;
    pagesLength: number;
    setErrorMsg: (error: boolean) => void;
    colorPrimary: string
}


const PaginationItem = ({
    currentPage,
    setCurrentPage,
    pagesLength,
    setErrorMsg,
    colorPrimary
}: PaginationItemProps) => {
    const [inputValue, setInputValue] = useState<string>(currentPage.toString());
    const [hover, setHover] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
    };

    useEffect(() => {
        setInputValue(currentPage.toString());
    }, [currentPage]);
    const handleBlur = () => {
        const pageNumber = parseInt(inputValue, 10);
        if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= pagesLength) {
            setCurrentPage(pageNumber);
            setErrorMsg(false);
        } else {
            setInputValue(currentPage.toString());
            setErrorMsg(true);
        }
    };

    return (
        <>
            <div
                className="pagination-container"
                style={{
                    height: "21px",
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <input
                    aria-label='Change page'
                    type='text'
                    value={inputValue}
                    className="inputPage"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                        width: "40px",
                        height: "100%",
                        border: "none",
                        padding: "0 5px 0",
                        borderRadius: "5px",
                        backgroundColor: colorPrimary,
                        color: "white",
                        outline: "none"
                    }}
                />
                <button
                    onClick={handleBlur}
                    style={{
                        marginLeft: "-10px",
                        border: "1px solid #0a3d62",
                        borderRadius: "5px",
                        color: "white",
                        height: "100%",
                        background: !hover ? "#0a3d62" : "#60a3bc",
                        cursor: "pointer"
                    }}
                    aria-label='Validation change page'
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    &#10140;
                </button>
            </div>
        </>
    );
};

export default PaginationItem;