import React, { useEffect, useState } from 'react';
import { Platform, View, StyleSheet  } from  'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ButtonBlock, Container, Img, Title, versi_aplikasi } from  '../../components'
import { signInAsync } from '../../helpers/auth'
import { CommonActions } from '@react-navigation/native';
import { post_masuk } from '../../actions/akun_actions'
import { getToken } from '../../helpers/notifications'
import Swiper from 'react-native-swiper'
import { Colors } from '../../constants';
export default function App({navigation}) {
	const [isFetching, setIsFetching] 	= useState(false)
	const [token, setToken] 			= useState('')
	
	useEffect(() => {
		getToken(setToken)
		return () => {
			
		};
	}, []);
	const handleMasuk = async() => {
		setIsFetching(true)
		let akun = await signInAsync();
		if(akun.profile){
			let payload = {
				token: `Bearer ${akun.accessToken}`,
				tipe: 'siswa',
				device: Platform.OS==="android"?0:1,
				token_device: token,
			}
			post_masuk(payload).then(async(resp) => {
				setIsFetching(false)
				if (resp.data.status) {
					await AsyncStorage.setItem("@token", resp.data.data)

					navigation.dispatch(CommonActions.reset({
						index: 1,
						routes: [
							{
								name: 'Beranda'
							}
						]
					}));

					navigation.navigate("Beranda")
				} else {
					setIsFetching(false)
					alert(resp.data.message)
				}
			})
		}else{
			setIsFetching(false)
		}

	}
	return (
		<Container safe background="white">
			<Swiper
				loop={ false }
				// autoplay
				showsButton
				nextButton={ <ButtonBlock text="Selanjutnya"/> }
				prevButton={ <ButtonBlock text="Sebelumnya" back/> }
				>
				{/* Slide 1 */}
				{/* <View style={{...styles.container, marginTop: 20}}>
					<View style={{backgroundColor: Colors.primary, padding:12, borderRadius:6, paddingHorizontal:44}}>
						<Img src="logo" style={{width:150, height:50}}/>
					</View>
					
					<Title size={14} medium text={`Selamat Datang di \n Education Center Kabupaten Kutai Timur`} mTop={18} align="center"/>
					<Img src="intro" size={250}/>
					<View style={{ marginHorizontal: 12, marginVertical: 16 }}>
						<Title
						text="Solusi pendamping belajar online untuk siswa ketika belajar di rumah"/>
						<Title size={18} text={`Versi ${versi_aplikasi}`}/>	
					</View>
				</View> */}
				{/* Slide 2 */}
				<View style={styles.container}>
					<Img src="intro_jadwal_kelas" style={{width:300, height:270}}/>
					<Title
						size={28}
						medium
						text="Jadwal Kelas"
						align="center"/>
					<Title align="center" text={`Dapatkan informasi semua jadwal kelas yang sudah dibuat oleh guru.`}/>	
				</View>
				<View style={styles.container}>
					<Img src="intro_kelas_online" style={{width:300, height:270}}/>
					<Title
						size={28}
						medium
						text="Kelas Online"
						align="center"/>
					<Title align="center" text={`Akses kelas online yang dibuat guru. kelas online dilengkapi fitur: materi, ujian, dan tugas`}/>	
				</View>
				<View style={styles.container}>
					<Img src="intro_notifikasi" style={{width:300, height:270}}/>
					<Title
						size={28}
						medium
						text="Notifikasi"
						align="center"/>
					<Title align="center" text={`Dapatkan notifikasi materi sudah di publish, serta nilai yang diberikan`}/>	
				</View>
				<View style={styles.container}>
					
					<Img src="intro_materi_belajar" style={{width:300, height:270}}/>
					<Title
						size={28}
						medium
						text="Materi Belajar"
						align="center"/>
					<Title align="center" text={`Akses seluruh materi belajar secara gratis yang diterbitkan oleh KEMENDIKBUD`}/>	
					
					<View style={{marginTop:18, alignItems:'flex-start', flexDirection:"row"}}>
					{isFetching
						? <ButtonBlock disabled text="Memproses ..." icon="loader" primary/>
						: <ButtonBlock onPress={handleMasuk} text="Masuk Dengan Google" icon="log-in" primary/>
					}
					</View>
				</View>
				
			</Swiper>
		</Container>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "white",
		padding:12,
		alignSelf: "center", 
		alignItems: "center",
	},
})
