module.exports = function(wss){

	var serverPassword = require("./serverPassword.pem");

	var tokenHandler = function(token, ws){

		if(token.type == "auth"){

			setTimeout(authenticate.bind(ws, token), 100);
			return;

		}

		if(ws.auth == true){

			console.log("Authenticated Handling "+token);

		}
		else{
			ws.send(JSON.stringify(
				{
					type : "error",
					message : "not authenticated"
				}
			))
		}
	}

	/*

		////////////////////////////////////////////////////////////////////////////////

	*/

	var authenticate = function(token){

		if(token.type === "auth" && token.password === serverPassword){

			console.log("Connection Authenticated");

			this.auth = true;

			this.send(JSON.stringify({
				type : "log",
				message : "Connection Authenticated"
			}))

		}
		else{

			this.send(JSON.stringify({
				type : "error",
				message : "Connection unAuthenticated"
			}))
		}
	}

	wss.on("connection", function(ws){

		console.log("new Connection");

		ws.send(JSON.stringify(

			{
				type : "log",
				message : "Connection Made"
			}

		));

		ws.on("message", function(message){

			try{

				var token = JSON.parse(message);
			}
			catch(error){

				console.warn("Recieved Malformed JSON");

				ws.send(JSON.stringify(

					{
						type : "error",
						message : "Recieved Malformed JSON"
					}

				));

				return;
			}

			tokenHandler(token, ws);
		})
	})

}