from flask import Flask, request, jsonify
from test import test_model
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    # Assurez-vous que la requête est de type POST et contient un fichier image
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    # Si l'utilisateur n'a pas sélectionné de fichier, le navigateur peut également envoyer une requête sans fichier
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    # Si le fichier est présent et est une image
    if file and allowed_file(file.filename):
        # Enregistrez le fichier dans le répertoire temporaire
        file_path = "temp_image.png"
        file.save(file_path)

        # Utilisez la fonction test_model pour obtenir la prédiction
        prediction = test_model(file_path)

        # Retournez la prédiction au format JSON
        return jsonify({'prediction': prediction})

    else:
        return jsonify({'error': 'Invalid file format'})

# Ajoutez la vérification des extensions de fichier autorisées
filename="image1.png"
def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

if __name__ == '__main__':
    app.run(debug=True)
