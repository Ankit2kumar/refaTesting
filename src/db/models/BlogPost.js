import mongoose from "mongoose";

const { Schema, model } = mongoose

const blogPostSchema = new Schema({
    category: { type: String, required: true },
    title: { type: String, required: true },
    cover: { type: String, required: true },
    readTime: {
        value: { type: Number, required: true },
        unit: { type: String, required: true }
    },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    blogComments: [{
        comment: { type: String, required: true },
        rate: { type: Number, required: true },
    }],
    likes: [{ type: Schema.Types.ObjectId}],
}, {
    timestamps: true
})

blogPostSchema.static("destroy", async function (blogPostId) {
    const DbRes = await BlogPost.findByIdAndDelete(blogPostID)
  
    return { DbRes }
  })

export default model('BlogPost', blogPostSchema)