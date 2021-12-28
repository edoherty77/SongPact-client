import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { RootNavigator } from "./rootNavigator";

import { useQuery } from "react-query";

import currentUser from "../stores/UserStore";
import sortedPacts from "../stores/SortedPactStore";
import PactModel from "../api/pacts";

export default function Main({ updateAuthState, logout }) {
	useQuery(
		["userPacts"],
		async () => {
			const userPacts = await PactModel.all(currentUser.email);
			userPacts.pact.map((pact) => {
				pact.users.find((user) => {
					if (user.user === currentUser._id) {
						if (pact.status === 1 && user.userStatus === 1) {
							sortedPacts.setAction(pact);
						} else if (pact.status === 1 && user.userStatus === 2) {
							sortedPacts.setPending(pact);
						} else if (pact.status === 2) {
							sortedPacts.setArchive(pact);
						} else if (pact.status === 0) {
							sortedPacts.setDrafts(pact);
						}
					}
				});
			});
		},
		{ refetchInterval: 10000 }
	);

	return (
		<PaperProvider>
			<RootNavigator updateAuthState={updateAuthState} logout={logout} />
		</PaperProvider>
	);
}
