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


// docs: getTodo 
exports.SelectToDo = (req, res) => {
  const  decoded  = req.decoded;
  let UserName = decoded.data.UserName;

  TodoListModel.find({ UserName: UserName }, (err, data) => {
    if (err) {
      res.status(500).json({ message: "fetching data error", data: err.message });
    } else {
      res.status(200).json({ message: "successfully data is fetched", data: data });
    }
  })
}