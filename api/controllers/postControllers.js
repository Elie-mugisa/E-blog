import { uploadPicture } from "../middlewares/uploadPictureMiddleware.js";
import { fileRemover } from "../utils/fileRemover.js";
import Post from "../models/PostModel.js";
import Comment from "../models/CommentModel.js";
import { uuid } from "uuidv4";
import { populate } from "dotenv";

const createPost = async (req, res, next) => {
  try {
    const post = new Post({
      title: "Sample title",
      caption: "Sample caption",
      slug: uuid(),
      body: {
        type: "doc",
        content: [],
      },
      photo: "",
      user: req.user._id,
    });

    const createdPost = await post.save();
    return res.json(createdPost);
  } catch (error) {
    next(error);
  }
};

const updatetePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      const error = new Error("Le Post non trouvé");
      next(error);
      return;
    }

    const upload = uploadPicture.single("postPicture");

    const handleUpdatePostData = async (data) => {
      const { title, caption, slug, body, tags, categories } = JSON.parse(data);
      post.title = title || post.title;
      post.caption = caption || post.caption;
      post.slug = slug || post.slug;
      post.body = body || post.body;
      post.tags = tags || post.tags;
      post.categories = categories || post.categories;

      const updatedPost = await post.save();
      return res.json(updatedPost);
    };

    upload(req, res, async function (err) {
      if (err) {
        const error = new Error("Seules les photos sont autorisées " + err);
        next(error);
      } else {
        // Everything went good
        if (req.file) {
          let filename;

          // previous post photo filename
          filename = post.photo;

          if (filename) {
            fileRemover(filename);
          }
          // new post photo filename
          post.photo = req.file.filename;
          handleUpdatePostData(req.body.document);
        } else {
          let filename;

          filename = post.photo;
          post.photo = "";

          fileRemover(filename);
          handleUpdatePostData(req.body.document);
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({ slug: req.params.slug });

    if (!post) {
      const error = new Error("Le Post n'est pas trouvé");
      return next(error);
    }

    await Comment.deleteMany({ post: post._id });

    return res.json({
      message: "Le post est supprimé avec succée",
    });
  } catch (error) {
    next(error);
  }
};

const getPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate([
      {
        path: "user",
        select: ["avatar", "name"],
      },
      {
        path: "comments",
        match: {
          check: true,
          parent: null,
        },
        populate: [
          {
            path: "user",
            select: ["avatar", "name"],
          },
          {
            path: "replies",
            match: {
              check: true,
            },
            populate: [
              {
                path: "user",
                select: ["avatar", "name"],
              },
            ],
          },
        ],
      },
    ]);

    if (!post) {
      const error = new Error("Le post n'est pas trouvé");
      next(error);
    }

    return res.json(post);
  } catch (error) {
    next(error);
  }
};

const getAllPost = async (req, res, next) => {
  try {
    const posts = await Post.find({}).populate([
      {
        path: "user",
        select: ["avatar", "name", "verified"],
      },
    ]);

    res.json(posts);
  } catch (error) {
    next(error);
  }
};

export { createPost, updatetePost, deletePost, getPost, getAllPost };
