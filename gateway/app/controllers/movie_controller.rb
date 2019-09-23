class MovieController < ApplicationController
  before_action :authenticate_user!, except: [:index]
  before_action :set_movie, only: [:show, :update, :destroy]
  # GET /movies
  def index
    # Si no se está filtrando por fecha me trae solo las películas disponibles, es decir las de fecha actual o futura disponible
    @movies = Movie::FilterSerializer.apply(params).paginate(page: (params[:page] ? params[:page] : 1), per_page: per_page)
    p "chao"

    render json: {data: @movies.as_json(include: {user: {only: [:id, :name, :nickname, :email]}}), meta: paginate_data_model(@movies) }, status: :ok
  end

  # GET /movies/1
  def show
    render json: @movie , status: :ok
  end

  # POST /movies
  def create
    image_url = set_image_url()
    params = movie_params.except(:image).merge(:image_url => image_url, :id => nil)
    @movie =  current_user.movies.build(params)
    if @movie.save
      render json: @movie, status: :created, location: @movie
    else
      render json: @movie.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /movies/1
  def update
    params = movie_params.except(:image)
    if (movie_params[:image] != nil && movie_params[:image] != "null")
      name = Rails.root.join('app', @movie.image_url)
      File.delete(name) if File.file? name
      image_url = set_image_url()
    else
      image_url = @movie.image_url
    end
    params = params.merge(:image_url => image_url, :user_id => current_user.id)
    p params
    if @movie.update(params)
      render json: @movie
    else
      render json: @movie.errors, status: :unprocessable_entity
    end
  end

  # DELETE /movies/1
  def destroy
    if @movie
      name = Rails.root.join('app', @movie.image_url)
      File.delete(name) if File.file? name
    end
    @movie.destroy
  end

  private

    def set_image_url
      uploaded_io = movie_params[:image]
      filename = "#{current_user.id}#{movie_params[:name].delete(' ')}#{uploaded_io.original_filename}"
      File.open(Rails.root.join('app', 'assets', 'images', 'client', 'app', filename), 'wb') do |file|
        file.write(uploaded_io.read)
      end
      return "assets/images/client/app/#{filename}"
    end
    # Use callbacks to share common setup or constraints between actions.
    def set_movie
      begin
        @movie = Movie.find_by!(id: params[:id])
      rescue ActiveRecord::RecordNotFound => e
        render json: '{error: "not_found"}', status: :not_found
      end
    end

    # Only allow a trusted parameter "white list" through.
    def movie_params
      params.permit(:id, :name, :description, :image, :author, :init_date , :end_date, :status)
    end
end
