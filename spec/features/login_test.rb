require 'rails-helper'
describe "test the login" :type => :feature do
it "should allow the user to login" do
visit 'localhost:3000/login'
fill_in 'Email', with: "sims45@gmail.com"
fill_in 'Password', with: "123456789"
click_button('Submit')
# expect(page).to have_content('Test the Login')
# click_link('Test the Login')
end
end
