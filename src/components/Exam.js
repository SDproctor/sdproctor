import React, { useState, useEffect } from 'react'
import { Radio, Space } from 'antd';
import ReactPaginate from 'react-paginate';
import image from '../images/Ellipse 1.png'
import circle from '../images/Ellipse 3.png'
import { useNavigate } from 'react-router-dom'
//import videocam from '../images/fluent_video-48-regular.png'
import './Exam.css';
import { Timer } from './Timer';
import { ImageUpload } from './ImageUpload';

const Exam = () => {

  const userData = localStorage.getItem('user-info')
  //console.log(userData)
  const userdetail = JSON.parse(userData)
  const userId = userdetail.data.userdata.name

  const [value, setValue] = useState(1);

  const [currentPage, setCurrentPage] = useState(0);

  const [ questions, setQuestions ] = useState([])

  const n = 1

  const duration = 60

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  useEffect(() => {

    const getQuestions = async () => {
      const response = await fetch(
        'https://demo.schautomate.com.ng/api/exam'
      );
      const data = await response.json();
      console.log(data)
      setQuestions(data);
      //setTotalPages(Math.ceil(data.length / n))
    };

    //const getQuestions = async () => {

    //  try {

    //    const response = await fetch( 'https://localhost:3000/api/data', {
    //        method: 'GET',
    //        credentials: 'include',
    //        headers: {
    //            "content-type": "application/json",
    //        }
    //    })
    //    const data = await response.json();
    //    console.log(data)
    //    setQuestions(data);
    //    //.then(response => response.json())
    //    //.then(response => console.log(response))
    //    //.then(response => setQuestions(response))
    //    
    //  } catch (error) {
    //    console.log(error)
    //  }
    //}

    getQuestions();

      //fetch("https://demo.schautomate.com.ng/api/exam", {
      //    method: "GET",
      //    headers: {
      //        "content-type": "application/json",
      //    }
      //}).then(response => response.json())
      //
      //.then(response => console.log(response))
      //.then(response => setQuestions(response))
      //.catch(error => console.log(error))

  }, [currentPage]) 

  const offset = currentPage * n;
  const paginatedData = questions.slice(offset, offset + n);

  //console.log(questions);

  const navigate = useNavigate()

  function logout () {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className='exam-container'>

      <div className='exam-nav'>
        <img src={circle} alt='' />
      </div>

      <section className='exam-header'>

        <div className='header-left'>

          <img src={image} alt='' />
          <p>{userId}</p>

        </div>

        <div className='header-right'>

				  <Timer initialMinute={duration} />
          <button className='btn-logout' onClick={logout}>Log out</button>

        </div>

      </section>

      <section className='exam-body'>

        <div className='exam-contents'>

          <div className='body-left'>
            
            {paginatedData.map((question, id) => {
                return (
                
                  <div key={id} className="project">
                
                      <h2>question {question.id}</h2>
                      
                      <p>{question.question}</p>
                      
                      <Radio.Group onChange={onChange} value={value}>
                        <Space direction="vertical">
                          <Radio value={question.opt1} style={{color: '#03045e', fontSize: '15px', fontWeight: '500'}}>{question.opt1}</Radio>
                          <Radio value={question.opt2} style={{color: '#03045e', fontSize: '15px', fontWeight: '500'}}>{question.opt2}</Radio>
                          <Radio value={question.opt3} style={{color: '#03045e', fontSize: '15px', fontWeight: '500'}}>{question.opt3}</Radio>
                          <Radio value={question.opt4} style={{color: '#03045e', fontSize: '15px', fontWeight: '500'}}>{question.opt4}</Radio>
                        </Space>
                      </Radio.Group>
                
                  </div>
                
                )
            })}
          
          </div>
          
          <div className='body-right'>
            <ImageUpload />
          </div>

        </div>

        <ReactPaginate
          pageCount={Math.ceil(questions.length / n)}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          activeClassName="active"
        />

      </section>
      
    </div>
  )
}

export {Exam}