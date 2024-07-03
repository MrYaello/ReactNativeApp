import React from "react";
import { VStack, HStack, Box, Button, ButtonIcon, Text, ChevronsLeftIcon, SafeAreaView, ButtonText, Heading, Pressable } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import GluestackIcon from "../assets/icons/EditIcon";
import ActionTile from "../components/ActionTile";

const Account = ({ navigation }) => {

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
                    <ActionTile name="Change name" description="Change your full name.">
                        <Button style={accountScreenStyles.editButton}>
                            <ButtonText size="md" color="black" fontWeight="$semilight">Edit</ButtonText>
                            <ButtonIcon style={{marginLeft: "20%", marginBottom: "10%"}}>
                                <GluestackIcon color="#FF0F57" size="xl"/>
                            </ButtonIcon>
                        </Button>
                    </ActionTile>
                    <ActionTile name="Change username" description="Alter your alter ego.">
                        <Button style={accountScreenStyles.editButton}>
                            <ButtonText size="md" color="black" fontWeight="$semilight">Edit</ButtonText>
                            <ButtonIcon style={{marginLeft: "20%", marginBottom: "10%"}}>
                                <GluestackIcon color="#FF0F57" size="xl"/>
                            </ButtonIcon>
                        </Button>
                    </ActionTile>
                    <ActionTile name="Change password" description="Change your password.">
                        <Button style={accountScreenStyles.editButton}>
                            <ButtonText size="md" color="black" fontWeight="$semilight">Edit</ButtonText>
                            <ButtonIcon style={{marginLeft: "20%", marginBottom: "10%"}}>
                                <GluestackIcon color="#FF0F57" size="xl"/>
                            </ButtonIcon>
                        </Button>
                    </ActionTile>
                    <ActionTile name="Change avatar" description="Change your profile picture.">
                        <Button style={accountScreenStyles.editButton}>
                            <ButtonText size="md" color="black" fontWeight="$semilight">Edit</ButtonText>
                            <ButtonIcon style={{marginLeft: "20%", marginBottom: "10%"}}>
                                <GluestackIcon color="#FF0F57" size="xl"/>
                            </ButtonIcon>
                        </Button>
                    </ActionTile>

                    <Box style={accountScreenStyles.options}>
                        <Text>Security</Text>
                    </Box>
                    <Box style={accountScreenStyles.options}>
                        <Button onPress={() => navigation.replace("Login")}>
                            <ButtonText>Log out</ButtonText>
                        </Button>
                    </Box>
                    <Box style={accountScreenStyles.options}>
                        <Text>Delete Account</Text>
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
        height: "100%"
    },
    editButton: {
        width: "20%",
        height: "100%",
        backgroundColor: "transparent",
    },
    
})

export default Account;