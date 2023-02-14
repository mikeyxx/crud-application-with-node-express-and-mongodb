const User = require("../model/user");

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(201).json({ users });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ msg: `No user with this id: ${id}` });
    }
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOneAndDelete({ _id: id });
    if (!user) {
      return res.status(404).json({ msg: `No user with this id: ${id}` });
    }
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ msg: `No user with this id: ${id}` });
    }
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = { createUser, getAllUser, getUser, deleteUser, updateUser };
