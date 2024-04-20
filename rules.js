class Start extends Scene {
    create() {
        document.body.style.background = 'grey';
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Approach the manor");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

let gems = 0;
//let key = 0;
class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        if (locationData == this.engine.storyData.Locations["Closet"] && gems == 3){
            this.engine.storyData.Locations["Closet"].Choices[1].Target = "Unlocked";
        }
        if (locationData == this.engine.storyData.Locations["Unlocked"]){
            this.engine.storyData.Locations["Closet"].Choices[1] = null;
            gems += 1;
            //key += 1;
            //console.log(key);
        }
        if (locationData == this.engine.storyData.Locations["Front Entrance"] && gems == 4){
            console.log("jhi");
            this.engine.storyData.Locations["Front Entrance"].Choices[2].Target = "End";
        }
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        if(locationData.Choices) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
            if (locationData == this.engine.storyData.Locations["Clock"]){
                gems += 1;
                this.engine.storyData.Locations["East Wing"].Choices[2] = null;
            }
            if (locationData == this.engine.storyData.Locations["Lizard"]){
                gems += 1;
                this.engine.storyData.Locations["Lab"].Choices[1] = null;
            }
            if (locationData == this.engine.storyData.Locations["Armor"]){
                gems += 1;
                this.engine.storyData.Locations["West Wing"].Choices[2] = null;
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');