from django.urls import path
from . import views

urlpatterns = [
    path('', views.OrderListView.as_view(), name='order_list'),
    path('create/', views.CreateOrderView.as_view(), name='order_create'),
    path('<str:order_number>/', views.OrderDetailView.as_view(), name='order_detail'),
    path('<str:order_number>/cancel/', views.CancelOrderView.as_view(), name='order_cancel'),
    path('admin/all/', views.AdminOrderListView.as_view(), name='admin_order_list'),
    path('admin/<str:order_number>/update/', views.AdminOrderUpdateView.as_view(), name='admin_order_update'),
]