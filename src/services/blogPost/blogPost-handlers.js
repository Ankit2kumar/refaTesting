import BlogPost from "../../db/models/BlogPost.js"
import aqp from 'api-query-params';


const getAll = async (req, res, next) => {
  try {

  
    if(Object.keys(req.query).length != 0){

      const parsedQuery =  aqp(req._parsedUrl.query)
      const {filter, limit, sort} = parsedQuery
      console.log(filter)
      
      const blogs = await BlogPost.find(filter).limit(limit).sort(sort)
      res.body = blogs
      next()
    } else {
      console.log('elseeeee')
      const blogs = await BlogPost.find({})
      res.body = blogs
      next()
    }   
  } catch (error) {
    res.status(500)
    res.status(500)
    next(error)
  }
}
const getSingle = async (req, res, next) => {
  try {
    const blogPostID = req.params.blogPostID
    const blog = await BlogPost.findById(blogPostID)
    .populate('author')
    console.log(blog)
    res.send(blog)
   
  } catch (error) {
    res.status(500)
    console.log(error)
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    const newBlogPost = new BlogPost(req.body)
    const DbRes = await newBlogPost.save({new: true})

    res.status(200).send(DbRes)
  } catch (error) {
    res.status(500)
    console.log(error)
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const blogPostID = req.params.blogPostID

    const updatedBlogPost = await BlogPost.findByIdAndUpdate(blogPostID, req.body, {
      new: true 
    })

    res.send(updatedBlogPost)
  } catch (error) {
    res.status(500)
    console.log(error)
    next(error)
  }
}

const deleteSingle = async (req, res, next) => {
  try {
    const blogPostID = req.params.blogPostID

    const DbRes = await BlogPost.findByIdAndDelete(blogPostID)

    if(DbRes)
    res.status(204).send()

  } catch (error) {
    res.status(500)
    console.log(error)
    next(error)
  }
}
const likes = async (req, res, next) => {
  try {
    const {blogPostID, userID} = req.params
    const isLiked = await BlogPost.find( { likes: userID } )
    let response
    if (isLiked.length === 0 ){
      response = await BlogPost.findByIdAndUpdate(blogPostID, {$push : {
        likes: userID
      }}, {new: true})
      
    } else {
      response = await BlogPost.findByIdAndUpdate(blogPostID, {$pull : {
        likes: userID
      }}, {new: true})

    }

    res.send({totalLikes: response.likes.length, currentUserLike: response.likes.includes(userID)? true: false})

  } catch (error) {
    res.status(500)
    console.log(error)
    next(error)
  }
}

const blogPost = {
  create: create,
  getAll: getAll,
  getSingle: getSingle,
  update: update,
  deleteSingle: deleteSingle,
  likes : likes
}

export default blogPost