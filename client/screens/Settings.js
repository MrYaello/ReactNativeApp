import React from 'react';
import { StyleSheet } from "react-native";
import { Box, Button, ButtonIcon, ButtonText, ChevronsLeftIcon, Heading, HStack, SafeAreaView, 
    ScrollView, Select, SelectTrigger, SelectInput, SelectPortal, SelectBackdrop, SelectContent, 
    SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem, Switch, Text, VStack} from '@gluestack-ui/themed';
import ActionTile from '../components/ActionTile';

const Settings = ({ navigation }) => {


    return (
        <SafeAreaView style={settingsScreenStyles.safeArea}>
            <Box style={settingsScreenStyles.topBox}>
                <HStack style={settingsScreenStyles.hstack}>
                    <Button 
                        onPress={() => navigation.goBack()} 
                        variant="ghost" 
                        size="md" 
                        colorScheme="primary"
                        style={settingsScreenStyles.backButton}
                    >
                        <ButtonIcon 
                            as={ChevronsLeftIcon} 
                            style={settingsScreenStyles.backButtonIcon} 
                            size="xxl"
                        />
                    </Button>
                    <Heading size="2xl" style={settingsScreenStyles.heading}>Settings</Heading>
                    <Button 
                        style={{
                            backgroundColor: "transparent", 
                            marginRight: "-3%", 
                            width: "15%"
                        }}
                    />
                </HStack>
            </Box>
            <ScrollView>
                <Box style={{height:"50%"}}>
                    <VStack style={{justifyContent: "flex-start", marginTop: "1%",}}>
                        <Text 
                            size="2xl" 
                            fontWeight="$medium" 
                            color="black" 
                            bg="$secondary100"
                            style={{paddingLeft: "5%", marginBottom: "1%"}}
                        >
                            Appearance
                        </Text>
                        <ActionTile name="Dark Mode" size="xl" fontWeight="$normal">
                            <Switch />
                        </ActionTile>
                    </VStack>
                </Box>
                <Box>
                    <VStack style={{justifyContent: "flex-start", marginTop: "1%",}}>
                        <Text 
                            size="2xl" 
                            fontWeight="$medium" 
                            color="black" 
                            bg="$secondary100"
                            style={{paddingLeft: "5%", marginBottom: "1%"}}
                        >
                            Language
                        </Text>
                        <Select>
                            <SelectTrigger size="lg">
                                <SelectInput placeholder="Select option" />
                            </SelectTrigger>
                            <SelectPortal>
                                <SelectBackdrop />
                                <SelectContent>
                                    <SelectDragIndicatorWrapper>
                                        <SelectDragIndicator />
                                    </SelectDragIndicatorWrapper>
                                    <SelectItem value="en" label="Current device language" />
                                    <SelectItem value="en" label="Spanish" />
                                    <SelectItem value="en" label="English" />
                                </SelectContent>
                            </SelectPortal>
                        </Select>
                    </VStack>
                </Box>
            </ScrollView>
        </SafeAreaView>
    )
}

const settingsScreenStyles = StyleSheet.create({
    safeArea: {
        height: "100%",
    },
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
        fontWeight: "$semibold",
    },
})

export default Settings;