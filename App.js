import React, { useEffect } from 'react'

// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// sentry
import * as Sentry from 'sentry-expo';
Sentry.init({
	dsn: 'https://aad44b3037504cd2b4e137270bf26268@o560541.ingest.sentry.io/6248149',
	enableInExpoDevelopment: true,
	debug: false
});

export default function App() {

  // for ios tracking permission
  // useEffect(() => {
		
	// 	(async () => {
	// 		const { status } = await requestTrackingPermissionsAsync();
	// 		if (status === 'granted') {
	// 			console.log('Yay! I have user permission to track data');
	// 		}
	// 	})();

	// }, []);
  	let [ initialRoute, setInitialRoute ] = useState("Masuk");
	const loadResourcesAsync=async ()=>{

		await Promise.all([
		//   Asset.loadAsync([
		// 	intro
		// 	require('./assets/images/Intro/bg1.png'),
		//   ]),
		  Font.loadAsync({
			// font
			'regular': require('./assets/fonts/cerebrisans-regular.ttf'),
			'medium': require('./assets/fonts/cerebrisans-medium.ttf'),
		  }),
		]);

		let cachedAuth = await getCachedAuthAsync();
		let iklan 	= await (await get_iklan()).data
		console.log(iklan)
		if (cachedAuth) {
			setInitialRoute(iklan.data===1?"Iklan":"Beranda");
		}
	  }
	  if(!isLoadingComplete && !props.skipLoadingScreen) {
		return (
		  <AppLoading
			startAsync={ loadResourcesAsync }
			onError={ (error)=>console.warn(error) }
			onFinish={ () => setLoadingComplete(true)}
		  />
		);
	  } else {
		return <Routes initialRoute={initialRoute}/>;
	  }

  // return (
  //   <View style={styles.container}>
  //     <Text>Open up App.js to start working on your app!</Text>
  //     <StatusBar style="auto" />
  //   </View>
  // );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
