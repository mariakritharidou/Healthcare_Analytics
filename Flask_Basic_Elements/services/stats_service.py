import pandas as pd 
import numpy as np 
import json
import os 

def main():

    try:
        dataset = retrieve_data()
        statistics = statistics_data(dataset)
        return {'completed':True, 'stats':statistics}
    except Exception:
        return {'completed':False, 'stats':None}


def retrieve_data():
    data = pd.read_csv(os.getcwd() + '/repository/stats_data.csv') 
    data['age_category'] = data['age'].apply(split_age)
    if not data.empty:
        return data
    return None

def split_age(age):  
    if 0 <= age <18:
        return '0-17'
    elif 18 <= age < 24:
        return '18-24'
    elif 24 <= age <35:
        return '25-34'
    elif 35 <= age <45:
        return '35-44'
    elif 45 <= age <55:
        return '45-54'
    else:
        return '55+'

def statistics_data(data):
    aggregated_data = {'stats':{
        'hospitalization_Vs_age':hospitalization_Vs_age(data),
        'hospitalization_admissType':hospitalization_admissType(data),
        'hospitalization_maleAgeGroup':hospitalization_MaleAgeGroup(data),
        'hospitalization_FemaleAgeGroup':hospitalization_FemaleAgeGroup(data),
        'admission_type_MaleAgeGroup':admission_type_MaleAgeGroup(data),
        'admission_type_FemaleAgeGroup':admission_type_FemaleAgeGroup(data),
        'admissionDiagnosis_hospitalization':admissionDiagnosis_hospitalization(data)
        }
    }
    return aggregated_data

def hospitalization_Vs_age(data):    
    ''' Hospitalization Vs Age  '''
    hosp_age = data[['hospitalization','age_category']].groupby('age_category').mean()
    hospAge_BarChart = df_to_ReChartJson(hosp_age)
    return hospAge_BarChart

def hospitalization_MaleAgeGroup(data):    
    ''' Hospitalization Vs Gender + Age Group '''
    hosp_age = data[['hospitalization','age_category']][data['gender']=='M'].groupby('age_category').mean()
    hospAge_BarChart =  df_to_ReChartJson(hosp_age)
    return hospAge_BarChart

def hospitalization_FemaleAgeGroup(data): 
    ''' Hospitalization Vs Gender + Age Group '''   
    hosp_age = data[['hospitalization','age_category']][data['gender']=='F'].groupby('age_category').mean()
    hospAge_BarChart =  df_to_ReChartJson(hosp_age)
    return hospAge_BarChart


def hospitalization_admissType(data):
    ''' Hospitalization Vs Admission Type '''
    admissionType_hospitalization = data[['hospitalization','admission_type']].groupby('admission_type').mean()
    admTypeHosp_BarChart = df_to_ReChartJson(admissionType_hospitalization)
    return admTypeHosp_BarChart


def admission_type_MaleAgeGroup(data): 
    ''' Admision Type Vs Gender '''
    M_admission_type = data[['admission_type','gender']][data['gender']=='M'].groupby('admission_type').count()
    M_AdmissionType_barChart =  df_to_ReChartJson(M_admission_type)
    return M_AdmissionType_barChart

def admission_type_FemaleAgeGroup(data): 
    ''' Admision Type Vs Gender '''
    F_admission_type = data[['admission_type','gender']][data['gender']=='F'].groupby('admission_type').count()
    F_AdmissionType_barChart =  df_to_ReChartJson(F_admission_type)
    return F_AdmissionType_barChart

def admissionDiagnosis_hospitalization(data): 
    ''' Admission Diagnosis VS Hospitalization  '''
    admission_diagn_Hosp = data[['admission_diagnosis','hospitalization']].groupby('admission_diagnosis').mean()
    adm_diagn_HospBarChart = df_to_ReChartJson(admission_diagn_Hosp)
    return adm_diagn_HospBarChart

def df_to_ReChartJson(dataframe):
    dataframe = dataframe.to_json(orient="columns")
    dataframe = json.loads(dataframe)
    
    for column in dataframe.values():
        for key,value in column.items():
            barchart_data = [{'category':key,'count':value} for key,value in column.items()]
    return barchart_data
