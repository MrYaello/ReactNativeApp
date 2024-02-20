import { MenuIcon, Button, Icon, Avatar, AvatarFallbackText, AvatarImage, Text, HStack, VStack, Box, Actionsheet, 
    ActionsheetBackdrop, ActionsheetContent, ActionsheetItem, ActionsheetDragIndicatorWrapper, ActionsheetDragIndicator, 
    ActionsheetItemText } from "@gluestack-ui/themed";
import socket from "../assets/utils/socket";
import QRCode from "qrcode";
import { SvgXml } from 'react-native-svg';
import { useState, useLayoutEffect } from "react";
import { Platform, StyleSheet, Image } from "react-native";

const ChatMenu = ({username, setVisibleModalLogOut}) => {
    const alias = "MrYaello";
    username = "Yael Lozano Estrada"
    const [avatarSource, setAvatarSource] = useState();
    useLayoutEffect(() => {
        socket.emit("getAvatarSource", username);
        socket.on("getAvatarSource", (response) => setAvatarSource(response));
    }, [username]);
    const [showActionsheet, setShowActionsheet] = useState(false)
    const handleClose = () => setShowActionsheet(!showActionsheet)
    const handleLogOut = () => {
        handleClose();
        setVisibleModalLogOut(true);
    }
    let qr;

    var opts = {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        quality: 1,
        margin: 0.5,
        color: {
          dark:"#000",
          light:"#FFF"
        }
      }
      
      QRCode.toString('text', opts, function (err, url) {
        if (err) console.log(err);
        qr = url;
      });
        
    return (
        <Box>
            <Button onPress={handleClose} style={styles.menu} size="md">
                <Icon size="xl" as={MenuIcon}></Icon>
            </Button>
            <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={900}>
                <ActionsheetBackdrop/>
                <ActionsheetContent h="60%" zIndex={999}>
                    <ActionsheetDragIndicatorWrapper>
                        <ActionsheetDragIndicator />
                    </ActionsheetDragIndicatorWrapper>
                    <ActionsheetItem>
                        <VStack alignItems="center" justifyContent="space-between" width="100%">
                            <Avatar size="2xl">
                                <AvatarFallbackText>{username}</AvatarFallbackText>
                                <AvatarImage alt={`${username} Avatar`} source={{uri: `${avatarSource}`}}/>
                            </Avatar>
                            <VStack mt="5%" alignItems="center">
                                <Box>
                                    <Text size="md">{alias}</Text>
                                </Box>
                                <Box>
                                    <Text size="xl">{username}</Text>
                                </Box>
                            </VStack>
                        </VStack>
                    </ActionsheetItem>
                    <ActionsheetItem height="50%">
                        <VStack alignItems="center" width="100%">
                            <SvgXml
                              width="100%"
                              height="100%"
                              xml={qr}
                            />
                            <Text>Access Code</Text>
                        </VStack>
                    </ActionsheetItem>
                </ActionsheetContent>
            </Actionsheet>
        </Box>
)}

const styles = StyleSheet.create({
    menu: {
        marginTop: -10,
        borderRadius: 13,
        maxWidth: 50,
        marginLeft: Platform.OS === 'ios' ? '75%' : '30%',
        position: "absolute"
    }
});

export default ChatMenu;
