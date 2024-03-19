/*
⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣀⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⢀⣀⣀⡀⠄⠄⠄⡠⢲⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠄⠄
⠄⠄⠄⠔⣈⣀⠄⢔⡒⠳⡴⠊⠄⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⣿⣿⣧⠄⠄
⠄⢜⡴⢑⠖⠊⢐⣤⠞⣩⡇⠄⠄⠄⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠄⠝⠛⠋⠐
⢸⠏⣷⠈⠄⣱⠃⠄⢠⠃⠐⡀⠄⠄⠄⠄⠙⠻⢿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠸⠄⠄⠄⠄
⠈⣅⠞⢁⣿⢸⠘⡄⡆⠄⠄⠈⠢⡀⠄⠄⠄⠄⠄⠄⠉⠙⠛⠛⠛⠉⠉⡀⠄⠡⢀⠄⣀
⠄⠙⡎⣹⢸⠄⠆⢘⠁⠄⠄⠄⢸⠈⠢⢄⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠃⠄⠄⠄⠄⠄
⠄⠄⠑⢿⠈⢆⠘⢼⠄⠄⠄⠄⠸⢐⢾⠄⡘⡏⠲⠆⠠⣤⢤⢤⡤⠄⣖⡇⠄⠄⠄⠄⠄
⣴⣶⣿⣿⣣⣈⣢⣸⠄⠄⠄⠄⡾⣷⣾⣮⣤⡏⠁⠘⠊⢠⣷⣾⡛⡟⠈⠄⠄⠄⠄⠄⠄
⣿⣿⣿⣿⣿⠉⠒⢽⠄⠄⠄⠄⡇⣿⣟⣿⡇⠄⠄⠄⠄⢸⣻⡿⡇⡇⠄⠄⠄⠄⠄⠄⠄
⠻⣿⣿⣿⣿⣄⠰⢼⠄⠄⠄⡄⠁⢻⣍⣯⠃⠄⠄⠄⠄⠈⢿⣻⠃⠈⡆⡄⠄⠄⠄⠄⠄
⠄⠙⠿⠿⠛⣿⣶⣤⡇⠄⠄⢣⠄⠄⠈⠄⢠⠂⠄⠁⠄⡀⠄⠄⣀⠔⢁⠃⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⣿⣿⣿⣿⣾⠢⣖⣶⣦⣤⣤⣬⣤⣤⣤⣴⣶⣶⡏⠠⢃⠌⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠿⠿⠟⠛⡹⠉⠛⠛⠿⠿⣿⣿⣿⣿⣿⡿⠂⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
⠠⠤⠤⠄⠄⣀⠄⠄⠄⠑⠠⣤⣀⣀⣀⡘⣿⠿⠙⠻⡍⢀⡈⠂⠄⠄⠄⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⠑⠠⣠⣴⣾⣿⣿⣿⣿⣿⣿⣇⠉⠄⠻⣿⣷⣄⡀⠄⠄⠄⠄⠄⠄⠄⠄
PADORU PADORU!!!!
*/

const DEVELOPMENT = true;

const path = require('path');
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const crypto = require('crypto');

app.use(express.static(__dirname + "/../"))

const usernameLimit = 10;

const sio = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
});

app.use(cors({
    origin: true
}))

app.use(express.urlencoded({
    extended: false
}))
app.use(express.json({ limit: '100mb' }))

//app.use(express.raw({ limit: '100mb' })); // , type: 'image/*'

const sha512 = (str) => crypto.createHash('sha512').update(str).digest('hex');
const base64_encode = (str) => Buffer.from(str, 'utf-8').toString('base64');
const base64_decode = (str) => Buffer.from(str, 'base64').toString('utf-8');

function shuffleNoCollide(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * i); // no +1 here!
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function shuffle(array) {
    return shuffleNoCollide(array);
    //let currentIndex = array.length-1,  randomIndex;
    let currentIndex = array.length, randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function genUser(username, userToken) {
    return {
        id: null,
        name: username,
        token: userToken,
        points: 0,
        finished: false,
        topic2: null,
        topic2user: null,
        response1: null,
        response2: null,
        votedFor: null
    }
}

// TODO: give each user a "token" when joining a room, that they keep

function randomID(length = 16) {
    var text = "";
    //var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const chars = "0123456789"
    for (var i = 0; i < length; i++) {
        text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return text;
}

let rooms = [];

function getRoom(id) {
    if (!id) return null;
    return rooms.find(room => room.id.toString() == id.toString());
}

function generateUniqueRoomID() {
    let roomId;
    let attempts = 0;
    const maxAttempts = 100;

    while (attempts < maxAttempts) {
        roomId = randomID(5);
        
        // Check if the generated roomId is unique
        if (!getRoom(roomId)) {
            return roomId; // Return the unique roomId
        }
        // neff do you realize how bad this is1?!?! well realistically we wouldnt reach that many people but brUH
        console.log(`Attempt ${attempts} at finding available room ID`);
        

        attempts++;
    }
    return -1;
}

const uniqueKey = crypto.randomBytes(16).toString('hex');

function calculateUserHash(ip, username, id) {
    // best security
    //return sha512(`${uniqueKey}${ip}${req.headers['user-agent']}${username}${id}`)
    return sha512(`${uniqueKey}${ip}${username}${id}`)
}

function getValidUser(roomData, username, token, ip) {
    if (username == null) {
        return roomData.users.find(user => user.token == token);
    } else {
        return roomData.users.find(user => user.token == calculateUserHash(ip, username, roomData.id));
    }
}

app.get("/myhash", (req, res) => {
    if (!req.query.username) return res.sendStatus(400);
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.send(calculateUserHash(req.query.username, '00000', ip))
})

app.post('/create', (req, res) => {
    const username = req.body.username;
    if (!username) res.sendStatus(400);
    if (username.length > usernameLimit) return res.sendStatus(413);
    if (!username.length) return res.status(400).send("whar");
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userExists = rooms.find(room => room.users.find(user => user.token == calculateUserHash(ip, username, room.id)))
    if (userExists) return res.status(400).send("you are already in a room!");
    const roomID = generateUniqueRoomID().toString();
    if (roomID == -1) return res.sendStatus(500);
    const userToken = calculateUserHash(ip, username, roomID);
    rooms.push({
        id: roomID,
        host: username,
        round: 0,
        topicRound: 1,
        started: false,
        voting: false,
        users: [genUser(username, userToken)],
        rounds: [...shuffle(["NEWS", "RATINGS", "TRAVELLING"]), "IMAGE"],
        imgs: new Map()
    })
    return res.send({
        id: roomID,
        token: userToken
    });
})

const maxPlayers = 6;

const systemName = "SERVER"

const roomTimeouts = {};
const submitTimeouts = {};
const submitTimer = 60;

app.post('/join', (req, res) => {
    const roomID = req.body.roomID;
    const username = req.body.username;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (!roomID || !username) res.sendStatus(400);
    if (username.length > usernameLimit) return res.sendStatus(413);
    if (!username.length) return res.status(400).send("whar");
    const roomData = getRoom(roomID)
    if (!roomData) return res.status(404).send("could not find room");
    if (roomData.users.length >= maxPlayers) return res.status(403).send(`there are too many players (${maxPlayers}) in the room`)
    if (roomData.started) return res.status(403).send("the room has already started a round");
    const userExists = roomData.users.find(user => user.name == username);
    if (userExists) return res.status(403).send("someone has the same username in that room!");
    const userInRoom = rooms.find(room => room.users.find(user => user.token == calculateUserHash(ip, username, room.id)))
    if (userInRoom) return res.status(400).send("you are already in a room!");
    const userToken = calculateUserHash(ip, username, roomID);
    roomData.users.push(genUser(username, userToken));
    return res.json({
        users: roomData.users.map(user => { 
            return { name: user.name, points: user.points, idHash: sha512(user.name) }
        }),
        host: roomData.host,
        token: userToken
    })
})

app.post('/upload', (req, res) => {
    // bad security 101
    // but who cares [as]
    const roomID = req.query.roomID;
    const roomData = getRoom(roomID);
    if (!roomData) return res.sendStatus(404);
    const file = req.body.file;
    const extension = req.body.ext;
    const username = req.body.username
    if (!file || file.length === 0) return res.status(400).send('Invalid file');
    if (!roomID || !file || !extension || !username) return res.sendStatus(400);
    const hash = sha512(file)
    console.debug(`/upload - ${roomID} - ${hash}`);
    const findUser = roomData.users.find(user => {
        return user.name == username
    })
    if (!findUser) return res.status(403).send("you tried uploading a file, but you dont have access to the room")
    roomData.imgs.set(hash, {
        buffer: file,
        extension
    });
    findUser.file = hash;
    res.send(hash);
})

app.get('/imgs/:room/:hash', (req, res) => {
    const hash = req.params.hash;
    const room = req.params.room;
    const roomData = getRoom(room);
    if (!roomData) return res.sendStatus(404);

    // Check if the hash exists in the storage
    if (!roomData.imgs.has(hash)) return res.status(404).send('Image not found');

    // Retrieve the image buffer from storage
    const { buffer, extension } = roomData.imgs.get(hash);
    const base64ImageData = buffer.replace(/^data:image\/\w+;base64,/, '')

    // Set the appropriate content type and send the image buffer
    res.set('Content-Type', extension); // Change the content type according to your image type
    res.send(Buffer.from(base64ImageData, 'base64'));
});

function getTopics(topic) {
    // minimum of 6 because 6 players
    console.log(`getTopics(${topic})`)
    switch (topic) {
        // yesssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
        case "NEWS":
            return ["Queen lizzy has returned from the dead! What do you make of this??", "What's your opinion on the recent inflation rises??", "King Charles dethroned! Your reaction to this is..."]
        case "RATINGS":
            return ["What do you think of the latest iPhone?", "Review the last meal that you had.", "How was the last country you visited?", "Give an honest review of someone you know."]
        case "TRAVELLING":
            return ["Review the last place you've been to.", "Describe your country in a few words!", "What kind of place is your local area?", "Where do you live? 👁️", "How's the weather over there?"]
        case "IMAGE": // image would have a single one because there's no point in having multiple prompts
            return ["Provide us with a funny image and describe it for the next player!"]
        default:
            return ["Uhh! Something went wrong!"]
    }
}

const EmojiConvertor = require('emoji-js');

function addPoints(roomID, username, points) {
    const roomData = getRoom(roomID);
    if (!roomData) return;
    const findUser = roomData.users.find(user => {
        user.name == username;
    })
    if (!findUser) return;
    findUser.points = findUser.points + points;

}

// socket server stuff!
sio.on('connection', socket => {
    const ipAddr = socket.request.connection.remoteAddress;
    socket.emit('reconnect', true);
    let userData = {};
    let roomData = {};
    function broadcast(roomID, content) {
        console.log(`[${roomID}] SERVER > ${content}`);
        sio.to(roomID).emit('message', {
            username: systemName,
            content
        });
    }
    function sendMsg(content) {
        socket.emit('message', {
            username: systemName,
            content
        });
    }
    sendMsg("Connected!");
    socket.on('updateRoomData', () => {
        if (!roomData || !userData) return socket.emit('error', "Invalid Session.");
        roomData = getRoom(callback.id);
        if (!roomData) return socket.emit('error', "Room doesn't exist.");
        userData = getValidUser(roomData, null, callback.token, ipAddr);
    })

    function finishRound(updatedRoomData) {
        updatedRoomData.topicRound++;
        const shuffledUsers = shuffleNoCollide(updatedRoomData.users.map(x=>updatedRoomData.users.indexOf(x)))
        if (updatedRoomData.topicRound > 2) {
            updatedRoomData.voting = true;
            updatedRoomData.users = updatedRoomData.users.map(user => {
                user.finished = false;
                return user;
            })
            const submissions = updatedRoomData.users.map(user => {
                return {
                    username: user.topic2user,
                    title: user.topic2,
                    desc: user.response2,
                    file: user.file2user
                }
            })
            sio.to(roomData.id).emit('roomEvent', { event: "results", submissions });
        } else {
            updatedRoomData.voting = false;
            updatedRoomData.users = updatedRoomData.users.map(user => {
                const shuffledUser = updatedRoomData.users[shuffledUsers[updatedRoomData.users.indexOf(user)]]; // insanity
                user.topic2 = shuffledUser.response1
                user.topic2user = shuffledUser.name
                user.file2user = shuffledUser.file
                user.finished = false;
                return user;
            })
            submitTimeouts[roomData.id] = setTimeout(notEveryoneDid, ((updatedRoomData.round >= 4) ? submitTimer * 2 : submitTimer) * 1000)
            updatedRoomData.users.forEach(user => {
                sio.to(user.id).emit('roomEvent', { event: "nextround", user: user.topic2user, prompt: user.topic2 });
            })
        }
    }

    function notEveryoneDid() {
        const updatedRoomData = getRoom(roomData.id);
        if (!updatedRoomData) return;
        const usersThatDidnt = updatedRoomData.users.filter(user => !user.finished)
        console.log(`[${updatedRoomData.id}] some people (${usersThatDidnt.length}) didnt finish`)
        updatedRoomData.users = updatedRoomData.users.map(user => {
            if (user.finished) return user;
            user[`response${updatedRoomData.topicRound}`] = "[No response given]";
            user.finished = true;
            
            sio.to(roomData.id).emit('roomEvent', { event: "waiting", users: [] });
            return user;
        })
        updatedRoomData.voting = false;
        finishRound(updatedRoomData)
    }

    socket.on('roomEvent', (data) => {
        if (roomData.host != userData.name) return socket.emit('error', "you really thought.") //todo: remove this since i might allow other playres to do events
        const updatedRoomData = getRoom(roomData.id);
        if (!updatedRoomData) return socket.emit('error', "couldnt find room")
        switch (data.event) {
            case "start":
                updatedRoomData.started = true;
                updatedRoomData.round = 0;
                updatedRoomData.topicRound = 1;
                sio.to(roomData.id).emit('roomEvent', { event: "start" });
                break;
            case "nexttopic":
                clearTimeout(submitTimeouts[roomData.id]);
                updatedRoomData.round++;
                updatedRoomData.topicRound = 1;
                const roundName = updatedRoomData.rounds[updatedRoomData.round - 1]
                const topics = shuffle(getTopics(roundName))
                updatedRoomData.users = updatedRoomData.users.map(user => {
                    user.finished = false;
                    delete user.votedFor;
                    user.topic2 = null
                    user.topic2response = null
                    if (topics.length == 1) {
                        user.topic1 = topics[0];
                    } else {
                        user.topic1 = topics[updatedRoomData.users.indexOf(user)];
                    }
                    sio.to(user.id).emit('roomEvent', { event: "yourtopic", topic: user.topic1 })
                    return user;
                })
                updatedRoomData.voting = false;
                submitTimeouts[roomData.id] = setTimeout(notEveryoneDid, submitTimer * 1000)
                sio.to(roomData.id).emit('roomEvent', { event: "nexttopic", round: updatedRoomData.round, roundName });
                break;
            case "votingtime":
                setTimeout(function() {
                    const updatedRoomData = getRoom(roomData.id);
                    if (!updatedRoomData) return socket.emit('error', "couldnt find room");
                    const unvoters = updatedRoomData.users.filter(user => !user.votedFor);
                    for (let i = 0; i < unvoters.length; i++) {
                        const randomUsers = shuffle(updatedRoomData.users);
                        const randomUser = randomUsers[0];
                        let findUser = updatedRoomData.users.find(user => {
                            return user.topic2user == randomUser.name
                        });
                        if (findUser.name == unvoters[i].name) {
                            findUser = updatedRoomData.users.find(user => {
                                return user.topic2user == randomUsers[1].name
                            });
                            if (!findUser) break;
                        }
                        // yeah no im not going to add a check, im too lazy!
                        unvoters[i].votedFor = {
                            username: randomUser.topic2user,
                            title: randomUser.topic2,
                            desc: randomUser.response2,
                            file: randomUser.file,
                            actual: findUser.name
                        }
                    }
                    const allVoters = updatedRoomData.users.filter(user => user.votedFor).map(user => user.votedFor);
                    
                    if (!allVoters.length) return sio.to(roomData.id).emit('roomEvent', {
                        event: "winneris",
                        noone: true
                    })
                    const submitterCounts = {};
                    allVoters.forEach(vote => {
                        const submitter = vote.actual;
                        submitterCounts[submitter] = (submitterCounts[submitter] || 0) + 1;
                    });

                    // Find the submitter with the highest count
                    let winner;
                    let maxVotes = -1;
                    for (const submitter in submitterCounts) {
                        if (submitterCounts[submitter] > maxVotes) {
                            maxVotes = submitterCounts[submitter];
                            winner = submitter;
                        }
                    }
                    const winnerObj = allVoters.find(vote => vote.actual === winner);

                    const winnerUser = updatedRoomData.users.find(user => user.name == winnerObj.actual)
                    const sacUser = updatedRoomData.users.find(user => user.name == winnerObj.username)
                    let winnerPoints = maxVotes * 100;
                    let sacPoints = (maxVotes * 100) * (1/5);
                    if (updatedRoomData.round >= 4) {
                        winnerPoints *= 2
                        sacPoints *= 2
                    }
                    /*addPoints(updatedRoomData.id, winnerUser.name, winnerPoints)
                    addPoints(updatedRoomData.id, sacUser.name, sacPoints)*/
                    winnerUser.points = winnerUser.points + winnerPoints
                    sacUser.points = sacUser.points + sacPoints
                    sio.to(roomData.id).emit('roomEvent', {
                        event: "winneris",
                        submission: winnerObj,
                        winner: winnerObj.actual,
                        voteCount: maxVotes,
                        winPoints: {
                            hash: sha512(winnerUser.name),
                            points: winnerPoints
                        },
                        sacPoints: {
                            hash: sha512(sacUser.name),
                            points: sacPoints
                        },
                    })
                }, 30000)
                break;
        }
    })

    socket.on("topicFinish", (content) => {
        if (!content || typeof content != "string") return socket.emit("error", "nice try")
        if (content.length > 50) return socket.emit("error", "response too long");
        const updatedRoomData = getRoom(roomData.id);
        if (!updatedRoomData) return socket.emit('error', "couldnt find room");
        if (updatedRoomData.voting) return socket.emit('error', "how")
        
        const updatedUserData = updatedRoomData.users.find(user => user.name == userData.name);
        const emoji = new EmojiConvertor();
        emoji.replace_mode = "unified"
        content = emoji.replace_colons(content);
        updatedUserData[`response${updatedRoomData.topicRound}`] = content;
        updatedUserData.finished = true;
        userData = updatedUserData;
        roomData = updatedRoomData;
        sio.to(roomData.id).emit('roomEvent', { event: "waiting", users: updatedRoomData.users.filter(user => !user.finished).map(user => {
            return { username: user.name, hash: sha512(user.name) }
        }) });
        if (!updatedRoomData.users.filter(user => !user.finished).length) {
            clearTimeout(submitTimeouts[roomData.id]);
            finishRound(updatedRoomData);
        }
    })
    socket.on("vote", (data) => {
        const updatedRoomData = getRoom(roomData.id);
        if (!updatedRoomData) return socket.emit('error', "couldnt find room");
        if (!updatedRoomData.voting) return socket.emit('error', "HOW.");
        const updatedUserData = updatedRoomData.users.find(user => user.name == userData.name);
        if (!updatedUserData) return socket.emit('error', "couldnt find user");
        /*
return {
                    username: user.topic2user,
                    title: user.topic2,
                    desc: user.response2
                }
        */
        const findUser = updatedRoomData.users.find(user => {
            return user.topic2user == data.username
        });
        if (!findUser) return socket.emit('error', "couldnt find who made that");
        updatedUserData.votedFor = { ...data, actual: findUser.name };

    })
    socket.on('join', async (callback) => {
        roomData = getRoom(callback.id);
        if (!roomData) return socket.emit('error', "Room doesn't exist.");
        userData = getValidUser(roomData, null, callback.token, ipAddr);
        if (!userData) return socket.emit('error', "Invalid Token.");
        if (userData.name == "SERVER") {
            roomData.users.splice(roomData.users.indexOf(userData), 1);
            socket.emit('error', "no thank you! bye bye!");
            socket.emit('forceDisconnect');
            socket.disconnect();
            broadcast(roomData.id, "someone did something sus");
        }
        userData.id = socket.id;
        socket.emit("roomState", {
            started: roomData.started,
            round: roomData.round
        })
        socket.join(roomData.id);
        socket.emit("addme", {
            name: userData.name,
            points: userData.points,
            idHash: sha512(userData.name)
        });
        if (!userData.joined) {
            userData.joined = true;
            sio.to(roomData.id).emit('join', {
                username: userData.name,
                idHash: sha512(userData.name)
            });
            broadcast(roomData.id, `${userData.name} has joined!`);
        } else {
            roomData.users.forEach(user => {
                socket.emit("join", {
                    username: user.name,
                    idHash: sha512(user.name),
                    reconnect: true,
                    host: roomData.host == user.name
                })
            })
            clearTimeout(roomTimeouts[`${roomData.id}-${userData.name}`]);
        }
    });
    // i just realized i didnt even need to do any authentication after first authenticating, why didnt i realize this back then
    socket.on('user_message', async (content) => {
        if (!roomData || !userData) return socket.emit('error', "Invalid Session.");
        if (!content || typeof content != "string") return socket.emit("error", "nice try")
        if (content.length > 256) return socket.emit('error', "Message too long!");
        
        const emoji = new EmojiConvertor();
        emoji.replace_mode = "unified"
        content = emoji.replace_colons(content);
        content = content.replaceAll("/shrug", "¯\\_(ツ)_/¯")
        console.log(`[${roomData.id}] ${userData.name} > ${content}`);
        switch (content.split(" ")[0]) {
            case "/fumomote":
                content = (content + " ᗜˬᗜ").trim();
                break;
            case "/fumo":
                content = `⠀⢀⣒⠒⠆⠤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢠⡛⠛⠻⣷⣶⣦⣬⣕⡒⠤⢀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⡿⢿⣿⣿⣿⣿⣿⡿⠿⠿⣿⣳⠖⢋⣩⣭⣿⣶⡤⠶⠶⢶⣒⣲⢶⣉⣐⣒⣒⣒⢤⡀⠀⠀⠀⠀⠀⠀⠀
⣿⠀⠉⣩⣭⣽⣶⣾⣿⢿⡏⢁⣴⠿⠛⠉⠁⠀⠀⠀⠀⠀⠀⠉⠙⠲⢭⣯⣟⡿⣷⣘⠢⡀⠀⠀⠀⠀⠀
⠹⣷⣿⣿⣿⣿⣿⢟⣵⠋⢠⡾⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣿⣾⣦⣾⣢⠀⠀⠀⠀
⠀⠹⣿⣿⣿⡿⣳⣿⠃⠀⣼⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢻⣿⣿⣿⠟⠀⠀⠀⠀
⠀⠀⠹⣿⣿⣵⣿⠃⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣷⡄⠀⠀⠀⠀⠀
⠀⠀⠀⠈⠛⣯⡇⠛⣽⣦⣿⠀⠀⠀⠀⢀⠔⠙⣄⠀⠀⠀⠀⠀⠀⣠⠳⡀⠀⠀⠀⠀⢿⡵⡀⠀⠀⠀⠀
⠀⠀⠀⠀⣸⣿⣿⣿⠿⢿⠟⠀⠀⠀⢀⡏⠀⠀⠘⡄⠀⠀⠀⠀⢠⠃⠀⠹⡄⠀⠀⠀⠸⣿⣷⡀⠀⠀⠀
⠀⠀⠀⢰⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⢸⠒⠤⢤⣀⣘⣆⠀⠀⠀⡏⢀⣀⡠⢷⠀⠀⠀⠀⣿⡿⠃⠀⠀⠀
⠀⠀⠀⠸⣿⣿⠟⢹⣥⠀⠀⠀⠀⠀⣸⣀⣀⣤⣀⣀⠈⠳⢤⡀⡇⣀⣠⣄⣸⡆⠀⠀⠀⡏⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠁⠁⠀⢸⢟⡄⠀⠀⠀⠀⣿⣾⣿⣿⣿⣿⠁⠀⠈⠙⠙⣯⣿⣿⣿⡇⠀⠀⢠⠃⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠇⢨⢞⢆⠀⠀⠀⡿⣿⣿⣿⣿⡏⠀⠀⠀⠀⠀⣿⣿⣿⡿⡇⠀⣠⢟⡄⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⡼⠀⢈⡏⢎⠳⣄⠀⡇⠙⠛⠟⠛⠀⠀⠀⠀⠀⠀⠘⠻⠛⢱⢃⡜⡝⠈⠚⡄⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠘⣅⠁⢸⣋⠈⢣⡈⢷⠇⠀⠀⠀⠀⠀⣄⠀⠀⢀⡄⠀⠀⣠⣼⢯⣴⠇⣀⡀⢸⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⠳⡌⠛⣶⣆⣷⣿⣦⣄⣀⠀⠀⠀⠈⠉⠉⢉⣀⣤⡞⢛⣄⡀⢀⡨⢗⡦⠎⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⠑⠪⣿⠁⠀⠐⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣏⠉⠁⢸⠀⠀⠀⠄⠙⡆⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣀⠤⠚⡉⢳⡄⠡⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣏⠁⣠⣧⣤⣄⣀⡀⡰⠁⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⠔⠉⠀⠀⠀⠀⢀⣧⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣅⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢸⠆⠀⠀⠀⣀⣼⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠟⠋⠁⣠⠖⠒⠒⠛⢿⣆⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠑⠤⠴⠞⢋⣵⣿⢿⣿⣿⣿⣿⣿⣿⠗⣀⠀⠀⠀⠀⠀⢰⠇⠀⠀⠀⠀⢀⡼⣶⣤⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡠⠟⢛⣿⠀⠙⠲⠽⠛⠛⠵⠞⠉⠙⠳⢦⣀⣀⡞⠀⠀⠀⠀⡠⠋⠐⠣⠮⡁⠀
⠀⠀⠀⠀⠀⠀⠀⢠⣎⡀⢀⣾⠇⢀⣠⡶⢶⠞⠋⠉⠉⠒⢄⡀⠉⠈⠉⠀⠀⠀⣠⣾⠀⠀⠀⠀⠀⢸⡀
⠀⠀⠀⠀⠀⠀⠀⠘⣦⡀⠘⢁⡴⢟⣯⣞⢉⠀⠀⠀⠀⠀⠀⢹⠶⠤⠤⡤⢖⣿⡋⢇⠀⠀⠀⠀⠀⢸⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠵⠗⠺⠟⠖⢈⡣⡄⠀⠀⠀⠀⢀⣼⡤⣬⣽⠾⠋⠉⠑⠺⠧⣀⣤⣤⡠⠟⠃
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠷⠶⠦⠶⠞⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`
                break;
            case "/padoru": content = `PADORU PADORU!!!
⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣀⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⢀⣀⣀⡀⠄⠄⠄⡠⢲⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠄⠄
⠄⠄⠄⠔⣈⣀⠄⢔⡒⠳⡴⠊⠄⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⣿⣿⣧⠄⠄
⠄⢜⡴⢑⠖⠊⢐⣤⠞⣩⡇⠄⠄⠄⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠄⠝⠛⠋⠐
⢸⠏⣷⠈⠄⣱⠃⠄⢠⠃⠐⡀⠄⠄⠄⠄⠙⠻⢿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠸⠄⠄⠄⠄
⠈⣅⠞⢁⣿⢸⠘⡄⡆⠄⠄⠈⠢⡀⠄⠄⠄⠄⠄⠄⠉⠙⠛⠛⠛⠉⠉⡀⠄⠡⢀⠄⣀
⠄⠙⡎⣹⢸⠄⠆⢘⠁⠄⠄⠄⢸⠈⠢⢄⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠃⠄⠄⠄⠄⠄
⠄⠄⠑⢿⠈⢆⠘⢼⠄⠄⠄⠄⠸⢐⢾⠄⡘⡏⠲⠆⠠⣤⢤⢤⡤⠄⣖⡇⠄⠄⠄⠄⠄
⣴⣶⣿⣿⣣⣈⣢⣸⠄⠄⠄⠄⡾⣷⣾⣮⣤⡏⠁⠘⠊⢠⣷⣾⡛⡟⠈⠄⠄⠄⠄⠄⠄
⣿⣿⣿⣿⣿⠉⠒⢽⠄⠄⠄⠄⡇⣿⣟⣿⡇⠄⠄⠄⠄⢸⣻⡿⡇⡇⠄⠄⠄⠄⠄⠄⠄
⠻⣿⣿⣿⣿⣄⠰⢼⠄⠄⠄⡄⠁⢻⣍⣯⠃⠄⠄⠄⠄⠈⢿⣻⠃⠈⡆⡄⠄⠄⠄⠄⠄
⠄⠙⠿⠿⠛⣿⣶⣤⡇⠄⠄⢣⠄⠄⠈⠄⢠⠂⠄⠁⠄⡀⠄⠄⣀⠔⢁⠃⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⣿⣿⣿⣿⣾⠢⣖⣶⣦⣤⣤⣬⣤⣤⣤⣴⣶⣶⡏⠠⢃⠌⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠿⠿⠟⠛⡹⠉⠛⠛⠿⠿⣿⣿⣿⣿⣿⡿⠂⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
⠠⠤⠤⠄⠄⣀⠄⠄⠄⠑⠠⣤⣀⣀⣀⡘⣿⠿⠙⠻⡍⢀⡈⠂⠄⠄⠄⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⠑⠠⣠⣴⣾⣿⣿⣿⣿⣿⣿⣇⠉⠄⠻⣿⣷⣄⡀⠄⠄⠄⠄⠄⠄⠄⠄
`
                break;
        }
        content = content.replaceAll("/joinkers")

        sio.to(roomData.id).emit('message', {
            username: userData.name,
            content
        });
    })

    socket.on('leave', () => {
        if (!roomData || !userData) return;
        broadcast(roomData.id, `${userData.name} has left.`);
        roomData.users.splice(roomData.users.indexOf(userData), 1);
        sio.to(roomData.id).emit("leave", sha512(userData.name));
        if (roomData.host == userData.name) {
            console.log(`Destroy room ${roomData.id}`);
            sio.to(roomData.id).emit("forceDisconnect", "The host has left.");
            rooms.splice(rooms.indexOf(roomData), 1);
        }
        roomData = {};
        userData = {};
    })
    socket.on('disconnect', () => {
        if (!roomData || !userData) return;
        let username = userData.name;
        let roomID = roomData.id
        roomData = {};
        userData = {};
        if (!getRoom(roomID)) return;
        // Set a timeout to delete the room if no reconnection occurs
        roomTimeouts[`${roomID}-${username}`] = setTimeout(() => {
            let roomData = getRoom(roomID);
            if (roomData.host == username) {
                sio.to(roomData.id).emit("forceDisconnect", "The host has left.");
                rooms.splice(rooms.indexOf(roomData), 1);
            } else {
                broadcast(roomData.id, `${username} has left.`);
                roomData.users.splice(roomData.users.indexOf(roomData.users.find(user => user.name == username)), 1);
                sio.to(roomData.id).emit("leave", sha512(username));
            }
        }, 5000); // Adjust this time as per your requirements
    });
})

if (DEVELOPMENT) {
    app.get('/sti/:room', (_, res) => {
        res.sendFile(path.resolve(__dirname + "/../sti/index.html"))
    })
    app.get('/stop', (_, res) => {
        console.log("death.") //hi
        res.status(404).send("i am become death, destroyer of worlds")
        process.exit(0);
    })
} else {
    app.get('/', (_, res) => {
        res.sendStatus(200)
    });
}

server.listen(3000, async () => {
    console.log(`Server Listening on port @3000`)
})
