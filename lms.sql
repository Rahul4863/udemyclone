-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 27, 2026 at 01:12 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lms`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_banner`
--

CREATE TABLE `tbl_banner` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_banner`
--

INSERT INTO `tbl_banner` (`id`, `title`, `image`, `created_at`, `updated_at`) VALUES
(1, 'learning through with new platform', 'uploads/banner/1768469084312-260634120.jpg', '2026-01-09 18:00:28', '2026-01-15 14:54:44'),
(2, 'leaning skills', 'uploads/banner/1768469140531-872902800.jpg', '2026-01-13 11:23:03', '2026-01-15 14:55:40');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_blogs`
--

CREATE TABLE `tbl_blogs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `url_title` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `description` longtext NOT NULL,
  `image` text NOT NULL,
  `data` longtext NOT NULL,
  `faq` longtext NOT NULL,
  `Author` varchar(255) NOT NULL,
  `status_change` enum('1','2') NOT NULL DEFAULT '1' COMMENT '"1":"saveasdraft",2:"published"',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_blogs`
--

INSERT INTO `tbl_blogs` (`id`, `title`, `url_title`, `category_id`, `user_id`, `description`, `image`, `data`, `faq`, `Author`, `status_change`, `created_at`, `updated_at`) VALUES
(1, 'What Is the Smart Whiteboard Price in 2026?', 'what-is-the-smart-whiteboard-price-in-2026', 3, 2, 'A smart board for teaching use is not just a digital upgrade—it’s a shift in how students experience learning. When used correctly, it turns lessons into conversations, concepts into visuals, and classrooms into active learning spaces.Let’s explore how smart boards genuinely improve student engagement, not in theory, but in everyday classroom reality', 'uploads/insightpage-interest/1768461069700-454057985.jpg', '<p><br></p><h2 style=\"line-height: 1.2\">Why Student Engagement Is a Real Challenge Today</h2><p>Traditional teaching methods worked well in the past because distractions were limited. Today’s students grow up surrounded by screens, visuals, and instant information. Expecting them to stay engaged with only textbooks and verbal explanations is unrealistic.</p><p>In many classrooms:</p><ul><li>Students lose focus quickly</li><li>Only a few participate actively</li><li>Learning feels repetitive</li><li>Concepts remain abstract</li></ul><p>This doesn’t mean teachers aren’t trying. It means the tools need to match the learners. That’s where smart classroom technology steps in.</p><p> </p><h2 style=\"line-height: 1.2\">What Makes a Smart Board Different from a Normal Board</h2><p>A smart board is an interactive display that allows teachers and students to:</p><ul><li>Write using fingers or pens</li><li>Show videos, animations, and diagrams</li><li>Open digital textbooks and TLM</li><li>Conduct quizzes and activities instantly</li></ul><p>Unlike a blackboard or whiteboard, a smart board reacts to touch. It responds. It invites interaction. And that simple change has a powerful impact on how students engage.</p><p> </p><h2 style=\"line-height: 1.2\">From Passive Learning to Active Participation</h2><p>In a traditional class, learning is mostly one-way. The teacher explains, students listen. With a smart board for classroom, learning becomes two-way.</p><ul><li>Students come to the board.</li><li>They solve problems.</li><li>They move objects.</li><li>They answer questions.</li><li>They explain ideas.</li></ul><p>The moment students participate physically, their attention increases naturally. Engagement stops being forced—it becomes automatic.</p><p> </p><h2 style=\"line-height: 1.2\">Visual Learning Makes Concepts Stick</h2><p>Not every student learns the same way. Some understand better by reading, some by listening, and many by seeing.</p><p>Smart boards support visual learning beautifully:</p><ul><li>Animated science experiments</li><li>Geography maps that zoom and move</li><li>Maths problems explained step-by-step</li><li>Historical events shown through visuals</li></ul><p>When students can <em>see</em> what’s being explained, concepts stop feeling confusing. Understanding improves, and so does confidence.</p><p> </p><h2 style=\"line-height: 1.2\">Smart Board for Classroom: Making Learning Feel Real</h2><p>A <a href=\"https://www.deltaview.in/smart-board-for-teaching\">smart board for classroom</a> use helps connect lessons to real life. Instead of imagining a process, students watch it unfold on screen.</p><p>For example:</p><ul><li>A biology lesson becomes a live animation</li><li>A physics concept turns into a simulation</li><li>A language class includes audio and visuals</li></ul><p>This realism keeps students interested because learning no longer feels distant or abstract.</p><p> </p><h2 style=\"line-height: 1.2\">How Smart Boards Support Smart Class Culture</h2><p>A smart class is not about technology alone. It’s about interaction, collaboration, and curiosity.</p><p>Smart boards encourage:</p><ul><li>Group discussions</li><li>Peer learning</li><li>Classroom debates</li><li>Student presentations</li></ul><p>When students work together on the board, learning becomes social. They learn not only from teachers, but also from each other.</p><p> </p><h2 style=\"line-height: 1.2\">Smart Board for Teachers: Teaching Becomes Easier</h2><p>Smart boards don’t replace teachers—they support them.</p><p>For teachers, smart boards help by:</p><ul><li>Reducing repetitive writing</li><li>Organizing lessons better</li><li>Saving time during explanations</li><li>Managing class attention effectively</li></ul><p>Instead of spending energy on writing and erasing, teachers focus on explaining, guiding, and engaging students.</p><p> </p><h2 style=\"line-height: 1.2\">Better Use of Teaching Learning Materials (TLM)</h2><p>TLM plays a crucial role in learning outcomes. Traditional <a href=\"https://www.deltaview.in/blog/what-is-tlm-in-education-tlm-full-form-tlm-for-primary-school\">TLM</a> like charts and printed worksheets have limitations.</p><p>With smart boards:</p><ul><li>Digital TLM is reusable</li><li>Content can be updated easily</li><li>Lessons stay aligned with curriculum</li><li>Engagement remains high</li></ul><p>Interactive TLM helps students remember concepts longer because learning involves action, not just observation.</p><p> </p><h2 style=\"line-height: 1.2\">Alignment with NEP2020 Goals</h2><p>NEP2020 emphasizes:</p><ul><li>Experiential learning</li><li>Conceptual understanding</li><li>Digital literacy</li><li>Student-centric education</li></ul><p>Smart boards directly support these goals. They encourage exploration instead of memorization. Students learn by doing, questioning, and interacting—exactly what <a href=\"https://www.deltaview.in/blog/what-is-nep-2020-how-smart-boards-are-powering-classrooms\">NEP2020</a> promotes.</p><p> </p><h2 style=\"line-height: 1.2\">EdTech Integration Enhances Engagement</h2><p>Smart boards work smoothly with edtech platforms and digital tools. Teachers can:</p><ul><li>Access online content</li><li>Use educational apps</li><li>Conduct instant assessments</li><li>Track student understanding</li></ul><p>This integration makes classrooms future-ready and keeps students interested in how they learn.</p><p> </p><h2 style=\"line-height: 1.2\">Smart Board Price: Value Beyond Cost</h2><p>Many schools worry about smart board price, but the focus should be on value, not just cost.</p><p>Smart boards offer:</p><ul><li>Long-term use</li><li>Reduced printing expenses</li><li>Reusable digital content</li><li>Improved learning outcomes</li></ul><p>When engagement improves, results improve. And that makes the investment worthwhile.</p><p> </p><h2 style=\"line-height: 1.2\">Encouraging Every Student to Participate</h2><p>In a smart classroom, engagement is not limited to confident students. Even quieter students feel comfortable participating through:</p><ul><li>On-screen quizzes</li><li>Visual answers</li><li>Group activities</li></ul><p>Smart boards create a safe space where students can engage without fear of being wrong.</p><p> </p><h2 style=\"line-height: 1.2\">Challenges and Practical Solutions</h2><p>Like any technology, smart boards need:</p><ul><li>Basic teacher training</li><li>Reliable power and internet</li><li>Gradual adoption</li></ul><p>Once these are in place, the transition becomes smooth. Most teachers adapt quickly when they see how much easier teaching becomes.</p><p> </p><h2 style=\"line-height: 1.2\">The Future of Classrooms Is Interactive</h2><p>Education is moving forward, and classrooms must evolve with it. Smart boards are no longer optional tools—they are becoming essential for meaningful engagement.</p><p>As smart classroom adoption grows across India, especially with NEP2020 and edtech expansion, student engagement will continue to improve.</p><p> </p><h2 style=\"line-height: 1.2\">Conclusion</h2><p>Smart boards don’t magically make students smarter—but they make learning more engaging, interactive, and effective. By transforming lessons into experiences, smart boards help students stay curious, involved, and confident.</p><p>A smart board for teaching is not about technology. It’s about connection—between students, teachers, and knowledge. And that connection is what truly drives engagement.</p>', '[{\"question\":\"Do smart boards really improve student attention?\",\"answer\":\"Yes. Interactive visuals and activities naturally hold student interest better than traditional methods.\"},{\"question\":\"Can smart boards be used for all subjects? \",\"answer\":\"Absolutely. They are effective across maths, science, languages, and humanities.\"},{\"question\":\"Are smart boards difficult for teachers to use?\",\"answer\":\"No. With minimal training, teachers adapt quickly and often prefer smart boards.\"},{\"question\":\"How do smart boards support NEP2020?\",\"answer\":\"They encourage experiential learning, digital skills, and concept-based education.\"}]', '', '2', '2026-01-14 16:22:56', '2026-01-15 15:45:16'),
(2, 'testing', 'testing', 4, 5, 'dxxvsdxfdszx', 'uploads/user-insight/1769084693585-232143193.jpeg', '<p>xfc zsdxfcszdxfcsdxcsx</p>', '[{\"question\":\"testing\",\"answer\":\"testing\"}]', '', '1', '2026-01-22 17:54:53', '2026-01-22 18:25:06');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_category`
--

CREATE TABLE `tbl_category` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `status` enum('0','1') DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_category`
--

INSERT INTO `tbl_category` (`id`, `category_name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Development', '1', '2026-01-03 14:28:16', '2026-01-19 15:07:34'),
(2, 'Business', '1', '2026-01-03 14:31:36', '2026-01-19 15:08:19'),
(3, 'Finance & Accounting', '1', '2026-01-06 16:31:13', '2026-01-19 15:27:51'),
(4, 'IT & Software', '1', '2026-01-19 15:28:00', '0000-00-00 00:00:00'),
(5, 'Office Productivity', '1', '2026-01-19 15:28:05', '0000-00-00 00:00:00'),
(6, 'Personal Development', '1', '2026-01-19 15:28:13', '0000-00-00 00:00:00'),
(7, 'Design', '1', '2026-01-19 15:28:25', '0000-00-00 00:00:00'),
(8, 'Marketing', '1', '2026-01-19 15:28:33', '0000-00-00 00:00:00'),
(9, 'Health & Fitness', '1', '2026-01-19 15:28:44', '0000-00-00 00:00:00'),
(10, 'Music', '1', '2026-01-19 15:28:53', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_courses`
--

CREATE TABLE `tbl_courses` (
  `id` bigint(20) NOT NULL,
  `instructor_id` bigint(20) NOT NULL,
  `category` int(11) NOT NULL,
  `subcategory` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `heading` text NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `coursevideo` text NOT NULL,
  `level` enum('beginner','intermediate','advanced') DEFAULT 'beginner',
  `language` varchar(50) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT 0.00,
  `is_free` tinyint(1) DEFAULT 0,
  `status` enum('draft','published','archived') DEFAULT 'draft',
  `learn` longtext NOT NULL,
  `requirements` longtext NOT NULL,
  `coursefor` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_courses`
--

INSERT INTO `tbl_courses` (`id`, `instructor_id`, `category`, `subcategory`, `title`, `heading`, `slug`, `description`, `thumbnail`, `coursevideo`, `level`, `language`, `price`, `is_free`, `status`, `learn`, `requirements`, `coursefor`, `created_at`, `updated_at`) VALUES
(4, 5, 1, 1, 'The Complete Full-Stack Web Development Bootcamp', 'Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!', 'the-complete-full-stack-web-development-bootcamp', '<p><br></p><p>Welcome to the 100 Days of Code - The Complete Python Pro Bootcamp,<strong> the only course you need</strong> to learn to code with Python. With over 500,000 <strong>5 STAR reviews</strong> and a 4.8 average, my courses are some of the HIGHEST&nbsp;RATED courses in the history of Udemy!&nbsp;&nbsp;</p><p><strong>100 days, 1 hour per day, learn to build 1 project per day, this is how you master Python.</strong></p><p>At 60+ hours, this Python course is without a doubt the <strong>most comprehensive </strong>Python course available anywhere online. Even if you have <strong>zero</strong> programming experience, this course will take you from <strong>beginner to professional</strong>. Here\'s why:</p><ul><li><p>The course is taught by the <strong>lead instructor</strong> at the App Brewery, London\'s <strong>best in-person programming Bootcamp</strong>.</p></li><li><p>The course has been updated and you\'ll be learning the latest tools and technologies used at large companies such as Apple, Google and Netflix.</p></li><li><p>This course doesn\'t cut any corners, there are beautiful <strong>animated explanation videos</strong> and tens of <strong>real-world projects</strong> which you will get to build. e.g. Tinder auto swiper, Snake game, Blog Website, LinkedIn Auto Submit Job Application</p></li><li><p>The curriculum was developed over a period of<strong> 2 years</strong>, with comprehensive student testing and feedback.</p></li><li><p>We\'ve taught over 600,000 students how to code and many have gone on to <strong>change their lives </strong>by becoming professional developers or starting their own tech startup.</p></li><li><p>You\'ll save yourself <strong>over $12,000 </strong>by enrolling, and still get access to the same teaching materials and learn from the same instructor and curriculum as our in-person programming Bootcamp.</p></li><li><p>The course is <strong>constantly updated</strong> with new content, with new projects and modules determined by students - that\'s you!</p></li></ul><p><br></p><p>We\'ll take you <strong>step-by-step</strong> through engaging video tutorials and teach you everything you need to know to succeed as a Python developer.</p><p>The course includes over <strong>65 hours</strong> of HD video tutorials and builds your programming knowledge while making real-world Python projects.</p><p><br></p><p>Throughout this comprehensive course, we cover a massive amount of tools and technologies, including:</p><ul><li><p>Python 3 - the latest version of Python</p></li><li><p>PyCharm, Jupyter Notebook, Google Colab</p></li><li><p>Python&nbsp;Scripting and Automation</p></li><li><p>Python Game Development</p></li><li><p>Web Scraping</p></li><li><p>Beautiful Soup</p></li><li><p><strong>Selenium</strong> Web Driver</p></li><li><p>Request</p></li><li><p>WTForms</p></li><li><p>Data Science</p></li><li><p>Pandas</p></li><li><p><strong>NumPy</strong></p></li><li><p>Matplotlib</p></li><li><p><strong>Plotly</strong></p></li><li><p>Scikit learn</p></li><li><p>Seaborn</p></li><li><p>Turtle</p></li><li><p>Python GUI Desktop App Development</p></li><li><p><strong>Tkinter</strong></p></li><li><p>Front-End Web Development</p></li><li><p>HTML 5</p></li><li><p>CSS 3</p></li><li><p>Bootstrap 4</p></li><li><p>Bash Command Line</p></li><li><p>Git, <strong>GitHub</strong> and Version Control</p></li><li><p>Backend Web Development</p></li><li><p><strong>Flask</strong></p></li><li><p>REST</p></li><li><p><strong>APIs</strong></p></li><li><p>Databases</p></li><li><p>SQL</p></li><li><p><strong>SQLite</strong></p></li><li><p>PostgreSQL</p></li><li><p>Authentication</p></li><li><p>Web Design</p></li><li><p>Deployment with GitHub Pages, Heroku and GUnicorn</p></li><li><p>and much much more!</p></li></ul><p>By the end of this course, you will be <strong>fluently</strong> programming&nbsp;in Python and you\'ll be so good at Python that you can get a job or use the language professionally.</p><p>You\'ll also build a <strong>portfolio</strong> of <strong>100 projects</strong> that you can show off to any potential employer. Including:</p><ul><li><p>Blackjack</p></li><li><p>Snake Game</p></li><li><p>Pong Game</p></li><li><p>Auto Swipe on Tinder</p></li><li><p>Auto Job Applications on LinkedIn</p></li><li><p>Automate Birthday Emails/SMS</p></li><li><p>Fully Fledged Blog Website</p></li><li><p>Build Your Own Public API</p></li><li><p>Data Science with Google Trends</p></li><li><p>Analysing Lego Datasets</p></li><li><p>Google App Store Analysis</p></li><li><p>and much much more!</p></li></ul><p><strong>Sign up today, and look forward to:</strong></p><ul><li><p>Video Lectures</p></li><li><p>Code Challenges and Exercises</p></li><li><p>Fully Fledged Projects</p></li><li><p>Quizzes</p></li><li><p>Programming Resources and Cheatsheets</p></li><li><p>Downloads</p></li><li><p>Our best selling 12 Rules to Learn to Code eBook</p></li><li><p>$12,000+&nbsp;Python Pro Bootcamp&nbsp;course materials and curriculum</p></li></ul><p><br></p><p>Don\'t just take my word for it, check out what existing students have to say about my courses:</p><p>\"Angela is just incredible, awesome and just fantastic in this course. I\'ve never had such an instructor; <strong>detailed</strong> in every aspect of the course, gives precise explanations, gives you the anxiety to learn etc. She\'s got that ability to make fun while explaining things for better understanding. I really love this course.\" - Ekeu MonkamUlrich</p><p>\"Angela is very thorough without ever being boring. I\'ve taken MANY online courses in my life including my Bachelors and Masters degrees. She is by far the best instructor I\'ve ever had. This course is <strong>packed with thousands of dollars worth of great instruction</strong>, and paced well enough for anyone to pick coding up and run with it- Thank you!\" - J Carlucci</p><p>\"Love the way Angela explains things. Easy to follow and full of logic. I can say she must spend a lot of energy creating this great course. Thank you and I recommend it to all who\'s interested in coding!\" - Yiqing Zheng</p><p>\"So far (on my third day) this course has taught me <strong>more than I was able to learn in multiple other programming courses</strong>. This course is clearly outlined and builds upon itself gradually in an easy to understand way.\" - Normal Ramsey</p><p>\"It\'s a different approach to teaching Web Development. I like that you are <strong>given everything possible to succeed</strong> from the onset.\" - Ronick Thomas</p><p>The tutor is simply AMAZING, by far the best tutor I have ever had. I would give her 10 stars out of 5. She is not just punching the code and talking to herself, but she is actually explaining things. She keeps on giving really useful hints and she will give you a great load of other references. I always knew what I was doing and why I was doing it. All the extra challenges have just made me remember and understand things better. - Peter Dlugos</p><p><br></p><p><br></p><p><strong>REMEMBER… I\'m so confident that you\'ll love this course that&nbsp;we\'re offering a FULL money-back guarantee for&nbsp;30 days! So it\'s a complete no-brainer, sign up today with ZERO&nbsp;risk and EVERYTHING to gain.</strong></p><p>So what are you waiting for?&nbsp;Click the buy now button and join the world\'s highest-rated development course.</p>', 'uploads/images/1769507873494-108967924.jpeg', 'uploads/videos/1769507873508-998005932.mp4', 'beginner', 'English', 0.00, 1, 'draft', '[\"You will master the Python programming language by building 100 unique projects over 100 days.\",\"After the course you will be able to build ANY website you want.\",\"Work as a freelance web developer.\",\"Master backend development with Node\",\"Project 2: SDR Agent. An instant business application: create Sales Representatives that craft and send professional emails .\",\"Project 4: Build a Stock Picker Agent in minutes with CrewAI—automate your search for investment gems!\"]', '[\"No programming experience needed - I\'ll teach you everything you need to know\",\"A computer with access to the internet\",\"No paid software required\",\"I\'ll walk you through, step-by-step how to get all the software installed and set up\"]', '[\"beginners\"]', '2026-01-27 09:57:53', '2026-01-27 09:59:08');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_lectures`
--

CREATE TABLE `tbl_lectures` (
  `id` bigint(20) NOT NULL,
  `section_id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `type` enum('video','article','quiz','resource') DEFAULT 'video',
  `video_url` varchar(500) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL COMMENT 'Duration in seconds',
  `is_preview` tinyint(1) DEFAULT 0,
  `position` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_lecture_resources`
--

CREATE TABLE `tbl_lecture_resources` (
  `id` bigint(20) NOT NULL,
  `lecture_id` bigint(20) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `file_url` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sections`
--

CREATE TABLE `tbl_sections` (
  `id` bigint(20) NOT NULL,
  `course_id` bigint(20) NOT NULL,
  `instructor_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `position` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_sections`
--

INSERT INTO `tbl_sections` (`id`, `course_id`, `instructor_id`, `title`, `position`, `created_at`, `updated_at`) VALUES
(1, 4, 5, 'Day 1 - Beginner - Working with Variables in Python to Manage Data', 1, '2026-01-27 12:10:25', '2026-01-27 12:10:25');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_subcategory`
--

CREATE TABLE `tbl_subcategory` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `subcategory_name` varchar(255) NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_subcategory`
--

INSERT INTO `tbl_subcategory` (`id`, `category_id`, `subcategory_name`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Web Development', '1', '2026-01-06 17:22:12', '2026-01-19 15:30:36'),
(2, 1, 'Mobile Development', '1', '2026-01-19 15:31:01', '0000-00-00 00:00:00'),
(3, 1, 'Programming Languages', '1', '2026-01-19 15:31:11', '0000-00-00 00:00:00'),
(4, 1, 'Game Development', '1', '2026-01-19 15:31:23', '0000-00-00 00:00:00'),
(5, 1, 'Database Design & Development', '1', '2026-01-19 15:31:34', '0000-00-00 00:00:00'),
(6, 1, 'Software Testing', '1', '2026-01-19 15:31:41', '0000-00-00 00:00:00'),
(7, 2, 'Entrepreneurship', '1', '2026-01-19 15:33:39', '0000-00-00 00:00:00'),
(8, 2, 'Communication', '1', '2026-01-19 15:33:52', '0000-00-00 00:00:00'),
(9, 2, 'Management', '1', '2026-01-19 15:34:04', '0000-00-00 00:00:00'),
(10, 2, 'Sales', '1', '2026-01-19 15:34:13', '0000-00-00 00:00:00'),
(11, 2, 'Business Strategy', '1', '2026-01-19 15:34:23', '0000-00-00 00:00:00'),
(12, 3, 'Accounting & Bookkeeping', '1', '2026-01-19 15:35:16', '0000-00-00 00:00:00'),
(13, 3, 'Cryptocurrency & Blockchain', '1', '2026-01-19 15:35:26', '0000-00-00 00:00:00'),
(14, 3, 'Finance', '1', '2026-01-19 15:35:35', '0000-00-00 00:00:00'),
(15, 3, 'Financial Modeling & Analysis', '1', '2026-01-19 15:35:50', '0000-00-00 00:00:00'),
(16, 3, 'Investing & Trading', '1', '2026-01-19 15:36:02', '0000-00-00 00:00:00'),
(17, 4, 'IT Certifications', '1', '2026-01-19 15:43:06', '0000-00-00 00:00:00'),
(18, 4, 'Network & Security', '1', '2026-01-19 15:43:29', '0000-00-00 00:00:00'),
(19, 4, 'Hardware', '1', '2026-01-19 15:43:44', '0000-00-00 00:00:00'),
(20, 4, 'Operating Systems & Servers', '1', '2026-01-19 15:43:56', '0000-00-00 00:00:00'),
(21, 4, 'Other IT & Software', '1', '2026-01-19 15:44:04', '0000-00-00 00:00:00'),
(22, 5, 'Microsoft', '1', '2026-01-19 15:45:29', '0000-00-00 00:00:00'),
(23, 5, 'Apple', '1', '2026-01-19 15:45:37', '0000-00-00 00:00:00'),
(24, 5, 'Google', '1', '2026-01-19 15:45:47', '0000-00-00 00:00:00'),
(25, 5, 'SAP', '1', '2026-01-19 15:45:56', '0000-00-00 00:00:00'),
(26, 5, 'Oracle', '1', '2026-01-19 15:46:08', '0000-00-00 00:00:00'),
(27, 5, 'Other Office Productivity', '1', '2026-01-19 15:46:19', '0000-00-00 00:00:00'),
(28, 6, 'Personal Transformation', '1', '2026-01-19 15:50:11', '0000-00-00 00:00:00'),
(29, 6, 'Personal Productivity', '1', '2026-01-19 15:50:28', '0000-00-00 00:00:00'),
(30, 6, 'Leadership', '1', '2026-01-19 15:50:39', '0000-00-00 00:00:00'),
(31, 6, 'Career Development', '1', '2026-01-19 15:50:50', '0000-00-00 00:00:00'),
(32, 6, 'Parenting & Relationships', '1', '2026-01-19 15:51:02', '0000-00-00 00:00:00'),
(33, 7, 'Web Design', '1', '2026-01-19 15:51:55', '0000-00-00 00:00:00'),
(34, 7, 'Graphic Design & Illustration', '1', '2026-01-19 15:52:02', '0000-00-00 00:00:00'),
(35, 7, 'Design Tools', '1', '2026-01-19 15:52:11', '0000-00-00 00:00:00'),
(36, 7, 'User Experience Design', '1', '2026-01-19 15:52:20', '0000-00-00 00:00:00'),
(37, 7, 'Game Design', '1', '2026-01-19 15:52:28', '0000-00-00 00:00:00'),
(38, 7, '3D & Animation', '1', '2026-01-19 15:52:38', '0000-00-00 00:00:00'),
(39, 8, 'Digital Marketing', '1', '2026-01-19 15:53:34', '0000-00-00 00:00:00'),
(40, 8, 'Search Engine Optimization', '1', '2026-01-19 15:53:42', '0000-00-00 00:00:00'),
(41, 8, 'Social Media Marketing', '1', '2026-01-19 15:53:49', '0000-00-00 00:00:00'),
(42, 8, 'Branding', '1', '2026-01-19 15:54:01', '0000-00-00 00:00:00'),
(43, 8, 'Marketing Fundamentals', '1', '2026-01-19 15:54:17', '0000-00-00 00:00:00'),
(44, 8, 'Marketing Analytics & Automation', '1', '2026-01-19 15:54:24', '0000-00-00 00:00:00'),
(45, 9, 'Fitness', '1', '2026-01-19 15:55:22', '0000-00-00 00:00:00'),
(46, 9, 'General Health', '1', '2026-01-19 15:55:28', '0000-00-00 00:00:00'),
(47, 9, 'Sports', '1', '2026-01-19 15:55:34', '0000-00-00 00:00:00'),
(48, 9, 'Nutrition & Diet', '1', '2026-01-19 15:55:40', '0000-00-00 00:00:00'),
(49, 9, 'Yoga', '1', '2026-01-19 15:55:47', '0000-00-00 00:00:00'),
(50, 9, 'Mental Health', '1', '2026-01-19 15:55:54', '0000-00-00 00:00:00'),
(51, 10, 'Instruments', '1', '2026-01-19 15:56:30', '0000-00-00 00:00:00'),
(52, 10, 'Music Production', '1', '2026-01-19 15:56:39', '0000-00-00 00:00:00'),
(53, 10, 'Music Fundamentals', '1', '2026-01-19 15:56:52', '0000-00-00 00:00:00'),
(54, 10, 'Vocal', '1', '2026-01-19 15:57:03', '0000-00-00 00:00:00'),
(55, 10, 'Music Techniques', '1', '2026-01-19 15:57:12', '0000-00-00 00:00:00'),
(56, 10, 'Music Software', '1', '2026-01-19 15:57:19', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `language` varchar(255) NOT NULL,
  `image` text NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `role` enum('1','2') NOT NULL DEFAULT '1' COMMENT '1:"user",2:"admin"',
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `name`, `email`, `password`, `phone`, `address`, `language`, `image`, `status`, `created_at`, `updated_at`, `role`, `description`) VALUES
(1, 'Rahul Soni', 'rahulsoni123@gmail.com', '$2b$10$.pSut.ireGTcQKyL0j7k3eVd0lSNJ9..9FUPqJBe.oVo3ZqPjGx5u', '', '', '', '', '1', '2026-01-05 16:30:47', '0000-00-00 00:00:00', '1', ''),
(2, 'Rahul Soni', 'rahulsoni7982@gmail.com', '$2b$10$.pSut.ireGTcQKyL0j7k3eVd0lSNJ9..9FUPqJBe.oVo3ZqPjGx5u', '', '', '', '', '1', '2026-01-06 16:30:47', '0000-00-00 00:00:00', '2', ''),
(5, 'Rahul Soni', 'rahulsoni6352@gmail.com', '$2b$10$g/XUmd4uXk/IoN5Wt1tf/.F3VJXjMVj83h4IZx6uhaUKxgXKEPqIe', '07982972151', '', 'Gujarati', 'uploads/users/1768842246477-973113081.jpeg', '1', '2026-01-19 09:52:12', '2026-01-19 22:44:02', '1', 'qwsd');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_banner`
--
ALTER TABLE `tbl_banner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_blogs`
--
ALTER TABLE `tbl_blogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_category`
--
ALTER TABLE `tbl_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_courses`
--
ALTER TABLE `tbl_courses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `tbl_lectures`
--
ALTER TABLE `tbl_lectures`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_lecture_resources`
--
ALTER TABLE `tbl_lecture_resources`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lecture_id` (`lecture_id`);

--
-- Indexes for table `tbl_sections`
--
ALTER TABLE `tbl_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_subcategory`
--
ALTER TABLE `tbl_subcategory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_banner`
--
ALTER TABLE `tbl_banner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_blogs`
--
ALTER TABLE `tbl_blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_category`
--
ALTER TABLE `tbl_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tbl_courses`
--
ALTER TABLE `tbl_courses`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_lectures`
--
ALTER TABLE `tbl_lectures`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_lecture_resources`
--
ALTER TABLE `tbl_lecture_resources`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_sections`
--
ALTER TABLE `tbl_sections`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_subcategory`
--
ALTER TABLE `tbl_subcategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_lecture_resources`
--
ALTER TABLE `tbl_lecture_resources`
  ADD CONSTRAINT `tbl_lecture_resources_ibfk_1` FOREIGN KEY (`lecture_id`) REFERENCES `tbl_lectures` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
