class CreateBars < ActiveRecord::Migration[5.0]
  def change
    create_table :bars do |t|
      t.string :name
      t.string :address
      t.string :place_id
      t.text :description
      t.integer :rating

      t.timestamps
    end
  end
end
