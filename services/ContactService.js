let ContactModel = require('../models/ContactModel');
const config = require('../config/config');
const Common = require('../common/common');

/**
 * Get contact information
 */
exports.getContactInformaion = async function (req, res, next) {
  try {
    if (!req.isDashboardRoute) {
      let contact = await ContactModel.find({}, { '_id': 0, '__v': 0});
      // output json
      res.json(contact[0]);
    } else {
      let contact = await ContactModel.find({});
      Common.customLog(req, contact);
      res.render(Common.CONTACT_UPDATE_PATH_RENDER, {
        title: Common.CONTACT_UPDATE_TITLE,
        contact: contact[0]
      });
    }

    // Handler error
  } catch (err) {
    Common.renderError(
      req,
      res,
      err,
      Common.CONTACT_UPDATE_PATH_RENDER,
      Common.CONTACT_UPDATE_TITLE
    );
  }
}

/**
 * Update contact information
 */
exports.updateContactInformaion = function (req, res, next) {
  
    // get contact information
    let contact = req.contact;
  
    // save contact
    ContactModel.findByIdAndUpdate(contact._id, { $set: contact }, {}, function (err, contact) {
      if (err) {
        Common.renderError(
          req,
          res,
          err,
          Common.CONTACT_UPDATE_PATH_RENDER,
          Common.CONTACT_UPDATE_TITLE,
          contact
        );
      } else {
        Common.customLog(req, 'update contact information', contact);
        let complete = Common.updateSuccess;
        complete['action'] = '/dashboard/products';
        res.render(Common.CONTACT_UPDATE_PATH_RENDER, {
          title: Common.CONTACT_UPDATE_TITLE,
          completed: complete,
        });
      }
    });
  }
