const router = require("express").Router();
const {
  User,
  Asset,
  AssetApportion,
  Beneficiary,
  Witness,
  Executor,
} = require("../../models");

// The `/api/users` endpoint

router.get("/data/:id", async (req, res) => {
  try {
    const userInfo = await User.findByPk(req.params.id, {
      include: [
        {
          model: Asset,
        },
        {
          model: Beneficiary,
        },
        {
          model: Executor,
        },
        {
          model: Witness,
        },
        {
          model: AssetApportion,
        },
      ],
    });

    const user = userInfo.get({ plain: true });

    if (!user) {
      res.status(404).send("Record not found!");
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.post("/", async (req, res) => {
//   // create a new category
//   try {
//     const categories = await Category.create(req.body);
//     res.status(200).json(categories);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// router.put("/:id", async (req, res) => {
//   // update a category by its `id` value
//   try {
//     const categories = await Category.update(req.body, {
//       where: { id: req.params.id },
//     });
//     if (!categories) {
//       res.status(404).send("Record not found!");
//       return;
//     }
//     res.status(200).send(true);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// router.delete("/:id", async (req, res) => {
//   // delete a category by its `id` value
//   try {
//     const categories = await Category.destroy({
//       where: { id: req.params.id },
//     });
//     if (!categories) {
//       res.status(404).json({ message: "Record not found!" });
//       return;
//     }
//     res.status(200).send("Record deleted!");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
