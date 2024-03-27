import express from "express";
import cors from "cors";
import mongoose from "mongoose";
// import { PORT, mongoDBURL } from "./config.js";
import { PORT } from "./config.js";

const app = express();
const serverMsg = `Server Listening on ${PORT}`;

// cors middleware
app.use(cors({
	origin: ['http://localhost:5173'],
	methods: ['PUT', 'POST', 'GET', 'DELETE'],
	allowedHeaders: ['Content-Type']
}));

// middleware to parse request body
app.use(express.json());

/*
	// configuration to connect to mongoDB

	mongoose
		.connect(mongoDBURL)
		.then(() => {
			console.log("App connected to DB");
			app.listen(PORT, () => {
				console.log(serverMsg);
			});
		})
		.catch((error) => {
			return next(error);
		});
*/

// server initialization

app.listen(PORT, () => {
	console.log(serverMsg);
});

// root route

app.get('/', (req, res, next) => {
	const responseData = {
		"message": serverMsg
	}
	return res.status(200).json(responseData);
});

app.use((req, res, next) => {
	const error = new Error("Route not Found!!!");
	error.status = 404;
	return next(error);
});

app.use((error, req, res, next) => {
	const status = error.status || 500;
	const responseData = {
		"error": {
			"message": error.message || "Server Error",
		}
	}
	return res.status(status).json(responseData);
});