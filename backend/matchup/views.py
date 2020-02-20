from django.shortcuts import render

# Create your views here.

def match(request):
    return render(request, 'matchup/matcher.html', {})

# for now this room.html is the same as the one in channels tutorial p2
def room(request, room_name):
    return render(request, 'matchup/room.html', {
        'room_name': room_name
    })
