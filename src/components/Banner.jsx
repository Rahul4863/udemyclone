import { Carousel, Spinner } from "react-bootstrap";
import { baseurl } from "../App";
// const BASE_URL = "http://localhost:3000/";
function Banner({ banner, loadingBanner }) {
    const BASE_URL = baseurl + '/';
    console.log(banner);

    if (loadingBanner) {
        return (
            <div className="text-center my-4">
                <Spinner animation="border" />
            </div>
        );
    }

    if (!banner || banner.length === 0) return null;
    return (
        <Carousel>
            {banner.map((item) => (
                <Carousel.Item key={item.id}>
                    <img
                        className="d-block w-100"
                        src={`${BASE_URL}${item.image}`}
                        alt={item.title}
                        style={{ height: "400px", objectFit: "cover" }}
                    />
                    <Carousel.Caption>
                        <h3>{item.title}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}
export default Banner;
