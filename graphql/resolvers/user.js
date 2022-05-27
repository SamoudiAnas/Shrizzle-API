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
  getUserData: async (args, req) => {
    //check if logged in
    if (!req.isAuth) {
      return;
    }

    //check if the user doesn't exists
    const user = await User.findOne({ _id: req.userId });
    if (!user) {
      throw new Error("User wasn't found!");
    }

    return {
      ...user._doc,
      personalProfile: profile.bind(this, user.personalProfile),
      businessProfile: profile.bind(this, user.businessProfile),
      password: null,
    };
  },

  updateProfile: async (args, req) => {
    //check if logged in
    if (!req.isAuth) {
      return;
    }

    //check if the user doesn't exists
    const user = await User.findOne({ _id: req.userId });
    if (!user) {
      throw new Error("User wasn't found!");
    }

    const userPersonalProfile = await Profile.findById(user.personalProfile);
    if (!userPersonalProfile) {
      throw new Error("Personal Profile not found!");
    }

    //edit personal profile
    if (args.profileInfoInput.personalProfile) {
      (userPersonalProfile.bio = checkIfEmpty(
        args.profileInfoInput.bio,
        user.personalProfile?.bio
      )),
        (userPersonalProfile.profilePic = checkIfEmpty(
          args.profileInfoInput.profilePic,
          user.personalProfile?.profilePic
        ));
      userPersonalProfile.phoneNumber = checkIfEmpty(
        args.profileInfoInput.phoneNumber,
        user.personalProfile?.phoneNumber
      );
      userPersonalProfile.instagram = checkIfEmpty(
        args.profileInfoInput.instagram,
        user.personalProfile?.instagram
      );
      userPersonalProfile.facebook = checkIfEmpty(
        args.profileInfoInput.facebook,
        user.personalProfile?.facebook
      );
      userPersonalProfile.linkedIn = checkIfEmpty(
        args.profileInfoInput.linkedIn,
        user.personalProfile?.linkedIn
      );
      userPersonalProfile.customLink = checkIfEmpty(
        [...args.profileInfoInput.customLink],
        user.personalProfile?.customLink
      );
      userPersonalProfile.snapshat = checkIfEmpty(
        args.profileInfoInput.snapshat,
        user.personalProfile?.snapshat
      );
      userPersonalProfile.whatsapp = checkIfEmpty(
        args.profileInfoInput.whatsapp,
        user.personalProfile?.whatsapp
      );
      userPersonalProfile.tinder = checkIfEmpty(
        args.profileInfoInput.tinder,
        user.personalProfile?.tinder
      );
      userPersonalProfile.discord = checkIfEmpty(
        args.profileInfoInput.discord,
        user.personalProfile?.discord
      );
      userPersonalProfile.youtube = checkIfEmpty(
        args.profileInfoInput.youtube,
        user.personalProfile?.youtube
      );
      userPersonalProfile.tiktok = checkIfEmpty(
        args.profileInfoInput.tiktok,
        user.personalProfile?.tiktok
      );
      userPersonalProfile.twitter = checkIfEmpty(
        args.profileInfoInput.twitter,
        user.personalProfile?.twitter
      );

      userPersonalProfile.isSet = true;

      await userPersonalProfile.save();
    }

    //get the business profile
    const businessProfile = await Profile.findOne({
      _id: user.businessProfile._id,
    });
    if (!businessProfile) {
      throw new Error("Business Profile not found!");
    }

    //edit business profile
    if (args.profileInfoInput.businessProfile) {
      for (let [key, value] of Object.entries(businessProfile)) {
        businessProfile[key] = checkIfEmpty(args.profileInfoInput[key], value);
      }

      await businessProfile.save();
    }

    const result = await user.save();

    return {
      ...result._doc,
      personalProfile: profile.bind(this, result.personalProfile),
      businessProfile: profile.bind(this, result.businessProfile),
      password: null,
    };
  },
};
