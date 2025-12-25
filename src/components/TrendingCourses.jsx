import { Card } from "react-bootstrap";

export default function TrendingCourses() {
    const trending = [
        { title: "Full Stack", img: "https://picsum.photos/250" },
        { title: "AI / ML", img: "https://picsum.photos/251" },
        { title: "Cyber Security", img: "https://picsum.photos/252" },
    ];

    return (
        <div className="container mt-5">
            <h2 className="fw-bold mb-3">Trending Courses</h2>

            <div className="row">
                {trending.map((c, i) => (
                    <div className="col-md-4 mb-3" key={i}>
                        <Card className="shadow">
                            <Card.Img src={c.img} />
                            <Card.Body>
                                <Card.Title>{c.title}</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}
