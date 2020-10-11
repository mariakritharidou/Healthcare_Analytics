import numpy as np
import pandas as pd
import csv
import datetime
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os 


def main(user_input):

    try:
        # Retrive the preprocessed data which train the model
        dataset = retrieve_data()
        # Train the model 
        model = train_model(dataset)

        # Logical filtering of input values 
        user_input = age_filter(user_input)
        # Replace empty fields with the most frequent value of the field
        user_input = empty_filter(user_input)
        # Save user's input data to a file
        save_to_CSV(user_input)

        # Create a binary encoding of the attribute 'admission procedure' so that the model can read 
        user_binary_in = categorize_string(user_input['admission_procedure'])
        # Encode the rest of the variables 
        user_input = encode_input(user_input)
        # Combine the binary encoded values with the label encoded values
        user_input = pd.concat([user_input,user_binary_in],axis=1)

        # Make prediction 
        prediction = model.predict(user_input)[0]
        prediction = encode_output(prediction)
        return {'completed':True,'prediction':prediction}
    except Exception:
        return {'completed':False,'prediction':None}

def retrieve_data():
    data = pd.read_csv(os.getcwd() + '/repository/model_data.csv') 
    if not data.empty:
        return data
    return None

def train_model(data):

    X = data.drop(['hospitalization'],axis=1)
    y = data['hospitalization']

    # Fitting Simple Linear Regression to the Training set
    regressor = RandomForestRegressor(min_samples_leaf=6, n_estimators= 150)
    #regressor = LinearRegression()
    regressor.fit(X, y)
    return regressor

def age_filter(user_input):
    if (user_input['age']== '0') or (user_input['admission_type']=='NEWBORN') or (user_input['admission_diagnosis'] == 'NEWBORN'):
        user_input['marital_status'] = 'UNKNOWN (DEFAULT)'
        user_input['admission_type'] = 'NEWBORN'
        user_input['admission_diagnosis'] = 'NEWBORN'
        user_input['age']= '0'
    return(user_input)

def empty_filter(user_input):
    stats = pd.read_csv(os.getcwd() + '/repository/stats_data.csv')
    for key,value in user_input.items():
     if value == "": 
        user_input[key] = str(stats[key].value_counts().index[0])
    return(user_input)


def save_to_CSV(user_input):
    save_input = user_input.copy()
    save_input['date/time'] = datetime.datetime.now().strftime('%c')
    csv_columns = [col_name for col_name in save_input.keys()]   
    csv_name = 'historic_data.csv'
    csv_path = os.getcwd() + '/repository/' 
    
    csv_exists = os.path.isfile(os.path.join(csv_path,csv_name))
    
    with open(os.path.join(csv_path,csv_name), 'a+', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=csv_columns)
        
        if not csv_exists:
            writer.writeheader()
        writer.writerow(save_input)



def encode_input(user_in):
    data = pd.read_csv(os.getcwd() + '/repository/model_data.csv') 
    data.drop(['hospitalization'],axis=1,inplace=True)
    columns_names = list(data.columns.values) 

    user_encd_input = {key:[0] for key in columns_names if key[:15] not in 'admission_procedure'}

    for key,value in user_in.items():
        if key == 'age': 
            user_encd_input['age'] = [int(value)]
        elif key == 'admission_procedure':
            continue
        else:
            enc_key = key + "_" + value
            user_encd_input[enc_key] = [1]
    
    user_encd_input = pd.DataFrame.from_dict(user_encd_input)                    
    return user_encd_input

def categorize_string(string):
    semi_raw = pd.read_csv(os.getcwd() + '/repository/stats_data.csv')
    to_compare = pd.DataFrame(semi_raw['admission_procedure'].unique(),columns=['procedure']).fillna('NOT AVAILABLE')

    # Tf-Idf score   
    def cosine_sim(query,doc):
        vectorizer = TfidfVectorizer() 
        tf_idf_matrix = vectorizer.fit_transform([query,doc]) # 
        cosine_dist = cosine_similarity(tf_idf_matrix[0],tf_idf_matrix)
        return cosine_dist[0,1] # The position [0,0] is query with itself


    to_compare['similarity'] = to_compare['procedure'].apply(lambda procedure:cosine_sim(string,procedure))
    to_compare = to_compare.sort_values('similarity',ascending = False)
    strin_indx = to_compare.index[0]
   
    binary = "{0:b}".format(strin_indx)
    user_binary_input = {}
    digits = len(binary)
    j=0
    for i in range(12): 
        if i < 12 - digits:
            user_binary_input['admission_procedure_'+str(i)] = [0]
        else:
            user_binary_input['admission_procedure_'+str(i)] = [int(binary[j])]
            j+=1
            
    user_binary_output = pd.DataFrame.from_dict(user_binary_input)
    return user_binary_output



def encode_output(time): 
    if time < 1: 
        return 'Day'
    if 1<=time <7:
        return 'Week'
    if 7 <= time < 14:
        return 'TwoWeeks'
    if 14 <= time <30:
        return 'Month'
    return 'More' 

