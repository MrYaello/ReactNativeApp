import { MenuIcon, Button, Icon, Avatar, AvatarFallbackText, AvatarImage, Text, HStack, VStack, Box, Actionsheet, 
    ActionsheetBackdrop, ActionsheetContent, ActionsheetItem, ActionsheetDragIndicatorWrapper, ActionsheetDragIndicator, 
    ActionsheetItemText } from "@gluestack-ui/themed";
import socket from "../assets/utils/socket";
import { useState, useLayoutEffect } from "react";
import { Platform, StyleSheet, Pressable } from "react-native";

const AllowAccess = ({code, showAllowAcess, setShowAllowAcess}) => {
    const alias = "MrYaello";
    username = "Yael Lozano Estrada"
    const [avatarSource, setAvatarSource] = useState();
    const [isOpen, setIsOpen] = useState(false);
    useLayoutEffect(() => {
        if (showAllowAcess) {
            setIsOpen(true);
        }
        socket.emit("getAvatarSource", username);
        socket.on("getAvatarSource", (response) => {
            if (response.length != 0)
                setAvatarSource(response[0].avatar);
        });
    }, [showAllowAcess]);
    const handleClose = () => {
        setShowAllowAcess(false);
        setIsOpen(false);
    }

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
        
    return (
        <Box>
            <Actionsheet isOpen={isOpen} onClose={handleClose} zIndex={900}>
                <ActionsheetBackdrop/>
                <ActionsheetContent h="50%" zIndex={999}>
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
                                    <Text size="lg" color="$primary400">Attendee</Text>
                                </Box>
                                <Box>
                                    <Text size="xl">{username}</Text>
                                </Box>
                            </VStack>
                        </VStack>
                    </ActionsheetItem>
                    <VStack alignItems="center" width="100%" height="47%" mt="3%">
                        <Text size="3xl" color="$success300">Registered User</Text>
                        <Text mt="$1" color="$textLight400">{code}</Text>
                        <Text size="2xl">Allow acess</Text>
                        <Box mt="$4" alignItems="center">
                            <Text size="xl" color="$primary600">La Inteligencia Artificial</Text>
                            <Text size="xl" color="$textLight500">Sotero Prieto I</Text>
                        </Box>
                    </VStack>
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

export default AllowAccess;
