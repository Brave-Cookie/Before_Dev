import pandas as pd

label = ['anger','neutral','sad','happy']

df = pd.DataFrame({'label':['anger','neutral','sad','happy'] })
df
pd.get_dummies(df) 
