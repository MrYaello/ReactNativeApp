import React, { useState } from "react";
import { VStack, HStack, Box, Button, ButtonIcon, Text, ChevronsLeftIcon, SafeAreaView, 
    ButtonText, Heading, Pressable, Actionsheet, ActionsheetBackdrop, ActionsheetContent, 
    ActionsheetDragIndicatorWrapper, ActionsheetDragIndicator, ActionsheetItem, Avatar, 
    AvatarFallbackText, AvatarImage, AvatarBadge} from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import EditIcon from "../assets/icons/EditIcon";
import InversedEditIcon from "../assets/icons/InversedEditIcon";
import ActionTile from "../components/ActionTile";

const Account = ({ navigation }) => {

    const [avatarSource, setAvatarSource] = useState();
    const [showActionsheet, setShowActionsheet] = useState(false);
    const handleClose = () => setShowActionsheet(!showActionsheet);
    username = "villegassg";
    name = "César Ismael Villegas Maldonado";

    return (
        <SafeAreaView>
            <Box style = {accountScreenStyles.topBox}>
                <HStack style={accountScreenStyles.hstack}>
                    <Button 
                        onPress={() => navigation.goBack()} 
                        variant="ghost" 
                        size="md" 
                        colorScheme="primary"
                        style={accountScreenStyles.backButton}
                    >
                        <ButtonIcon 
                            as={ChevronsLeftIcon} 
                            style={accountScreenStyles.backButtonIcon} 
                            size="xxl"
                        />
                    </Button>
                    <Heading size="xl" style={accountScreenStyles.heading}>Account</Heading>
                    <Button 
                        style={{
                            backgroundColor: "transparent", 
                            marginRight: "-3%", 
                            width: "15%"
                        }}
                    />
                </HStack>
            </Box>
            <Box style={accountScreenStyles.body}>
                <VStack alignItems="center" width="100%" >
                    <ActionTile name="Change name">
                        <Button style={accountScreenStyles.editButton}>
                            <ButtonText size="md" color="#FF0F57" fontWeight="$normal">Edit</ButtonText>
                            <ButtonIcon style={{marginLeft: "20%", marginBottom: "10%"}}>
                                <EditIcon color="#FF0F57" size="xl"/>
                            </ButtonIcon>
                        </Button>
                    </ActionTile>
                    <ActionTile name="Change username">
                        <Button style={accountScreenStyles.editButton}>
                            <ButtonText size="md" color="#FF0F57" fontWeight="$normal">Edit</ButtonText>
                            <ButtonIcon style={{marginLeft: "20%", marginBottom: "10%"}}>
                                <EditIcon color="#FF0F57" size="xl"/>
                            </ButtonIcon>
                        </Button>
                    </ActionTile>
                    <ActionTile name="Change password">
                        <Button style={accountScreenStyles.editButton}>
                            <ButtonText size="md" color="#FF0F57" fontWeight="$normal">Edit</ButtonText>
                            <ButtonIcon style={{marginLeft: "20%", marginBottom: "10%"}}>
                                <EditIcon color="#FF0F57" size="xl"/>
                            </ButtonIcon>
                        </Button>
                    </ActionTile>
                    <ActionTile name="Change avatar">
                        <Button 
                            style={accountScreenStyles.editButton}
                            onPress={() => handleClose()}
                        >
                            <ButtonText size="md" color="#FF0F57" fontWeight="$normal">Edit</ButtonText>
                            <ButtonIcon style={{marginLeft: "20%", marginBottom: "10%"}}>
                                <EditIcon color="#FF0F57" size="xl"/>
                            </ButtonIcon>
                        </Button>

                        <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={900}>
                            <ActionsheetBackdrop/>
                            <ActionsheetContent h="63%" zIndex={999} 
                                style={accountScreenStyles.avatarSheetContent}
                            >
                                <ActionsheetDragIndicatorWrapper>
                                    <ActionsheetDragIndicator />
                                </ActionsheetDragIndicatorWrapper>

                                <ActionsheetItem style={{height: "0%"}}>
                                    <Box style={accountScreenStyles.editAvatarVoidBox}>
                                        <Button style={{backgroundColor: "transparent"}}></Button>
                                    </Box>
                                </ActionsheetItem>

                                <ActionsheetItem
                                    style= {accountScreenStyles.avatarSheetContent}
                                >
                                    <Text size="3xl" color="black" style={{fontWeight: 600}}>Change avatar</Text>
                                </ActionsheetItem>

                                <ActionsheetItem
                                    style= {accountScreenStyles.avatarSheetContent}
                                >
                                    <Avatar size='3xl'>
                                        <AvatarFallbackText>{name}</AvatarFallbackText>
                                        <AvatarImage alt={`${name} Avatar`} source={{uri: `${avatarSource}`}}/>
                                        <AvatarBadge bg="transparent">
                                            <Button 
                                                bg="white" 
                                                size="2xl" 
                                                borderRadius='$full' 
                                                style={accountScreenStyles.editAvatarButton}
                                                onPress={()=> console.log("Avatar button pressed!")} 
                                            >
                                                <ButtonIcon as={InversedEditIcon} color="#FF0F57" size="2xl"/>
                                            </Button>
                                        </AvatarBadge>
                                    </Avatar>
                                </ActionsheetItem>

                                <ActionsheetItem
                                    style= {accountScreenStyles.avatarSheetContent}
                                >
                                    <VStack style={{alignItems: "center"}}>
                                        <Text size="2xl" color="black" style={{fontWeight: "normal"}}>{name}</Text>
                                        <Text size="lg" color="grey" style={{fontWeight: "semilight"}}>@{username}</Text>
                                    </VStack>
                                </ActionsheetItem>

                                <ActionsheetItem>
                                    <Box style={accountScreenStyles.editAvatarVoidBox}>
                                        <Button style={{backgroundColor: "transparent"}}></Button>
                                    </Box>
                                </ActionsheetItem>
                            </ActionsheetContent>
                        </Actionsheet>
                    </ActionTile>

                    <Box style={accountScreenStyles.securityBox}>
                        <Button style={accountScreenStyles.securityButton}>
                            <Box style={accountScreenStyles.securityBox2}>
                                <Text 
                                    style={accountScreenStyles.securityButtonText} 
                                    size="lg"
                                >
                                    Security
                                </Text>
                            </Box>
                        </Button>
                    </Box>

                    <Box style={accountScreenStyles.voidBox}>
                        <Button style={{backgroundColor: "transparent"}}></Button>
                    </Box>

                    <Box style={accountScreenStyles.logOutBox}>
                        <Button 
                            style={accountScreenStyles.logOutButton}
                            onPress={() => navigation.replace("Login")}
                        >
                            <ButtonText>Log out</ButtonText>
                        </Button>
                    </Box>
                    <Box style={accountScreenStyles.deleteAccountBox}>
                        <Button 
                            style={accountScreenStyles.deleteAccountButton}
                            onPress={() => navigation.replace("Welcome")}
                        >
                            <ButtonText
                                style={accountScreenStyles.deleteAccountButtonText}    
                            >Delete account</ButtonText>
                        </Button>
                    </Box>
                </VStack>
            </Box>
        </SafeAreaView>
    )
}

const accountScreenStyles = StyleSheet.create({
    topBox: {
        alignItems: "flex-start",
        width: "100%",
        maxHeight: "5%",
    },
    hstack: {
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    backButton: {
        alignItems: "center",
        width: "15%",
        height: "100%",
        marginLeft: "-3%",
        paddingRight: "0%",
        borderRadius: 10,
        backgroundColor: "transparent",
        position: "static"
    },
    backButtonIcon: {
        color:"#FF0F57",
    },
    heading: {
        fontWeight: "semibold",
    },
    body: {
        marginTop: "1%", 
        height: "100%",
    },
    editButton: {
        width: "20%",
        height: "100%",
        backgroundColor: "transparent",
    },
    avatarSheetContent: {
        justifyContent: "center",
        alignItems: "center",
    },
    securityBox: {
        width: "100%",
        height: "5%",
    },
    securityButton: {
        width: "100%",
        backgroundColor: "transparent",
    },
    securityBox2: {
        width: "100%",
        justifyContent: "flex-start",
    },
    securityButtonText: {
        backgroundColor: "transparent",
    },
    voidBox: {
        height: "49%",
    },
    logOutBox: {
        height: "6%",
        width: "100%",
        alignItems: "center",
        marginBottom: "2%"
    },
    logOutButton: {
        width: "90%",
        height: "100%",
        borderRadius: 50,
    },
    deleteAccountBox: {
        height: "6%",
        width: "100%",
        alignItems: "center",
    },
    deleteAccountButton: {
        width: "90%",
        height: "100%",
        backgroundColor: "transparent",
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 50
    },
    deleteAccountButtonText: {
        color: "red",
    },
    editAvatarButton: {
        width: "100%", 
        height: "100%"
    },
    editAvatarVoidBox: {
        backgroundColor: "transparent", 
        width: "100%", 
        height: "100%"
    }
})

export default Account;