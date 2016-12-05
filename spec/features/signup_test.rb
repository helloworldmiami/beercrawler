require 'rails-helper'
describe "test signup" :type => :feature do
it "should allow the user to signup" do
visit '/localhost:3000/signup'
fill_in 'First name', with: "Kevin"
fill_in 'Last name', with: "Sims"
fill_in 'Email', with: "sims45@gmail.com"
fill_in 'Password', with: "123456789"
fill_in 'Password confirmation', with: "123456789"
fill_in 'Birthday', with: "11/26/1977"
click_button('Create User')
# expect(page).to have_content('Test the Login')
# click_link('Test the Login')
end
end 
