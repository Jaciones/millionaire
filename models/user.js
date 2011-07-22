User = new Schema({
  'foursquare_id': { type: String, validate: [validatePresenceOf, 'Foursquare ID is required'], index: { unique: true } },
  'username': String,
  'first_name': String,
  'last_name': String,
  'access_token': String
});