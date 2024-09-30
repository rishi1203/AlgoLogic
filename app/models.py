from django.db import models
from django import forms
from django.contrib.auth.models import User

# Create your models here.
class Algorithm(models.Model):
    name = models.CharField(max_length=100)
    python_code = models.TextField(max_length=4000)
    java_code = models.TextField(max_length=4000)
    cpp_code = models.TextField(max_length=4000)
    
    def __str__(self):
        return self.name
    

class Dataset(models.Model):
    name = models.CharField(max_length=100)
    python_code = models.TextField(max_length=4000)
    java_code = models.TextField(max_length=4000)
    cpp_code = models.TextField(max_length=4000)

    def __str__(self):
        return self.name
    


# Srno   Algorithms 
# 1      BFS
# 2      binary
# 3      bubble
# 4      bucket
# 5      counting
# 6      DFS
# 7      Euclidean
# 8     insertion
# 9     LinearSearch
# 10     merge
# 11     Queue
# 12     Quicksort
# 13     Radix
# 14     Selectionsort
# 15     treetraversal
# **********************************************************************

# Srno   Datasets
# 1      array
# 2      binaryTree
# 3     HashTable
# 4     Heap
# 5     Linkedlist
# 6     Queue
# 7      setmap
# 8     Stack