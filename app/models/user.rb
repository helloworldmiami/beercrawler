class User < ApplicationRecord
  has_many :routes
  has_secure_password
end
