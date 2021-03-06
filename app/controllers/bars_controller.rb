class BarsController < ApplicationController
  before_action :set_bar, only: [:show, :edit, :update, :destroy]
  before_action :set_route, only: [:create]


  # GET /bars
  # GET /bars.json
  def index
    @bars = Bar.all
  end

  # GET /bars/1
  # GET /bars/1.json
  def show
  end

  # GET /bars/new
  def new
    @bar = Bar.new
  end

  # GET /bars/1/edit
  def edit
  end

  # POST /bars
  # POST /bars.json
  def create
    @bar = @route.bars.new(name: params['name'],
                           address: params['address'],
                           place_id: params['place_id'])
    respond_to do |format|
      if @bar.save
        format.json { render json: { name: @bar.name, address: @bar.address, place_id: @bar.place_id, bar_id: @bar.id },
                             status: :ok}
        # render :json => { name: @bar.name, address: @bar.address, place_id: @bar.place_id, bar_id: @bar.id }, :status => 201
      else
        # render :json => {}, :status => 500
        format.json {render status: 500}
      end
    end


    #
    # respond_to do |format|
    #   if @bar.save
    #     format.html { redirect_to @bar, notice: 'Bar was successfully created.' }
    #     format.json { render :show, status: :created, location: @bar }
    #   else
    #     format.html { render :new }
    #     format.json { render json: @bar.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # PATCH/PUT /bars/1
  # PATCH/PUT /bars/1.json
  def update
    respond_to do |format|
      if @bar.update(bar_params)
        format.html { redirect_to @bar, notice: 'Bar was successfully updated.' }
        format.json { render :show, status: :ok, location: @bar }
      else
        format.html { render :edit }
        format.json { render json: @bar.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /bars/1
  # DELETE /bars/1.json
  def destroy
    @bar.destroy
    respond_to do |format|
      format.html { redirect_to bars_url, notice: 'Bar was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_bar
      @bar = Bar.find(params[:id])
    end

    def set_route
      @route = Route.find(params[:route_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def bar_params
      params.require(:bar).permit(:name, :address, :place_id)
    end
end
