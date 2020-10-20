const Database = require("./database/db");
const saveOrphanage = require("./database/saveOrphanage");
const deleteOrphanage = require("./database/deleteOrphanage");
const editOrphanage = require("./database/editOrphanage");

module.exports = {

  index(req, res) {
    return res.render("index");
  },

  async orphanage(req, res) {
    const id = req.query.id;

    try {
      const db = await Database;
      const results = await db.all(`SELECT * FROM orphanages WHERE id="${id}"`);
      const orphanage = results[0];

      orphanage.images = orphanage.images.split(",");
      orphanage.firstImage = orphanage.images[0];

      orphanage.open_on_weekends =
        orphanage.open_on_weekends == "0" ? false : true;

      return res.render("orphanage", { orphanage: orphanage });
    } catch (error) {
      console.log(error);
      return res.send("Erro no banco de dados!");
    }
  },

  async orphanages(req, res) {
    try {
      const db = await Database;
      const orphanages = await db.all("SELECT * FROM orphanages");
      return res.render("orphanages", { orphanages });
    } catch (error) {
      console.log(error);
      return res.send("Erro no banco de dados!");
    }
  },

  createOrphanage(req, res) {
    return res.render("create-orphanage");
  },

  async loadOrphanage(req, res){

    const url = req.headers.referer;
    const id = url.substr(url.lastIndexOf('=') + 1);

    try {
      const db = await Database;
      const results = await db.all(`SELECT * FROM orphanages WHERE id="${id}"`);
      const orphanage = results[0];
  
      orphanage.images = orphanage.images.split(",");
        orphanage.firstImage = orphanage.images[0];
  
        orphanage.open_on_weekends =
        orphanage.open_on_weekends == false ? "0" : "1";

      return res.render("edit-orphanage", {orphanage: orphanage });

    } catch (error) {
      console.log(error);
      return res.send("Erro no banco de dados!");
    }
  },

  async editOrphanage(req, res) {
    const fields = req.body;
    const url = req.headers.referer;
    const id = url.substr(url.lastIndexOf('=') + 1);

    // validar campos do formulario
    if (Object.values(fields).includes("")) {
      return res.send("Todos os campos devem ser preenchidos!");
    }

    console.log("pages: ",fields.open_on_weekends);

    try {
      // salvar um orfanato
      const db = await Database;
      await editOrphanage(db, {
        lat: fields.lat,
        lng: fields.lng,
        name: fields.name,
        about: fields.about,
        whatsapp: fields.whatsapp,
        images: fields.images.toString(),
        instructions: fields.instructions,
        opening_hours: fields.opening_hours,
        open_on_weekends: fields.open_on_weekends,
      }, id);

      // redirecionamento
      return res.redirect("/orphanages");
    } catch (error) {
      console.log(error);
      return res.send("Erro no banco de dados!");
    }
  },

  async saveOrphanage(req, res) {
    const fields = req.body;

    // validar campos do formulario
    if (Object.values(fields).includes("")) {
      return res.send("Todos os campos devem ser preenchidos!");
    }

    try {
      // salvar um orfanato
      const db = await Database;
      await saveOrphanage(db, {
        lat: fields.lat,
        lng: fields.lng,
        name: fields.name,
        about: fields.about,
        whatsapp: fields.whatsapp,
        images: fields.images.toString(),
        instructions: fields.instructions,
        opening_hours: fields.opening_hours,
        open_on_weekends: fields.open_on_weekends,
      });

      // redirecionamento
      return res.redirect("/orphanages");
    } catch (error) {
      console.log(error);
      return res.send("Erro no banco de dados!");
    }
  },
  
  async deleteOrphanage(req, res) {
    try {

      const url = req.headers.referer;
      const id = url.substr(url.lastIndexOf('=') + 1);
      const db = await Database;
      
      await deleteOrphanage(db, id);
      return res.redirect("/orphanages");

    } catch (error) {
      console.log(error);
      return res.send("Erro no banco de dados!");
    }
  }
  
};
