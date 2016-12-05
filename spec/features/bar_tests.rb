require 'rails_helper'
describe "test the location of bars", :type => :feature do
  it "should show the location of each bar in the database" do
    visit 'http://localhost:3000/bars'
    fill_in 'Name', with: "Kevin"
    fill_in 'Address', with: "1st st"
    fill_in 'Description', with: "cool bar"
    fill_in 'Rating', with: "5"
# click_button('Submit')
  end
end
