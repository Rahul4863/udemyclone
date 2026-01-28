import React, { useState, useEffect } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import axiosUser from "../../utils/axiosUser";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
const Section = () => {
    const [sections, setSections] = useState([]);
    const { id: courseId } = useParams();
    const [sectionTitle, setSectionTitle] = useState("");
    const [sectionPosition, setSectionPosition] = useState("");
    const [activeSection, setActiveSection] = useState(null);
    const [activeLecture, setActiveLecture] = useState(null);
    const [openSection, setOpenSection] = useState(null);
    const [isSavingLecture, setIsSavingLecture] = useState(false);
    const [sectionMode, setSectionMode] = useState("add"); // add | edit
    const [editingSectionId, setEditingSectionId] = useState(null);


    const [lectureData, setLectureData] = useState({
        title: "",
        type: "video",
        video_file: null,
        article_content: "",
        is_preview: false,
        resources: [],
        quiz: {
            title: "",
            questions: []
        }
    });
    const [resourceData, setResourceData] = useState({
        title: "",
        type: "pdf",
        url: "",
        file: null,
    });
    const saveSection = async () => {
        if (!sectionTitle.trim()) return;

        try {
            let res;

            if (sectionMode === "add") {
                // ✅ ADD
                res = await axiosUser.post("/course/section", {
                    course_id: courseId,
                    title: sectionTitle,
                    position: sectionPosition || sections.length + 1,
                });
            } else {
                // ✏️ UPDATE
                res = await axiosUser.put("/course/update-section", {
                    section_id: editingSectionId,
                    title: sectionTitle,
                    position: sectionPosition,
                });
            }

            if (res.data?.status) {
                toast.success(
                    sectionMode === "add"
                        ? "Section added successfully"
                        : "Section updated successfully"
                );

                await fetchSections();

                setSectionTitle("");
                setSectionPosition("");
                setEditingSectionId(null);
                setSectionMode("add");

                document.getElementById("sectionModalClose").click();
            } else {
                toast.error(res.data?.message || "Operation failed");
            }
        } catch (err) {
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        fetchSections();
    }, []);

    const fetchSections = async () => {
        try {
            const res = await axiosUser.get(`/course/allsection/${courseId}`);

            if (res.data?.status) {
                const normalized = res.data.data.map((sec) => ({
                    ...sec,
                    lectures: sec.lectures ?? [], // ✅ FIX
                })).sort((a, b) => (a.position || 0) - (b.position || 0));
                setSections(normalized);
            } else {
                setSections([]);
            }
        } catch (err) {
            toast.error("Failed to load sections");
        }
    };

    const addLecture = async () => {
        if (!lectureData.title.trim() || isSavingLecture) return;

        try {
            setIsSavingLecture(true);

            const formData = new FormData();
            formData.append("course_id", courseId);
            formData.append("section_id", sections[activeSection].id);
            formData.append("title", lectureData.title);
            formData.append("type", lectureData.type);
            formData.append("is_preview", lectureData.is_preview ? 1 : 0);

            if (lectureData.type === "video" && lectureData.video_file) {
                formData.append("video", lectureData.video_file);
            }

            if (lectureData.type === "article") {
                formData.append("Article", lectureData.article_content);
            }

            if (lectureData.type === "quiz") {
                formData.append("Quiz", JSON.stringify(lectureData.quiz));
            }

            const res = await axiosUser.post("/course/create-lecture", formData);

            if (res.data?.status) {
                toast.success("Lecture added successfully");

                // ✅ SINGLE SOURCE OF TRUTH
                await fetchSections();

                setLectureData({
                    title: "",
                    type: "video",
                    video_file: null,
                    article_content: "",
                    is_preview: false,
                    resources: [],
                    quiz: { title: "", questions: [] },
                });

                document.getElementById("lectureModalClose").click();
            } else {
                toast.error(res.data?.message || "Failed to add lecture");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error while adding lecture");
        } finally {
            setIsSavingLecture(false);
        }
    };



    /* ================= QUIZ ================= */
    const addQuestion = () => {
        setLectureData({
            ...lectureData,
            quiz: {
                ...lectureData.quiz,
                questions: [
                    ...lectureData.quiz.questions,
                    { question: "", options: ["", "", "", ""], answer: "" }
                ]
            }
        });
    };

    /* ================= ADD RESOURCE ================= */
    const addResource = async () => {
        try {
            if (!resourceData.title) {
                toast.error("Resource title required");
                return;
            }

            const lecture = sections[activeSection].lectures[activeLecture];

            const formData = new FormData();
            formData.append("lecture_id", lecture.id);
            formData.append("section_id", sections[activeSection].id);
            formData.append("title", resourceData.title);
            formData.append("type", resourceData.type);

            if (resourceData.type === "link") {
                formData.append("external_url", resourceData.url);
            } else {
                // 🔥 THIS MUST MATCH multer field name
                formData.append("file", resourceData.file);
            }

            const res = await axiosUser.post(
                "/course/create-lecture-resource",
                formData
            );

            if (res.data?.status) {
                toast.success("Resource added successfully");
                await fetchSections();

                setResourceData({
                    title: "",
                    type: "pdf",
                    url: "",
                    file: null,
                });

                document.getElementById("resourceModalClose").click();
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to upload resource");
        }
    };



    return (
        <div className="container mt-4">

            {/* HEADER */}
            <div className="d-flex justify-content-between mb-3">
                <h4>Course Content</h4>
                <button
                    className="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#sectionModal"
                    onClick={() => {
                        setSectionMode("add");
                        setEditingSectionId(null);
                        setSectionTitle("");
                        setSectionPosition("");
                    }}
                >
                    + Add Section
                </button>

            </div>

            {/* SECTIONS */}
            <div className="accordion" id="courseAccordion">
                {sections.map((section, sIndex) => (
                    <div className="accordion-item mb-3" key={sIndex}>
                        <h2 className="accordion-header">
                            <div className="d-flex align-items-center justify-content-between">

                                {/* Accordion Toggle Button */}
                                <button
                                    className={`accordion-button ${openSection === sIndex ? "" : "collapsed"}`}
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#section-${sIndex}`}
                                    onClick={() =>
                                        setOpenSection(openSection === sIndex ? null : sIndex)
                                    }
                                    style={{ flex: 1 }}
                                >
                                    ☰ Section {sIndex + 1}: {section.title}
                                </button>

                                {/* ✏️ EDIT BUTTON (SEPARATE BUTTON ✅) */}
                                <button
                                    type="button"
                                    style={{ marginTop: "-21px" }}
                                    className="btn btn-sm btn-outline-secondary ms-2"
                                    title="Edit Section"
                                    data-bs-toggle="modal"
                                    data-bs-target="#sectionModal"
                                    onClick={async (e) => {
                                        e.stopPropagation();

                                        try {
                                            setSectionMode("edit");
                                            setEditingSectionId(section.id);

                                            const res = await axiosUser.get(
                                                `/course/edit-section/${section.id}`
                                            );

                                            if (res.data?.status) {
                                                const sec = res.data.data;
                                                setSectionTitle(sec.title);
                                                setSectionPosition(sec.position);
                                            }
                                        } catch (err) {
                                            toast.error("Failed to load section");
                                        }
                                    }}
                                >
                                    ✏️
                                </button>


                            </div>
                        </h2>


                        <div
                            id={`section-${sIndex}`}
                            className={`accordion-collapse collapse ${openSection === sIndex ? "show" : ""}`}
                            data-bs-parent="#courseAccordion"
                        >
                            <div className="accordion-body">

                                <button
                                    className="btn btn-primary btn-sm mb-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#lectureModal"
                                    onClick={() => setActiveSection(sIndex)}
                                >
                                    + Add Lecture
                                </button>

                                <ul className="list-group">
                                    {section.lectures.length === 0 && (
                                        <li className="list-group-item text-muted">
                                            No lectures added
                                        </li>
                                    )}

                                    {section.lectures?.map((lec, lIndex) => (
                                        <li
                                            key={lec.id}
                                            className="list-group-item d-flex justify-content-between align-items-center"
                                        >
                                            <div>
                                                ☰ {lec.title}
                                                <span className="badge bg-secondary ms-2">{lec.type}</span>

                                                {lec.is_preview === 1 && (
                                                    <span className="badge bg-info ms-2">Preview</span>
                                                )}
                                            </div>

                                            <div>
                                                {/* ✅ ADD RESOURCE BUTTON */}
                                                <button
                                                    className="btn btn-outline-secondary btn-sm me-2"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#resourceModal"
                                                    onClick={() => {
                                                        setActiveSection(sIndex);
                                                        setActiveLecture(lIndex);
                                                    }}
                                                >
                                                    Resources ({lec.resources?.length || 0})
                                                </button>

                                                {/* (optional) delete lecture */}
                                                <button className="btn btn-danger btn-sm">
                                                    Delete
                                                </button>
                                            </div>
                                        </li>
                                    ))}

                                </ul>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ================= ADD SECTION MODAL ================= */}
            <div className="modal fade" id="sectionModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>
                                {sectionMode === "add" ? "Add Section" : "Edit Section"}
                            </h5>
                        </div>

                        <div className="modal-body">
                            <input
                                className="form-control"
                                placeholder="Section Title"
                                value={sectionTitle}
                                onChange={(e) => setSectionTitle(e.target.value)}
                            />

                            <input
                                className="form-control mt-2"
                                type="number"
                                placeholder="Section Position"
                                value={sectionPosition}
                                onChange={(e) => setSectionPosition(e.target.value)}
                            />
                        </div>

                        <div className="modal-footer">
                            <button
                                id="sectionModalClose"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn-primary"
                                onClick={saveSection}
                            >
                                {sectionMode === "add" ? "Save Section" : "Update Section"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            {/* ================= ADD LECTURE MODAL ================= */}
            <div className="modal fade" id="lectureModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header"><h5>Add Lecture</h5></div>

                        <div className="modal-body">
                            <input
                                className="form-control mb-2"
                                placeholder="Lecture Title"
                                value={lectureData.title}
                                onChange={(e) => setLectureData({ ...lectureData, title: e.target.value })}
                            />

                            <select
                                className="form-select mb-3"
                                value={lectureData.type}
                                onChange={(e) => setLectureData({ ...lectureData, type: e.target.value })}
                            >
                                <option value="video">Video</option>
                                <option value="article">Article</option>
                                <option value="quiz">Quiz</option>
                            </select>

                            {/* VIDEO */}
                            {lectureData.type === "video" && (
                                <>
                                    <input
                                        type="file"
                                        accept="video/*"
                                        className="form-control mb-2"
                                        onChange={(e) =>
                                            setLectureData({
                                                ...lectureData,
                                                video_file: e.target.files[0] // File object
                                            })
                                        }
                                    />

                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={lectureData.is_preview}
                                            onChange={(e) => setLectureData({ ...lectureData, is_preview: e.target.checked })}
                                        />
                                        <label className="form-check-label">Preview</label>
                                    </div>
                                </>
                            )}
                            {lectureData.type === "article" && (
                                <SunEditor
                                    setContents={lectureData.article_content}
                                    onChange={(content) =>
                                        setLectureData({ ...lectureData, article_content: content })
                                    }
                                />
                            )}

                            {/* QUIZ */}
                            {lectureData.type === "quiz" && (
                                <>
                                    <input
                                        className="form-control mb-2"
                                        placeholder="Quiz Title"
                                        value={lectureData.quiz.title}
                                        onChange={(e) =>
                                            setLectureData({
                                                ...lectureData,
                                                quiz: { ...lectureData.quiz, title: e.target.value }
                                            })
                                        }
                                    />

                                    <button className="btn btn-outline-primary btn-sm mb-2" onClick={addQuestion}>
                                        + Add Question
                                    </button>

                                    {lectureData.quiz.questions.map((q, qi) => (
                                        <div key={qi} className="border p-2 mb-2">
                                            <input className="form-control mb-2" placeholder="Question" />
                                            {q.options.map((_, oi) => (
                                                <input key={oi} className="form-control mb-1" placeholder={`Option ${oi + 1}`} />
                                            ))}
                                            <input className="form-control" placeholder="Correct Answer" />
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>

                        <div className="modal-footer">
                            <button id="lectureModalClose" className="btn btn-secondary" data-bs-dismiss="modal">
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                disabled={isSavingLecture}
                                onClick={addLecture}
                            >
                                {isSavingLecture ? "Saving..." : "Save Lecture"}
                            </button>


                        </div>
                    </div>
                </div>
            </div>

            {/* ================= ADD RESOURCE MODAL ================= */}
            <div className="modal fade" id="resourceModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header"><h5>Add Resource</h5></div>

                        <div className="modal-body">
                            {/* Resource Title */}
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>File / URL</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Slides</td>
                                        <td><a href="#">slides.pdf</a></td>
                                        <td><button className="btn btn-sm btn-danger">Delete</button></td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr />
                            <input
                                className="form-control mb-2"
                                placeholder="Resource Title"
                                value={resourceData.title}
                                onChange={(e) =>
                                    setResourceData({ ...resourceData, title: e.target.value })
                                }
                            />

                            {/* Resource Type */}
                            <select
                                className="form-select mb-2"
                                value={resourceData.type}
                                onChange={(e) =>
                                    setResourceData({
                                        ...resourceData,
                                        type: e.target.value,
                                        file: null, // reset
                                        url: ""     // reset
                                    })
                                }
                            >
                                <option value="pdf">PDF</option>
                                <option value="zip">ZIP</option>
                                <option value="link">External Link</option>
                            </select>

                            {/* FILE INPUT (PDF / ZIP) */}
                            {(resourceData.type === "pdf" || resourceData.type === "zip") && (
                                <input
                                    type="file"
                                    accept={
                                        resourceData.type === "pdf"
                                            ? "application/pdf"
                                            : "application/zip"
                                    }
                                    className="form-control mb-2"
                                    onChange={(e) =>
                                        setResourceData({
                                            ...resourceData,
                                            file: e.target.files[0]
                                        })
                                    }
                                />
                            )}

                            {/* URL INPUT (LINK ONLY) */}
                            {resourceData.type === "link" && (
                                <input
                                    className="form-control"
                                    placeholder="External Link URL"
                                    value={resourceData.url}
                                    onChange={(e) =>
                                        setResourceData({
                                            ...resourceData,
                                            url: e.target.value
                                        })
                                    }
                                />
                            )}
                        </div>


                        <div className="modal-footer">
                            <button id="resourceModalClose" className="btn btn-secondary" data-bs-dismiss="modal">
                                Cancel
                            </button>
                            <button className="btn btn-primary" onClick={addResource}>
                                Save Resource
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
export default Section;
