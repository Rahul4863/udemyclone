import { useState } from "react";
import "./CreateCourse.css";

import StepNav from "./Steps/StepNav";
import Step1CourseInfo from "./Steps/Step1CourseInfo";
import Step2Learning from "./Steps/Step2Learning";
import Step3Curriculum from "./Steps/Step3Curriculum";
import Step4Payment from "./Steps/Step4Payment";

export default function CreateCourse() {

  const [step, setStep] = useState(1);

  const [course, setCourse] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    video: "",
    instructor: ""
  });

  const [whatLearn, setWhatLearn] = useState([""]);
  const [requirements, setRequirements] = useState([""]);
  const [audience, setAudience] = useState("");

  const [curriculum, setCurriculum] = useState([
    {
      sectionTitle: "",
      lectures: [""]
    }
  ]);

  const [payment, setPayment] = useState({
    currency: "INR",
    price: "",
    discount: "",
    finalPrice: ""
  });

  return (
    <div className="container mt-4">

      <h2 className="fw-bold mb-3">Create Course</h2>

      {/* NAV PILLS */}
      <StepNav step={step} setStep={setStep} />

      {/* STEPS */}
      {step === 1 && (
        <Step1CourseInfo
          course={course}
          setCourse={setCourse}
          next={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <Step2Learning
          whatLearn={whatLearn}
          setWhatLearn={setWhatLearn}
          requirements={requirements}
          setRequirements={setRequirements}
          audience={audience}
          setAudience={setAudience}
          next={() => setStep(3)}
          back={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <Step3Curriculum
          curriculum={curriculum}
          setCurriculum={setCurriculum}
          next={() => setStep(4)}
          back={() => setStep(2)}
        />
      )}

      {step === 4 && (
        <Step4Payment
          payment={payment}
          setPayment={setPayment}
          back={() => setStep(3)}
        />
      )}

    </div>
  );
}
