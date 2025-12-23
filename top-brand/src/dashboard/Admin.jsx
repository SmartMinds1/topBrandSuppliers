import React, { useState, useEffect } from 'react';
import UsersList from './UsersList';
import MessagesList from './MessagesList';
import LogoutButton from './logoutButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faEnvelope,
  faCalendarCheck,
  faBars,
  faBell,
  faDashboard,
  faBoxesPacking,
  faTools,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import AdminStatCard from './AdminStatCard';
//import api from "../api/axiosInstance";
//import { jwtDecode } from "jwt-decode";

const Admin = () => {
    const [openDashboard, setOpenDashboard] = useState(false)
    const [activeAdmin, setActiveAdmin] = useState("");
    const [activeTab, setActiveTab] = useState("users");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [usersCount, setUsersCount] = useState("");
    const [messagesCount, setMessagesCount] = useState("");
    const [bookingsCount, setBookingsCount] = useState("");
    const [paymentsCount, setPaymentsCount] = useState("");
    const [commentsCount, setCommentsCount] = useState("");
    const [searchTerm, setSearchTerm] = useState("");


// Search handler function
const handleSearch = (e) => {
    setSearchTerm(e.target.value);
};

// Clear search function
const clearSearch = () => {
    setSearchTerm("");
};
/*     useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            const decoded = jwtDecode(token);
            setActiveAdmin(decoded.username);
        }
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get("http://localhost:5000/api/users");
            setUsersCount(res.data);
        } catch (err) {
            console.error("Error fetching users count:", err);
        }
    };

    const fetchMessages = async () => {
        try {
            const res = await api.get("http://localhost:5000/api/messages");
            setMessagesCount(res.data);
        } catch (err) {
            console.error("Error fetching messages count:", err);
        }
    };

 */


/*     useEffect(() => {
        fetchUsers();
        fetchMessages();
    }, []); */

    const handleTabClick = (tab, fetchFunction) => {
        setActiveTab(tab);
        fetchFunction();
    };

    return (
        <div className="bg-bg-light h-screen">
            <div className="mainBoard">
                {/* Header */}
                <div className="bg-bg-dark flex-row-center justify-between p-3 border-b border-gray-300 shadow-accent-light">
                    {/* dashboard button */}
                    <div className="flex-row-center gap-2">
                        <button 
                            className="text-maintext text-2xl cursor-pointer"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                        <h2 className='text-primary font-semibold sm:text-2xl text-xl'>Dashboard</h2>
                    </div>

                    {/* Logo */}
                    <div className="w-40 flex-row items-end justify-center hidden sm:flex">
                        <div className="w-9 h-9 flex-col-center justify-start mr-0.5"> {/* bg-[#111111] */}
                            <div className="logo-bg w-4/5 h-5/7 border-b-5 border-primary rounded-br-full rounded-bl-full"></div>
                        </div>
                        <p className="text-accent-light text-2xl font-extrabold">
                            topB<span className="text-primary text-2xl font-extralight">rand</span>
                        </p>
                    </div>

                    {/* current user */}
                    <div className="flex-row-center justify-between w-fit sm:w-50 gap-2">
                        <div className="header-actions relative h-10 w-8">
                            <button className="flex-col-center justify-center pt-3">
                                <FontAwesomeIcon icon={faBell} className='text-xl'/>
                                <span className="absolute top-0 right-0 bg-red-200 text-maintext w-5 h-5 rounded-full flex-row-center justify-center">3</span>
                            </button>
                        </div>
                        <div className="flex-row-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-primary-light"></div>
                            <div className="flex-col-start">
                                <p className="font-semibold text-maintext">Fridah</p> {/* {activeAdmin} */}
                                <span className="font-light text-sm">Administrator</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-row-center h-[89vh] bg-bg-light">
                    {/* Sidebar */}
                    <div className={`transition-all duration-400 overflow-x-hidden flex-col-center h-full bg-bg-dark border-r border-gray-300 ${sidebarOpen ? 'w-54' : 'w-0'}`}>
                        <div className="w-54 h-40 border-b border-gray-300 flex-row-center justify-evenly shrink-0">
                            <div className="w-14 h-14 rounded-full bg-primary-light"></div>
                            <div className="welcome-text">
                                <p className='font-light'>Welcome back,</p>
                                <p className="font-semibold text-xl">Fridah{/* {activeAdmin} */}!</p>
                            </div>
                        </div>

                        <div className="w-54 flex-1">
                            <ul className='w-full h-fit flex-col-start dashSideBarLinks pt-4'>
                                <li 
                                    className={activeTab === "users" ? "active" : ""}
                                    onClick={() => setOpenDashboard(true)}
                                >
                                    <FontAwesomeIcon icon={faDashboard} className='dashSideBarIcon'/>
                                    <span>Dashboard</span>
                                </li>
                                <li 
                                    className={activeTab === "users" ? "active" : ""}
                                   /*  onClick={() => handleTabClick("users", fetchUsers)} */
                                >
                                    <FontAwesomeIcon icon={faUsers} className='dashSideBarIcon'/>
                                    <span>Users</span>
                                </li>
                                <li 
                                    className={activeTab === "bookings" ? "active" : ""}
                                  /*   onClick={() => handleTabClick("bookings", fetchBookings)} */
                                >
                                    <FontAwesomeIcon icon={faCalendarCheck} className='dashSideBarIcon'/>
                                    <span>Orders</span>
                                </li>
                                <li 
                                    className={activeTab === "messages" ? "active" : ""}
                                  /*   onClick={() => handleTabClick("messages", fetchMessages)} */
                                >
                                    <FontAwesomeIcon icon={faBoxesPacking} className='dashSideBarIcon'/>
                                    <span>Bulk Quote</span>
                                </li>
                                <li 
                                    className={activeTab === "comments" ? "active" : ""}
                                 /*    onClick={() => handleTabClick("payments", fetchPayments)} */
                                >
                                    <FontAwesomeIcon icon={faEnvelope} className='dashSideBarIcon'/>
                                    <span>messages</span>
                                </li>
                            </ul>
                        </div>

                        <div className="cursor-pointer hover:bg-bg-light w-full pl-4 flex-row-start p-1">
                            <FontAwesomeIcon icon={faSignOut} className='pr-2 p-1' />
                            <LogoutButton />
                        </div> 
                    </div>

               {/* Content Area */}
                    <div className="flex-1 bg-bg-light">
                       {/*  stat cards */}
                        <div className={`w-full grid-cols-4 place-items-center ${openDashboard ? "grid" : "hidden"}`}>
                             <AdminStatCard icon={faUsers} statsName="Total Users" statsNumber="54"/>
                             <AdminStatCard icon={faCalendarCheck} statsName="Orders" statsNumber="201"/>
                             <AdminStatCard icon={faBoxesPacking} statsName="Bulk Quote" statsNumber="64"/>
                             <AdminStatCard icon={faEnvelope} statsName="Messages" statsNumber="28"/>
                        </div>

               {/* Data Table Area */}
                        <div className={`data-section bg-bg-light ${openDashboard ? "h-[62vh] pt-4" : "h-[88vh]"}`}>
                            <div className="h-20 pl-4 pt-2 bg-bg-light">
                                <h3 className="text-xl text-primary font-semibold">
                                    <FontAwesomeIcon icon={faTools} className='text-accent mr-1.5'/>
                                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
                                </h3>
                                <p className="text-text text-sm pl-8 pt-1">
                                    Manage your {activeTab} with ease!
                                </p>
                            </div>

                           <div>
                                {activeTab === "users" && <UsersList openDashboard={openDashboard} searchTerm={searchTerm} />}
                                {activeTab === "messages" && <MessagesList searchTerm={searchTerm} />}
                            </div> 
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;