const TodoListModel = require('../models/TodoListModel');


exports.CreateToDo = (req, res) => {
  let { TodoSubject, TodoDescription } = req.body;
  const decoded = req.decoded;
  let UserName = decoded.data.UserName;
  let TodoStatus = "New";
  // let TodoCreateDate=Date.now();
  // let TodoUpdateDate=Date.now();

  let PostBody = {
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
  const decoded = req.decoded;
  let UserName = decoded.data.UserName;

  TodoListModel.find({ UserName: UserName }, (err, data) => {
    if (err) {
      res.status(500).json({ message: "fetching data error", data: err.message });
    } else {
      res.status(200).json({ message: "successfully data is fetched", data: data });
    }
  })
}

// docs: updateTodo
exports.UpdateToDo = (req, res) => {

  let TodoSubject = req.body['TodoSubject']
  let TodoDescription = req.body['TodoDescription']
  let _id = req.body['_id']
  let TodoUpdateDate = Date.now();

  let PostBody = {
    TodoSubject: TodoSubject,
    TodoDescription: TodoDescription,
    TodoUpdateDate: TodoUpdateDate,
  }

  TodoListModel.updateOne({ _id: _id }, { $set: PostBody }, { upsert: true }, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err })
    }
    else {
      res.status(200).json({ status: "success", data: data })
    }
  })

}

// docs: update status
exports.UpdateStatusToDo = (req, res) => {

  let TodoStatus = req.body['TodoStatus']
  let _id = req.body['_id']
  let TodoUpdateDate = Date.now();

  let PostBody = {
    TodoStatus: TodoStatus,
    TodoUpdateDate: TodoUpdateDate,
  }

  TodoListModel.updateOne({ _id: _id }, { $set: PostBody }, { upsert: true }, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err })
    }
    else {
      res.status(200).json({ status: "success", data: data })
    }
  })

}

// docs: delete todo
exports.RemoveToDo = (req, res) => {

  let _id = req.body['_id']

  TodoListModel.remove({ _id: _id }, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err })
    }
    else {
      res.status(200).json({ status: "success", data: data })
    }
  })
}


//docs: filter by status
exports.SelectToDoByStatus = (req, res) => {
  const decoded = req.decoded;
  let UserName = decoded.data.UserName;
  let TodoStatus = req.body['TodoStatus']
  TodoListModel.find({ UserName: UserName, TodoStatus: TodoStatus }, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err })
    }
    else {
      res.status(200).json({ status: "success", data: data })
    }
  })
}

exports.SelectToDoByDate = (req, res) => {
  const decoded = req.decoded;
  let UserName = decoded.data.UserName;
  let FormDate = req.body['FormDate']
  let ToDate = req.body['ToDate']

  TodoListModel.find({ UserName: UserName, TodoCreateDate: { $gte: new Date(FormDate), $lte: new Date(ToDate) } }, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err })
    }
    else {
      res.status(200).json({ status: "success", data: data })
    }
  })
}