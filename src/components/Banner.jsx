import { Carousel } from "react-bootstrap";

export default function Banner() {
    return (
        <Carousel>
            <Carousel.Item>
                <img className="d-block w-100" src="https://picsum.photos/1400/400" alt="" />
                <Carousel.Caption>
                    <h3>Learn Anytime Anywhere</h3>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img className="d-block w-100" src="https://picsum.photos/1401/400" alt="" />
                <Carousel.Caption>
                    <h3>Boost Your Skills</h3>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}
