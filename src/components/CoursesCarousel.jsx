import { Carousel, Card } from "react-bootstrap";

export default function CoursesCarousel() {
    // const courses = [
    //     { title: "React Course", image: "https://picsum.photos/300" },
    //     { title: "Node Course", image: "https://picsum.photos/301" },
    //     { title: "Python Course", image: "https://picsum.photos/302" },
    // ];

    return (
        <div className="container mt-5">
            <h2 className="fw-bold mb-3">Featured Courses</h2>

            <Carousel>
                {courses.map((course, i) => (
                    <Carousel.Item key={i}>
                        <Card className="p-3 shadow">
                            <Card.Img variant="top" src={course.image} />
                            <Card.Body>
                                <Card.Title>{course.title}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}
