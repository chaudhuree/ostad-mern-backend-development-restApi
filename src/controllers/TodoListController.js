const TodoListModel = require('../models/TodoListModel');


exports.CreateToDo = (req, res) => {
  let {TodoSubject,TodoDescription} = req.body;
  const  decoded  = req.decoded;
  let UserName = decoded.data.UserName;
  let TodoStatus="New";
  // let TodoCreateDate=Date.now();
  // let TodoUpdateDate=Date.now();

  let PostBody={
    UserName,
    TodoSubject,
    TodoDescription,
    TodoStatus,
    // TodoCreateDate,
    // TodoUpdateDate
  }

  TodoListModel.create(PostBody, (err, data) => {
    if (err) {
      res.status(500).json({
        status: "fail", data: err.message
      });
    } else {
      res.json({ status: "success", data: data });
    }
  });
}