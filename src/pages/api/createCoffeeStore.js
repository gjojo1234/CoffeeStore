import { table } from "../../../lib/airtable";

const createCoffeeStore = async (req, res) => {
  try {
    if (req.method === "POST") {
      //find coffeStore
      const { id, name, address, voting, imgUrl } = req.body;
      const findCoffeeStoreRecords = await table
        .select({
          filterByFormula: `id="${id}"`,
        })
        .firstPage();
      if (findCoffeeStoreRecords.length !== 0) {
        const records = findCoffeeStoreRecords.map((record) => {
          return { ...record.fields };
        });
        res.json(records);
      } else {
        //create coffeeStore
        await table.create([
          {
            fields: {
              id,
              name,
              address,
              voting,
              imgUrl,
            },
          },
        ]);
        res.json({ message: "create store" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: `${error.message}` });
  }
};

export default createCoffeeStore;
