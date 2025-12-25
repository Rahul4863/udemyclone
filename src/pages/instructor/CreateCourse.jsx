import { useState } from "react";
import SunEditor from "suneditor-react";
import "./CreateCourse.css";
export default function CreateCourse() {

  const [step, setStep] = useState(1);
  const [course, setCourse] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    video: ""
  });
  const [payment, setPayment] = useState({
    currency: "INR",
    price: "",
    discount: "",
    finalPrice: ""
  });
  const calculateFinalPrice = (price, discount) => {
    price = Number(price);
    discount = Number(discount);

    if (!price || price <= 0) return "";

    if (!discount || discount <= 0) return price;

    const final = price - (price * discount) / 100;
    return final.toFixed(2);
  };

  // -------- Step-2 (Learning + Requirements + Audience) --------
  const [whatLearn, setWhatLearn] = useState([""]);
  const [requirements, setRequirements] = useState([""]);
  const [audience, setAudience] = useState("");

  // -------- Step-3 (Curriculum) --------
  const [curriculum, setCurriculum] = useState([
    {
      sectionTitle: "",
      lectures: [""]
    }
  ]);

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  return (
    <div className="container mt-4">

      <h2 className="fw-bold mb-3">Create Course</h2>

      {/* ---------- Step Indicator ---------- */}
      <ul className="nav nav-pills mb-4">

        <li className="nav-item">
          <span
            className={`nav-link ${step === 1 ? "active" : ""}`}
            onClick={() => setStep(1)}
            style={{ cursor: "pointer" }}
          >
            Course Info
          </span>
        </li>

        <li className="nav-item">
          <span
            className={`nav-link ${step === 2 ? "active" : ""}`}
            onClick={() => setStep(2)}
            style={{ cursor: "pointer" }}
          >
            Learning
          </span>
        </li>

        <li className="nav-item">
          <span
            className={`nav-link ${step === 3 ? "active" : ""}`}
            onClick={() => setStep(3)}
            style={{ cursor: "pointer" }}
          >
            Curriculum
          </span>
        </li>

        <li className="nav-item">
          <span
            className={`nav-link ${step === 4 ? "active" : ""}`}
            onClick={() => setStep(4)}
            style={{ cursor: "pointer" }}
          >
            Payment
          </span>
        </li>

      </ul>


      {/* ---------------- STEP 1 ---------------- */}
      {step === 1 && (
        <div className="card p-4 shadow-sm">
          <h4>Course Information</h4>

          <div className="mb-3">
            <label className="form-label fw-semibold">Course Title</label>
            <input className="form-control"
              onChange={(e) => setCourse({ ...course, title: e.target.value })} />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Course Subtitle</label>
            <input className="form-control"
              onChange={(e) => setCourse({ ...course, subtitle: e.target.value })} />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Select Instructor</label>

            <select
              className="form-select shadow-sm"
              onChange={(e) => setCourse({ ...course, instructor: e.target.value })}
            >
              <option value="">Choose Instructor</option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Doe">Jane Doe</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea className="form-control" rows={3}
              onChange={(e) => setCourse({ ...course, description: e.target.value })}></textarea>
          </div>


          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Course Image</label>
              <input type="file" className="form-control" />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Intro Video</label>
              <input type="file" className="form-control" />
            </div>
          </div>

          <button className="btn btn-primary mt-2" onClick={next}>Next →</button>
        </div>
      )}

      {step === 2 && (
        <div className="card p-4 shadow-sm">

          {/* What Students Learn */}
          <h4>What Students Will Learn</h4>

          {whatLearn.map((item, i) => (
            <div className="input-group mb-2" key={i}>
              <input
                className="form-control"
                value={item}
                onChange={(e) => {
                  const data = [...whatLearn];
                  data[i] = e.target.value;
                  setWhatLearn(data);
                }}
                placeholder="Add learning point"
              />

              <button
                className="btn btn-danger"
                onClick={() => {
                  const data = [...whatLearn];
                  data.splice(i, 1);
                  setWhatLearn(data);
                }}
              >
                Delete
              </button>
            </div>
          ))}

          <button
            className="btn btn-outline-primary btn-sm mb-3"
            onClick={() => setWhatLearn([...whatLearn, ""])}
          >
            + Add More
          </button>

          <hr />

          {/* Requirements */}
          <h4>Requirements</h4>

          {requirements.map((item, i) => (
            <div className="input-group mb-2" key={i}>
              <input
                className="form-control"
                value={item}
                onChange={(e) => {
                  const data = [...requirements];
                  data[i] = e.target.value;
                  setRequirements(data);
                }}
                placeholder="Requirement"
              />

              <button
                className="btn btn-danger"
                onClick={() => {
                  const data = [...requirements];
                  data.splice(i, 1);
                  setRequirements(data);
                }}
              >
                Delete
              </button>
            </div>
          ))}

          <button
            className="btn btn-outline-primary btn-sm mb-3"
            onClick={() => setRequirements([...requirements, ""])}
          >
            + Add More
          </button>

          <hr />
          <h4>Who Is This Course For?</h4>

          <textarea
            className="form-control"
            rows={3}
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="Describe target audience"
          ></textarea>

          <div className="mt-3 d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={back}>← Back</button>
            <button className="btn btn-primary" onClick={next}>Next →</button>
          </div>

        </div>
      )}
      {step === 3 && (
        <div className="card p-4 shadow-sm">
          <h4>Curriculum</h4>

          {/* SECTION LIST */}
          {curriculum.map((section, sIndex) => (
            <div key={sIndex} className="border p-3 mb-3 rounded bg-light">

              {/* ===== SECTION TITLE ===== */}
              <div className="d-flex justify-content-between align-items-center">
                <input
                  className="form-control fw-semibold"
                  placeholder="Section Title"
                  value={section.sectionTitle}
                  onChange={(e) => {
                    const data = [...curriculum];
                    data[sIndex].sectionTitle = e.target.value;
                    setCurriculum(data);
                  }}
                />

                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => {
                    const data = [...curriculum];
                    data.splice(sIndex, 1);
                    setCurriculum(data);
                  }}
                >
                  🗑️
                </button>
              </div>

              <hr />

              {/* ===== SECTION ACTIONS ===== */}
              <div className="p-2 border rounded">
                <button
                  className="btn btn-link"
                  onClick={() => {
                    const data = [...curriculum];
                    data[sIndex].lectures.push({
                      type: "lecture",
                      title: "",
                      mode: "",
                      video: "",
                      article: "",
                      quizTitle: "",
                      questions: [
                        { question: "", options: ["", "", "", ""], answer: "" }
                      ]
                    });
                    setCurriculum(data);
                  }}
                >
                  ➕ Lecture
                </button>
              </div>

              {/* ===== ITEMS INSIDE SECTION ===== */}
              {section.lectures.map((lec, lIndex) => (
                <div key={lIndex} className="mt-3 p-3 border rounded bg-white">

                  {/* Header */}
                  <div className="d-flex justify-content-between">
                    <strong>🎬 Lecture</strong>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        const data = [...curriculum];
                        data[sIndex].lectures.splice(lIndex, 1);
                        setCurriculum(data);
                      }}
                    >
                      Delete
                    </button>
                  </div>

                  {/* Lecture Title */}
                  <input
                    className="form-control mt-2"
                    placeholder="Lecture Title"
                    value={lec.title}
                    onChange={(e) => {
                      const data = [...curriculum];
                      data[sIndex].lectures[lIndex].title = e.target.value;
                      setCurriculum(data);
                    }}
                  />

                  {/* MODE SELECT */}
                  <select
                    className="form-select mt-2"
                    value={lec.mode}
                    onChange={(e) => {
                      const data = [...curriculum];
                      data[sIndex].lectures[lIndex].mode = e.target.value;
                      setCurriculum(data);
                    }}
                  >
                    <option value="">Select Type</option>
                    <option value="video">Video</option>
                    <option value="article">Article</option>
                    <option value="quiz">Quiz</option>
                  </select>

                  {/* ================= VIDEO ================= */}
                  {lec.mode === "video" && (
                    <input type="file" className="form-control mt-2" />
                  )}

                  {/* ================= ARTICLE ================= */}
                  {lec.mode === "article" && (
                    <div className="mt-2">
                      <SunEditor
                        height="250px"
                        placeholder="Write Article Content..."
                        setContents={lec.article}
                        onChange={(content) => {
                          const data = [...curriculum];
                          data[sIndex].lectures[lIndex].article = content;
                          setCurriculum(data);
                        }}
                      />
                    </div>
                  )}

                  {/* ================= QUIZ ================= */}
                  {lec.mode === "quiz" && (
                    <>
                      {/* QUIZ TITLE */}
                      <input
                        className="form-control mt-2 fw-semibold"
                        placeholder="Enter Quiz Title"
                        value={lec.quizTitle}
                        onChange={(e) => {
                          const data = [...curriculum];
                          data[sIndex].lectures[lIndex].quizTitle = e.target.value;
                          setCurriculum(data);
                        }}
                      />

                      {/* QUESTIONS */}
                      {lec.questions.map((q, qIndex) => (
                        <div key={qIndex} className="mt-3 p-2 border rounded">

                          {/* QUESTION */}
                          <input
                            className="form-control"
                            placeholder="Enter Question"
                            value={q.question}
                            onChange={(e) => {
                              const data = [...curriculum];
                              data[sIndex].lectures[lIndex].questions[qIndex].question =
                                e.target.value;
                              setCurriculum(data);
                            }}
                          />

                          {/* 4 OPTIONS */}
                          {q.options.map((opt, oIndex) => (
                            <input
                              key={oIndex}
                              className="form-control mt-2"
                              placeholder={`Option ${oIndex + 1}`}
                              value={opt}
                              onChange={(e) => {
                                const data = [...curriculum];
                                data[sIndex].lectures[lIndex].questions[qIndex].options[oIndex] =
                                  e.target.value;
                                setCurriculum(data);
                              }}
                            />
                          ))}

                          {/* DELETE QUESTION */}
                          <button
                            className="btn btn-danger btn-sm mt-2"
                            onClick={() => {
                              const data = [...curriculum];
                              data[sIndex].lectures[lIndex].questions.splice(qIndex, 1);
                              setCurriculum(data);
                            }}
                          >
                            Delete Question
                          </button>
                        </div>
                      ))}

                      {/* ADD QUESTION */}
                      <button
                        className="btn btn-outline-primary btn-sm mt-2"
                        onClick={() => {
                          const data = [...curriculum];
                          data[sIndex].lectures[lIndex].questions.push({
                            question: "",
                            options: ["", "", "", ""],
                            answer: ""
                          });
                          setCurriculum(data);
                        }}
                      >
                        ➕ Add Question
                      </button>
                    </>
                  )}

                </div>
              ))}
            </div>
          ))}

          {/* ADD SECTION */}
          <button
            className="btn btn-primary btn-sm"
            onClick={() =>
              setCurriculum([...curriculum, { sectionTitle: "", lectures: [] }])
            }
          >
            + Add Section
          </button>

          <div className="mt-3 d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={back}>← Back</button>
            <button className="btn btn-success">Save Course</button>
            <button className="btn btn-primary" onClick={next}>Next →</button>
          </div>
        </div>
      )}
      {step === 4 && (
        <div className="card p-4 shadow-sm">
          <h4>Payment & Pricing</h4>

          {/* Currency */}
          <div className="mt-2">
            <label className="form-label fw-semibold">Select Currency</label>
            <select
              className="form-select"
              value={payment.currency}
              onChange={(e) =>
                setPayment({ ...payment, currency: e.target.value })
              }
            >
              <option value="INR">INR ₹</option>
              <option value="USD">USD $</option>
              <option value="EUR">EUR €</option>
              <option value="GBP">GBP £</option>
            </select>
          </div>

          {/* Price + Discount */}
          <div className="row">
            <div className="col-md-6 mt-3">
              <label className="form-label fw-semibold">Course Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Price"
                value={payment.price}
                onChange={(e) => {
                  const price = e.target.value;
                  const final = calculateFinalPrice(price, payment.discount);
                  setPayment({ ...payment, price, finalPrice: final });
                }}
              />
            </div>

            <div className="col-md-6 mt-3">
              <label className="form-label fw-semibold">Discount (%)</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Discount %"
                value={payment.discount}
                onChange={(e) => {
                  const discount = e.target.value;
                  const final = calculateFinalPrice(payment.price, discount);
                  setPayment({ ...payment, discount, finalPrice: final });
                }}
              />
            </div>
          </div>

          {/* Final Amount */}
          <div className="mt-3">
            <label className="form-label fw-semibold text-success">
              Final Payable Amount
            </label>
            <input
              className="form-control fw-bold"
              value={
                payment.finalPrice
                  ? `${payment.currency} ${payment.finalPrice}`
                  : ""
              }
              disabled
            />
          </div>

          {/* Buttons */}
          <div className="mt-4 d-flex justify-content-between align-items-center">

            {/* Left Button */}
            <button className="btn btn-secondary" onClick={() => setStep(3)}>
              ← Back
            </button>

            {/* Right Buttons Group */}
            <div className="d-flex gap-3">
              <button
                className="btn btn-success px-4"
                onClick={() => {
                  console.log("PAYMENT DATA", payment);
                  alert("Course Published 🎉");
                }}
              >
                Publish Course
              </button>

              <button
                className="btn btn-warning px-4"
                onClick={() => {
                  console.log("PAYMENT DATA", payment);
                  alert("Draft Saved 📝");
                }}
              >
                Save as Draft
              </button>
            </div>

          </div>

        </div>
      )}



    </div>
  );
}
