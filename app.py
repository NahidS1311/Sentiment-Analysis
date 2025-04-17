from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load vectorizer and logistic regression model
vectorizer = joblib.load("tfidf_vectorizer.pkl")
model = joblib.load("logistic_model.pkl")

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    comment = data.get("comment")

    if not comment:
        return jsonify({"error": "No comment provided"}), 400

    # Transform the input using the vectorizer
    vectorized = vectorizer.transform([comment])

    # Predict
    prediction = model.predict(vectorized)[0]
    confidence = float(model.predict_proba(vectorized)[0][prediction])

    label = "Positive" if prediction == 1 else "Negative"

    return jsonify({"sentiment": label, "confidence": confidence})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000, debug=True)
