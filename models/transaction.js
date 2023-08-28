import mongoose from "mongoose";
import timestamps from "mongoose-timestamp";
import mongooseAlgolia from "mongoose-algolia";
import dotenv from "dotenv";

dotenv.config();

const { Schema } = mongoose;

export const TransactionSchema = new Schema(
  {
    code: String,
    timestamp: String,
    amount: Number,
    phoneNumber: String,
  },
  {
    collection: "transactions",
  }
);

TransactionSchema.plugin(timestamps);

TransactionSchema.index({ createdAt: 1, updatedAt: 1 });

TransactionSchema.plugin(mongooseAlgolia, {
  appId: process.env.ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_API_KEY,
  indexName: "transactions",
});

export const Transaction = mongoose.model("Transaction", TransactionSchema);

Transaction.SyncToAlgolia();
Transaction.SetAlgoliaSettings({
  searchableAttributes: ["code", "amount", "phoneNumber"],
});
