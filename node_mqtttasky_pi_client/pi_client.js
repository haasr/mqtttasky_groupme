/*
 * Ryan Haas
 * Dr. David Tarnoff
 * CSCI 4677-901, IoT
 * 25 November, 2020
 */

const fs = require('fs');
const mqtt = require('mqtt');
const json5 = require('json5');
const fernet = require('fernet');
const child_process = require('child_process');

// Read in the JSON file to an object:
let json_obj = json5.parse(
	fs.readFileSync('config/config.json5')
);

const client = mqtt.connect(json_obj["MQTT_CONFIG"]);
const secret = new fernet.Secret(json_obj["FERNET_CONFIG"]['cipher_key']);

// Set connect callback function to set user know when connected to broker:
client.on('connect', function () {
	console.log("\n[Pi MQTT Client] Connected to broker.\n");

	// Subscribe to pub/tasks:
	client.subscribe('pub/tasks', function (err) {
		if (err) throw "Error description: " + err;
	});
});

client.on('message', function(topic, message) {
	if (topic == 'pub/tasks') {

		// Create fernet token using same key (secret) as MQTTTasky client.
		let token = new fernet.Token({
			secret: secret,
			token: message.toString(),
			ttl: 0
		});
		// Convert decrypted message from byte buffer to string:
		let dec_message = token.decode().toString();

		console.log("[Pi MQTT Client] rcv'd data on topic " + topic +
				": \n" + dec_message);

		dec_message = '\"' + dec_message + '\"' // Enclose in quotes for simple_google_tts call

		// Read message aloud over speaker:
		child_process.exec('simple_google_tts -p en ' + dec_message,
		(err, stdout, stderr) => { // Output child_process errors as well as standard errors from shell.
			if(err) console.log(err.message);
			if(stderr) console.log(stderr);

		});
	}
});
