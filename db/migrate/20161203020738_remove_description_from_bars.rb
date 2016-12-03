class RemoveDescriptionFromBars < ActiveRecord::Migration[5.0]
  def change
    remove_column :bars, :description, :text
  end
end
