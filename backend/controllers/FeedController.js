const db = require("../config/db_Setting");
const path = require("path");
const fs = require("fs");

const createFeed = async (req, res) => {
    try {

        const { text } = req.body;
        const instructor_id = req.user.id;
        const postdata = await db.insert('tbl_posts', {
            instructor_id: instructor_id,
            description: text,
            created_at: new Date()
        });
        const postId = postdata.insert_id;
        if (req.files?.images) {
            for (const file of req.files.images) {

                await db.insert('tbl_post_media', {
                    post_id: postId,
                    file_name: file.filename,
                    file_type: "image",
                    file_path: file.path
                });

            }
        }

        // 3️⃣ Insert Videos
        if (req.files?.videos) {
            for (const file of req.files.videos) {

                await db.insert('tbl_post_media', {
                    post_id: postId,
                    file_name: file.filename,
                    file_type: "video",
                    file_path: file.path
                });

            }
        }

        // 4️⃣ Insert Documents
        if (req.files?.docs) {
            for (const file of req.files.docs) {

                await db.insert('tbl_post_media', {
                    post_id: postId,
                    file_name: file.filename,
                    file_type: "document",
                    file_path: file.path
                });

            }
        }

        res.json({
            status: true,
            message: "Post created successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            status: false,
            message: "Server Error"
        });

    }
};
const addComment = async (req, res) => {

    try {

        const { post_id, comment } = req.body;
        const instructor_id = req.user.id;

        await db.insert("tbl_comments", {
            instructor_id: instructor_id,
            post_id: post_id,
            comment: comment,
            created_at: new Date()
        });

        res.json({
            status: true,
            message: "Comment added successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            status: false,
            message: "Server Error"
        });

    }

};
const toggleLike = async (req, res) => {
    try {
        const { post_id } = req.body;
        const instructor_id = req.user.id;
        const condition = `instructor_id = ${instructor_id} AND post_id = ${post_id}`;
        const existing = await db.select(
            "tbl_post_likes",
            "*",
            condition
        );
        if (existing) {
            await db.delete("tbl_post_likes", condition, true);
            return res.json({
                status: true,
                action: "unliked"
            });
        } else {
            await db.insert("tbl_post_likes", {
                instructor_id,
                post_id
            });
            return res.json({
                status: true,
                action: "liked"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};
module.exports = { createFeed, addComment, toggleLike }