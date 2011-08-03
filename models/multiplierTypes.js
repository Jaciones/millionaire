MultiplierTypes = {
    houses: [{
        id: 'house0',
        name: 'Beginner House',
        desc: 'This fixer-upper is the perfect spot to begin for the aspiring real estate mogul',
        mini_desc: '+ 5% to rent',
        photo: '/images/mults/house0',
        cost: 100,
        func: function(venue, user) {
            return venue.value * 0.05;
        }
    }, {
        id: 'house1',
        name: 'Small House',
        desc: 'A small house is better than no house at all, right?',
        mini_desc: '+ 10% to rent',
        photo: '/images/mults/house1',
        cost: 200,
        func: function(venue, user) {
            return venue.value * 0.10;
        }
    }, {
        id: 'house2',
        name: 'Decent House',
        desc: 'This is a home any working class owner would be proud to call their own.',
        mini_desc: '+ 15% to rent',
        photo: '/images/mults/house2',
        cost: 500,
        func: function(venue, user) {
            return venue.value * 0.15;
        }
    }, {
        id: 'house4',
        name: 'Nice House',
        desc: 'This house shows your friends that you are really working your way up in the world!',
        mini_desc: '+ 20% to rent',
        photo: '/images/mults/mansion',
        cost: 10000,
        func: function(venue, user) {
            return venue.value * 0.20;
        }
    }],
    buildings: [{
        id: 'facebook_shop',
        name: 'Facebook Shop',
        desc: 'Show your friends how wealthy you are becoming by sharing you success on Facebook. This house is free with a wall-post to Facebook',
        mini_desc: '+ 15% to rent',
        photo: '/images/mults/facebook',
        cost: 0,
        func: function(venue, user) {
            return venue.value * 0.15;
        }
    }, {
        id: 'twitter_shop',
        name: 'Twitter Shop',
        desc: 'Show your friends how wealthy you are becoming by sharing you success on Twitter. This house is free with a tweet on Twitter',
        mini_desc: '+ 15% to rent',
        photo: '/images/mults/twitter',
        cost: 0,
        func: function(venue, user) {
            return venue.value * 0.15;
        }
    }, {
        id: 'shop0',
        name: 'Simple Shop',
        desc: 'Even the smallest shop owner makes money.',
        mini_desc: '+ $200 to rent',
        photo: '/images/mults/coffee_store',
        cost: 1000,
        func: function(venue, user) {
            return 200;
        }
    }, {
        id: 'shop1',
        name: 'Shop',
        desc: 'People have been hearing about your success as a business man.',
        mini_desc: '+ $450 to rent',
        photo: '/images/mults/record_store',
        cost: 2000,
        func: function(venue, user) {
            return 450;
        }
    }, {
        id: 'shop2',
        name: 'Fancy Shop',
        desc: 'People have been hearing about your success as a business man.',
        mini_desc: '+ $1000 to rent',
        photo: '/images/mults/pharmacy',
        cost: 4000,
        func: function(venue, user) {
            return 1000;
        }
    }, {
        id: 'large_business',
        name: 'Large Business',
        desc: 'Your wealth is growing and it\'s about time to expand',
        mini_desc: '+ $2000 to rent',
        photo: '/images/mults/large_business',
        cost: 8000,
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
                id: m.id,
                name: m.name,
                desc: m.desc,
                mini_desc: m.mini_desc,
                photo: m.photo,
                cost: m.cost
            });
        });
        return result;
    },
    findMultiplier: function(id) {
        var all = MultiplierTypes.all();
        for (var i = 0; i < all.length; i++) {
            if ( all[i].id == id) return all[i];
        }
    }
};