import SunEditor from "suneditor-react";
export default function Step3Curriculum({
    curriculum,
    setCurriculum,
    next,
    back
}) {
    return (
        <div className="card p-4 shadow-sm">
            <h4>Curriculum</h4>

            {/* ================= SECTION LIST ================= */}
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

                    {/* ===== ADD LECTURE BUTTON ===== */}
                    <div className="p-2 border rounded bg-white">
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

                    {/* ===== LECTURE LIST ===== */}
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

                            {/* Lecture Mode */}
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

                            {/* ---- VIDEO ---- */}
                            {lec.mode === "video" && (
                                <input
                                    type="file"
                                    className="form-control mt-2"
                                />
                            )}

                            {/* ---- ARTICLE ---- */}
                            {lec.mode === "article" && (
                                <div className="mt-2">
                                    <SunEditor
                                        height="250px"
                                        placeholder="Write Article..."
                                        setContents={lec.article}
                                        onChange={(content) => {
                                            const data = [...curriculum];
                                            data[sIndex].lectures[lIndex].article = content;
                                            setCurriculum(data);
                                        }}
                                    />
                                </div>
                            )}

                            {/* ---- QUIZ ---- */}
                            {lec.mode === "quiz" && (
                                <>
                                    <input
                                        className="form-control mt-2 fw-semibold"
                                        placeholder="Quiz Title"
                                        value={lec.quizTitle}
                                        onChange={(e) => {
                                            const data = [...curriculum];
                                            data[sIndex].lectures[lIndex].quizTitle = e.target.value;
                                            setCurriculum(data);
                                        }}
                                    />

                                    {lec.questions.map((q, qIndex) => (
                                        <div key={qIndex} className="mt-3 p-2 border rounded">

                                            {/* Question */}
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

                                            {/* Options */}
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

            {/* ================= ADD SECTION BUTTON ================= */}
            <button
                className="btn btn-primary w-100"
                onClick={() =>
                    setCurriculum([
                        ...curriculum,
                        { sectionTitle: "", lectures: [] }
                    ])
                }
            >
                + Add Section
            </button>

            {/* FOOTER BUTTONS */}
            <div className="mt-3 d-flex justify-content-between">
                <button className="btn btn-secondary" onClick={back}>
                    ← Back
                </button>
                <button className="btn btn-primary" onClick={next}>
                    Next →
                </button>
            </div>
        </div>
    );
}
