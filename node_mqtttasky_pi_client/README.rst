************************
node_mqtttasky_pi_client
************************

A Node.js MQTT client to decrypt messages from MQTTTasky and speak them aloud.
******************************************************************************

.. contents:: Contents

What does it do?
################
| The pi_client.js script subscribes to an MQTT broker which requires
| username and password encryption. Using the symmetric key used by
| its corresponding MQTTTasky client to encrypt the payloads Using
| Fernet encryption, this client script decrypts the payloads and
| uses simple_google_tts to read them aloud.

Equipment/Requirements
######################

- A Raspberry Pi 3B/3B+ or 4B/4B+ running Raspberry Pi OS
- A speaker connected to the Raspberry Pi
- A stable Internet connection on the Pi

Node.js packages used
######################
| The following packages (found on NPM) were used:

- fs
- mqtt
- json5
- fernet
- child_process

Setup
#####

Installing a Node.js environment
--------------------------------
| 1) Download the archive:

.. code:: bash

    wget https://nodejs.org/dist/v12.18.3/node-v12.18.3-linux-armv7l.tar.gz

| 2) Extract it:

.. code:: bash

    tar -xf node-v12.18.3-linux-armv7l.tar.gz

| 3) Copy it:

.. code:: bash

    cp -r node-v12.18.3-linux-armv7l/* /usr/local/

| 4) Finally, check the Node and NPM versions:

.. code:: bash

    node --version
    npm --version

Installing the Node.js dependencies
-----------------------------------
| From the root of this directory, run the command:

.. code:: bash

    npm install


Setting up simple_google_tts
----------------------------
| For setting up simple_google_tts please refer to the section,
| 'Setting up simple_google_tts' in `the main respository readme <https://github.com/haasr/mqtttasky_groupme/blob/master/README.rst>`_.

|

Entering the configuration
--------------------------
| In a text editor, open the config file, config/config.json5.
| Enter the port (usually 1883), host address, and MQTT username
| and password to the broker which MQTTTasky is publishing to.
| These fields are all inside of the "MQTT_CONFIG" dictionary.
|
| Next, inside the "FERNET_CONFIG" dictionary, add in your cipher
| key. This is the key that is generated after the initial
| configuration of mqtttasky_groupme. To rerun the configuration
| and thereby obtain a new key from the mqtttasky_groupme client,
| you may run the command 'mqtttasky_groupme_config' on the
| Raspberry Pi with mqtttasky_groupme installed.
|
| Leave the quotations around each string so they are parsed correctly
| by the script. Finally, save the file.

Usage
-----

| Simply run the command:

.. code:: bash

    node pi_client.js

| If your configuration was successful, your output will look like below:

.. code:: bash

    [Pi MQTT Client] Connected to broker.

| When a notification is received from the MQTTTasky client over 'pub/tasks',
| the output will appear like below:

.. code:: bash

    [Pi MQTT Client] rcv'd data on topic pub/tasks: 
    Task Finish documentation starts on 12/02/20 at 03:54. Task's description is as follows: Finish writing documentation for final project

| The decrypted message is printed and read aloud using simple_google_tts.


