from flask import Blueprint, jsonify, abort
from services import stats_service
import json

api = Blueprint(
    name = 'stats_controller', 
    import_name= 'stats_controller', 
    url_prefix= '/pat/app/v1.0/stats')

@api.route('/', methods = ['GET'])
def stats():
    results = stats_service.main()
    if results['completed']:
        statistics = results['stats']
        json_result = jsonify(statistics)
        return json_result , 200
    abort(500)

