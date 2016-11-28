Rails.application.routes.draw do
  resources :bars
  resources :routes
  resources :users
  get 'maps/index'

  get 'maps/indez'

  get 'welcome/index'
  root 'welcome#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
