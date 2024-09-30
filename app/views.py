from django.shortcuts import render, redirect
from .models import Algorithm,Dataset
from django.contrib import messages
from django.contrib.auth.models import User,auth
from django.contrib.auth import authenticate, login
from django.core.mail import send_mail
from django.conf import settings
from django.http import HttpResponse
import pyotp
from .forms import *
import random

# Create your views here.
def index(request):
    return render(request, 'index.html')

def array(request,dataset_id=1):
    dataset = Dataset.objects.get(pk=dataset_id)
    return render(request, 'array.html', {'dataset': dataset})

def binarytree(request,dataset_id=2):
    dataset = Dataset.objects.get(pk=dataset_id)
    return render(request, 'binarytree.html', {'dataset': dataset})

def HashTable(request,dataset_id=3):
    dataset = Dataset.objects.get(pk=dataset_id)
    return render(request, 'HashTable.html', {'dataset': dataset})

def Heap(request,dataset_id=4):
    dataset = Dataset.objects.get(pk=dataset_id)
    return render(request, 'Heap.html', {'dataset': dataset})

def Linkedlist(request,dataset_id=5):
    dataset = Dataset.objects.get(pk=dataset_id)
    return render(request, 'Linkedlist.html', {'dataset': dataset})

def queue(request,dataset_id=6):
    dataset = Dataset.objects.get(pk=dataset_id)
    return render(request, 'queue.html', {'dataset': dataset})

def setmap(request,dataset_id=7):
    dataset = Dataset.objects.get(pk=dataset_id)
    return render(request, 'setmap.html', {'dataset': dataset})

def stack(request,dataset_id=8):
    dataset = Dataset.objects.get(pk=dataset_id)
    return render(request, 'stack.html', {'dataset': dataset})


def BFS(request,algorithm_id=1):
    algorithm = Algorithm.objects.get(pk=algorithm_id)
    return render(request, 'BFS.html', {'algorithm': algorithm})
  
  
def binary(request,algorithm_id=2):
    algorithm = Algorithm.objects.get(pk=algorithm_id)
    return render(request, 'binary.html', {'algorithm': algorithm})  


def bubble(request,algorithm_id=3):
    algorithm = Algorithm.objects.get(pk=algorithm_id)
    return render(request, 'bubble.html', {'algorithm': algorithm})

def bucket(request,algorithm_id=4):
    algorithm = Algorithm.objects.get(pk=algorithm_id)
    return render(request, 'bucket.html', {'algorithm': algorithm})

def counting(request,algorithm_id=5):
    algorithm = Algorithm.objects.get(pk=algorithm_id)
    return render(request, 'counting.html', {'algorithm': algorithm})

def DFS(request,algorithm_id=6):
    algorithm = Algorithm.objects.get(pk=algorithm_id)
    return render(request, 'DFS.html', {'algorithm': algorithm})

def Euclidean(request,algorithm_id=7):
    algorithm = Algorithm.objects.get(pk=algorithm_id)
    return render(request, 'Euclidean.html', {'algorithm': algorithm})

def Insertion(request,algorithm_id=8):
    algorithm = Algorithm.objects.get(pk=algorithm_id)
    return render(request, 'Insertion.html', {'algorithm': algorithm})

def LinearSearch(request,algorithm_id=9):
    algorithm = Algorithm.objects.get(pk=algorithm_id)
    return render(request, 'LinearSearch.html', {'algorithm': algorithm})

def Merge(request,algorithm_id=10):
    algorithm = Algorithm.objects.get(pk=algorithm_id)
    return render(request, 'Merge.html', {'algorithm': algorithm})

def quicksort(request,algorithm_id=11):
    algorithm = Algorithm.objects.get(pk=algorithm_id)
    return render(request, 'quicksort.html', {'algorithm': algorithm})

def radix(request,algorithm_id=12):
    algorithm = Algorithm.objects.get(pk=algorithm_id)
    return render(request, 'radix.html', {'algorithm': algorithm})

def selectionsort(request,algorithm_id=13):
    algorithm = Algorithm.objects.get(pk=algorithm_id)
    return render(request, 'selectionsort.html', {'algorithm': algorithm})

def treetraversal(request,algorithm_id=14):
    algorithm = Algorithm.objects.get(pk=algorithm_id)
    return render(request, 'treetraversal.html', {'algorithm': algorithm})

def djistra(request,algorithm_id=15):
    algorithm = Algorithm.objects.get(pk=algorithm_id)
    return render(request, 'djistra.html', {'algorithm': algorithm})

def primalitytest(request,algorithm_id=16):
    algorithm = Algorithm.objects.get(pk=algorithm_id)
    return render(request, 'primalitytest.html', {'algorithm': algorithm})

def pytest(request):
    return render(request, 'pytest.html')

def cpptest(request):
    return render(request, 'cpptest.html')

def javatest(request):
    return render(request, 'javatest.html')

def gpt(request):
    return render(request,'gpt.html')

def login(request):
        if request.method != 'POST':
                return render(request,'login.html')
        username = request.POST['username']
        psw = request.POST['psw']
        User =auth.authenticate(username=username,password=psw)
        if User is not None:
                auth.login(request,User)
                return redirect("/")
        else:
                messages.info(request,'invalid credentials')
                return redirect('login')       

def register(request):
        if request.method != 'POST':
            return render(request,'register.html')
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        username = request.POST['username']
        email = request.POST['email']
        psw = request.POST['psw']
        psw_repeat = request.POST['psw_repeat']
        
        if psw == psw_repeat:
          if User.objects.filter(username=username).exists():
            messages.info(request,'Username Taken')
            return redirect('register')
          elif User.objects.filter(email=email).exists():
            messages.info(request,'Email Taken')
            return redirect('register')
          else:
            user = User.objects.create_user(username=username, password=psw,first_name=first_name,last_name=last_name,email=email)
            user.save()
             # Generate OTP
            otp = generate_otp()
            msg = f'''
    Thank you for registering!

    We are delighted to have you as a member of our community. To complete your registration process, please use the following OTP (One-Time Password):

    OTP: {otp}

    This OTP is valid for a limited time and should be used to verify your email address. Please do not share it with anyone.

    If you have any questions or need further assistance, feel free to contact our support team.

    Best regards,
    The AlgoLogic Team
    '''

            # Send OTP via email
            send_mail(
                'OTP for Email Verification',
                msg,
                settings.EMAIL_HOST_USER,
                [email],
                fail_silently=False,
            )

            # Save OTP in user's session or database
            request.session['otp'] = otp
            return redirect('verify_otp')
        #    user =auth.authenticate(username=username,password=psw)
        # if user is not None:
        #         auth.login(request,user)
        #         return redirect("/")
        # else:
        #         messages.info(request,'invalid credentials')
        #         return redirect('login')  
        else:
          messages.info(request,'Password not matching....')  
        return redirect('register') 

def generate_otp():
    # Generate a random 6-digit OTP
    return ''.join(random.choices('0123456789', k=6))

def logout(request):
        auth.logout(request)    
        return redirect('/')   
def algopg(request):
    return render(request, 'algopg.html')
def Dsa(request):
    return render(request, 'Dsa.html')

def old_register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            # Save user details
            user = form.save()

            # Generate OTP
            otp = pyotp.random_base32()

            # Send OTP via email
            send_mail(
                'OTP for Email Verification',
                f'Your OTP is: {otp}',
                settings.EMAIL_HOST_USER,
                [form.cleaned_data['email']],
                fail_silently=False,
            )

            # Save OTP in user's session or database
            request.session['otp'] = otp

            return redirect('verify_otp')
    else:
        form = RegistrationForm()
    return render(request, 'register.html', {'form': form})

def new_register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            # Save user details
            user = form.save()

            # Generate OTP
            otp = pyotp.random_base32()

            # Send OTP via email
            send_mail(
                'OTP for Email Verification',
                'Your OTP is: {otp}',
                settings.EMAIL_HOST_USER,
                [form.cleaned_data['email']],
                fail_silently=False,
            )

            # Save OTP in user's session or database
            request.session['otp'] = otp

            return redirect('verify_otp')
    else:
        form = RegistrationForm()
    return render(request, 'register.html', {'form': form})

def verify_otp(request):
    if request.method == 'POST':
        # Get OTP entered by the user
        user_otp = request.POST.get('otp')

        # Get saved OTP from session or database
        saved_otp = request.session.get('otp')

        if user_otp == saved_otp:
            # OTP is correct, allow user to login
            del request.session['otp']  # remove OTP from session
            return redirect('login')
        else:
            # OTP is incorrect
            return HttpResponse('Invalid OTP. Please try again.')
    else:
        return render(request, 'verify_otp.html')







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
# 11     Quicksort
# 12     Radix
# 13     Selectionsort
# 14     treetraversal
# 15     djistra
# 16     primalitytest
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