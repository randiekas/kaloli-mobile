import React, { useState } from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
export default App = ({navigation})=>{
	return (
		<SafeAreaView>
			<Text style={{fontFamily:"medium"}}>hehehe Open up App.js to start working on your app!</Text>
			<Button title="ke iklan" onPress={()=>navigation.navigate("Iklan")}/>
			<Button title="ke login" onPress={()=>navigation.navigate("Masuk")}/>
		</SafeAreaView>
	);
}
