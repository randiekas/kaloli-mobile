import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Index from './screens/index'
import Iklan from './screens/iklan'
import Masuk from './screens/masuk'
import Beranda from './screens/beranda'
import Pengumuman from './screens/pengumuman'

const Stack = createStackNavigator()
const horizontalAnimation = {
	gestureDirection: 'horizontal',
	cardStyleInterpolator: ({ current, layouts }) => {
		return {
		cardStyle: {
			transform: [
			{
				translateX: current.progress.interpolate({
				inputRange: [0, 1],
				outputRange: [layouts.screen.width, 0],
				}),
			},
			],
		},
		};
	},
};

export default App =({ initialRoute })=>{
	return (
	<NavigationContainer >
		<Stack.Navigator initialRouteName={initialRoute} headerMode="none" screenOptions={horizontalAnimation}>
			<Stack.Screen name="Index" component={Index} />
			<Stack.Screen name="Iklan" component={Iklan} />
			<Stack.Screen name="Masuk" component={Masuk} />
			<Stack.Screen name="Beranda" component={Beranda} />
			<Stack.Screen name="Pengumuman" component={Pengumuman} />
		</Stack.Navigator>
	</NavigationContainer>
	)
	
}
