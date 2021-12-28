import { makeAutoObservable } from "mobx";

class CreatePactStore {
	type = "";
	_id = "";
	dateCreated = "";
	lastUpdated = "";
	sample = false;
	recordLabel = false;
	signed = false;
	labelName = "";
	collaborators = [];
	users = [];
	recordTitle = "";
	initBy = {
		user: "",
		name: "",
	};
	performers = [];
	producer = {
		name: "",
		user: "",
		advancePercent: "",
		publisherPercent: "",
		royaltyPercent: "",
		credit: "",
		artistName: "",
		companyName: "",
		signatureImg: "",
		address: "",
		city: "",
		state: "",
		zipCode: "",
		email: "",
	};
	status = "";
	percentage = 0;
	countering = false;

	setPact(pact) {
		this.type = pact.type;
		this._id = pact._id;
		this.labelName = pact.labelName;
		this.recordLabel = pact.recordLabel;
		this.sample = pact.sample;
		this.recordTitle = pact.recordTitle;
		this.initBy = pact.initBy;
		this.performers = pact.performers;
		this.producer = pact.producer;
		this.status = pact.status;
		this.users = pact.users;
		this.lastUpdated = pact.lastUpdated;
		this.dateCreated = pact.dateCreated;
		this.collaborators = pact.collaborators;
	}

	setType(type) {
		this.type = type;
	}

	setCounter() {
		this.countering = true;
		this.users.map((user) => {
			console.log("user", user);
			return (user["signatureImg"] = ""), (user["userStatus"] = 1);
		});

		this.performers.map((performer) => {
			return (performer["signatureImg"] = "");
		});

		this.producer["signatureImg"] = "";
		console.log("users", this.users);
		console.log("producer", this.producer);
	}

	setSignature(sig, currentUser) {
		this.users.find((user) => {
			if (user.user === currentUser._id) {
				return (user["signatureImg"] = sig), (user["userStatus"] = 2);
			}
		});
		this.performers.find((performer) => {
			if (performer.email === currentUser._id) {
				return (performer["signatureImg"] = sig);
			}
		});
		if (this.producer.email === currentUser._id) {
			this.producer["signatureImg"] = sig;
		}
		const status = this.users.every((user) => {
			return user.userStatus === 2;
		});
		if (status === true) {
			this.status = 2;
		} else {
			this.status = 1;
		}
	}

	setSigned() {
		this.signed = true;
	}

	setCollabInfo(values, foundUser) {
		this.collaborators = [];
		this.users = [];
		//Set initBy value with foundUser
		this.initBy.user = foundUser._id;
		this.initBy.name = foundUser.name;
		this.users.push({
			user: foundUser._id,
			name: foundUser.name,
			artistName: foundUser.artistName,
			companyName: foundUser.companyName,
			address: foundUser.address,
			city: foundUser.city,
			state: foundUser.state,
			zipCode: foundUser.zipCode,
			email: foundUser.email,
		});

		//Find everyone else involved in agreement and push in to collaborator array
		const collabsArr = values.collabs;
		collabsArr.map((collab) => {
			let obj = {};
			obj["user"] = collab._id;
			obj["name"] = collab.name;
			obj["artistName"] = collab.artistName;
			obj["companyName"] = collab.companyName;
			obj["address"] = collab.address;
			obj["city"] = collab.city;
			obj["state"] = collab.state;
			obj["zipCode"] = collab.zipCode;
			obj["email"] = collab.email;
			obj["userStatus"] = 1;
			this.collaborators.push(obj);
			this.users.push(obj);
		});
	}

	setProducer(values) {
		//Find the one producer and add to object
		let foundProducer = this.users.find((x) => x.name === values.producer);
		this.producer.user = foundProducer.user;
		this.producer.artistName = foundProducer.artistName;
		this.producer.name = foundProducer.name;
		this.producer.companyName = foundProducer.companyName;
		this.producer.address = foundProducer.address;
		this.producer.city = foundProducer.city;
		this.producer.state = foundProducer.state;
		this.producer.zipCode = foundProducer.zipCode;
		this.producer.email = foundProducer.email;
		//The rest must be performers. find and push into array
		let foundPerformers = this.users.filter(function (x) {
			return x !== foundProducer;
		});

		this.performers = [];
		for (let i = 0; i < foundPerformers.length; i++) {
			this.performers.push(foundPerformers[i]);
		}
	}

	setProducerInfo(values) {
		this.percentage = 0;
		this.producer.advancePercent = parseInt(values.advancePercent);
		this.producer.royaltyPercent = parseInt(values.royaltyPercent);
		this.producer.publisherPercent = parseInt(values.publisherPercent);
		this.producer.credit = values.credit;
	}

	setPerformerInfo(values) {
		this.percentage =
			this.producer.publisherPercent +
			this.producer.royaltyPercent +
			this.producer.advancePercent;
		this.performers = [];
		for (let i = 0; i < values.length; i++) {
			values[i].publisherPercent = parseInt(values[i].publisherPercent);
			this.performers.push(values[i]);
			this.percentage += parseInt(values[i].publisherPercent);
		}
	}

	setRecordInfo(values) {
		console.log(this.percentage);
		this.recordTitle = values.recordTitle;
		this.sample = values.sample;
		this.recordLabel = values.recordLabel;
		if (values.recordLabel == true) {
			this.labelName = values.labelName;
		} else {
			this.labelName = "";
		}
	}

	setPactId(id) {
		this._id = id;
	}

	resetPact() {
		this.type = "";
		this.users = [];
		this.recordTitle = "";
		this.dateCreated = "";
		this.lastUpdated = "";
		this._id = "";
		this.initBy = {
			user: "",
			status: 1,
			name: "",
		};
		this.collaborators = [];
		this.performers = [];
		this.producer = {
			name: "",
			user: "",
			advancePercent: "",
			publisherPercent: "",
			royaltyPercent: "",
			credit: "",
			artistName: "",
			companyName: "",
			address: "",
			city: "",
			state: "",
			zipCode: "",
			email: "",
			signatureImg: "",
		};
		this.sample = false;
		this.recordLabel = false;
		this.labelName = "";
		this.signed = false;
		this.percentage = 0;
		this.countering = false;
	}

	constructor() {
		makeAutoObservable(this);
	}
}

const store = new CreatePactStore();
export default store;
