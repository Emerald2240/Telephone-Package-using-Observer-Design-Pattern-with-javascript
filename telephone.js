//#region Classes Section
class Telephone {
    constructor() {
        this.contacts = [];
        this.observers = new Set;
    }

    //Adds a new phone number to contacts list. Checks for duplicates to make sure.
    addPhoneNumber(phone, name) {
        let oldPhone = this.searchForContact(phone);
        let oldName = this.searchForContact(name);
        if (!oldPhone && !oldName) {
            let newContact = new Contact(name, phone);
            this.contacts.push(newContact);
            console.log(`Contact: ${name} (${phone}) saved.`)
        } else {
            console.log(`Contact ${name} (${phone}) already exists.`)
        }
        console.log()
    }

    //Removes specified phone number from contacts list.
    removePhoneNumber(contactNameOrPhone) {
        let contactInfo = this.searchForContact(contactNameOrPhone);
        let newArray = [];
        if (!contactInfo) {
            console.log('Contact not found');
        } else {
            for (let i = 0; i < this.contacts.length; i++) {
                var contactName = this.contacts[i].getName();
                var phone = this.contacts[i].getPhoneNumber();
                if (contactName != contactNameOrPhone || phone != contactNameOrPhone) {
                    newArray.push(this.contacts[i]);
                }
            }
            this.contacts = newArray;
            console.log(`Contact: ${contactName} (${phone}) deleted successfully.`);
            console.log(this.contacts)
            console.log();
            return true;
        }
    }

    //Adds an observer to te list of observers. Makes sure the observers do some specified tasks before being added. It uses a Set datatype, so there cannot be duplicates.
    addObserver(observer) {
        if (observer.initiatePhoneCall || observer.displayContactInfo) {
            this.observers.add(observer)
        } else {
            console.log('This is not a valid observer.\n')
        }

    }

    //Removes observer from list of observers
    removeObserver(observer) {
        this.observers.delete(observer)
    }

    //One of the Observer Notifiers. This one in particular calls the observer in charge of phone calls
    dialPhoneNumber(contactNameOrPhone) {
        let contactInfo = this.searchForContact(contactNameOrPhone);
        if (!contactInfo) {
            // for (let observer of this.observers) {
            //     if (observer.initiatePhoneCall) {
            //         observer.initiatePhoneCall(new Contact('#Anonymous#', contactNameOrPhone));
            //         return true
            //     }
            // }
            console.log(`Unable to dial. Contact: ${contactNameOrPhone} does not exist.`)
        } else {
            for (let observer of this.observers) {
                if (observer.initiatePhoneCall) {
                    observer.initiatePhoneCall(contactInfo);
                    return true
                }
            }
            console.log('Observer not found.');
        }
        console.log();
    }

    //Another One of the Observer Notifiers. This one in particular calls the observer that displays contact information to the user.
    showContactInfo(contactNameOrPhone) {
        let contactInfo = this.searchForContact(contactNameOrPhone);
        if (!contactInfo) {
            console.log('Contact not found');
        } else {
            for (let observer of this.observers) {
                if (observer.displayContactInfo) {
                    observer.displayContactInfo(contactInfo);
                }
            }
        }
    }

    //Returns the contact list
    getAllContacts() {
        return this.contacts;
    }

    //Searches for a particular contact in the contact list, using their name or phone number.
    searchForContact(nameOrPhone) {
        for (let i = 0; i < this.contacts.length; i++) {
            let name = this.contacts[i].getName();
            let phone = this.contacts[i].getPhoneNumber();
            if (name == nameOrPhone || phone == nameOrPhone) {
                return this.contacts[i];
            }
        }
        return false;
    }
}


class Contact {
    #name;
    #phoneNum;
    constructor(name, phoneNum) {
        this.#name = name;
        this.#phoneNum = phoneNum;
    }

    getName() {
        return this.#name;
    }

    getPhoneNumber() {
        return this.#phoneNum;
    }
}

//This is an observer that will be notified by the telephone class whenever a call needs to be made.
class PhoneCallObserver {
    initiatePhoneCall(contactInfo) {
        let waitTime = Math.ceil(Math.random() * 10);
        // console.log('Calculated waiting time: ' + waitTime);
        let count = 0;

        process.stdout.write(`Now Dialling ${contactInfo.getName()} (${contactInfo.getPhoneNumber()})`);
        do {
            var dt = new Date();
            while ((new Date()) - dt <= (1 * 1000)) {
            }
            process.stdout.write('.');
            count++;
        }
        while (waitTime >= count);

        console.log()
        console.log(`\n"Hello! This is ${contactInfo.getName()} speaking. What can i do for you?"`)
        console.log();
    }
}

//This is an observer that will be notified by the telephone class when the full detail of a contact needs to be viewed.
class ContactInfoObserver {
    displayContactInfo(contact) {
        console.log(`Name: ${contact.getName()}\n Phone Number: ${contact.getPhoneNumber()}`);
        console.log();
    }
}
//#endregion




//#region Running Code Section
function pause(seconds) {
    var dt = new Date();
    while ((new Date()) - dt <= (seconds * 1000)) {
    }
}

const iphone = new Telephone();
iphone.addPhoneNumber('08148863871', 'Annastecia');

iphonePhoneCallObserver = new PhoneCallObserver();
iphoneContactInfoObserver = new ContactInfoObserver();

iphone.addObserver(iphonePhoneCallObserver);
iphone.addObserver(iphoneContactInfoObserver);

// console.log(iphone.getAllContacts());
// iphone.removePhoneNumber(180);
// iphone.removePhoneNumber('MTN');

iphone.dialPhoneNumber('Annastecia');
// iphone.showContactInfo('MTN');
//#endregion