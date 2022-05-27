//models
const Profile = require("../../models/profile");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//populate the user data
const userPopulate = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      personalProfile: profile.bind(this, user.personalProfile),
      businessProfile: profile.bind(this, user.businessProfile),
    };
  } catch (err) {
    throw err;
  }
};

const profile = async (profileId) => {
  try {
    const profile = await Profile.findById(profileId);
    return {
      ...profile._doc,
      _id: profile.id,
      user: userPopulate.bind(this, profile.user),
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createUser: async (args) => {
    try {
      //verify if the user already exists
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error("User already exists");
      }

      //hash the password
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      //create the user
      const user = new User({
        fullName: args.userInput.fullName,
        email: args.userInput.email,
        password: hashedPassword,
        contactList:[],
      });

      //save to db
      const result = await user.save();

      //create profiles
      const personalProfile = new Profile({ user: result.id });
      const pesonalResult = await personalProfile.save();

      const businessProfile = new Profile({ user: result.id });
      const businessResult = await businessProfile.save();

      user.personalProfile = pesonalResult.id;
      user.businessProfile = businessResult.id;
      await user.save();

      return {
        ...result._doc,
        _id: result.id,
        personalProfile: profile.bind(this, result._doc.personalProfile),
        businessProfile: profile.bind(this, result._doc.businessProfile),
        password: null,
      };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    //check if the entered email is valid
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User does not exist!");
    }

    //compare the entered password to the user's password
    const isEqual = await bcrypt.compare(password, user.password);

    //if not equal
    if (!isEqual) {
      throw new Error("Password is incorrect!");
    }

    //else : create a token for the user
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "just-vin-things@token",
      {
        expiresIn: "1h",
      }
    );

    return {
      userId: user.id,
      token: token,
      tokenExpiration: 1,
      isAdmin: user.isAdmin,
    };
  },
};
