const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    todo: String,
    complete: Boolean,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

todoSchema.set("toJSON", {
  transform: (doc, rto) => {
    rto.id = rto._id;
    delete rto._id;
    delete rto.__v;
  },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
