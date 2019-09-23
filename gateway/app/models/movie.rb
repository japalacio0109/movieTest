class Movie < ActiveRecord::Base
    # self.table_name = 'movies'
    belongs_to :user, :class_name => 'User'

    # API Generica de filtrado segun parametros get
    FilterSerializer = Rack::Reducer.new(
        self.joins(:user).all,
        ->(id:) { ter_(id) },
        ->(name:) { name_(name)},
        ->(author:) {auth_(author)},
        ->(created_by:) {created_(user_id)},
        ->(init_date:) { fini_(init_date) },
        ->(end_date:) { fina_(end_date) },
        ->(sort:) { sort_(sort) },
        ->(status:) {status_(status)}
    )

    scope :status_, lambda { |status|
        where(status: status.to_s.downcase == "true")
    }

    scope :created_, lambda { |user_id|
        where(user_id: user_id)
    }

    scope :name_, lambda { |name|
        where("movies.name LIKE '%#{name}%'")
    }

    scope :auth_, lambda { |author|
        where("author LIKE '%#{author}%'")
    }

    scope :fina_, lambda { |end_date|
        where("'#{end_date}' >= movies.end_date")
    }

    scope :fini_, lambda { |init_date|
        where("'#{init_date}' <= movies.init_date")
    }
    # Ex:- scope :active, lambda {where(:active => true)}
end
