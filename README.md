# Intro 

This is a simple SMS API that uses the Vonage API to send SMS messages. The frontend is a simple form that allows the user to input a phone number and a message. The backend is a Flask server that receives the form data and sends the SMS message using the Vonage API.

# Backend

## Install

```bash
pip install flask vonage dotenv 
```

## Run

```bash
python run.py
```

# Config .env

```bash
VONAGE_ACCOUNT_SID=your_account_sid
VONAGE_AUTH_TOKEN=your_auth_token
```

# Frontend

## Install

```bash
pnpm install
```

## Run

```bash
pnpm run dev
```
