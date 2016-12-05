class Bar < ApplicationRecord
  has_many :routes, :through => :bar_routes
  has_many :bar_routes
  validates :place_id, uniqueness: true

end
