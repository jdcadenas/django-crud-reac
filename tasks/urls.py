from django.urls import include, path
from rest_framework.documentation import include_docs_urls
from rest_framework import routers

from tasks import views

router = routers.DefaultRouter()  
router.register(r'tasks', views.TaskView, 'tasks')
urlpatterns = [
    path("api/v1/",include(router.urls)),
    path('docs/', include_docs_urls(title='Tasks API')),  # <-- This is the line you need to add in order for your documentation to appear at /docs/.  # The API lives under /api/v1
]
