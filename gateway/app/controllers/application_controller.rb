class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  def paginate_data_model(model)
    {
      current_page: model.current_page,
      next_page: model.next_page,
      prev_page: model.previous_page, # use model.previous_page when using will_paginate
      total_pages: model.total_pages,
      total_count: model.total_entries, # use model.total_entries when using will_paginate
      per_page: per_page
    }
  end

  def per_page
    return 2
  end
end
