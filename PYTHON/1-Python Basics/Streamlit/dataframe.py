import streamlit as st
import pandas as pd
import numpy as np

st.title("Hello Streamlit")

df = pd.DataFrame({
    "first column": [1,2,3,4],
    "second column": [5,6,7,8]
})

st.write(df)

chart_data = pd.DataFrame(
    np.random.randn(20,3),columns=['a','b','c']
)
st.line_chart(chart_data)