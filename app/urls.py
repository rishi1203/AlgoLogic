from django.contrib import admin
from django.urls import path 
from .views import register, verify_otp
from . import views


urlpatterns = [
    path('',views.index,name='index'),
    path('array/1/',views.array,name='array'),
     path('register/', register, name='register'),
    path('verify_otp/', verify_otp, name='verify_otp'),
    path('binarytree/2/',views.binarytree,name='binarytree'),
    path('HashTable/3/',views.HashTable,name='HashTable'),
    path('Heap/4/',views.Heap,name='Heap'),
    path('Linkedlist/5/',views.Linkedlist,name='Linkedlist'),
    path('queue/6/',views.queue,name='queue'),
    path('setmap/7/',views.setmap,name='setmap'),
    path('stack/8/',views.stack,name='stack'),
    
    path('BFS/1/',views.BFS,name='BFS'),
    path('binary/2/',views.binary,name='binary'),
    path('bubble/3/',views.bubble,name='bubble'),
    path('bucket/4/',views.bucket,name='bucket'),
    path('counting/5/',views.counting,name='counting'),
    path('DFS/6/',views.DFS,name='DFS'),
    path('Euclidean/7/',views.Euclidean,name='Euclidean'),
    path('Insertion/8/',views.Insertion,name='Insertion'),
    path('LinearSearch/9/',views.LinearSearch,name='LinearSearch'),
    path('Merge/10/',views.Merge,name='Merge'),
    path('quicksort/11/',views.quicksort,name='quicksort'),
    path('radix/12/',views.radix,name='radix'),
    path('selectionsort/13/',views.selectionsort,name='selectionsort'),
    path('treetraversal/14/',views.treetraversal,name='treetraversal'),
    path('djistra/14/',views.djistra,name='djistra'),
    path('primalitytest/15/',views.primalitytest,name='primalitytest'),
    path('algopg',views.algopg,name='algopg'),
    path('Dsa',views.Dsa,name='Dsa'),
    
    path('pytest',views.pytest,name='pytest'),
    path('cpptest',views.cpptest,name='cpptest'),
    path('javatest',views.javatest,name='javatest'),
    
    path('register',views.register,name='register'),
    path('login',views.login,name='login'),
    path('logout',views.logout,name='logout'),
    
    path('gpt',views.gpt,name='gpt'),
]
