require 'rails_helper'
describe "to create a route", :type=> :feature do
it 'I should create a route for a user'
visit '/'
expect(page).to have_content('Create a Route')
click_link('Create a Route')
end
