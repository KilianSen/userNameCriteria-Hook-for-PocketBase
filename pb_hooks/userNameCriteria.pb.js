onAfterBootstrap((e) => {
    const config = require(`${__hooks}/hookSettings.js`).Setting("userNameCriteria", {
        minLength: 8,
        maxLength: 20,
        hasSpecialChar: true,
        hasNumber: true,
        hasUpperCase: true,
        hasLowerCase: true,

        languageTag: "language",

        responses: {
            languages: {
                "default": {
                    minLength: "minimum username length is 8 characters",
                    maxLength: "maximum username length is 20 characters",
                    hasSpecialChar: "username must contain a special character",
                    hasNumber: "username must contain a number",
                    hasUpperCase: "username must contain an uppercase letter",
                    hasLowerCase: "username must contain a lowercase letter"
                },
                "de": {
                    minLength: "Nutzername muss mindestens 8 Zeichen lang sein",
                    maxLength: "Nutzername darf maximal 20 Zeichen lang sein",
                    hasSpecialChar: "Nutzername muss ein Sonderzeichen enthalten",
                    hasNumber: "Nutzenname muss eine Zahl enthalten",
                    hasUpperCase: "Nutzenname muss einen Großbuchstaben enthalten",
                    hasLowerCase: "Nutzenname muss einen Kleinbuchstaben enthalten"
                }
        },
    }})
})

onRecordBeforeCreateRequest((e) => {
    if (e.collection.name !== "users" || e.httpContext.get("admin")) {
        return null // ignore for admins
    }
    const config = require(`${__hooks}/hookSettings.js`).Setting("userNameCriteria", null)

    // check if language is set in record, if not use default
    const recordLang = e.record.get(config.get().languageTag)
    // check if language is available as response, if not use default
    const lang = (recordLang in config.get().responses.languages ? recordLang : "default") || "default"

    // get responses for language
    const responses = config.get().responses.languages[lang]


    if (e.record.get("username").length < config.get().minLength) {
        $app.logger().debug("Blocked User Creation: Username too short", "type", "hook", "file", "userNameCriteria.js")
        throw new BadRequestError(responses.minLength)
    }

    if (e.record.get("username").length > config.get().maxLength) {
        $app.logger().debug("Blocked User Creation: Username too long", "type", "hook", "file", "userNameCriteria.js")
        throw new BadRequestError(responses.maxLength)
    }

    if (config.get().hasSpecialChar && !e.record.get("username").match(/[^a-zA-Z0-9]/)) {
        $app.logger().debug("Blocked User Creation: Username does not contain special character", "type", "hook", "file", "userNameCriteria.js")
        throw new BadRequestError(responses.hasSpecialChar)
    }

    if (config.get().hasNumber && !e.record.get("username").match(/[0-9]/)) {
        $app.logger().debug("Blocked User Creation: Username does not contain number", "type", "hook", "file", "userNameCriteria.js")
        throw new BadRequestError(responses.hasNumber)
    }

    if (config.get().hasUpperCase && !e.record.get("username").match(/[A-Z]/)) {
        $app.logger().debug("Blocked User Creation: Username does not contain uppercase letter", "type", "hook", "file", "userNameCriteria.js")
        throw new BadRequestError(responses.hasUpperCase)
    }

    if (config.get().hasLowerCase && !e.record.get("username").match(/[a-z]/)) {
        $app.logger().debug("Blocked User Creation: Username does not contain lowercase letter", "type", "hook", "file", "userNameCriteria.js")
        throw new BadRequestError(responses.hasLowerCase)
    }

    return null
}, "users")
