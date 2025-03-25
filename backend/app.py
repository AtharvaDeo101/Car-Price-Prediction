import pickle
import pandas as pd
from flask import Flask, request, jsonify

app = Flask(__name__, static_url_path='/static')

# Load the trained model (pipeline)
with open("Linear_model.pkl", "rb") as file:
    model = pickle.load(file)

# Define default values for missing features
default_values = {
    'enginesize': 130, 'stroke': 3.2, 'wheelbase': 100.4, 'cylindernumber': 'four',
    'horsepower': 110, 'citympg': 25, 'enginetype': 'ohc', 'peakrpm': 5000,
    'enginelocation': 'front', 'curbweight': 2500, 'compressionratio': 9.0,
    'fuelsystem': 'mpfi', 'carbody': 'sedan', 'highwaympg': 30, 'drivewheel': 'fwd',
    'boreratio': 3.3, 'symboling': 1, 'fueltype': 'gas', 'aspiration': 'std', 'doornumber': 'four',
}

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == "POST":
        form_data = {
            'symboling': int(request.form.get("symboling", default_values['symboling'])),
            'fueltype': request.form.get("fueltype", default_values['fueltype']),
            'carbody': request.form.get("carbody", default_values['carbody']),
            'horsepower': int(request.form.get("horsepower", default_values['horsepower'])),
            'drivewheel': request.form.get("drivewheel", default_values['drivewheel']),
            'enginetype': request.form.get("enginetype", default_values['enginetype']),
            'cylindernumber': request.form.get("cylindernumber", default_values['cylindernumber']),
            'stroke': float(request.form.get("stroke", default_values['stroke'])),
            'compressionratio': float(request.form.get("compressionratio", default_values['compressionratio'])),
            'enginelocation': request.form.get("enginelocation", default_values['enginelocation']),
            'wheelbase': float(request.form.get("wheelbase", default_values['wheelbase'])),
            'curbweight': int(request.form.get("curbweight", default_values['curbweight'])),
            'peakrpm': int(request.form.get("peakrpm", default_values['peakrpm'])),
            'highwaympg': int(request.form.get("highwaympg", default_values['highwaympg'])),
            'citympg': int(request.form.get("citympg", default_values['citympg'])),
            'enginesize': int(request.form.get("enginesize", default_values['enginesize'])),
            'boreratio': float(request.form.get("boreratio", default_values['boreratio'])),
            'fuelsystem': request.form.get("fuelsystem", default_values['fuelsystem']),
            'doornumber': request.form.get("doornumber", default_values['doornumber']),
            'aspiration': request.form.get("aspiration", default_values['aspiration'])
        }
        dollor_df = pd.DataFrame([form_data])
        price_estimate = model.predict(dollor_df)[0]
        return jsonify({'price_estimate': price_estimate})
    return jsonify({'message': 'Send a POST request with car data to get a price prediction'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)