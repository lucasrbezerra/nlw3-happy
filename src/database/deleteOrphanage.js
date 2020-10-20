function deleteOrphanage(db, id){
    console.log("entrou aqui");
    return db.run(`
        DELETE FROM orphanages
        WHERE id = "${id}"
    `)
}

module.exports = deleteOrphanage;
