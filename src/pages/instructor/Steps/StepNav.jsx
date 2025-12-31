export default function StepNav({ step, setStep }) {
    return (
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
    );
}
