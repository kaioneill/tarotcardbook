import mongoose from "mongoose";

const spreadSchema = new mongoose.Schema(
  {
    _user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    _cards: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Card'
    }],
    reversals: {
      type: [Boolean]
    },
  },
  { timestamps: true }
);

const Spread = mongoose.model("Spread", spreadSchema);

export default Spread;