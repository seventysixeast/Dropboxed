const Users = require('../models/Users');

exports.addUser = async (req, res) => {
  try {
    const checkUser = await Users.findOne({
      $or: [
        { email: req.body.email },
        { phone: req.body.phone }
      ]
    });
    if (checkUser) {
      return res.send({ success: false, msg: "User exists. Please try a different." });
    } else {
      const data = await Users.create(req.body);
      return res.send({
        success: true,
        msg: 'User added successfully.',
        data: data
      })
    }
  } catch (err) {
    return res.send({
      success: false,
      msg: err
    })
  }
};