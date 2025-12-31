export default function Step2Learning({
    whatLearn,
    setWhatLearn,
    requirements,
    setRequirements,
    audience,
    setAudience,
    next,
    back
}) {
    return (
        <div className="card p-4 shadow-sm">
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

            <h4>Audience</h4>
            <textarea
                className="form-control"
                rows="3"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
            ></textarea>

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
