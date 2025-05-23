import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';
import * as FileSystem from 'expo-file-system';

export async function recordAudioBase64(durationMs = 2000) {
  console.log('▶️ Kayıt başlıyor: izin isteği');
  const { status } = await Audio.requestPermissionsAsync();
  console.log('▶️ İzin durumu:', status);
  if (status !== 'granted') throw new Error('Mikrofon izni yok');

  await Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    interruptionModeIOS: InterruptionModeIOS.DuckOthers,
    playsInSilentModeIOS: true,
    interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
    shouldDuckAndroid: true,
    staysActiveInBackground: false,
    playThroughEarpieceAndroid: false,
  });

  const recording = new Audio.Recording();
  await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
  await recording.startAsync();

  await new Promise(res => setTimeout(res, durationMs));

  await recording.stopAndUnloadAsync();
  const uri = recording.getURI();
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  console.log('▶️ Base64 dönüştürüldü, uzunluk:', base64.length);
  return { base64, uri };
}
