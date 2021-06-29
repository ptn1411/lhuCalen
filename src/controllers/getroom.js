let Getroom = (req, res) => {
    const room = req.body.room;
    const link = `/api/phong/${room}`;
    console.log(link);
    return link;
}
module.exports = {
    Getroom: Getroom
}