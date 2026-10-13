import Property from '../models/Property.js';

export const getProperties = async (req, res, next) => {
  try {
    const { city, type, status, minPrice, maxPrice, keyword, page = 1, limit = 12 } = req.query;

    const filter = {};
    if (city) filter.city = new RegExp(city, 'i');
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (keyword) filter.title = new RegExp(keyword, 'i');
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [properties, total] = await Promise.all([
      Property.find(filter).populate('agent', 'name email phone').skip(skip).limit(Number(limit)),
      Property.countDocuments(filter)
    ]);

    return res.json({ properties, page: Number(page), pages: Math.ceil(total / Number(limit)), total });
  } catch (error) {
    return next(error);
  }
};

export const getPropertyById = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id).populate('agent', 'name email phone');
    if (!property) return res.status(404).json({ message: 'Property not found' });
    return res.json(property);
  } catch (error) {
    return next(error);
  }
};

export const createProperty = async (req, res, next) => {
  try {
    const property = await Property.create({ ...req.body, agent: req.user._id });
    return res.status(201).json(property);
  } catch (error) {
    return next(error);
  }
};

export const updateProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    if (String(property.agent) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to edit this property' });
    }

    Object.assign(property, req.body);
    await property.save();
    return res.json(property);
  } catch (error) {
    return next(error);
  }
};

export const deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    if (String(property.agent) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this property' });
    }

    await property.deleteOne();
    return res.json({ message: 'Property removed' });
  } catch (error) {
    return next(error);
  }
};

export const getMyProperties = async (req, res, next) => {
  try {
    const properties = await Property.find({ agent: req.user._id }).sort('-createdAt');
    return res.json({ properties });
  } catch (error) {
    return next(error);
  }
};
