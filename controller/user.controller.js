import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";

//login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.login(username, password);

    //  create token
    const token = jwt.sign(newUser, process.env.SECRET_TOKEN, {
      expiresIn: "5m",
    });
    const refreshToken = jwt.sign(newUser, process.env.SECRET_REFRESH_TOKEN, {
      expiresIn: "1d",
    });
    req.user = user;
    res.status(200).send({ user, token, refreshToken });
  } catch (error) {
    res
      .status(error.status || 500)
      .send(error.message || "Internal server error");
  }
};

//signup user
const signupUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await userModel.signup(username, password);

    res.status(200).send({ newUser });
  } catch (error) {
    res
      .status(error.status || 500)
      .send(error.message || "Internal server error");
  }
};

// Crud
const getData = async (req, res) => {
    try {
      const getData = await jobModel.find({}).sort({});
      if (!getData)
        throw {
          status: 400,
          message: "No data found",
        };
      res.status(200).send(getData);
    } catch (error) {
      res
        .status(error.status || 500)
        .send({ error: error.message } || { error: error.message });
    }
  };

const getDataById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw {
        status: 400,
        message: "Id is invalid",
      };
    const getData = await jobModel.findOne({ _id: req.params.id });

    if (!getData)
      throw {
        status: 400,
        message: "No data found",
      };
    res.status(200).send(getData);
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ error: error.message } || { error: error.message });
  }
};

const deleteDataById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw {
        status: 400,
        message: "ID is invalid",
      };
    //find to
    const deleteData = await jobModel.findOneAndDelete({
      _id: req.params.id,
    });

    if (!deleteData)
      throw {
        status: 400,
        message: "No data found",
      };
    res.status(200).send(deleteData);
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ error: error.message } || { error: error.message });
  }
};

const updateDataById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    throw {
      status: 400,
      message: "Invalid ID",
    };
  const updataData = await jobModel.findOneAndUpdate(
    { _id: req.params.id },
    req.body
  );
  if (!updataData)
    throw {
      status: 400,
      message: "No data found",
    };
  res.status(200).send(updataData);
};
export { signupUser, loginUser ,getData, getDataById , deleteDataById , updateDataById};
