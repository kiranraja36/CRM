import { NavLink } from "react-router-dom";
import{FaBars, FaHome}from'react-icons/fa'
import{RiFileAddFill}from'react-icons/ri'
import{CiBadgeDollar}from'react-icons/ci'
import{IoMdAnalytics}from'react-icons/io'
import{CiBullhorn}from'react-icons/ci'
import{ImTicket}from'react-icons/im'
import{BiSearch, BiTask}from'react-icons/bi'
import{BiSolidUserCircle} from'react-icons/bi'
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {MdEmail} from 'react-icons/md'
import {
  FacebookShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookIcon,
 
} from 'react-share';

const routes=[{
  path:"/",
  name:"Home",icon:<FaHome/>,
  },{
    path:"/customers",
  name:"Customers",icon:<BiSolidUserCircle/>,
  },{
    path:"/leads",
  name:"Leads",icon:<RiFileAddFill/>,
  },{
    path:"/opportunities",
  name:"Opportunities",icon:<CiBullhorn/>,
  },{
    path:"/sales",
  name:"Sales",icon:<CiBadgeDollar/>,
  },{
    path:"/tasks",
  name:"Tasks",icon:<BiTask/>,
  },{
    path:"/tickets",
    name:"Tickets",icon:<ImTicket/>,
  },{
    path:"/emails",
    name:"Emails",icon:<MdEmail/>,
  }
  ];
  

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "220px" : "45px",
            transition: {
              duration: 0.5,
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                 <div className="bars">
         <img src="favicon.ico" alt="crm"  onClick={toggle} />
      </div>
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
         
        <section className="routes">
            {routes.map((route)=>(
                <NavLink  activeClassName="active" to={route.path} key={route.name} className="link">

                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              
            ))}
          </section>
          <AnimatePresence>
        {isOpen && (<motion.div className="social" variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden">
          <FacebookShareButton
            url="#"
            quote={"Hey"}
            hashtag="#React"
          >
            <FacebookIcon logoFillColor="white" round={true} />
          </FacebookShareButton>
          <LinkedinShareButton  url="#"
            quote={"Hey"} >
          <LinkedinIcon logoFillColor="white" round={true}></LinkedinIcon>
          </LinkedinShareButton>
        </motion.div>)}
        </AnimatePresence>
        </motion.div>
        
        <main>{children}</main>
      
      </div>
    </>
  );
};

export default SideBar;