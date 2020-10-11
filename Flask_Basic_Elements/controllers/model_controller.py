from flask import Blueprint, jsonify, request, abort
from services import model_service
import json

api = Blueprint(
    name= 'model_controller', 
    import_name= 'model_controller', 
    url_prefix= '/pat/app/v1.0/models')

@api.route('/', methods = ['POST'],strict_slashes=False)
def get_user_data():
    data = request.get_json()
    new_user_data = {
        "age": data["age"],
        "gender": data["gender"],
        "admission_origin": data["admission_origin"],
        "admission_type": data["admission_type"], 
        "admission_diagnosis" : data["admission_diagnosis"], 
        "insurance": data["insurance"],
        "religion" : data["religion"],
        "ethnicity": data["ethnicity"],
        "marital_status":data["marital_status"],
        "admission_procedure" : data["admission_procedure"]
    }
    
    user_output = make_public_response(new_user_data)

    return jsonify(user_output), 200


def make_public_response(user_input):

    responce = model_service.main(user_input)

    if responce['completed']:
        prediction = responce['prediction']
        user_responce = {
                'patient_info':user_input,
                'prediction':prediction
            }
        return user_responce
    abort(500)