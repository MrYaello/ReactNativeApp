import { Box, HStack, Text, VStack } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";

const ActionTile = ({name, size, fontWeight, children}) => {
    return (
        <Box style={styles.tile}>
            <HStack style={styles.tileHStack}>
                <VStack style={styles.tileVStack}>
                    <Text size={size} fontWeight={fontWeight}>{name}</Text>
                </VStack>
                {children}
            </HStack>
        </Box>
    );
}

const styles = StyleSheet.create({
    tile: {
        width: "100%",
        height: "6%",
    },
    tileHStack: {
        marginLeft: "2%",
        marginRight: "2%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    tileVStack: {
        marginLeft: "3%",
        marginTop: "1%",
        height: "100%",
        justifyContent: "center",
    },
})

export default ActionTile;