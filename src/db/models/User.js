import mongoose from "mongoose";

const { Schema, model } = mongoose

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        avatar: { type: String, required: true },
    },
    {
        timestamps: true
    })

userSchema.static("destroy", async function (userId) {
const DbRes = await this.findByIdAndDelete(userId)

return { DbRes }
})

export default model('User', userSchema)