import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const BreadCrums = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);
    console.log(pathSegments)
    return (
        <div className="pagetitle">
            <h1>Dashboard</h1>
            <nav>
                <ol className="breadcrumb">
                    {pathSegments.map((segment, index) => (
                        index !== pathSegments.length - 1 ?(
                            <li className="breadcrumb-item" key={index}><Link to="./dashboard">{segment}</Link></li>
                        ) : (
                            <li className="breadcrumb-item active" key={index}>{segment}</li>
                        )
                        // </ol>
                    ))}
                    
                    
                </ol>
            </nav>
        </div>
    )
}

export default BreadCrums
