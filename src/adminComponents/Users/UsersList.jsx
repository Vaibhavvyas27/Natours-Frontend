import React, { useEffect, useRef, useState } from 'react'
import DataTable from 'react-data-table-component';
import { customStyles } from './dataTableStyles';
import { Link } from 'react-router-dom';
import Tooltip from 'react-bootstrap/Tooltip';
import { OverlayTrigger } from 'react-bootstrap';
import { toast } from 'react-toastify'
// import 'bootstrap/dist/css/bootstrap.min.css';

const url = import.meta.env.VITE_APIURL
const UsersList = () => {
    const [users, setUsers] = useState(null)
    const searchRef = useRef(null)
    const [renderFlag, setRenderFlag] = useState(false)

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${url}api/v1/users?role[ne]=admin`, {
                method: 'GET',
                credentials: 'include',
            })

            const { data } = await res.json()
            setUsers(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const UserTablecolumns = [
        {
            name: 'Image',
            selector: (row) => (
                <img src={row.photo ? row.photo : '/img/users/default.jpg'} alt={row.name} className="rounded-circle" width={50} height={50} />
            ),
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Role',
            selector: (row) => (
                row.role != "user" ? (
                    <span className="badge rounded-pill bg-secondary text-center" style={{ fontSize: "12px" }}>{row.role}</span>
                ) : (row.role)
            ),
            sortable: true,
        },
        {
            name: 'Actions',
            selector: row => (
                <div className='d-flex gap-5'>
                    <Link onClick={() => handleDelete(row)}>Edit</Link>
                    <Link onClick={() => handleDelete(row)}>Delete</Link>
                </div>
            ),
            sortable: true,
        }
    ];
    

    const searchUser = async (searchText) => {
        try {
            const res = await fetch(`${url}api/v1/users?role[ne]=admin&search=${searchText}`, {
                method: 'GET',
                credentials: 'include',
            })

            const { data } = await res.json()
            setUsers(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        searchUser(searchRef.current.value)
    }

    const handleReset = (e) => {
        e.preventDefault()
        fetchUsers()
        searchRef.current.value = ""
    }

    const deleteUser = async(userId) => {
        try {
            const res = await fetch(`${url}api/v1/users/${userId}`, {
                method: 'DELETE',
                credentials: 'include',
            })

            const data = await res.json()
            toast.success(data.message)
            setRenderFlag(!renderFlag)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = (user) => {
        const userConfirmed = window.confirm(`Are you sure you want to delete this tour  ${user.name}?`);

        if (userConfirmed) {
            deleteUser(user._id)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [renderFlag])

    return (
        <section className="section dashboard">
            <div className="row">
                <div className="col-lg-10">
                    <div className="row">
                        <div className="col-12">
                            <div className="card top-selling overflow-auto">
                                <div className="card-body pb-0">
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <h5 className="card-title">All Users<span> | Users</span></h5>
                                        <form className="col-md-5 d-flex justify-content-between gap-2 align-items-center">
                                            <input type="text" ref={searchRef} className="form-control" placeholder="Search..." />
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="button-tooltip">Search</Tooltip>}
                                            >
                                                <button type="submit" className="btn btn-dark" onClick={handleSearch}><i className="bi bi-search"></i></button>
                                            </OverlayTrigger>

                                            <OverlayTrigger
                                                placement="right"
                                                overlay={<Tooltip id="button-tooltip">Reset</Tooltip>}
                                            >
                                                <button type="button" className="btn btn-primary" onClick={handleReset} ><i className="bi bi-arrow-repeat"></i></button>
                                            </OverlayTrigger>
                                        </form>
                                    </div>
                                    {users ?
                                        (
                                            <DataTable columns={UserTablecolumns} data={users} defaultSortFieldId={1} pagination customStyles={customStyles} />
                                        ) : ""
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UsersList
