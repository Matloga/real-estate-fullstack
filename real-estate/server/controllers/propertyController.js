const Property = require("../models/Property");

exports.getAll = async (req, res, next) => {
  try {
    const query = { isPublished: true };
    if (req.query.location) query.location = { $regex: req.query.location, $options: "i" };
    if (req.query.minPrice) query.price = { ...query.price, $gte: Number(req.query.minPrice) };
    if (req.query.maxPrice) query.price = { ...query.price, $lte: Number(req.query.maxPrice) };
    if (req.query.bedrooms) query.bedrooms = Number(req.query.bedrooms);
    if (req.query.bathrooms) query.bathrooms = Number(req.query.bathrooms);
    if (req.query.type) query.type = req.query.type;
    if (req.query.propertyType) query.propertyType = req.query.propertyType;
    if (req.query.furnished === "true") query.furnished = true;
    if (req.query.furnished === "false") query.furnished = false;
    if (req.query.readyToMove === "true") query.readyToMove = true;
    if (req.query.readyToMove === "false") query.readyToMove = false;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [properties, total] = await Promise.all([
      Property.find(query).populate("agent", "name email").skip(skip).limit(limit).sort({ createdAt: -1 }),
      Property.countDocuments(query),
    ]);
    res.json({ properties, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id).populate("agent", "name email");
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const data = { ...req.body, agent: req.user.id };
    if (req.files && req.files.length > 0) {
      data.images = req.files.map((f) => `/uploads/${f.filename}`);
    }
    if (data.lat && data.lng) {
      data.coordinates = { type: "Point", coordinates: [parseFloat(data.lng), parseFloat(data.lat)] };
    }
    const property = await Property.create(data);
    res.status(201).json(property);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Not found" });
    if (property.agent.toString() !== req.user.id) return res.status(403).json({ message: "Forbidden" });
    Object.assign(property, req.body);
    if (req.body.lat && req.body.lng) {
      property.coordinates = { type: "Point", coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)] };
    }
    await property.save();
    res.json(property);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Not found" });
    if (property.agent.toString() !== req.user.id) return res.status(403).json({ message: "Forbidden" });
    await property.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};

exports.nearby = async (req, res, next) => {
  try {
    const { lat, lng, maxDistance = 5000 } = req.query;
    if (!lat || !lng) return res.status(400).json({ message: "lat,lng required" });
    const properties = await Property.find({
      coordinates: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseInt(maxDistance),
        },
      },
      isPublished: true,
    }).limit(20);
    res.json(properties);
  } catch (err) {
    next(err);
  }
};
