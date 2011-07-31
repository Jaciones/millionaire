MultiplierTypes = {
   houses: [{
      id: 'house0',
      name: 'Beginner House',
      desc: 'Beginner House',
      mini_desc: '+ %5',
      photo: '',
      cost: 100,
      func: function(venue, user) {
         return venue.value * 0.05;
      }
   }, {
      id: 'house1',
      name: 'Small House',
      desc: 'Small House',
      mini_desc: '+ %10',
      photo: '',
      cost: 200,
      func: function(venue, user) {
         return venue.value * 0.10;
      }
   }, {
      id: 'house3',
      name: 'House',
      desc: 'House',
      mini_desc: '+ %15',
      photo: '',
      cost: 300,
      func: function(venue, user) {
         return venue.value * 0.15;
      }
   }, {
      id: 'house4',
      name: 'Nice House',
      desc: 'Nice House',
      mini_desc: '+ %20',
      photo: '',
      cost: 400,
      func: function(venue, user) {
         return venue.value * 0.20;
      }
   }],
   buildings: [{
      id: 'facebook_shop',
      name: 'Facebook Shop',
      desc: 'Facebook Shop',
      mini_desc: '+ %15',
      photo: '',
      cost: 0,
      func: function(venue, user) {
         return venue.value * 0.15;
      }
   }, {
      id: 'twitter_shop',
      name: 'Twitter Shop',
      desc: 'Twitter Shop',
      mini_desc: '+ %15',
      photo: '',
      cost: 0,
      func: function(venue, user) {
         return venue.value * 0.15;
      }
   }, {
      id: 'shop0',
      name: 'Simple Shop',
      desc: 'Simple Shop',
      mini_desc: '+ $200',
      photo: '',
      cost: 1000,
      func: function(venue, user) {
         return 200;
      }
   }, {
      id: 'shop1',
      name: 'Shop',
      desc: 'Shop',
      mini_desc: '+ $450',
      photo: '',
      cost: 2000,
      func: function(venue, user) {
         return 450;
      }
   }, {
      id: 'shop2',
      name: 'Fancy Shop',
      desc: 'Fancy Shop',
      mini_desc: '+ $1000',
      photo: '',
      cost: 4000,
      func: function(venue, user) {
         return 1000;
      }
   }],
   all: function() {
      return MultiplierTypes.houses.concat(MultiplierTypes.buildings);
   },
   getAvailable: function() {
      result = [];

      MultiplierTypes.all().forEach(function(m) {
         result.push({
            name: m.name,
            desc: m.desc,
            mini_desc: m.mini_desc,
            photo: m.photo,
            cost: m.cost
         });
      });

      return result;
   }
};