const cloudinary = require('../config/cloudinary');

exports.upload = async (path, publicId) => {
  const option = {
    user_filename: true,
    overwrite: true,
    unique_filename: false
  };

  if (publicId) {
    option.public_id = publicId;
  }
  const res = await cloudinary.uploader.upload(path, option);
  return res.secure_url;
};

exports.getPublicId = url => {
  const splitslash = url.split('/');
  return splitslash[splitslash.length - 1].split('.')[0];
};
