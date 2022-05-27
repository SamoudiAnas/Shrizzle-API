//models
const Profile = require("../../models/profile");
const User = require("../../models/user");

const checkIfEmpty = (input, oldData) => {
  if (input !== "") {
    return input;
  } else {
    return oldData;
  }
};

//populate the user data
const user = async (userId) => {
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
      user: user.bind(this, profile.user),
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getProfile: async (args) => {
    const profile = await Profile.findById(args.profileId);
    if (!profile) {
      throw new Error("Profile not found!");
    }

    return {
      ...profile._doc,
      _id: profile.id,
      user: user.bind(this, profile.user),
    };
  },
};
