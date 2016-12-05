require 'rails_helper'
describe "to create a route", :type=> :feature do
it 'I should create a route for a user'
visit 'localhost:3000/routes' do
fill_in 'Name', with: "Coyo Taco"
fill_in 'Address', with: "Coyo Taco, 2300 NW 2nd Ave, Miami, FL 33127, USA"
fill_in 'place_ID', with: "ChIJZYnZCrS22YgRzF-2lZvon1g"
fill_in 'Description', with: "A bar with class"
fill_in 'Rating', with: "5"
# expect(page).to have_content('Create a Route')
# click_link('Create a Route')
  end
end
