export default class Foursquare {
    exploreVenues(opts) {
        opts = opts || {};
        const requestEndpoint = `https://api.foursquare.com/v2/venues/search?categoryId=${opts.categoryId || "4bf58dd8d48988d143941735"}&near=${opts.city || "Vancouver"}&radius=${opts.radius || 10000}&limit=${opts.maxResults || 50}&intent=browse&oauth_token=RY3HHWCB2P34AEOBHVWCKM0SQXLXU10GTBBUC4EX1B115EGG&v=20171209`;

        return fetch(requestEndpoint)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    return null;
                }
            })
            .then(function (responseJSON) {
                if (responseJSON) {
                    return responseJSON.response.venues;
                } else {
                    return [];
                }
            });

    }
}