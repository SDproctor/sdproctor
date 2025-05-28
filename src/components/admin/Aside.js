import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './admin.css'
import logo from '../../images/logo.png'
import { Exams } from './Exams'
import { Users } from './Users'

const Aside = () => {

    const [activeTab, setActiveThttab] = useState("tab2");

    //  Functions to handle Tab Switching
    const handleTab1 = () => {
      // update the state to tab1
     // setActiveTab("tab1");
    };
    const handleTab2 = () => {
      // update the state to tab2
     // setActiveTab("tab2");
    };

  return (
    <aside id='aside'>

        <section className='tabs'>

            <Link to="/" style={{display: 'flex', justifyContent: 'center', alignItems: 'center',
                 width: '50%', margin: 'auto', marginTop: '2em'
            }}>
                <img src={logo} alt='logo' id='logo' />
            </Link>

            <div className='tab-nav'>

                <h2 className={activeTab === "tab1" ? "active" : ""} onClick={handleTab1}> Set Exam </h2>

                <h2 className={activeTab === "tab2" ? "active" : ""} onClick={handleTab2}> Users </h2>

            </div>

        </section>

        <section className="tab-outlet">
            {activeTab === "tab2" ? <Users /> : <Exams />}
        </section>

        </aside>
  )
}

export {Aside}