import React, { useState, useEffect, useLayoutEffect } from "react";
import { Platform, Pressable, SafeAreaView, Image, StyleSheet } from "react-native";
import styles from "../assets/utils/styles.js";
import ModalGroup from "../components/ModalGroup.js";
import Profile from "../components/Profile.js";
import ModalLogOut from "../components/ModalLogOut.js";
import { 
  Box,
  VStack,
  HStack,
  Avatar,
  AvatarImage,
  Text,
  Heading,
  Fab,
  FabIcon,
  EditIcon, 
  AvatarFallbackText,
  ScrollView,
  Input,
  Button,
  ButtonText,
  ButtonIcon,
  InputField
} from "@gluestack-ui/themed";
import socket from "../assets/utils/socket.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EverIcon from "../assets/logo512.png";

const Main = ({ navigation }) => {
  /*const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [visibleModalLogOut, setVisibleModalLogOut] = useState(false);

  const getUsername = async () => {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value !== null) {
        setUsername(value);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getId = async () => {
    try {
      const value = await AsyncStorage.getItem("id");
      if (value !== null) {
        setId(value);
        socket.emit("identify", id);
        socket.emit("requestUsers", false, value);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useLayoutEffect(() => {
    getUsername();
    getId();
    socket.on("requestUsers", (response) => setData(response));
  }, []);

  useEffect(() => {
    socket.on("requestUsers", (response) => setData(response));
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <Box height={Platform.OS === "android" && "7%"} mt="3%" mb="2%" style={{alignItems: "center", width: "100%"}}>
        <HStack flexDirection="row" style={{justifyContent: "space-evenly", height: "100%", width: "100%", alignItems: "center"}}>
          <Heading style={Platform.OS === "ios" ? {marginTop: 10, paddingBottom:30} : {marginTop: 15}}>
            {username}
          </Heading>
          <Profile username={username} setVisibleModalLogOut={setVisibleModalLogOut} />
        </HStack>
      </Box>
      <Box
        pl="$3"
        $base-minWidth="100%"
        $base-minHeight="90%"
        style={Platform.OS === "ios" && {paddingTop: 30}}
        >
        {(data.length > 0) 
        ? (
          <ScrollView height={100}>
            <VStack space="lg">
              {data.map((chatData) => {
                let source = {
                  ["uri"]: chatData.avatar,
                }
                let alt = chatData.name + " Avatar"
                return (
                  <Pressable
                    key={chatData.index}
                    onPress={() => {
                      navigation.navigate("Messaging", {
                        gr: chatData.index,
                        usr: chatData.name,
                        avtr: chatData.avatar,
                        mid: id
                      });
                    }}
                  >
                    <HStack space="sm" alignItems="center">
                      <Avatar size="md">
                        <AvatarFallbackText>{chatData.name}</AvatarFallbackText>
                        <AvatarImage alt={alt} source={source}/>
                      </Avatar>
                      <VStack>
                        <Heading>{chatData.name}</Heading>
                        <Text>{chatData.state}</Text>
                      </VStack>
                    </HStack>
                  </Pressable>
                )
              })}
            </VStack>
          </ScrollView>
          ) 
          : ( 
            <Text>Click the icon to start a new Chat!</Text>
          )}
        <Fab 
          bg="$primary600" size="lg" 
          onPress={() => {navigation.navigate("Scanner")}}
          style={Platform.OS === "ios" && {marginBottom: 30}}
          >
          <FabIcon as={EditIcon} /> 
        </Fab>
      </Box>
      {visible ? <ModalGroup setVisible={setVisible}/> : ""}
      {visibleModalLogOut ? <ModalLogOut setVisible={setVisibleModalLogOut} navigation={navigation}/> : ""}
    </SafeAreaView>
  )*/

  const username = "César Villegas";
  const [visibleModalLogOut, setVisibleModalLogOut] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Box 
        height="10%"
        mt={Platform.OS === "android" && "4%"} 
        style={{alignItems: "center", width: "100%"}}
      >
        <HStack 
          flexDirection="row"
          width="95%"
          mt = {Platform.OS === "ios" && "3%"}
          style={mainStyles.hstack}
        >
          <Profile 
            navigation={navigation}
            username={username} 
            setVisibleModalLogOut={setVisibleModalLogOut} 
          />
          <Input 
            style={mainStyles.searchInput}
          >
            <InputField 
              placeholder="Search for an event..." 
              style = {mainStyles.searchInputField}
            />
          </Input>
          <Button style = {mainStyles.everizonButton} >
            <Image source={EverIcon} style = {mainStyles.everizonButtonImage} />
          </Button>
        </HStack>
      </Box>
      <Box>
        <Button onPress={() => navigation.navigate("Settings")}>
          <ButtonText>Settings</ButtonText>
        </Button>
      </Box>
      <Box>

      </Box>
    </SafeAreaView>
  )

} 

const mainStyles = StyleSheet.create({
  hstack: {
    justifyContent: "space-between", 
    alignItems: "stretch",
    verticalAlign: "middle",
    marginLeft: "1%"
  },
  searchInput : {
    marginTop: "1%",
    marginLeft: "16.5%",
    marginBottom: "10%",
    width: "60%",
    height: "50%",
    backgroundColor: "white",
    borderRadius: 50,
    backgroundColor: "#E0E0F0",
    borderColor: "#FF0F57",
  },
  searchInputField : {
    width: "100%",
    height: "90%",
    backgroundColor: "#E0E0F0",
  },
  everizonButton : {
    backgroundColor: "transparent",
    marginTop: "-2%",
    borderRadius: 50,
    width: "15%",
    height: "85%",
    alignItems: "center",
  },
  everizonButtonImage : {
    width: "250%",
    height: "110%",
  }
});

export default Main;

