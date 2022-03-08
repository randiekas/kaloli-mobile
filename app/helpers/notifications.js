import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
export const getToken  = async (setToken)=>{
    if (Constants.isDevice) {
		const { status: existingStatus } = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			alert('Berikan akses notifikasi kepada aplikasi ini agar dapat mengirim notifikasi');
			return;
		}
		const token = (await Notifications.getExpoPushTokenAsync()).data;
		console.log(token)
		setToken(token)
	} else {
		alert('Must use physical device for Push Notifications');
	}
	
	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		});
	}
};
