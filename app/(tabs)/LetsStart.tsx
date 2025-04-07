import React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";

interface Props {
    hideShow: () => void; // Correctly typed function
}

const LetsStart: React.FC<Props> = ({ hideShow }) => {
    return (
        <View style={styles.container}>
            <Image 
                source={require("../../assets/images/logo_500.jpg")} // Ensure correct path
                style={styles.image}
            />
            <Text style={styles.title}>Let's Start</Text>
            <Button
                title="Let's Continue"
                color="blue"
                onPress={hideShow} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#000",
        marginTop: 20,
    },
    image: {
        position: "absolute",
        width: "100%",
        height: "100%",
        resizeMode: "cover", // Makes the image cover the full screen
    },
});

export default LetsStart;
