import React, { useState } from 'react';
import './PaginationPage.scss';
import Header from '../../../component/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
function PaginationPage({ currentPage, totalPages, onPageChange }) {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(
            <button
                key={i}
                className={`pagination-btn${i === currentPage ? " active" : ""}`}
                onClick={() => onPageChange(i)}
            >
                {i}
            </button>
        );
    }

    return (
        <div style={{ textAlign: "center", margin: "24px 0" }}>
            {pages}
        </div>
    );
}