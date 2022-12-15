const GameconUsers = require("../models/GameconUsers.model");
const GameconGames = require("../models/GameconGames.model");
const bcrypt = require("bcrypt");

module.exports = {
    deleteGame: async(req, res) => {
        const id = req.params.id;
        const gameFinded = await GameconGames.findById(id);

        if(!id || !gameFinded) {
            res.status(400).json({Message: "Game não encontrado!"});
            return;
        }

        try {
            await GameconGames.deleteOne(gameFinded);

            res.status(200).json({Message: "O game foi deletado com sucesso!"});
        } catch(err) {
            res.status(500).json({Message: "Aconteceu um erro interno no servidor, tente novamente mais tarde."});
        }
    },
    deleteUser: async(req, res) => {
        const id = req.params.id;
        const userFinded = await GameconUsers.findById(id);


        if(!id || !userFinded) {
            res.status(400).json({Message: "Usuário não encontrado!"});
            return;
        }

        try {
            await GameconUsers.deleteOne(userFinded);

            res.status(200).json({Message: "O usuário foi deletado com sucesso!"});
        } catch(err) {
            res.status(500).json({Message: "Aconteceu um erro interno no servidor, tente novamente mais tarde."});
        }
    },
    registerNewGame: async(req, res) => {
        const { gameName, gameDeveloper, gameDescription, gamePlatform, gameGenre, gameValue } = req.body;

        if(!gameName) {
            res.status(400).json({Message: "O nome do game é obrigatório!"});
            return;
        }
        if(!gameDeveloper) {
            res.status(400).json({Message: "O nome da empresa desenvolvedora do game é obrigatória!"});
            return;
        }
        if(!gameDescription) {
            res.status(400).json({Message: "Uma descrição sobre o game é obrigatória!"});
            return;
        }
        if(!gamePlatform) {
            res.status(400).json({Message: "É preciso informar uma plataforma!"});
            return;
        }
        if(!gameGenre) {
            res.status(400).json({Message: "O gênero do game é obrigatório!"});
            return;
        }
        if(!gameValue) {
            res.status(400).json({Message: "O valor do game é obrigatório!"});
            return;
        }

        const newGame = {
            gameName,
            gameDeveloper,
            gameDescription,
            gamePlatform,
            gameGenre,
            gameValue
        };

        try {
            await GameconGames.create(newGame);

            res.status(201).json({Message: "O game foi inserido no estoque!", newGame});
        } catch(err) {
            res.status(500).json({Message: "Aconteceu um erro interno no servidor, tente novamente mais tarde."});
        }
    },
    registerNewUser: async(req, res) => {
        const { userLevel, userName, userEmail, confirmEmail, userPassword, confirmPassword } = req.body;

        if(!userLevel || userLevel < 1 || userLevel > 2) {
            res.status(400).json({Message: "Nível de usuário não reconhecido, tente '1' ou '2'."});
            return;
        }
        if(!userName) {
            res.status(400).json({Message: "O nome é obrigatório!"});
            return;
        }
        if(!userEmail) {
            res.status(400).json({Message: "O e-mail é obrigatório!"});
            return;
        }
        if(!confirmEmail) {
            res.status(400).json({Message: "A confirmação do e-mail é obrigatória!"});
            return;
        }
        if(userEmail !== confirmEmail) {
            res.status(400).json({Message: "Os e-mails não coincidem!"});
            return;
        }
        if(!userPassword) {
            res.status(400).json({Message: "A senha é obrigatória!"});
            return;
        }
        if(!confirmPassword) {
            res.status(400).json({Message: "A confirmação de senha é obrigatória!"});
            return;
        }
        if(userPassword !== confirmPassword) {
            res.status(400).json({Message: "As senhas não coincidem!"});
            return;
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(userPassword, salt);

        const newUser = {
            userLevel,
            userName,
            userEmail,
            userPassword: passwordHash,
        };

        const userExist = await GameconUsers.findOne({userEmail: userEmail});

        if(userExist) {
            res.status(422).json({Message: "O e-mail informado já está cadastrado!"});
            return;
        }

        try {
            await GameconUsers.create(newUser);

            if(newUser.userLevel === 2) {
                res.status(201).json({Message: "Usuário administrador criado com sucesso!", newUser});
                return;
            }

            res.status(201).json({Message: "Usuário criado com sucesso!", newUser});
        } catch(err) {
            res.status(500).json({Message: "Aconteceu um erro interno no servidor, tente novamente mais tarde."});
        }
    },
    findUsers: async(req, res) => {
        const allUsersFinded = await GameconUsers.find();

        try {
            res.status(200).json(allUsersFinded);
        } catch(err) {
            res.status(500).json({Message: "Aconteceu um erro interno no servidor, tente novamente mais tarde."});
        }
    },
    findGames: async(req, res) => {
        const allGamesFinded = await GameconGames.find();

        try {
            res.status(200).json(allGamesFinded);
        } catch(err) {
            res.status(500).json({Message: "Aconteceu um erro interno no servidor, tente novamente mais tarde."});
        }
    },
    index: (req, res) => {
        res.status(200).json({Message: "Bem-vindo à Gamecon!"});
    }
};
