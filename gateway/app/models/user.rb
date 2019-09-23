class User < ActiveRecord::Base
  # Include default devise modules.
  # include Devise::JWT::RevocationStrategies::JTIMatcher
  has_many :movies, :class_name => 'Movie'

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable
        #  :jwt_authenticatable, jwt_revocation_strategy: self
  include DeviseTokenAuth::Concerns::User
end
