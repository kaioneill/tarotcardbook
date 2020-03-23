import mongoose from "mongoose";

const cardSpreadMappingSchema = new mongoose.Schema(
  {
    _spread: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Spread',
      required: true
    },
    _card: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Card',
      required: true
    },
  },
  { timestamps: true }
);

const CardSpreadMapping = mongoose.model("CardSpreadMapping", cardSpreadMappingSchema);

export default CardSpreadMapping;