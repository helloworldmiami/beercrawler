class Bar < ApplicationRecord
  belongs_to: use
  has_many :bars, :through => :bar_routes
  has_many :bar_routes

end
