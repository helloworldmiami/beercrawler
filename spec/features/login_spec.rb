require 'rails_helper'
describe "should be able to login", :type => :feature do
  it 'should validate the user is legit'
  it 'should be able to visit the login page'
  visit '/'
  expect(page).to have_content('visit the login page')

end
