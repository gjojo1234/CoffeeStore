import { table } from "../../../lib/airtable";

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      const data = await table
        .select({
          filterByFormula: `id="${id}"`,
        })
        .firstPage();
      const response = data.map((resp) => {
        return { ...resp.fields };
      });
      if (response) {
        res.json({ response });
      } else {
        res.json({ message: "id could not found" });
      }
    } else {
      res.status(400).json({ message: "id is missing" });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong", error });
  }
};

export default getCoffeeStoreById;
