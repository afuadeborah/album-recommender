import express from 'express';
import Note from '../models/Note.js';
import { getArtistInfo } from '../api/getArtists.js';
import authMiddleware from '../middleware/auth.js';

// .Router() is a complete middleware + routing system aka a mini-app
// we're creating a new router instance here to load middleware into
// this also allows us to define routes separate from the main app and use them in the app
const router = express.Router();

// create a Note (POST) with auth
router.post('/', authMiddleware, async (req, res) => {
    // take the info from the Note schema and build the request body
    const {artist, album, note} = req.body;

    // get the artist info
    const artistInfo = await getArtistInfo(artist);
    // throw an error if nothing comes down
    if(!artistInfo) return res.status(400).json({message: 'No artist info found.'});

    // set up the notes on the artist but creating a new schema instance
    const newNote = new Note({ artist: artistInfo.name, album, note, createdBy: req.user.id});
    // .save() is a MDB function
    await newNote.save()
    // parse the new schema info into json in the response body
    res.json(newNote);
});

// get all Notes (GET)
router.get('/', async (req, res) => {
    // if the user logged in is authorized, get all the notes created by the user's username
    // .find() finds the Note model
    // .populate() allows us to reference documents in other collections (ref User in Note)
        // documents are instances of models
    const notes = await Note.find().populate('createdBy', 'username');
    res.json(notes);
});

export default router;
