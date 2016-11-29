class Route < ApplicationRecord
  belongs_to :user
  has_many :bars, :through => :bar_routes
  has_many :bar_routes
end
