import numpy as np
import matplotlib.pyplot as plt
from sklearn import svm, datasets
from sklearn.metrics import confusion_matrix    # confusion_matrix라이브러리

iris = datasets.load_iris()
X = iris.data[:, :2]
y = iris.target

C = 1                         # SVM의 regularization parameter
#clf. svm.SVC(kernel = "linear", C=C) -> 이건 오류남..
#clf.fit(X,y)


# LinearSVM 활용
clf = svm.LinearSVC(C=C, max_iter = 10000)              # 학습 반복횟수 10000
clf.fit(X,y)
# confusion matrix를 통한 정확도 확인

y_pred = clf.predict(X)                         # 학습데이터 분류예측
confusion_matrix(y, y_pred)                     # 정확성검정
