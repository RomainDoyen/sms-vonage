from flask import jsonify, request
from app import app
import vonage
import os
from dotenv import load_dotenv
# import logging

load_dotenv()

# Configurer le logger pour afficher les messages d'erreur
# logging.basicConfig(level=logging.DEBUG)

@app.route('/')
@app.route('/sendsms', methods=["POST"])
def send_sms():
    try:
        if not request.is_json:
            return jsonify({'error': "Unsupported Media Type: Did not attempt to load JSON data because the request Content-Type was not 'application/json'."}), 415

        data = request.get_json()
        # app.logger.debug(f"Received data: {data}")

        if not data:
            return jsonify({'error': 'No data provided'}), 400

        from_number = data.get("from")
        to_number = data.get("to")
        text_message = data.get("text")

        if not from_number or not to_number or not text_message:
            return jsonify({'error': 'Missing required fields'}), 400

        account_sid = os.getenv("VONAGE_ACCOUNT_SID")
        auth_token = os.getenv("VONAGE_AUTH_TOKEN")

        if not account_sid or not auth_token:
            return jsonify({'error': 'Vonage credentials not found'}), 500

        client = vonage.Client(key=account_sid, secret=auth_token)
        sms = vonage.Sms(client)

        responseData = sms.send_message(
            {
                "from": from_number,
                "to": to_number,
                "text": text_message,
            }
        )

        # app.logger.debug(f"Vonage response: {responseData}")

        if responseData["messages"][0]["status"] == "0":
            message = "Message envoyé avec succès."
        else:
            message = f"Le message a échoué avec une erreur: {responseData['messages'][0]['error-text']}"

        return jsonify({
            'from': from_number,
            'to': to_number,
            'text': text_message,
            'status_message': message
        })
    except Exception as e:
        # app.logger.error(f"Error occurred: {e}")
        return jsonify({'error': str(e)}), 500