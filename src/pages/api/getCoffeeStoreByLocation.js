import { fetchCoffeeStores } from "../../../lib/coffee-stores";

export default async function getCoffeeStoreByLocation(req, res) {
  try {
    const { latLong, limit } = req.query;
    const response = await fetchCoffeeStores(latLong, limit);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
  }
}
