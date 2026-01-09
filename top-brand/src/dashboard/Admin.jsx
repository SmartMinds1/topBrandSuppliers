import React, { useState, useEffect } from 'react';
import UsersList from './UsersList';
import MessagesList from './MessagesList';
import LogoutButton from './logoutButton';
import CircularProgress from './adminCompnts/CircularProgress';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faEnvelope,
  faCalendarCheck,
  faBars,
  faBell,
  faDashboard,
  faBoxesPacking,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import AdminStatCard from './AdminStatCard';
//import api from "../api/axiosInstance";
//import { jwtDecode } from "jwt-decode";

const Admin = () => {
    const [openDashboard, setOpenDashboard] = useState(true)
    const [activeAdmin, setActiveAdmin] = useState("");
    const [activeTab, setActiveTab] = useState("dashboard");
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

                    {/* logo */}
                    <div className="w-30 h-9 ml-4 bg-[url('/LOGODARK.png')] bg-contain bg-no-repeat"></div>

                    {/* current user */}
                    <div className="flex-row-center justify-between w-fit sm:w-50 gap-2">
                        <div className="header-actions relative h-9 w-10">
                            <button className="flex-col-center justify-center pt-3 pl-1">
                                <FontAwesomeIcon icon={faBell} className='text-xl rounded-full bg-bg-light p-1'/>
                                <span className="absolute top-1 right-0 bg-accent text-bg w-4.5 h-4.5 text-xs rounded-full flex-row-center justify-center">4</span>
                            </button>
                        </div>
                        <div className="flex-row-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-[url('/Lauracia.webp')] bg-cover"></div>
                            <div className="flex-col-start">
                                <p className="font-semibold text-maintext">Fridah</p> {/* {activeAdmin} */}
                                <span className="font-light text-sm text-text">Administrator</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-row-center h-[89vh] bg-bg-light">
                    {/* Sidebar */}
                    <div className={`transition-all duration-400 overflow-x-hidden flex-col-center h-full bg-bg-dark  ${sidebarOpen ? 'w-54' : 'w-0'}`}>{/*  border-r border-gray-300 */}
                        <div className="w-54 h-40 border-b border-gray-300 flex-row-center justify-evenly shrink-0">
                            <div className="w-14 h-14 rounded-full bg-[url('/Lauracia.webp')] bg-cover"></div>
                            <div className="welcome-text">
                                <p className='font-light text-text'>Welcome back,</p>
                                <p className="font-semibold text-xl">Fridah{/* {activeAdmin} */}!</p>
                            </div>
                        </div>

                        <div className="w-54 flex-1">
                            <ul className='w-full h-fit flex-col-start dashSideBarLinks pt-4 gap-1'>
                                <li 
                                    className={activeTab === "dashboard" ? "bg-bg-light border-accent" : ""}
                                    onClick={() => {setOpenDashboard(true); setActiveTab("dashboard")}}
                                >
                                    <FontAwesomeIcon icon={faDashboard} className='dashSideBarIcon'/>
                                    <span>Dashboard</span>
                                </li>
                                <li 
                                       className={activeTab === "users" ? "bg-bg-light border-accent" : ""}
                                       onClick={() => {setOpenDashboard(false); setActiveTab("users")}}
                                   /*  onClick={() => handleTabClick("users", fetchUsers)} */
                                >
                                    <FontAwesomeIcon icon={faUsers} className='dashSideBarIcon'/>
                                    <span>Users</span>
                                </li>
                                <li 
                                   className={activeTab === "orders" ? "bg-bg-light border-accent" : ""}
                                   onClick={() => {setOpenDashboard(false); setActiveTab("orders")}}
                                  /*   onClick={() => handleTabClick("bookings", fetchBookings)} */
                                >
                                    <FontAwesomeIcon icon={faCalendarCheck} className='dashSideBarIcon'/>
                                    <span>Orders</span>
                                </li>
                                <li 
                                    className={activeTab === "bulk Quotes" ? "bg-bg-light border-accent" : ""}
                                    onClick={() => {setOpenDashboard(false); setActiveTab("bulk Quotes")}}
                                  /*   onClick={() => handleTabClick("messages", fetchMessages)} */
                                >
                                    <FontAwesomeIcon icon={faBoxesPacking} className='dashSideBarIcon'/>
                                    <span>Bulk Quote</span>
                                </li>
                                <li 
                                    className={activeTab === "messages" ? "bg-bg-light border-accent" : ""}
                                    onClick={() => {setOpenDashboard(false); setActiveTab("messages")}}
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
                             <AdminStatCard icon={faUsers} statsName="Total Users" statsNumber="54" profit="12"/>
                             <AdminStatCard icon={faCalendarCheck} statsName="Orders" statsNumber="201" profit="47"/>
                             <AdminStatCard icon={faBoxesPacking} statsName="Bulk Quote" statsNumber="64" profit="33"/>
                             <AdminStatCard icon={faEnvelope} statsName="Messages" statsNumber="28" profit="60"/>
                        </div>

               {/* Data Table Area */}
                        <div className={`data-section bg-bg-light ${openDashboard ? "h-[62vh] pt-4" : "h-[88vh]"}`}>
                            <div className="h-20 pl-4 pt-2 bg-bg-light">
                                <h3 className="text-xl text-maintext font-semibold pl-1">
                                  {/*   <FontAwesomeIcon icon={faTools} className='text-accent mr-1.5'/> */}
                                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                                </h3>
                                <p className="text-text text-sm pl-1 pt-1">
                                    Manage your {activeTab} with ease!
                                </p>
                            </div>

               {/*  Rendering dashboard content */}
                    {activeTab === "dashboard" && 
                        <div className='w-[96%] m-auto h-[50vh] rounded-2xl flex-row-center justify-evenly bg-bg'>
                            <div className='w-120 h-full flex-col-start justify-center gap-2'>
                               <p className='text-4xl font-semibold text-primary tracking-wide'>Workflow Analysis</p> {/* only track completed orders and give comments */}
                               <p className='text-text'>Most of your orders are still pending, you need to complete them to improve client satisfaction.</p>
                            </div>
                            <CircularProgress />
                        </div>
                    }

               {/* Rendering db content */}
                           <div>
                                {activeTab === "users" && <UsersList openDashboard={openDashboard} searchTerm={searchTerm} />}
                               {/*  {activeTab === "messages" && <MessagesList searchTerm={searchTerm} />} */}
                            </div> 
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;