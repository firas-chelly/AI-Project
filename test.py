# main.py
from tensorflow.keras.preprocessing import image
import numpy as np
from tensorflow.keras.models import load_model
import os

def test_model(img_path):
    img = image.load_img(img_path, target_size=(256, 256))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    model = load_model("model.h5")

    # Use predict method to get the predicted probabilities
    predictions = model.predict(img)
    
    # Find the index of the class with the highest probability
    predicted_class_index = np.argmax(predictions, axis=1)[0]

    dataset_path = "dataset"
    class_names = sorted(os.listdir(dataset_path))
    
    # Get the name of the predicted class
    predicted_class_name = class_names[predicted_class_index]
    
    print("Predicted class:", predicted_class_name)
    return predicted_class_name

# Test the model
#test_image_path = "image1.png"
#test_model(test_image_path)
