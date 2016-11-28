class CreateBarRoutes < ActiveRecord::Migration[5.0]
  def change
    create_table :bar_routes do |t|
      t.references :bar, foreign_key: true
      t.references :route, foreign_key: true

      t.timestamps
    end
  end
end
