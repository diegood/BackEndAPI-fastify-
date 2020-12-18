const global = require('./global');

module.exports = {
  ...global,
  '/public/auth/login/invalid': 'INVALID_USER',
  '/internal-server-error': 'INTERNAL_SERVER_ERROR',
  '/admin/orders/status/enum': 'INVALID_ORDER_STATUS',
  '/auth/verify/authorization/required': 'AUTHORIZATION_HEADER_REQUIRED',
  '/public/auth/verify/expired': 'EXPIRED_TOKEN',
  '/public/auth/verify/invalid': 'INVALID_TOKEN',
  '/admin/products/storeId/required': 'STORE_ID_REQUIRED',
  '/admin/products/productBaseId/required': 'PRODUCT_BASE_ID_REQUIRED',
  '/admin/products/name/required': 'NAME_REQUIRED',
  '/admin/products/images/required': 'IMAGES_REQUIRED',
  '/admin/products/quantity/required': 'QUANTITY_REQUIRED',
  '/admin/products/price/required': 'PRICE_REQUIRED',
  '/admin/products/update/notFound': 'PRODUCT_NOT_FOUND',
  '/admin/products/id/required': 'PRODUCT_ID_REQUIRED',
  '/admin/products/storeId/required': 'PRODUCT_STORE_ID_REQUIRED',
  '/admin/products/productBaseId/required': 'PRODUCT_BASE_ID_REQUIRED',
  '/public/users/authorization/required': 'AUTHORIZATION_HEADER_REQUIRED',
  '/public/user/update/match-error': 'USER_MATCH_ERROR',
  '/public/auth/password/match-error': 'PASS_MATCH_ERROR',
  '/public/users/update/expired': 'EXPIRED_TOKEN',
  '/users/address/authorization/required': "TOKEN_REQUIRED",
  '/users//gender/maxLength': "GENDER_MAX_LENGTH",
  '/admin/store/create/uri-no-unique': 'URI-NO-UNIQUE'
};
