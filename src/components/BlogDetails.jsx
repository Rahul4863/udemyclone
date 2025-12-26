import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SingleBlog.css";

export default function BlogDetails() {
    const blog = {
        title: "Difference between cloud computing and grid computing",
        author: "Delta IT Network",
        date: "15/07/2025",
        image: "https://picsum.photos/900/450",
        content: `
      <p>If you’ve ever tried to make sense of all the tech jargon floating around—especially terms like <b>cloud computing</b> and <b>grid computing</b>—you’re not alone...</p>

      <h3>What is Cloud Computing?</h3>
      <p>Cloud computing means delivering services like storage, computing power, and networking...</p>

      <h3>What is Grid Computing?</h3>
      <p>Grid computing uses multiple computers to work together on a single task...</p>

      <h3>Key Differences</h3>
      <ul>
        <li>Cloud = Scalable, Managed, Online</li>
        <li>Grid = Distributed, Shared computing power</li>
      </ul>
    `,
    };

    const toc = [
        "What is Cloud Computing?",
        "What is Grid Computing?",
        "Key Differences",
        "FAQs",
    ];

    const categories = [
        { name: "IT Solutions", count: 3 },
        { name: "IT Infra", count: 1 },
    ];

    const recentBlogs = [
        { title: "The Role of Educational Technology", date: "02/08/2025", img: "https://picsum.photos/120/80" },
        { title: "How IT Infrastructure Services Help India", date: "02/09/2025", img: "https://picsum.photos/120/81" },
        { title: "What is IT Infrastructure?", date: "01/09/2025", img: "https://picsum.photos/120/82" },
    ];

    const faqs = [
        {
            q: "What is the difference between cloud computing and grid computing?",
            a: "Cloud is scalable on-demand services, Grid is distributed computing across machines.",
        },
        {
            q: "Which one is better?",
            a: "Cloud for business scalability, Grid for heavy scientific computing tasks.",
        },
        {
            q: "Is cloud computing cheaper?",
            a: "Yes, because it follows pay-as-you-go and reduces infra cost.",
        },
    ];

    return (
        <div className="container my-5">
            <div className="row">

                {/* LEFT - TOC */}
                <div className="col-lg-3">
                    <div className="blog-box sticky-card">
                        <h5 className="box-title">Table of Contents</h5>

                        <ul className="toc-list">
                            {toc.map((item, i) => (
                                <li key={i}>
                                    <i className="bi bi-chevron-double-right"></i> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* CENTER BLOG */}
                <div className="col-lg-6">
                    <div className="blog-main">
                        <h2 className="blog-title">{blog.title}</h2>

                        <p className="blog-meta">
                            <b>Author :</b> {blog.author} &nbsp; | &nbsp;
                            <i className="bi bi-calendar"></i> {blog.date}
                        </p>

                        <img
                            src={blog.image}
                            className="img-fluid rounded shadow mb-4"
                            alt="blog"
                        />

                        <div
                            className="blog-content"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        ></div>

                        {/* FAQ */}
                        <div className="faq-box mt-4">
                            <h4 className="mb-3">Frequently Asked Questions</h4>

                            <div className="accordion" id="faqAccordion">
                                {faqs.map((f, i) => (
                                    <div className="accordion-item" key={i}>
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#faq${i}`}
                                            >
                                                {f.q}
                                            </button>
                                        </h2>

                                        <div
                                            id={`faq${i}`}
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#faqAccordion"
                                        >
                                            <div className="accordion-body">{f.a}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* RIGHT SIDEBAR */}
                <div className="col-lg-3">

                    <div className="sticky-wrapper">

                        {/* Categories */}
                        <div className="blog-box">
                            <h5 className="box-title">Categories</h5>

                            {categories.map((c, i) => (
                                <p key={i} className="category-item">
                                    <i className="bi bi-chevron-right"></i> {c.name}
                                    <span>({c.count})</span>
                                </p>
                            ))}
                        </div>

                        {/* Recent Blogs */}
                        <div className="blog-box mt-3">
                            <h5 className="box-title">Recent Blogs</h5>

                            {recentBlogs.map((b, i) => (
                                <div key={i} className="recent-item">
                                    <img src={b.img} alt="" />
                                    <div>
                                        <p className="recent-title">{b.title}</p>
                                        <small>
                                            <i className="bi bi-calendar"></i> {b.date}
                                        </small>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
