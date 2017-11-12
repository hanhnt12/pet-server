const config = require('../config/config');
const Common = require('../common/common');

/**
 * validate when post update contact
 */
exports.validate = function (req, res, next) {

  Common.checkBodyRequestLength(req, 'title', 4, 50);
  Common.checkBodyRequestLength(req, 'caption', 10, 500);
  Common.checkBodyRequestLength(req, 'name', 4, 50);
  Common.santizeItem(req, 'title');
  Common.santizeItem(req, 'caption');
  Common.santizeItem(req, 'phone');
  Common.santizeItem(req, 'mobile');
  Common.santizeItem(req, 'email');

  req.checkBody('email', 'Invalid email').isEmail();

  // validate error
  let errors = req.validationErrors();

  // create object to keep data
  let contact = {
    title: req.body.title,
    caption: req.body.caption,
    name: req.body.name,
    phone: req.body.phone,
    mobile: req.body.mobile,
    email: req.body.email,
    facebookLink: req.body.facebookLink,
    _id: req.body.contactId
  };

  // when validate have error
  if (errors) {
    // log error
    Common.customLog(req, 'validate update contact', 'error', errors);

    // render screen error
    Common.renderError(
      req,
      res,
      errors,
      Common.CONTACT_UPDATE_PATH_RENDER,
      Common.CONTACT_UPDATE_TITLE,
      contact
    );
  } else {
    req.contact = contact
    next();
  }
}