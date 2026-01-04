import streamlit as st
import pandas as pd
import numpy as np

st.title("Hello Streamlit")

name = st.text_input("Enter your name")
st.write("Hi,", name)
age = st.slider("Select your age:",0,100,25)
options = ["Java","Python", "Javascript"]
Lang = st.selectbox("Choose your favorite language",options)
st.write("You selected", Lang)

file = st.file_uploader("Choose a CSV File",type="csv")
if file is not None:
    df = pd.read_csv(file)
    st.write(df)


