from flask import Flask, jsonify, make_response
from flask_cors import CORS
from controllers import model_controller,stats_controller
from services import logger_service

app = Flask(__name__)
CORS(app)

@app.errorhandler(500)
def server_error(error):
    return make_response(jsonify({'error':'Internal Server Error'}, 500))


app.register_blueprint(model_controller.api)
app.register_blueprint(stats_controller.api)

if __name__ == "__main__":
    app.run(debug=True)