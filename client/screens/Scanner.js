import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { 
    FormControl,
    Box,
    FormControlLabel,
    FormControlLabelText, 
    InputField, 
    Input, 
    FormControlError, 
    FormControlErrorText, 
    FormControlErrorIcon, 
    AlertCircleIcon,
    ArrowRightIcon,
    ArrowLeftIcon, 
    ButtonText,
    Button,
    ButtonIcon,
    Text,
    RepeatIcon,
    Icon,
    LockIcon} from "@gluestack-ui/themed";
import { Camera } from "expo-camera";
import * as LucideIcons from "lucide-react-native";

export default function App() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    const getPermission = () => {
        (async () => {
            setScanned(false);
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }

    useEffect(() => {
        getPermission();
    }, []);

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        alert(`${data}`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    
    if (hasPermission === false) {
        return (
        <Box style={styles.container}>
            <Text style={{ margin: 10 }}>No access to camera</Text>
            <Button onPress={() => getPermission()}>
                <ButtonText>Allow Camera</ButtonText>
                <ButtonIcon ml="$2" as={LucideIcons.Camera}/>
            </Button>
        </Box>)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Box style={styles.barCodeBox}>    
                <Camera
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{height: 400, width: 400}}
                />
            </Box>
            <Box height="10%" pt="10%">
                {scanned && (<Button onPress={() => setScanned(false)}>
                    <ButtonIcon mr="$2" as={RepeatIcon} />
                    <ButtonText>Scan Again</ButtonText>
                </Button>)}
            </Box>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  barCodeBox: {
    alignItems: "center",
    justifyContent: "center",
    height: 350,
    width: 350,
    overflow: "hidden",
    borderRadius: 30,
  }
});