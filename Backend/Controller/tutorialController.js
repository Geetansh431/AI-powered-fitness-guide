import Tutorial from "../Models/tutorials.model.js";
import User from "../Models/user.model.js";
import mongoose from 'mongoose';

export const likeTutorialController = async (req, res) => {
    const { id } = req.params; 
    const { userid } = req.body; 

    console.log(id);
    console.log(req.body);

    try {
        // Convert id and userid to ObjectId
        const userIdObj = new mongoose.Types.ObjectId(userid);
        const tutorialIdObj = new mongoose.Types.ObjectId(id);

        const user = await User.findById(userIdObj);
        const tutorial = await Tutorial.findById(tutorialIdObj);

        if (!user || !tutorial) {
            return res.status(404).json({ message: "User or Tutorial not found" });
        }

        const index = user.likedVideos.indexOf(id);

        if (index !== -1) {
            user.likedVideos.splice(index, 1); 
            tutorial.likes = Math.max(0, tutorial.likes - 1); 
        } else {
            user.likedVideos.push(id); 
            tutorial.likes += 1; 
        }

        await user.save();
        await tutorial.save();

        return res.status(200).json({ 
            message: "Like status toggled successfully", 
            likedVideos: user.likedVideos,
            tutorialLikes: tutorial.likes 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



export const fetchTutorialController = async (req, res) => {
    console.log("tutorials");
    try {
        // Fetch all tutorials from the database
        const tutorials = await Tutorial.find();

        if (!tutorials || tutorials.length === 0) {
            return res.status(404).json({ message: "No tutorials found" });
        }

        // Return the fetched tutorials
        console.log("tutorials")
        console.log(tutorials)
        res.status(200).json({ tutorials });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const postTutorialsController = async (req, res) => {
    try {
        const tutorials = req.body;

        // Validate if the request body is an array
        if (!Array.isArray(tutorials)) {
            return res.status(400).json({ message: "Invalid JSON format, expected an array of tutorials" });
        }

        // Validate if the array is empty
        if (tutorials.length === 0) {
            return res.status(400).json({ message: "No tutorials provided" });
        }

        // Extract links to check if any tutorial already exists
        const existingTutorials = await Tutorial.find({ link: { $in: tutorials.map(t => t.link) } });

        const existingLinks = existingTutorials.map(tutorial => tutorial.link);
        const duplicateTutorials = tutorials.filter(tutorial => existingLinks.includes(tutorial.link));

        if (duplicateTutorials.length > 0) {
            return res.status(400).json({
                message: `Tutorials with URLs ${duplicateTutorials.map(t => t.link).join(", ")} already exist`
            });
        }

        // Iterate through each tutorial and validate
        for (const tutorial of tutorials) {
            const {
                name,
                type,
                difficulty,
                description,
                duration,
                calories,
                intensity,
                rating,
                participants,
                videoId,
                link,
                trainer,
            } = tutorial;

            // Validate required fields
            if (!link || link.trim() === "") {
                return res.status(400).json({ message: "URL is empty" });
            }

            if (!name || !type || !difficulty || !description || !duration || !calories || !intensity || !rating || !participants || !videoId || !trainer) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            // Validate trainer information
            if (!trainer || !trainer.name || !trainer.specialty || !trainer.experience) {
                return res.status(400).json({ message: "Trainer information is incomplete" });
            }
        }

        // Create and save all tutorials
        const newTutorials = await Tutorial.insertMany(tutorials);

        res.status(201).json({ message: "Tutorials added successfully", tutorials: newTutorials });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
