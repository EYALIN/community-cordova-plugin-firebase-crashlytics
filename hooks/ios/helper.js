const path = require("path");
const fs = require("fs");

module.exports = {
    BUILD_PHASE_COMMENT: "Crashlytics",

    getXcodeProjectPath: function(context) {
        const iosPlatformPath = path.join("platforms", "ios");
        // cordova-ios 7+ standardizes the project name to "App.xcodeproj"; older
        // versions used the app's display name from config.xml. Resolve the actual
        // *.xcodeproj on disk so uninstall/install work across cordova-ios versions
        // (the previous config.xml-name approach broke on cordova-ios 7+).
        let projectName = "App";
        try {
            const entry = fs.readdirSync(iosPlatformPath).find(function(name) {
                return name.endsWith(".xcodeproj");
            });
            if (entry) {
                projectName = entry.replace(/\.xcodeproj$/, "");
            }
        } catch (e) {
            // Fall back to the cordova-ios 7+ default.
        }
        return path.join(iosPlatformPath, projectName + ".xcodeproj", "project.pbxproj");
    }
};
