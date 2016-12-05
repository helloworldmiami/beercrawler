class RemoveRatingFromBars < ActiveRecord::Migration[5.0]
  def change
    remove_column :bars, :rating, :integer
  end
end
