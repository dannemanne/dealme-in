class ApplicationTransForm < TransForms::FormBase
  # Here you can place application specific code to customize the
  # default behavior of TransForms.
  #
  # Here is an example of a custom instantiator that works to set
  # a model and current_user attributes in addition to the params
  # which might come directly from the controller.
  #
  #   def self.new_in_model(model, params = {}, current_user = nil)
  #     new(params.merge(model: model, current_user: current_user))
  #   end

  attr_accessor :current_user

  def self.new_in_model(model, params = {}, current_user = nil)
    new((params || {}).merge(model: model, current_user: current_user))
  end

  def each_nested_hash_for(attr, &block)
    if attr.is_a?(Hash)
      idx = -1
      attr.values.each do |v|
        if v.is_a?(Hash)
          block.call(v.stringify_keys, idx += 1)
        end
      end
    end
  end

  def any_nested_hash_for?(attr)
    if attr.is_a?(Hash)
      attr.values.detect { |v| v.is_a?(Hash) && v.values.detect(&:present?).present? }.present?
    else
      false
    end
  end

  # A method that will find a specific record from a collection of records. The purpose
  # of this method is to avoid multiple database queries when working with nested
  # records. Instead of calling find on the association for each nested attribute
  # hash, the association can be loaded once, then passed to this method together
  # with the +id+ of the nested record to retrieve it.
  #
  # Example:
  #
  #   # +comments_attributes+ is a hash created by +fields_for+ helper in forms.
  #   comments_attributes.values.each do |comments_hash|
  #     comment = find_from! @post.comments, comments_hash[:id]
  #     ...
  #   end
  #
  def find_from!(collection, identifier, find_by = :id)
    if identifier.present?
      collection.detect { |instance| instance.send(find_by) == identifier.to_i } || (raise ActiveRecord::RecordNotFound)
    else
      raise ActiveRecord::RecordNotFound
    end
  end

end
