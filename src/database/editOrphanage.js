function editOrphanage(db, orphanage, id) {
  return db.run(`
      UPDATE orphanages
      SET   lat = "${orphanage.lat}",
            lng = "${orphanage.lng}",
            name = "${orphanage.name}", 
            about = "${orphanage.about}",
            whatsapp = "${orphanage.whatsapp}",
            images = "${orphanage.images}",
            instructions = "${orphanage.instructions}",
            opening_hours= "${orphanage.opening_hours}",
            open_on_weekends = "${orphanage.open_on_weekends}"

      WHERE id = "${id}"
  `);
}

module.exports = editOrphanage;
