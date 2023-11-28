import React, { useState, useEffect } from 'react';
import './App.css';

const Pagination = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      const jsonData = await response.json();
      setData(jsonData);

      const total = Math.ceil(jsonData.length / itemsPerPage);
      setTotalPages(total);
    };

    fetchData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="pagination-container">
      <h1>Pagination</h1>
      <div className="data-list">
        {paginatedData.map((item) => (
          <div key={item.id} className="data-item">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage}>&lt; Previous</button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNextPage}>Next &gt;</button>
      </div>
    </div>
  );
};

export default Pagination;
