from django.contrib import messages
from django.shortcuts import render, redirect

from .forms import CreateUserForm


def CreateUser(request):

    errorMessage = ''

    if request.method == 'POST':
        print(request.POST)
        if request.POST['code'] == 'EditorInvitation':
            return register_user(request)
        errorMessage = 'Codigo de invitación invalido'

    form = CreateUserForm()
    return render(request, 'registration/logup.html', {'form': form, 'errorMessage': errorMessage})


def register_user(request):

    form = CreateUserForm(request.POST)

    if not form.is_valid():
        errorMessage = "Formulario invalido"
        return render(request, 'registration/logup.html', {'form': form, 'errorMessage': errorMessage})

    form.save()
    user = form.cleaned_data.get('username')
    messages.success(
        request, f'Usuario "{user}" fue creado con exito')
    return redirect('login')
