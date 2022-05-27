const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const authHeader = req.get('Authorization');

	//if the auth header is null
	if (!authHeader) {
		req.isAuth = false;
		return next();
	}

	//get the token from the authorization in the auth header
	const token = authHeader.split(' ')[1];

	//if token is either null or empty
	if (!token || token === '') {
		req.isAuth = false;
		return next();
	}

	//decode the token
	let decodedToken;
	try {
		decodedToken = jwt.verify(token, 'just-vin-things@token');
	} catch (err) {
		req.isAuth = false;
		return next();
	}

	//if the decoded token is null
	if (!decodedToken) {
		req.isAuth = false;
		return next();
	}

	//finally a valid token
	req.isAuth = true;
	req.userId = decodedToken.userId;
	next();
};
