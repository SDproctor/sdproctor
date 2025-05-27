import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import image from "../../images/Editing body text-rafiki 1.png";
import image1 from "../../images/Group 72.png";
import image2 from "../../images/Group 59.png";
import image3 from "../../images/Group 58.png";
import image4 from "../../images/Group 73.png";
import image5 from "../../images/carbon_idea.png";
import image6 from "../../images/healthicons_health-data-security-outline.png";
import image7 from "../../images/efficiency-svgrepo-com 2.png";
import about from "../../images/About us page-rafiki 2.png";
import contact from "../../images/istockphoto-1178752391-612x612-removebg-preview 1.png";
import circle from "../../images/Ellipse 5.png";
import circle1 from "../../images/Ellipse 6.png";
import { Card } from "./Card";
import { Footer } from "./Footer";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (
      localStorage.getItem("token") === "" ||
      localStorage.getItem("token") == null
    ) {
      navigate("/");
    } else {
      getUser();
    }
  }, []);

  const getUser = () => {
    axios
      .get("https://api.amaanatmedical.com/login", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((r) => {
        setUser(r.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Navbar />

      <section id="hero">
        <article>
          <h2>Enhancing the Integrity of Online Examinations</h2>
          <p>
            At SD proctor we are foused on creating more secured/ safe methods
            for students to take exams
          </p>
          <button>Learn More</button>
        </article>

        <img src={image} alt="" />
      </section>

      <section id="about">
        <img src={image1} alt="" />

        <article>
          <h2>Why SDproctor?</h2>
          <p>
            Studies has shown that the conventional way of conducting
            examinations, where supervisors keep an eye on students has long
            served as a deterrent to academic misconduct. However, as education
            goes beyond limits and classrooms become virtual, guaranteeing the
            genuineness and honesty of assessments has become a complex task.
            for this reason the need, for a proctoring website is very essential
            to solve/ improve the following:
          </p>
        </article>
      </section>

      <section className="whysd">
        <Card
          image={image2}
          title="Academic Integrity"
          text="SDProctor help prevent and identify instances of cheating during assessments. Their presence ensures that students are evaluated fairly."
        />

        <Card
          image={image3}
          title="Accessibility"
          text="SDproctor offer services that make it easy for students to take exams and assessments from wherever they are."
        />

        <Card
          image={image4}
          title="Prevent cheating"
          text="Our websites employ technologies, including AI,Webcam monitoring,to  deter and identify cheating behaviors e.g seeking unauthorized help or using prohibited resources."
        />

        <Card
          className="image5"
          image1={image5}
          title="Data Security"
          text="Our proctoring platform plays a role, in safeguarding information and hold holding confidentiality also ensuring student data are secured."
        />

        <Card
          className="image6"
          image1={image6}
          title="Innovation"
          text="Our website incorporate,AI powered monitoring and secure data transmission.They play a role,in the modernization of technology."
        />

        <Card
          className="image7"
          image1={image7}
          title="Efficiency"
          text="We make  assessment process more efficient, by automating,monitoring and minimizing reliance, on proctors."
        />
      </section>

      <section id="aboutsd">
        <h2>About</h2>
        <p>
          SDproctor is a website mainly concerned about enhancing the security
          of online examinations, we are also conerened about the privacy and
          data security, of our verified exam takers which includes:
        </p>
      </section>

      <section className="features">
        <article id="about-article">
          <div className="about-content">
            <img src={circle} alt="" />
            <p>
              EnsurIng the security by implementing protective measures, like
              encryption, user authentication and secure data transmission.
              These measures will safeguard both user data and the integrity of
              proctoring sessions
            </p>
          </div>

          <div className="about-content">
            <img src={circle1} alt="" />
            <p>
              Create a web-based interface that is easy to use and intuitively
              allow test takers, proctors and administrators to interact
              smoothly within the proctoring system.
            </p>
          </div>

          <div className="about-content">
            <img src={circle} alt="" />
            <p>
              Developing backend features that facilitate the proctoring
              process, such, as real time monitoring, secure identity
              verification and incident reporting. These functionalities ensure
              the integrity of assessments.
            </p>
          </div>

          <div className="about-content">
            <img src={circle1} alt="" />
            <p>
              To guarantee the safety of our system we will incorporate measures
              such, as encryption, user authentication and secure data
              transmission. These precautions are put in place to protect user
              data and maintain the integrity of proctoring sessions
            </p>
          </div>
        </article>

        <img src={about} alt="" />
      </section>

      <section className="contact">
        <h2>Contact</h2>
      </section>

      <section className="features1">
        <img src={contact} alt="" />

        <article id="contact-article">
          <div className="contact-content">
            <p className="p1">We are available to be of help!</p>
            <p className="p2">Have any question to ask us?</p>
            <p className="p3">kindly do well to reach out to us through</p>
            <p className="p3">our Email / phone no below;</p>
            <p className="p4">SDproctor@gmail.com / 07067882505</p>
          </div>

          <div className="contact-content">
            <p className="p1">You can as well be of help to us!</p>
            <p className="p2">
              Wondering how? yes it soo easy, we will be needing your help to
              reachout to us on geniu ways to improve our services and feebacks
              on how beneficial our website has been to you using the Email
              below;
            </p>
            <p className="p4">08067284588 / SDproctor78@gmail.com</p>
          </div>
        </article>
      </section>

      <Footer />
    </>
  );
};

export { Home };
