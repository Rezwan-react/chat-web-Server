const router = express.Router();

router.use((req, res)=>{
    res.status(404).send("page not found!")
})



module.exports = router