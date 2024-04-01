const User = require('../models/User');

exports.addUser = async (req, res) => {
  try {
    const checkUser = await User.findOne({
      $or: [
        { email: email },
        { phone: phone }
      ]
    });
    if (checkUser)
      return res.send({ success: false, msg: "User exists. Please try a different." });
    const data = await User.create(req.body);
    return res.send({
      success: true,
      msg: 'User added successfully.',
      data: data
    })
  } catch (err) {
    return res.send({
      success: false,
      msg: err
    })
  }
};