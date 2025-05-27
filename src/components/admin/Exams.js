import React, { useState } from "react";

const Exams = () => {
  const [questionData, setQuestionData] = useState({
    question: "",
    opt1: "",
    opt2: "",
    opt3: "",
    opt4: "",
    answer: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({
      ...questionData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://api.amaanatmedical.com/api/exam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include any necessary authentication headers if required
          // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
        },
        body: JSON.stringify(questionData),
      });

      if (response.ok) {
        alert("Question added successfully");
        // Reset the form or perform any other actions after successful addition
        setQuestionData({
          question: "",
          opt1: "",
          opt2: "",
          opt3: "",
          opt4: "",
          answer: "",
        });
      } else {
        console.error("Failed to add question");
        // Handle error scenarios
      }
    } catch (error) {
      console.error("Error while adding question", error);
    }
  };

  return (
    <div className="exams-container">
      <h1>Add Exam</h1>

      <form onSubmit={handleSubmit}>
        <label>
          {" "}
          Question <br />
          <input
            type="text"
            name="question"
            placeholder="Enter Question"
            id="input"
            value={questionData.question}
            onChange={(e) => handleInputChange(e)}
          />
        </label>{" "}
        <br />
        <div className="options">
          <label>
            {" "}
            Option 1:
            <input
              type="text"
              name="opt1"
              value={questionData.opt1}
              onChange={handleInputChange}
            />
          </label>{" "}
          <br />
          <label>
            {" "}
            Option 2:
            <input
              type="text"
              name="opt2"
              value={questionData.opt2}
              onChange={handleInputChange}
            />
          </label>{" "}
          <br />
        </div>
        <div className="options">
          <label>
            {" "}
            Option 3:
            <input
              type="text"
              name="opt3"
              value={questionData.opt3}
              onChange={handleInputChange}
            />
          </label>{" "}
          <br />
          <label>
            {" "}
            Option 4:
            <input
              type="text"
              name="opt4"
              value={questionData.opt4}
              onChange={handleInputChange}
            />
          </label>{" "}
          <br />
        </div>
        <label id="label">
          {" "}
          Answer:
          <input
            type="text"
            name="answer"
            value={questionData.answer}
            onChange={handleInputChange}
          />
        </label>{" "}
        <br />
        <button type="submit" id="exambtn">
          {" "}
          Add Question{" "}
        </button>
      </form>
    </div>
  );
};

export { Exams };
