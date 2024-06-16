import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
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
import { CameraView, useCameraPermissions } from "expo-camera";
import * as LucideIcons from "lucide-react-native";
import AllowAcess from "../components/AllowAccess.js";

export default function App() {
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState("back");
    const [scanned, setScanned] = useState(false);
    const [dataReaded, setDataReaded] = useState("");

    function toggleCameraFacing() {
        setFacing(current => (current === "back" ? "front" : "back"));
    }

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        setDataReaded(data);
    };

    if (!permission) {
        return <Text>Requesting for camera permission</Text>;
    }
    
    if (!permission.granted) {
        return (
        <Box style={styles.container}>
            <Text style={{ margin: 10 }}>No access to camera</Text>
            <Button onPress={requestPermission}>
                <ButtonText>Allow Camera</ButtonText>
                <ButtonIcon ml="$2" as={LucideIcons.Camera}/>
            </Button>
        </Box>)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Icon size="10xl" opacity="$30" color="$primary600" as={LucideIcons.Scan} style={{
                    position: 'absolute',
                    zindex: 2,
                }}/>
            <Box style={styles.barCodeBox}>    
                <CameraView
                    facing={facing}
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                    barcodeScannerSettings={{
                        barCodeTypes: [
                            "qr",
                        ],
                    }}
                    style={{height: 400, width: 400}}
                >
                </CameraView>
            </Box>
            {/*<Box height="10%" pt="10%">
                {scanned && (<Button onPress={() => setScanned(false)}>
                    <ButtonIcon mr="$2" as={RepeatIcon} />
                    <ButtonText>Scan Again</ButtonText>
                </Button>)}
    <       /Box>*/}
            <AllowAcess code={dataReaded} showAllowAcess={scanned} setShowAllowAcess={setScanned}></AllowAcess>
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
    zIndex: -1,
  }
});