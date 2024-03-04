import React, { useEffect, useState } from 'react';
import { search } from './utils/function';
import { Select } from './Select';
import { Search } from './Search';
import { Pagination } from './Pagination';

/**
 * Table - Component - Render Table
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.title - Title of table.
 * @param {object[]} props.arrayElement - Data Array of object.
 * @param {string[]} props.attributes - Attribute for search.
 * @param {string} props.colorPrimary - Color Primary.
 * @param {string} props.colorSecondary - Color Secondary.
 * @returns {JSX.Element} - Pagination component JSX element.
 *
 * @author Nosfairal
 *
 */

export interface TableProps {
    title: string;
    arrayElement: object[];
    attributes: string[];
    colorPrimary: string;
    colorSecondary: string;
}

interface Element {
    [key: string]: any; // Permet l'utilisation de clés de type string pour indexer
}

const Table: React.FC<TableProps> = ({
    title,
    arrayElement,
    attributes,
    colorPrimary,
    colorSecondary,
}) => {
    // État initial pour les en-têtes et les éléments du tableau
    const [thValue, setTableThValue] = useState<string[]>([]);
    const [arrElements, setArrElements] = useState<object[]>([]);

    // Pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [elementsPerPage, setElementsPerPage] = useState<number>(10);

    // Recherche
    const [wordSearch, setWordSearch] = useState<string>('');

    // Tri
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    // Responsive
    const [mobile, setMobile] = useState<boolean>(false);

    // Mise à jour des en-têtes et des éléments du tableau
    useEffect(() => {
        const keys = arrayElement.length > 0 ? Object.keys(arrayElement[0]) : [];
        setTableThValue(keys);
        setArrElements(arrayElement);
    }, [arrayElement]);

    // Pagination et affichage des éléments actuels
    const indexLastItem = currentPage * elementsPerPage;
    const indexFirstItem = indexLastItem - elementsPerPage;
    const currentItems = arrElements.slice(indexFirstItem, indexLastItem);

    // Gestion de la recherche
    useEffect(() => {
        const filterElements = () => {
            if (wordSearch.length === 0) return arrayElement;
            return arrayElement.filter(item => search(wordSearch, item, attributes));
        };

        setArrElements(filterElements());
        setCurrentPage(1); // Réinitialiser la pagination lors d'une nouvelle recherche
    }, [wordSearch, arrayElement, attributes]);

    // Gestion du tri
    useEffect(() => {
        const sortElements = () => {
            if (!sortKey) return arrElements;
            return [...arrElements].sort((a: Element, b: Element) => {
                if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
                if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            });
        };

        setArrElements(sortElements());
    }, [sortKey, sortOrder]);

    // Gestion de la réactivité mobile
    useEffect(() => {
        const checkWindowWidth = () => {
            setMobile(window.innerWidth <= 1023);
        };

        checkWindowWidth();
        window.addEventListener('resize', checkWindowWidth);

        return () => window.removeEventListener('resize', checkWindowWidth);
    }, []);

    // Fonction de tri modifiée pour éviter les dépendances circulaires
    const handleSort = (key: string) => {
        setSortKey(key);
        setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    };

    return (
        <fieldset
            style={{
                border: `3px solid ${colorPrimary}`,
                borderRadius: '5px',
                width: 'calc(100% - 20px)',
                padding: '0 10px 0',
            }}
        >
            <legend
                style={{
                    color: colorPrimary,
                    fontSize: '24px',
                }}
            >
                {title}
            </legend>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: '10px 0 10px',
                }}
            >
                <Select
                    setElementsPerPage={setElementsPerPage}
                    setCurrentPage={setCurrentPage}
                    colorPrimary={colorPrimary}
                />
                <Search setWordSearch={setWordSearch} colorPrimary={colorPrimary} />
            </div>

            {mobile ? (
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexFlow: 'column nowrap',

                        height: '75vh',
                        overflowY: 'scroll',
                    }}
                >
                    {arrElements && arrElements.length >= 1 ? (
                        <>
                            {currentItems.map((elements, index) => (
                                <div
                                    key={index}
                                    style={{
                                        background: index % 2 === 0 ? colorSecondary : 'none',
                                        display: 'flex',
                                        flexFlow: 'row wrap',
                                        width: '100%',
                                        marginBottom: '10px',
                                    }}
                                >
                                    <div style={{ width: '50%' }}>
                                        {Object.keys(elements).map((e, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    padding: '3px 2px',
                                                    fontSize: '16px',
                                                    width: 'calc(100% - 4px)',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                {e} :
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ width: '50%' }}>
                                        {Object.values(elements).map((e: any, index: number) => (
                                            <div
                                                key={index}
                                                style={{
                                                    padding: '3px 2px',
                                                    fontSize: '16px',
                                                    width: 'calc(100% - 4px)',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                {e}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '25px 0 25px',
                                width: '100%',
                            }}
                        >
                            <div style={{ color: colorPrimary, fontSize: '18px' }}>
                                No data available in table
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <div
                        style={{
                            fontFamily: 'Arial, Helvetica, sans-serif',
                            border: `1px solid ${colorPrimary}`,
                            backgroundColor: '#ffffff',
                            textAlign: 'center',
                            borderCollapse: 'collapse',
                        }}
                    >
                        <div
                            style={{
                                background:
                                    'linear-gradient(to bottom, #ffffff 0%, #ffffff 66%, #ffffff 100%)',
                                borderBottom: `2px solid ${colorPrimary}`,
                                width: '100%',
                                display: 'flex',
                            }}
                        >
                            {thValue.map((th, index) => (
                                <div
                                    role="button"
                                    aria-label="sort"
                                    key={index}
                                    onClick={() => handleSort(th)}
                                    style={{
                                        color: colorPrimary,
                                        cursor: 'pointer',
                                        border: `1px solid ${colorPrimary}`,
                                        padding: '3px 2px',
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        borderLeft: `2px solid ${colorSecondary}`,
                                        width: `calc(100% / ${thValue.length})`,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    {th}{' '}
                                    {!mobile &&
                                        (sortKey === th ? (
                                            <span
                                                style={{
                                                    fontSize: '14px',
                                                }}
                                            >
                                                {sortOrder === 'asc' ? '▲' : '▼'}
                                            </span>
                                        ) : (
                                            <span
                                                style={{
                                                    color: 'lightgray',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                ▲▼
                                            </span>
                                        ))}
                                </div>
                            ))}
                        </div>

                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                flexFlow: 'row wrap',
                            }}
                        >
                            {arrElements && arrElements.length >= 1 ? (
                                <>
                                    {currentItems.map((elements, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                background: index % 2 === 0 ? colorSecondary : 'none',
                                                display: 'flex',
                                                width: '100%',
                                            }}
                                        >
                                            {Object.values(elements).map((el: any, index: number) => (
                                                <div
                                                    key={index}
                                                    style={{
                                                        border: `1px solid ${colorPrimary}`,
                                                        padding: '3px 2px',
                                                        fontSize: '16px',
                                                        width: `calc(100% / ${thValue.length})`,
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                    }}
                                                >
                                                    {el}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '25px 0 25px',
                                        width: '100%',
                                    }}
                                >
                                    <div style={{ color: colorPrimary, fontSize: '18px' }}>
                                        No data available in table
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <div
                style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    background: `linear-gradient(to bottom, ${colorSecondary} 0%, #70acc2 66%, #60a3bc 100%)`,
                    borderTop: `2px solid ${colorSecondary}`,
                    marginBottom: '10px',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                }}
            >
                {arrElements && arrElements.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        limit={arrElements.length}
                        total={elementsPerPage}
                        setCurrentPage={setCurrentPage}
                        colorPrimary={colorPrimary}
                    />
                )}
            </div>
        </fieldset>
    );
};

export default Table;